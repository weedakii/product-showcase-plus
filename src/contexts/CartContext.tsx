import { createContext, useContext, useState, ReactNode } from "react";
import { ProductColor } from "@/types/api";

export interface CartItem {
  product_id: number;
  product_name: string;
  product_image?: string | null;
  price: string;
  quantity: number;
  color: ProductColor;
  width?: number;
  height?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  updateColor: (index: number, color: ProductColor) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("adhlal_cart");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const persist = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem("adhlal_cart", JSON.stringify(newItems));
  };

  const addToCart = (item: CartItem) => {
    persist([...items, item]);
  };

  const removeFromCart = (index: number) => {
    persist(items.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;
    const updated = [...items];
    updated[index] = { ...updated[index], quantity };
    persist(updated);
  };

  const updateColor = (index: number, color: ProductColor) => {
    const updated = [...items];
    updated[index] = { ...updated[index], color };
    persist(updated);
  };

  const clearCart = () => persist([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, updateColor, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
