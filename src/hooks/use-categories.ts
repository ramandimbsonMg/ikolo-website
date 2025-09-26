"use client";

import { useState, useEffect } from "react";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok)
          throw new Error("Erreur lors du chargement des catégories");

        const data = await res.json();
        // ⚠️ Ici on prend bien data.categories
        setCategories(data.categories || []);
      } catch (err: any) {
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
