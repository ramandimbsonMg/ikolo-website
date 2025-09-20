// src/components/CartModal.tsx
import { useState } from "react";

export default function CartModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center p-4">
      <div className="bg-white w-full md:w-2/3 rounded-xl p-6">
        <h3 className="font-bold">Panier (simulation)</h3>
        <p className="mt-3 text-sm text-gray-600">
          Ici s’affiche le contenu du panier. Le paiement n’est pas connecté.
        </p>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
