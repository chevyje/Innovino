from typing import List, Tuple, Any
from backend.database import select_db


def get_products(only_active: bool = True) -> List[Tuple[Any]]:
    query = (
        "SELECT id, name, image_url, price, description, active, category "
        "FROM products"
    )
    if only_active:
        query += " WHERE active = TRUE"
    query += " ORDER BY name"
    return select_db(query) or []

def get_product_by_id(product_id: int) -> Tuple[Any] | None:
    rows = select_db(
        "SELECT id, name, image_url, price, description, active, category "
        "FROM products WHERE id = %s",
        (product_id,),
    ) or []
    return rows[0] if rows else None
