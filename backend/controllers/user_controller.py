from backend.database.queries.user_queries import insert_user
from backend.models.user_model import User, LoginRequest, CreateUserRequest
from backend.models.session_model import Session
from backend.services.user_service import get_user_from_username
from backend.services.session_service import create_session, get_session, invalidate_session

from fastapi.responses import JSONResponse
import bcrypt

def authenticate_user(data: LoginRequest) -> JSONResponse:
    server_data: User = get_user_from_username(data.username)
    if server_data is None:
        return JSONResponse(status_code=404, content={"message": "User not found"})

    if not bcrypt.checkpw(data.password.encode('utf-8'), server_data.password.encode('utf-8')):
        return JSONResponse(status_code=404, content={"message": "Incorrect password"})

    session_id = create_session(server_data.id)
    session: Session = get_session(session_id)
    return JSONResponse(status_code=200, content={
        "message": "Login successful",
        "session": {
            "session_id": session.id,
            "user_id": session.user_id,
            "created_at": session.created_at.isoformat(),
            "expires_at": session.expires_at.isoformat()
        },})

def logout(session_id: str) -> JSONResponse:
    session: Session = get_session(session_id)
    if session is None:
        return JSONResponse(status_code=404, content={"message": "Invalid session"})

    invalidate_session(session.id)
    return JSONResponse(status_code=200, content={"message": "Logout successful"})

def create_user(data: CreateUserRequest) -> JSONResponse:
    user: User = get_user_from_username(data.username)
    if user is not None:
        return JSONResponse(status_code=409, content={"message": "User already exists"})

    data.password = bcrypt.hashpw(data.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user_id = insert_user(data)
    return JSONResponse(status_code=201, content={"message": "Created user successfully", "user_id": user_id})
