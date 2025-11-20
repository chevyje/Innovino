from datetime import datetime
from typing import List, Tuple, Any
from backend.database import insert_db, select_db, query_db

def insert_session(user_id: int, expiration_date: datetime) -> str:
    return insert_db("INSERT INTO sessions (user_id, expires_at) VALUES (%s, %s) RETURNING id", (user_id, expiration_date))

def get_valid_session_by_id(session_id: str, current_time: datetime) -> List[Tuple[Any]] | None:
    rows = select_db("SELECT * FROM sessions WHERE id = %s AND expires_at > %s", (session_id, current_time))
    return rows[0] if rows else None

def update_expires_at(session_id: str, expiration_date: datetime) -> None:
    query_db("UPDATE sessions SET expires_at = %s WHERE id = %s", (expiration_date, session_id))