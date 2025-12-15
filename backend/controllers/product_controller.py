from fastapi import HTTPException
from backend.services.product_service import list_products_service, get_product_service

def list_products(only_active: bool = True):
    return list_products_service(only_active)

def get_product(product_id: int):
    product = get_product_service(product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
