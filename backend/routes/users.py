from fastapi import APIRouter
from fastapi.responses import JSONResponse
from backend.database import select_db, insert_db
from pydantic import BaseModel
import bcrypt

class User(BaseModel):
    username: str
    password: str



router = APIRouter(prefix="/users", tags=["users"])

@router.post("/auth")
def auth(user: User):
    users = select_db("SELECT password FROM users WHERE username = %s", (user.username.lower(),))
    if len(users) != 1:
        return JSONResponse(status_code=401, content={"message": "Invalid username"})
    server_password = users[0][0].encode('utf-8')
    client_password = user.password.encode('utf-8')
    if not bcrypt.checkpw(client_password, server_password):
        return JSONResponse(status_code=401, content={"message": "Invalid password"})
    return {"message": "Login successful"}

@router.post("/")
def create_user(user: User):
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode("utf-8")
    user_id = insert_db("INSERT INTO users (username, password) VALUES (%s, %s) RETURNING id", (user.username.lower(), hashed_password))
    if user_id == -1:
        return JSONResponse(status_code=409, content={"message": "Username already exists"})
    return JSONResponse(status_code=201, content={"message": "User created successfully", "id": user_id})