from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from backend.database import select_db
from pydantic import BaseModel

class Login(BaseModel):
    username: str
    password: str



router = APIRouter(prefix="/users", tags=["users"])

@router.post("/auth")
def auth(login: Login):
    users = select_db("SELECT password FROM users WHERE name = %s", (login.username,))
    if len(users) != 1:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if users[0][0] != login.password:
        raise HTTPException(status_code=400, detail="Incorrect password")
    return {"message": "Login successful"}