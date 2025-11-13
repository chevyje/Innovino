from fastapi import APIRouter
from fastapi.responses import JSONResponse
from backend.database import select_db, insert_db
from backend.session import create_session, check_user_session
from pydantic import BaseModel
import bcrypt

class User(BaseModel):
    username: str
    password: str

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/auth")
def auth(user: User):
    users = select_db("SELECT id, password FROM users WHERE username = %s", (user.username.lower(),))

    # Check if a user with the username exists
    if len(users) != 1:
        return JSONResponse(status_code=401, content={"message": "Invalid username"})

    # Define username and password
    user_id = users[0][0]
    server_password = users[0][1].encode('utf-8')

    # Encode given password from user
    client_password = user.password.encode('utf-8')
    if not bcrypt.checkpw(client_password, server_password):
        return JSONResponse(status_code=401, content={"message": "Invalid password"})

    # return new session to the user.
    session_id = create_session(user_id)
    return {"message": "Login successful", "session_id": session_id}

@router.post("/")
def create_user(user: User):
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode("utf-8")
    user_id = insert_db("INSERT INTO users (username, password) VALUES (%s, %s) RETURNING id", (user.username.lower(), hashed_password))
    if user_id == -1:
        return JSONResponse(status_code=409, content={"message": "Username already exists"})
    return JSONResponse(status_code=201, content={"message": "User created successfully", "id": user_id})