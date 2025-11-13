from contextlib import asynccontextmanager
from pydantic import BaseModel
from typing import List

# Fast API
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Routers
from backend.routes.users import router as users_router

# Internal codes
from database import connect_db
from session import check_session

class ApiKeyException(BaseModel):
    path: str
    method: str

key_exceptions: List[ApiKeyException] = [
    ApiKeyException(method="POST", path="/api/users/auth"),
    
    # Allow the docs to be read
    ApiKeyException(method="GET", path="/docs"),
    ApiKeyException(method="GET", path="/openapi.json")
]

@asynccontextmanager
async def lifespan(_: FastAPI):
    connect_db()
    yield
    print("Disable API")

app = FastAPI(lifespan=lifespan)

@app.middleware("http")
async def check_api_key(request: Request, call_next):
    # Check if route is in the exception and continue
    for key_exception in key_exceptions:
        if key_exception.method == request.method and key_exception.path == request.url.path:
            print("No API key needed")
            return await call_next(request)

    # Check if the api key is valid
    api_key = request.headers.get("x-api-key")
    if check_session(api_key):
        print("Key is valid")
        return await call_next(request)
    else:
        return JSONResponse(status_code=401, content={"message": "Invalid API key"})

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router, prefix="/api")