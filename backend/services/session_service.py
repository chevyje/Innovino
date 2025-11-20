from backend.database.queries.session_queries import insert_session, get_valid_session_by_id, update_expires_at
from datetime import datetime, timezone, timedelta

from backend.models.session_model import Session


def create_session(user_id: int) -> str:
    expire_date = datetime.now(timezone.utc) + timedelta(minutes=30)
    session_id = insert_session(user_id, expire_date)
    return session_id

def validate_session(session_id: str) -> bool:
    current_time = datetime.now(timezone.utc)
    sessions = get_valid_session_by_id(session_id, current_time)
    if len(sessions) == 0:
        return False
    return True

def invalidate_session(session_id: str):
    expire_date = datetime(1900, 1,1, tzinfo=timezone.utc)
    update_expires_at(session_id, expire_date)

def get_session(session_id: str) -> Session | None:
    current_time = datetime.now(timezone.utc)
    row = get_valid_session_by_id(session_id, current_time)
    if row is None:
        return None

    return Session(
        id=row[0],
        user_id=row[1],
        created_at=row[2],
        expires_at=row[3],
    )
