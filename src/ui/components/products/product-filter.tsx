"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/use-categories";

interface ProductFilterProps {
  plants: string[];
  onFilter: (filters: { plant: string; categoryId: number | "" }) => void;
}

export default function ProductFilter({
  plants,
  onFilter,
}: ProductFilterProps) {
  const [plant, setPlant] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  const { categories, loading, error } = useCategories();

  if (loading) return <p>Chargement des filtres…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex gap-4 flex-wrap">
      {/* Filtre catégorie */}
      <select
        value={categoryId}
        onChange={(e) => {
          const value = e.target.value;
          const id = value ? parseInt(value, 10) : "";
          setCategoryId(id);
          onFilter({ plant, categoryId: id });
        }}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Tous les types</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
          </option>
        ))}
      </select>

      {/* Filtre plante */}
      <select
        value={plant}
        onChange={(e) => {
          const value = e.target.value;
          setPlant(value);
          onFilter({ plant: value, categoryId });
        }}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Toutes les plantes</option>
        {plants.map((p) => (
          <option key={p} value={p}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
