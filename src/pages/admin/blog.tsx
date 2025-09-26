"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import AdminSidebar from "@/ui/components/sidebar/admin-sidebar";
import { Seo } from "@/ui/components/seo/seo";

type BlogType = {
  id?: number;
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  image?: string;
};

type TestimonialType = {
  id?: number;
  name: string;
  message: string;
  rating?: number;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"blog" | "testimonial">("blog");
  const [posts, setPosts] = useState<BlogType[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // 🔹 Chargement initial depuis l'API
  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));

    fetch("/api/testimonial")
      .then((res) => res.json())
      .then((data) => setTestimonials(data.testimonials));
  }, []);

  // 🔹 Ajouter un blog
  const handleAddPost = async (formData: any) => {
    try {
      const slug =
        formData.slug?.trim() ||
        formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, slug }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout de l'article");

      const data = await res.json();
      setPosts([...posts, data.post]);
      toast.success("Article ajouté !");
      setModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Erreur inconnue");
    }
  };

  // 🔹 Ajouter un témoignage
  const handleAddTestimonial = async (formData: any) => {
    try {
      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout du témoignage");

      const data = await res.json();
      setTestimonials([...testimonials, data.testimonial]);
      toast.success("Témoignage ajouté !");
      setModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Erreur inconnue");
    }
  };

  return (
    <>
      <Seo title="Admin | Dashboard" description="Gestion Blog & Témoignages" />
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <main className="flex-1 p-8">
          {/* Onglets */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("blog")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "blog"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => setActiveTab("testimonial")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "testimonial"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Témoignages
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Ajouter {activeTab === "blog" ? "Article" : "Témoignage"}
            </button>
          </div>

          {/* Tableau des articles ou témoignages */}
          {activeTab === "blog" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => (
                <div
                  key={p.id}
                  className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                >
                  <h2 className="font-bold text-gray-800">{p.title}</h2>
                  {p.excerpt && (
                    <p className="text-gray-500 mt-2">{p.excerpt}</p>
                  )}
                  <p className="text-gray-700 mt-2">{p.content}</p>
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="mt-2 rounded-lg w-full h-40 object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                >
                  <h3 className="font-semibold text-gray-800">{t.name}</h3>
                  <p className="mt-2 text-gray-700">{t.message}</p>
                  {t.rating && (
                    <p className="mt-1 text-yellow-500">⭐ {t.rating}/5</p>
                  )}
                </div>
              ))}
            </div>
          )}

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
                  Ajouter {activeTab === "blog" ? "Article" : "Témoignage"}
                </Dialog.Title>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = Object.fromEntries(
                      new FormData(e.currentTarget).entries()
                    );
                    if (activeTab === "blog") handleAddPost(formData);
                    else handleAddTestimonial(formData);
                  }}
                  className="space-y-4"
                >
                  {activeTab === "blog" ? (
                    <>
                      <input
                        type="text"
                        name="title"
                        placeholder="Titre de l'article"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        name="excerpt"
                        placeholder="Extrait (optionnel)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        name="slug"
                        placeholder="Slug (optionnel, généré automatiquement)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        name="image"
                        placeholder="URL de l'image (optionnel)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      />
                      <textarea
                        name="content"
                        placeholder="Contenu de l'article"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        required
                        rows={5}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        name="name"
                        placeholder="Nom"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        required
                      />
                      <textarea
                        name="message"
                        placeholder="Message"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        required
                        rows={4}
                      />
                      <input
                        type="number"
                        name="rating"
                        min={1}
                        max={5}
                        placeholder="Note (1-5, optionnel)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      />
                    </>
                  )}

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
    </>
  );
}
