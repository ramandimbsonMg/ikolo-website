// src/components/ProductFilter.tsx
import { useState } from "react";

export default function ProductFilter({
  plants,
  onFilter,
}: {
  plants: string[];
  onFilter: (filters: any) => void;
}) {
  const [plant, setPlant] = useState<string | "">("");
  const [category, setCategory] = useState<string | "">("");

  return (
    <div className="flex gap-4 flex-wrap">
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          onFilter({ plant, category: e.target.value });
        }}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Tous les types</option>
        <option value="visage">Visage</option>
        <option value="cheveux">Cheveux</option>
        <option value="corps">Corps</option>
      </select>

      <select
        value={plant}
        onChange={(e) => {
          setPlant(e.target.value);
          onFilter({ plant: e.target.value, category });
        }}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Toutes les plantes</option>
        {plants.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}
