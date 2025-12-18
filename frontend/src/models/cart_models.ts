export type CartItem = {
  product_id: number;
  name: string;
  price: number;
  image_url?: string | null;
  quantity: number;
};


export type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clear: () => void;
  total: number;
};
