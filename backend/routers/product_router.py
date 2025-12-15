from typing import List
from fastapi import APIRouter
from backend.controllers.product_controller import list_products, get_product
from backend.models.product_model import ProductOut

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=List[ProductOut])
def list_products_route(only_active: bool = True):
    return list_products(only_active)

@router.get("/{product_id}", response_model=ProductOut)
def get_product_route(product_id: int):
    return get_product(product_id)
