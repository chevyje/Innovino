from backend.models.user_model import LoginRequest, CreateUserRequest
from backend.controllers.user_controller import authenticate_user, logout, create_user

from typing import Annotated
from fastapi import APIRouter, Header


router = APIRouter(prefix="/users", tags=["users"])

@router.post("/auth")
async def auth_route(data: LoginRequest):
    return authenticate_user(data)

@router.get("/logout")
async def logout_route(x_api_key: Annotated[str | None, Header()] = None):
    return logout(x_api_key)

@router.post("/")
def create_user_route(data: CreateUserRequest):
    return create_user(data)