from backend.routers.user_router import router as user_router
from backend.database.database import connect_db
from backend.services.security_service import handle_api_key_middleware

from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(_: FastAPI):
    connect_db()
    yield
    print("Disable API")

app = FastAPI(lifespan=lifespan)

@app.middleware("http")
async def check_api_key(request: Request, call_next):
    return await handle_api_key_middleware(request, call_next)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix="/api")