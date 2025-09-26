// cart-context.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // 👈 import router

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  pendingRemove?: boolean;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  removeFinal: (id: number) => void;
  clearCart: () => void;
  saveCartToDB: (newCart?: CartItem[]) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter(); // 👈 Next.js router
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (token) saveCartToDB(cart);
  }, [cart, token]);

  const saveCartToDB = async (newCart: CartItem[] = cart) => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ cart: newCart }),
      });
    } catch (err) {
      console.error("Erreur sauvegarde panier :", err);
    }
  };

  // 🔹 Ajouter au panier
  const addToCart = (product: CartItem) => {
    if (!token) {
      // Pas connecté → redirection
      router.push("/connexion");
      return;
    }

    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // 🔹 Retirer 1 produit
  const removeFromCart = (id: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id
          ? p.quantity > 1
            ? { ...p, quantity: p.quantity - 1 }
            : { ...p, pendingRemove: true }
          : p
      )
    );
  };

  // 🔹 Supprimer complètement
  const removeFinal = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        removeFinal,
        clearCart,
        saveCartToDB,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans <CartProvider>");
  }
  return context;
}
