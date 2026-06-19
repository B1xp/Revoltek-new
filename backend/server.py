from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

from fastapi import FastAPI, APIRouter, Depends, HTTPException, Request
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import jwt
import bcrypt
from datetime import datetime, timezone, timedelta
from pydantic import BaseModel
from typing import Dict

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

JWT_ALGORITHM = "HS256"

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ---------------- Auth helpers ----------------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def create_access_token(username: str) -> str:
    payload = {
        "sub": username,
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


async def get_current_admin(request: Request) -> dict:
    auth_header = request.headers.get("Authorization", "")
    token = auth_header[7:] if auth_header.startswith("Bearer ") else None
    if not token:
        raise HTTPException(status_code=401, detail="No autenticado")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        username = payload.get("sub")
        admin = await db.admins.find_one({"username": username})
        if not admin:
            raise HTTPException(status_code=401, detail="Usuario no encontrado")
        return {"username": admin["username"]}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Sesión expirada")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")


# ---------------- Models ----------------
class LoginIn(BaseModel):
    username: str
    password: str


class OverridesIn(BaseModel):
    data: Dict[str, float]


class CatalogIn(BaseModel):
    catalog: list


# ---------------- Routes ----------------

login_attempts = {}

@api_router.get("/")
async def root():
    return {"message": "RevolTek API"}


@api_router.post("/auth/login")
async def login(body: LoginIn, request: Request):
    
    client_ip = request.client.host
    
    
    if login_attempts.get(client_ip, {}).get("count", 0) >= 3:
        raise HTTPException(status_code=403, detail="Acceso denegado temporalmente.")

    admin = await db.admins.find_one({"username": body.username})
    
    
    if not admin or not verify_password(body.password, admin["password_hash"]):
        
        ip_data = login_attempts.get(client_ip, {"count": 0})
        ip_data["count"] += 1
        login_attempts[client_ip] = ip_data
        
        
        raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos.")
    

    login_attempts.pop(client_ip, None)
    
    token = create_access_token(admin["username"])
    return {"token": token, "username": admin["username"]}


@api_router.get("/auth/me")
async def me(admin: dict = Depends(get_current_admin)):
    return admin


@api_router.get("/overrides")
async def get_overrides():
    doc = await db.price_overrides.find_one({"_id": "overrides"})
    return {"data": doc["data"] if doc else {}}


@api_router.put("/admin/overrides")
async def update_overrides(body: OverridesIn, admin: dict = Depends(get_current_admin)):
    await db.price_overrides.update_one(
        {"_id": "overrides"},
        {"$set": {"data": body.data, "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    return {"ok": True, "count": len(body.data)}


@api_router.get("/catalog")
async def get_catalog():
    doc = await db.catalog.find_one({"_id": "catalog"})
    return {"catalog": doc["data"] if doc else None}


@api_router.put("/admin/catalog")
async def update_catalog(body: CatalogIn, admin: dict = Depends(get_current_admin)):
    await db.catalog.update_one(
        {"_id": "catalog"},
        {"$set": {"data": body.catalog, "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    return {"ok": True, "count": len(body.catalog)}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def seed_admin():
    username = os.environ.get("ADMIN_USERNAME")
    password = os.environ.get("ADMIN_PASSWORD")
    
    if not username or not password:
        logger.error("Error: Las variables ADMIN_USERNAME o ADMIN_PASSWORD no están configuradas.")
        return

    existing = await db.admins.find_one({"username": username})
    
    if existing is None:
        await db.admins.insert_one(
            {"username": username, "password_hash": hash_password(password), "created_at": datetime.now(timezone.utc).isoformat()}
        )
        logger.info("Seeded admin user: %s", username)
    elif not verify_password(password, existing["password_hash"]):
        await db.admins.update_one(
            {"username": username}, {"$set": {"password_hash": hash_password(password)}}
        )
        logger.info("Updated admin password for: %s", username)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
