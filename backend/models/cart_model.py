from typing import Optional, List
from pydantic import BaseModel, conint

class CartItemIn(BaseModel):
    product_id: int
    quantity: conint(gt=0)

class CartItemOut(BaseModel):
    product_id: int
    quantity: int
    name: str
    price: float
    image_url: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    line_total: float

    @classmethod
    def from_row(cls, row):
        return cls(
            product_id=row[0],
            quantity=row[1],
            name=row[2],
            price=float(row[3]) if row[3] is not None else 0.0,
            image_url=row[4],
            description=row[5],
            category=row[6],
            line_total=(float(row[3]) if row[3] else 0.0) * row[1],
        )

class CartResponse(BaseModel):
    items: List[CartItemOut]
    total: float
