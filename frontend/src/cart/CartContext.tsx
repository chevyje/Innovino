// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import type { CartItem, CartContextValue } from "../models/cart_models";
// import {
//   fetchCart,
//   addCartItem,
//   updateCartItem,
//   removeCartItem,
//   clearCart as clearCartApi,
// } from "../requests/cart_requests";

// const CartContext = createContext<CartContextValue>({
//   items: [],
//   addItem: () => {},
//   updateQuantity: () => {},
//   removeItem: () => {},
//   clear: () => {},
//   total: 0,
// });

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [items, setItems] = useState<CartItem[]>([]);

//   useEffect(() => {
//     fetchCart()
//       .then((res) => setItems(res.items))
//       .catch(() => setItems([]));
//   }, []);

//   const refresh = () =>
//     fetchCart()
//       .then((res) => setItems(res.items))
//       .catch(() => setItems([]));

//   const addItem = (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
//     setItems((prev) => {
//       const existing = prev.find((p) => p.product_id === item.product_id);
//       if (existing) {
//         return prev.map((p) =>
//           p.product_id === item.product_id ? { ...p, quantity: p.quantity + quantity } : p
//         );
//       }
//       return [...prev, { ...item, quantity }];
//     });
//     addCartItem(item.product_id, quantity).catch(refresh);
//   };

//   const updateQuantity = (id: number, quantity: number) => {
//     const nextQty = Math.max(0, quantity);
//     setItems((prev) =>
//       nextQty === 0
//         ? prev.filter((p) => p.product_id !== id)
//         : prev.map((p) => (p.product_id === id ? { ...p, quantity: nextQty } : p))
//     );
//     const call = nextQty === 0 ? removeCartItem(id) : updateCartItem(id, nextQty);
//     call.catch(refresh);
//   };

//   const removeItem = (id: number) => updateQuantity(id, 0);

//   const clear = () => {
//     setItems([]);
//     clearCartApi().catch(refresh);
//   };

//   const total = useMemo(
//     () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
//     [items]
//   );

//   const value = useMemo(
//     () => ({ items, addItem, updateQuantity, removeItem, clear, total }),
//     [items, total]
//   );

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// }

// export const useCart = () => useContext(CartContext);
import { createContext, useContext, useMemo } from "react";
import type { CartItem, CartContextValue } from "../models/cart_models";
import {
  fetchCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart as clearCartApi,
} from "../requests/cart_requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clear: () => {},
  total: 0,
});

const CART_QUERY_KEY = ["cart"];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: fetchCart,
  });

  const items = data?.items ?? [];

  const addMutation = useMutation({
    mutationFn: ({ product_id, quantity }: { product_id: number; quantity: number }) =>
      addCartItem(product_id, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ product_id, quantity }: { product_id: number; quantity: number }) =>
      updateCartItem(product_id, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY }),
  });

  const removeMutation = useMutation({
    mutationFn: (product_id: number) => removeCartItem(product_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY }),
  });

  const clearMutation = useMutation({
    mutationFn: clearCartApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY }),
  });

  const addItem = async (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    await addMutation.mutateAsync({ product_id: item.product_id, quantity });
  };

const updateQuantity = async (id: number, quantity: number) => {
  const nextQty = Math.max(1, quantity);
  await updateMutation.mutateAsync({ product_id: id, quantity: nextQty });
};

const removeItem = async (id: number) => {
  await removeMutation.mutateAsync(id);
};

const clear = async () => {
  await clearMutation.mutateAsync();
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
