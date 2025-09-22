// ui/module/landing-page/landing-page.view.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useCart } from "@/pages/api/cart/use-cart";
import HeroBanner from "@/ui/components/actuality/hero-baner";
import ProductCard from "@/ui/components/products/product-card";
import SectionTitle from "@/ui/components/section/section-title";

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string | null;
  plant?: string | null;
  type?: string | null;
  category?: { id: number; name: string } | null;
};

export default function LandignPageView({
  products = [],
  plants = [],
}: {
  products?: Product[];
  plants?: string[];
}) {
  const { addToCart } = useCart();
  const [activePlant, setActivePlant] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // Liste filtrée (recalculée si products / activePlant / query changent)
  const list = useMemo(() => {
    let out = Array.isArray(products) ? products.slice() : [];

    if (activePlant) {
      out = out.filter(
        (p) => (p.plant ?? "").toLowerCase() === activePlant.toLowerCase()
      );
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          (p.category?.name ?? "").toLowerCase().includes(q)
      );
    }

    return out;
  }, [products, activePlant, query]);

  // Classe ou style grid : si moins de 4 éléments on réduit colonnes (tailwind ne supporte pas dyn classes faciles -> inline style)
  const gridStyle =
    list.length > 0 && list.length < 4
      ? {
          gridTemplateColumns: `repeat(${Math.min(
            list.length,
            4
          )}, minmax(0, 1fr))`,
        }
      : undefined;

  return (
    <>
      <HeroBanner />

      <section className="container mx-auto px-6 py-12">
        <SectionTitle title="Nos best-sellers" subtitle="Les favoris Ikolo" />

        {/* Recherche + Filtres */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => {
                setActivePlant(null);
                setQuery("");
              }}
              className={`px-4 py-2 rounded-lg text-sm ${
                activePlant === null ? "bg-green-700 text-white" : "bg-gray-200"
              }`}
            >
              Tous
            </button>

            {/* sécurité : plants peut être undefined */}
            {Array.isArray(plants) && plants.length > 0 ? (
              plants.map((plant) => (
                <button
                  key={plant}
                  onClick={() => {
                    setActivePlant((cur) => (cur === plant ? null : plant));
                  }}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activePlant === plant
                      ? "bg-green-700 text-white"
                      : "bg-cyan-500 text-white"
                  }`}
                >
                  {plant}
                </button>
              ))
            ) : (
              <span className="text-gray-400 italic text-sm">
                Aucune plante
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
                setActivePlant(null);
              }}
              className="px-3 py-2 rounded-lg bg-gray-200"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Produits */}
        {list?.length > 0 ? (
          <div
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            style={gridStyle}
          >
            {list.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={() =>
                  addToCart({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: p.image ?? "/assets/images/products/default.webp",
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
