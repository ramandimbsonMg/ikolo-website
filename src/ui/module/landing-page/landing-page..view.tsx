"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "@/pages/api/cart/use-cart";
import HeroBanner from "@/ui/components/actuality/hero-baner";
import ProductCard from "@/ui/components/products/product-card";
import SectionTitle from "@/ui/components/section/section-title";

type Category = { id: number; name: string };
type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string | null;
  category?: Category | null;
};

export default function LandingPageView() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true); // ⚡ état de chargement

  // ⚡ Charger produits et catégories depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);

        const prodData = await prodRes.json();
        const catData = await catRes.json();

        setProducts(prodData.products || []);
        setCategories(catData.categories || []);
      } catch (err) {
        console.error("Erreur chargement produits/catégories :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ⚡ Filtrage produits par catégorie + recherche
  const filteredProducts = useMemo(() => {
    let out = [...products];

    if (activeCategory) {
      out = out.filter((p) => p.category?.id === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q)
      );
    }

    return out;
  }, [products, activeCategory, query]);

  // ⚡ Helper pour l'image du produit
  const getProductImage = (product: Product) => {
    if (!product.image) return "/assets/images/products/default.webp";
    // encode uniquement pour URL valide
    return `${product.image}`;
  };

  return (
    <>
      <HeroBanner />

      <section className="container mx-auto px-6 py-12">
        <SectionTitle title="Nos best-sellers" subtitle="Les favoris Ikolo" />

        {/* Filtrage catégories + recherche */}
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between 
                  gap-4 mb-6 mt-10 sticky top-24 bg-white z-20 shadow-sm p-3 rounded-lg"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => {
                setActiveCategory(null);
                setQuery("");
              }}
              className={`px-4 py-2 rounded-lg text-sm ${
                activeCategory === null
                  ? "bg-green-700 text-white"
                  : "bg-gray-200"
              }`}
            >
              Tous
            </button>

            {categories.length > 0 ? (
              categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    setActiveCategory((cur) => (cur === cat.id ? null : cat.id))
                  }
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeCategory === cat.id
                      ? "bg-green-700 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))
            ) : (
              <span className="text-gray-400 italic text-sm">
                Aucune catégorie
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un produit, catégorie..."
              className="px-3 py-2 border rounded-lg w-48 md:w-64 focus:outline-none"
            />
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory(null);
              }}
              className="px-3 py-2 rounded-lg bg-gray-200"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Produits / Loader */}
        {loading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-gray-200 rounded-lg animate-pulse"
              >
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={{
                  ...p,
                  image: getProductImage(p),
                }}
                onAdd={() =>
                  addToCart({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: getProductImage(p),
                    quantity: 1,
                  })
                }
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8">
            Aucun produit trouvé.
          </p>
        )}
      </section>
    </>
  );
}
