"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import AdminSidebar from "@/ui/components/sidebar/admin-sidebar";
import { Seo } from "@/ui/components/seo/seo";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState("admin-token");

  // Récupération token
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token") || "admin-token";
      setToken(savedToken);
    }
  }, []);

  // Charger produits et catégories
  useEffect(() => {
    if (!token) return;

    fetch("/api/admin/products", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(console.error);

    fetch("/api/admin/categories", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(console.error);
  }, [token]);

  // Ajouter produit
  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur inconnue");
      }

      const newProduct = await res.json();
      setProducts([newProduct, ...products]);
      toast.success("Produit ajouté !");
      setModalOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Supprimer produit
  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur suppression");
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Produit supprimé !");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Seo title="Admin | Produits" description="Gestion des produits" />
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Produits</h1>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
            >
              Ajouter produit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}
                <h2 className="font-bold text-gray-800">{p.name}</h2>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {p.description}
                </p>
                <p className="text-cyan-600 font-semibold mt-1">{p.price} Ar</p>
                <p className="text-gray-400 text-sm">
                  {p.category?.name || "Sans catégorie"}
                </p>
                <button
                  onClick={() => handleDeleteProduct(p.id)}
                  className="px-2 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 mt-2"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>

          {/* Modal Ajouter */}
          <Dialog
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            className="fixed z-50 inset-0 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative z-10">
                <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">
                  Ajouter un produit
                </Dialog.Title>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nom du produit"
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    placeholder="Prix"
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    name="plant"
                    placeholder="Plante principale"
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="type"
                    placeholder="Type (visage, corps…)"
                    className="w-full p-3 border rounded-lg"
                  />
                  <select
                    name="categoryId"
                    className="w-full p-3 border rounded-lg"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
                    >
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Dialog>
        </main>
      </div>
    </>
  );
}
