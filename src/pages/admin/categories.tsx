"use client";

import { useState, useEffect } from "react";
import { Seo } from "@/ui/components/seo/seo";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import AdminSidebar from "@/ui/components/sidebar/admin-sidebar";

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const token = "admin-token"; // token factice pour test

  // Récupérer les catégories
  useEffect(() => {
    fetch("/api/admin/categories", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []));
  }, []);

  // Ajouter une catégorie
  const handleAddCategory = async (formData: any) => {
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur inconnue");
      }

      const newCategory = await res.json();
      toast.success("Catégorie ajoutée !");
      setModalOpen(false);
      setCategories([...categories, newCategory]);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Seo title="Admin | Catégories" description="Gestion des catégories" />
      {/* <Layout isDisplayBreakCrumbs={true}> */}
        <div className="flex min-h-screen bg-gray-50">
          <AdminSidebar />

          <main className="flex-1 p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Catégories</h1>
              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
              >
                Ajouter catégorie
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                >
                  <h2 className="font-bold text-gray-800">{c.name}</h2>
                  <p className="text-gray-500 text-sm">{c.description || ""}</p>
                </div>
              ))}
            </div>

            {/* Modal */}
            <Dialog
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              className="fixed z-50 inset-0 overflow-y-auto"
            >
              <div className="flex items-center justify-center min-h-screen px-4">
                {/* Overlay Headless UI v2 */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative z-10">
                  <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">
                    Ajouter une catégorie
                  </Dialog.Title>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = Object.fromEntries(
                        new FormData(e.currentTarget).entries()
                      );
                      handleAddCategory(formData);
                    }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Nom de la catégorie"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      required
                    />
                    <textarea
                      name="description"
                      placeholder="Description (optionnel)"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => setModalOpen(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
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
      {/* </Layout> */}
    </>
  );
}
