from datetime import datetime
from pydantic import BaseModel

class Session(BaseModel):
    id: str
    user_id: int | None
    created_at: datetime | None
    expires_at: datetime
