from fastapi import HTTPException
from backend.database.queries.cart_queries import (
    get_cart_items, insert_cart_item, update_cart_item, delete_cart_item, clear_cart
)
from backend.database.queries.product_queries import get_product_by_id
from backend.models.cart_model import CartItemOut, CartResponse

def list_cart(user_id: int) -> CartResponse:
    rows = get_cart_items(user_id)
    items = [CartItemOut.from_row(r) for r in rows]
    total = sum(i.line_total for i in items)
    return CartResponse(items=items, total=total)

def add_item(user_id: int, product_id: int, quantity: int):
    if quantity <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be greater than zero")
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    # probeer een insert; als het al bestaat, fallback naar update
    try:
        insert_cart_item(user_id, product_id, quantity)
    except Exception:
        update_cart_item(user_id, product_id, quantity)

def update_item(user_id: int, product_id: int, quantity: int):
    if quantity <= 0:
        delete_cart_item(user_id, product_id)
        return
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    update_cart_item(user_id, product_id, quantity)

def remove_item(user_id: int, product_id: int):
    delete_cart_item(user_id, product_id)

def clear(user_id: int):
    clear_cart(user_id)
