from backend.database.database import connect_db
from backend.services.security_service import handle_api_key_middleware

from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.user_router import router as user_router
from backend.routers.product_router import router as product_router
from backend.routers.cart_router import router as cart_router

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
    allow_origins=["*"], # moet http://localhost:3001 zijn
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(product_router)
app.include_router(cart_router)