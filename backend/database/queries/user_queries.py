from backend.database import select_db, insert_db
from typing import List, Tuple, Any

from backend.models.user_model import CreateUserRequest


def get_user_by_username(username: str) -> Tuple[int, str, str] | None:
    rows: List[Tuple[Any]]= select_db("SELECT id, password FROM users WHERE username = %s", (username.lower(),))
    return rows[0] if rows else None

def insert_user(data: CreateUserRequest) -> int:
    return insert_db("INSERT INTO users (username, password) VALUES (%s, %s) RETURNING id", (data.username.lower(), data.password))