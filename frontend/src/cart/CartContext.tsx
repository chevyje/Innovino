import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, CartContextValue } from "../models/cart_models";
import {
  fetchCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart as clearCartApi,
} from "../requests/cart_requests";

const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clear: () => {},
  total: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchCart()
      .then((res) => setItems(res.items))
      .catch(() => setItems([]));
  }, []);

  const refresh = () =>
    fetchCart()
      .then((res) => setItems(res.items))
      .catch(() => setItems([]));

  const addItem = (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.product_id === item.product_id);
      if (existing) {
        return prev.map((p) =>
          p.product_id === item.product_id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      return [...prev, { ...item, quantity }];
    });
    addCartItem(item.product_id, quantity).catch(refresh);
  };

  const updateQuantity = (id: number, quantity: number) => {
    const nextQty = Math.max(0, quantity);
    setItems((prev) =>
      nextQty === 0
        ? prev.filter((p) => p.product_id !== id)
        : prev.map((p) => (p.product_id === id ? { ...p, quantity: nextQty } : p))
    );
    const call = nextQty === 0 ? removeCartItem(id) : updateCartItem(id, nextQty);
    call.catch(refresh);
  };

  const removeItem = (id: number) => updateQuantity(id, 0);

  const clear = () => {
    setItems([]);
    clearCartApi().catch(refresh);
  };

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addItem, updateQuantity, removeItem, clear, total }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
