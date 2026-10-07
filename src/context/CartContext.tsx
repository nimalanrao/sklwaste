import React, { createContext, useContext, useState, useEffect } from "react";
import type { MasterProduct } from "../data/catalogue";

export interface CartItem {
  id: string;
  title: string;
  brand?: string;
  category: string;
  unit?: string;
  quantity: number;
  localImage: string;
  fallbackImage?: string;
}

export type TransportMode = "day" | "night";

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  transportMode: TransportMode;
  setTransportMode: (mode: TransportMode) => void;
  addToCart: (product: MasterProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getItemQuantity: (productId: string) => number;
  clearCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "skl_waste_cart_items";
const TRANSPORT_STORAGE_KEY = "skl_waste_cart_transport";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [transportMode, setTransportModeState] = useState<TransportMode>(() => {
    try {
      const saved = localStorage.getItem(TRANSPORT_STORAGE_KEY);
      if (saved === "day" || saved === "night") return saved;
    } catch {
      // ignore
    }
    return "day"; // default to Day Transport
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Sync items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const setTransportMode = (mode: TransportMode) => {
    setTransportModeState(mode);
    try {
      localStorage.setItem(TRANSPORT_STORAGE_KEY, mode);
    } catch {
      // ignore
    }
  };

  const addToCart = (product: MasterProduct, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          brand: product.brand,
          category: product.subCategory || product.mainCategory,
          unit: product.unit,
          quantity: Math.max(1, quantity),
          localImage: product.localImage,
          fallbackImage: product.fallbackImage,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
    );
  };

  const getItemQuantity = (productId: string): number => {
    const item = items.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        transportMode,
        setTransportMode,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemQuantity,
        clearCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
