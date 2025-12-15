from fastapi import APIRouter, Header, HTTPException
from typing import Annotated
from backend.services.cart_service import list_cart, add_item, update_item, remove_item, clear
from backend.services.session_service import get_session
from backend.models.cart_model import CartItemIn, CartResponse

router = APIRouter(prefix="/cart", tags=["cart"])

def _get_user_id(x_api_key: Annotated[str | None, Header()] = None) -> int:
    session = get_session(x_api_key)
    if session is None:
        raise HTTPException(status_code=401, detail="Invalid session")
    return session.user_id

@router.get("/", response_model=CartResponse)
def get_cart(x_api_key: Annotated[str | None, Header()] = None):
    user_id = _get_user_id(x_api_key)
    return list_cart(user_id)

@router.post("/items")
def upsert_item(payload: CartItemIn, x_api_key: Annotated[str | None, Header()] = None):
    user_id = _get_user_id(x_api_key)
    add_item(user_id, payload.product_id, payload.quantity)
    return {"message": "ok"}

@router.patch("/items/{product_id}")
def update_qty(product_id: int, payload: CartItemIn, x_api_key: Annotated[str | None, Header()] = None):
    user_id = _get_user_id(x_api_key)
    update_item(user_id, product_id, payload.quantity)
    return {"message": "ok"}

@router.delete("/items/{product_id}")
def delete_item(product_id: int, x_api_key: Annotated[str | None, Header()] = None):
    user_id = _get_user_id(x_api_key)
    remove_item(user_id, product_id)
    return {"message": "ok"}

@router.delete("/")
def clear_cart_route(x_api_key: Annotated[str | None, Header()] = None):
    user_id = _get_user_id(x_api_key)
    clear(user_id)
    return {"message": "ok"}
