from backend.models.api_model import KeylessRoute
from backend.services.session_service import validate_session

from typing import List
from fastapi import Request
from fastapi.responses import JSONResponse

keyless_routes: List[KeylessRoute] = [
    KeylessRoute(method="POST", path="/users/auth"),
    KeylessRoute(method="POST", path="/users"),
    KeylessRoute(method="POST", path="/users/"),
    KeylessRoute(method="GET", path="/products"),
    KeylessRoute(method="GET", path="/products/"),
    KeylessRoute(method="GET", path="/cart/"),
    KeylessRoute(method="GET", path="/cart"),



    # Allow the docs to be read
    KeylessRoute(method="GET", path="/docs"),
    KeylessRoute(method="GET", path="/openapi.json")
]

async def handle_api_key_middleware(request: Request, call_next):
    print("PATH:", request.url.path, "METHOD:", request.method)  # debug
    # Check if route is in the exception and continue
    for x in keyless_routes:
        if x.method == request.method and x.path == request.url.path:
            return await call_next(request)

    # Check if the api key is valid
    api_key = request.headers.get("x-api-key")
    if validate_session(api_key):
        print("Key is valid")
        return await call_next(request)

    return JSONResponse(status_code=401, content={"message": "Invalid API key"})
