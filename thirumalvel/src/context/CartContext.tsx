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
export type PaymentMethod = "cash" | "transfer" | "qr";

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  transportMode: TransportMode;
  setTransportMode: (mode: TransportMode) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
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
const PAYMENT_STORAGE_KEY = "skl_waste_cart_payment";

export function normalizeUOM(unit?: string, title?: string, id?: string): "TON" | "BAG" | "UNIT" {
  const t = (title || "").toLowerCase();
  const i = (id || "").toLowerCase();
  const u = (unit || "").toLowerCase();

  // 1. ALL PASIR -> TON (Strict rule: "FOR ALL PASIR USE TON")
  if (t.includes("pasir") || i.includes("pasir")) {
    if (!t.includes("block") && !t.includes("blok") && !t.includes("brick") && !t.includes("bata")) {
      return "TON";
    }
  }

  // Bulk stone / aggregates -> TON
  if (i.includes("guni-ton") || (t.includes("batu") && (t.includes("pukal") || t.includes("lori") || i.includes("ton")))) {
    return "TON";
  }

  // 2. OTHERS IN BAG -> BAG (Strict rule: "AND OTHERS THAT ARE IN BAG USE BAG UOM")
  if (
    i.includes("siap-guni") ||
    t.includes("(guni)") ||
    t.includes("guni") ||
    t.includes("(beg)") ||
    u.includes("beg") ||
    u.includes("guni") ||
    u.includes("bag") ||
    i.includes("simen-portland") ||
    i.includes("skim-coat") ||
    i.includes("tile-gum") ||
    t.includes("simen") ||
    t.includes("cement") ||
    t.includes("skim coat") ||
    t.includes("tile gum") ||
    t.includes("gam jubin") ||
    t.includes("mortar") ||
    t.includes("plaster") ||
    t.includes("premix") ||
    t.includes("waterproof 25kg") ||
    t.includes("waterproof 35kg") ||
    t.includes("waterproof 43kg") ||
    t.includes("self levelling")
  ) {
    if (
      !t.includes("elbow") &&
      !t.includes("solvent") &&
      !t.includes("susu") &&
      !t.includes("admixture") &&
      !t.includes("blok") &&
      !t.includes("bata") &&
      !t.includes("brick") &&
      !t.includes("block") &&
      !t.includes("glue")
    ) {
      return "BAG";
    }
  }

  // 3. MOST COMMON -> UNIT (Strict rule: "UNIT (MOST COMMON)")
  return "UNIT";
}

export function cleanCartTitle(title: string, id: string): string {
  if (id === "skl-pasir-halus-siap-guni") return "Pasir Halus";
  if (id === "skl-pasir-kasar-siap-guni") return "Pasir Kasar";
  if (id === "skl-pasir-halus-sungai-guni-ton") return "Pasir Halus (Pukal)";
  if (id === "skl-pasir-kasar-konkrit-guni-ton") return "Pasir Kasar (Pukal)";
  if (id === "skl-batu-agregat-3-4-guni-ton") return "Batu Baur 3/4\" (Pukal)";
  if (id === "skl-batu-agregat-3-4-siap-guni") return "Batu Baur 3/4\"";
  if (id === "skl-simen-portland-opc-guni") return "Simen Portland OPC (50kg)";
  if (id === "skl-skim-coat-base-grey-guni") return "Skim Coat Asas (40kg)";
  if (id === "skl-skim-coat-finish-white-guni") return "Skim Coat Kemasan (25kg)";
  if (id === "skl-tile-gum-c2te-guni") return "Gam Jubin Tile Gum (25kg)";
  if (id === "batu-pasir-per-pcs") return "Bata Pasir Sand Brick";
  if (id === "skl-cement-sand-block-hollow") return "Blok Simen Pasir Hollow";

  return title
    .replace(/\s*\(guni\)/gi, "")
    .replace(/\s*guni\b/gi, "")
    .replace(/\s*\(beg\)/gi, "")
    .replace(/\s*beg\b/gi, "")
    .replace(/\s*per guni \(beg\)/gi, "")
    .trim();
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((item: CartItem) => ({
            ...item,
            title: cleanCartTitle(item.title, item.id),
            unit: normalizeUOM(item.unit, item.title, item.id),
          }));
        }
      }
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

  const [paymentMethod, setPaymentMethodState] = useState<PaymentMethod>(() => {
    try {
      const saved = localStorage.getItem(PAYMENT_STORAGE_KEY);
      if (saved === "cash" || saved === "transfer" || saved === "qr") return saved;
    } catch {
      // ignore
    }
    return "cash"; // default to Cash on Delivery / Self Pickup
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

  const setPaymentMethod = (method: PaymentMethod) => {
    setPaymentMethodState(method);
    try {
      localStorage.setItem(PAYMENT_STORAGE_KEY, method);
    } catch {
      // ignore
    }
  };

  const addToCart = (product: MasterProduct, quantity: number = 1) => {
    const cleanTitle = cleanCartTitle(product.title, product.id);
    const standardUnit = normalizeUOM(product.unit, product.title, product.id);

    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity, title: cleanTitle, unit: standardUnit } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: cleanTitle,
          brand: product.brand,
          category: product.subCategory || product.mainCategory,
          unit: standardUnit,
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
        paymentMethod,
        setPaymentMethod,
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
