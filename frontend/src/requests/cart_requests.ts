import { getCookie } from "../utils/cookies";
import { baseUrl } from "../utils/requests";

const BASE = `${baseUrl}/cart`;

function apiKey() {
  return getCookie("session_id") ?? "";
}

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": apiKey(),
    ...(init.headers || {}),
  };
  const res = await fetch(`${BASE}${path}`, { ...init, headers });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.status === 204 ? (undefined as T) : await res.json();
}

export type CartItemDto = {
  product_id: number;
  name: string;
  price: number;
  image_url?: string | null;
  quantity: number;
};

export type CartResponseDto = { items: CartItemDto[]; total: number };

export const fetchCart = () => api<CartResponseDto>("/", { method: "GET" });
export const addCartItem = (product_id: number, quantity: number) =>
  api<{ message: string }>("/items", { method: "POST", body: JSON.stringify({ product_id, quantity }) });
export const updateCartItem = (product_id: number, quantity: number) =>
  api<{ message: string }>(`/items/${product_id}`, {
    method: "PATCH",
    body: JSON.stringify({ product_id, quantity }),
  });
export const removeCartItem = (product_id: number) =>
  api<{ message: string }>(`/items/${product_id}`, { method: "DELETE" });
export const clearCart = () => api<{ message: string }>("/", { method: "DELETE" });
