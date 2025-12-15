from typing import List
from backend.database.queries.product_queries import get_products, get_product_by_id
from backend.models.product_model import ProductOut

def list_products_service(only_active: bool = True) -> List[ProductOut]:
    rows = get_products(only_active)
    return [
        ProductOut(
            id=row[0],
            name=row[1],
            image_url=row[2],
            price=float(row[3]) if row[3] is not None else 0.0,
            description=row[4],
            active=row[5],
            category=row[6],
        )
        for row in rows
    ]

def get_product_service(product_id: int) -> ProductOut | None:
    row = get_product_by_id(product_id)
    if not row:
        return None
    return ProductOut(
        id=row[0],
        name=row[1],
        image_url=row[2],
        price=float(row[3]),
        description=row[4],
        active=row[5],
        category=row[6],
    )
