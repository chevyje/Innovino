from typing import Optional
from pydantic import BaseModel

class ProductOut(BaseModel):
    id: int
    name: str
    image_url: Optional[str] = None
    price: float
    description: Optional[str] = None
    active: bool
    category: Optional[str] = None