from database import insert_db, select_db
from datetime import datetime, timezone, timedelta

def create_session(user_id: int):
    expire_date = datetime.now(timezone.utc) + timedelta(minutes=2)
    session_id = insert_db("INSERT INTO sessions (user_id, expires_at) VALUES (%s, %s) RETURNING id", (user_id, expire_date))
    return session_id

def check_session(session_id: str):
    sessions = select_db("SELECT * FROM sessions WHERE id = %s AND expires_at > %s", (session_id, datetime.now(timezone.utc)))
    if len(sessions) == 0:
        return False
    return True

def check_user_session(user_id: int):
    sessions = select_db("SELECT id FROM sessions WHERE user_id = %s AND expires_at > %s", (user_id, datetime.now(timezone.utc)))
    if len(sessions) == 0:
        return None
    return sessions[0][0]