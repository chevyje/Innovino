from pydantic import BaseModel

class KeylessRoute(BaseModel):
    path: str
    method: str