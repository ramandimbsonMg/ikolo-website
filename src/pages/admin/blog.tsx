"use client";

import { useState, useEffect } from "react";
import { Seo } from "@/ui/components/seo/seo";
import { Layout } from "@/ui/components/layout/layout";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import AdminSidebar from "@/ui/components/sidebar/admin-sidebar";

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []));
  }, []);

  const handleAddPost = (formData: any) => {
    console.log("Ajouter blog:", formData);
    toast.success("Article ajouté !");
    setModalOpen(false);
    setPosts([...posts, { ...formData, id: Date.now() }]);
  };

  return (
    <>
      <Seo title="Admin | Blog" description="Gestion du blog" />
      {/* <Layout isDisplayBreakCrumbs={true}> */}
        <div className="flex min-h-screen bg-gray-50">
          {/* Sidebar réutilisable */}
          <AdminSidebar />

          {/* Contenu principal */}
          <main className="flex-1 p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Blog</h1>
              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
              >
                Ajouter article
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => (
                <div
                  key={p.id}
                  className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                >
                  <h2 className="font-bold text-gray-800">{p.title}</h2>
                  <p className="text-gray-500 text-sm">{p.content}</p>
                </div>
              ))}
            </div>

            {/* Modal Ajouter Article */}
            <Dialog
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              className="fixed z-50 inset-0 overflow-y-auto"
            >
              <div className="flex items-center justify-center min-h-screen px-4">
                {/* Overlay corrigé pour Headless UI v2+ */}
                <div
                  className="fixed inset-0 bg-black/30"
                  aria-hidden="true"
                />{" "}
                <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative z-10">
                  <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">
                    Ajouter un article
                  </Dialog.Title>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = Object.fromEntries(
                        new FormData(e.currentTarget).entries()
                      );
                      handleAddPost(formData);
                    }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      name="title"
                      placeholder="Titre de l'article"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      required
                    />
                    <textarea
                      name="content"
                      placeholder="Contenu"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      required
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
