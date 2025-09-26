"use client";

import { useState, useEffect } from "react";
import { Seo } from "@/ui/components/seo/seo";
import { Layout } from "@/ui/components/layout/layout";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import AdminSidebar from "@/ui/components/sidebar/admin-sidebar";

export default function AdminNewsletter() {
  const [emails, setEmails] = useState<any[]>([]);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [newsletterData, setNewsletterData] = useState({
    subject: "",
    content: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  // Charger les abonnés
  useEffect(() => {
    fetch("/api/newsletter")
      .then((res) => res.json())
      .then((data) => setEmails(data.subscribers || []));
  }, []);

  // Ajouter un nouvel email
  const handleAddEmail = async (formData: any) => {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'ajout");
      toast.success("Email ajouté !");
      setEmails([...emails, data.subscriber]);
      setEmailModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Erreur inconnue");
    }
  };

  // Envoyer la newsletter
  const handleSendNewsletter = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsletterData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors de l'envoi");
      toast.success(`Newsletter envoyée à ${data.sentTo} abonnés !`);
      setNewsletterData({ subject: "", content: "", imageUrl: "" });
      setNewsletterModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title="Admin | Newsletter" description="Gestion newsletter" />
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Newsletter</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setEmailModalOpen(true)}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
              >
                Ajouter email
              </button>
              <button
                onClick={() => setNewsletterModalOpen(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Envoyer Newsletter
              </button>
            </div>
          </div>

          {/* Liste des abonnés */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emails.map((e) => (
              <div
                key={e.id}
                className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="font-bold text-gray-800">{e.email}</h2>
              </div>
            ))}
          </div>

          {/* Modal Ajouter Email */}
          <Dialog
            open={emailModalOpen}
            onClose={() => setEmailModalOpen(false)}
            className="fixed z-50 inset-0 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative z-10">
                <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">
                  Ajouter un email
                </Dialog.Title>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = Object.fromEntries(
                      new FormData(e.currentTarget).entries()
                    );
                    handleAddEmail(formData);
                  }}
                  className="space-y-4"
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    required
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setEmailModalOpen(false)}
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

          {/* Modal Envoyer Newsletter */}
          <Dialog
            open={newsletterModalOpen}
            onClose={() => setNewsletterModalOpen(false)}
            className="fixed z-50 inset-0 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative z-10">
                <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">
                  Envoyer Newsletter
                </Dialog.Title>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Sujet"
                    value={newsletterData.subject}
                    onChange={(e) =>
                      setNewsletterData({
                        ...newsletterData,
                        subject: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                  <textarea
                    placeholder="Contenu"
                    rows={5}
                    value={newsletterData.content}
                    onChange={(e) =>
                      setNewsletterData({
                        ...newsletterData,
                        content: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="URL Image (optionnel)"
                    value={newsletterData.imageUrl}
                    onChange={(e) =>
                      setNewsletterData({
                        ...newsletterData,
                        imageUrl: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setNewsletterModalOpen(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSendNewsletter}
                      disabled={loading}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      {loading ? "Envoi..." : "Envoyer"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
        </main>
      </div>
    </>
  );
}
