from backend.models.user_model import User
from backend.database.queries.user_queries import get_user_by_username

def get_user_from_username(username: str) -> User | None:
    row = get_user_by_username(username)
    if row is None:
        return None

    return User(
        id=row[0],
        password=row[1],
        username=username,
    )
