"use client";
import { useState, useEffect } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  pendingRemove?: boolean;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ⚡ Charger le panier depuis l'API
  useEffect(() => {
    if (!token) return;
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const data = await res.json();
        if (data.orders?.length) {
          const lastOrder = data.orders[0];
          const items = lastOrder.items
            .filter((i: any) => i.product) // 🔹 ignore les produits supprimés
            .map((i: any) => ({
              id: i.product.id,
              name: i.product.name,
              price: i.product.price,
              image: i.product.image,
              quantity: i.quantity,
            }));
          setCart(items);
        }
      } catch (err) {
        console.error("Erreur récupération panier :", err);
      }
    };
    fetchCart();
  }, [token]);

  const saveCartToDB = async (newCart?: CartItem[]) => {
    if (!token) return;
    const payload = {
      cart:
        newCart?.filter((i) => !i.pendingRemove) ||
        cart.filter((i) => !i.pendingRemove),
    };
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Erreur sauvegarde panier :", err);
    }
  };

  // ⚡ Ajouter au panier
  const addToCart = (product: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      const newCart = exists
        ? prev.map((p) =>
            p.id === product.id
              ? { ...p, quantity: p.quantity + 1, pendingRemove: false }
              : p
          )
        : [...prev, { ...product, quantity: 1 }];
      saveCartToDB(newCart);
      return newCart;
    });
  };

  // ⚡ Décrémenter ou marquer pour suppression
  const removeFromCart = (id: number) => {
    setCart((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          if (p.quantity > 1) return { ...p, quantity: p.quantity - 1 };
          return { ...p, pendingRemove: true };
        }
        return p;
      })
    );
  };

  // ⚡ Supprimer définitivement
  const removeFinal = (id: number) => {
    setCart((prev) => {
      const newCart = prev.filter((p) => p.id !== id);
      saveCartToDB(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    saveCartToDB([]);
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + (item.pendingRemove ? 0 : item.quantity),
    0
  );
  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.pendingRemove ? 0 : item.price * item.quantity),
    0
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    removeFinal,
    clearCart,
    cartCount,
    cartTotal,
    saveCartToDB,
  };
}
