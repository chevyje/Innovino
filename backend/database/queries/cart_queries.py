from typing import List, Tuple, Any
from backend.database import select_db, query_db

def get_cart_items(user_id: int) -> List[Tuple[Any]]:
    return select_db(
        """
        SELECT ci.product_id, ci.quantity,
               p.name, p.price, p.image_url, p.description, p.category
        FROM cart_items ci
        JOIN products p ON p.id = ci.product_id
        WHERE ci.user_id = %s
        ORDER BY p.name
        """,
        (user_id,)
    ) or []

def insert_cart_item(user_id: int, product_id: int, quantity: int):
    return query_db(
        """
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES (%s, %s, %s)
        """,
        (user_id, product_id, quantity)
    )

def update_cart_item(user_id: int, product_id: int, quantity: int):
    return query_db(
        """
        UPDATE cart_items
        SET quantity = %s, updated_at = now()
        WHERE user_id = %s AND product_id = %s
        """,
        (quantity, user_id, product_id)
    )

def delete_cart_item(user_id: int, product_id: int):
    return query_db(
        "DELETE FROM cart_items WHERE user_id = %s AND product_id = %s",
        (user_id, product_id)
    )

def clear_cart(user_id: int):
    return query_db("DELETE FROM cart_items WHERE user_id = %s", (user_id,))
