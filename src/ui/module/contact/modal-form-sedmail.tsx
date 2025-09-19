"use client";

import { useState } from "react";
import { FiMail } from "react-icons/fi";
import api from "@/lib/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";

export const ContactFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Gestion inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Envoi formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("send-contact/", formData);
      if (response.status === 200) {
        toast.success("✅ Message envoyé avec succès !");
        setFormData({ nom: "", email: "", sujet: "", message: "" });
        setIsOpen(false); // fermer la modal après succès
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("❌ Erreur lors de l'envoi du message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Bouton flottant / déclencheur */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 pt-2 pb-2 gap-2 bg-primary text-white rounded-full hover:bg-primary/80 transition flex items-center justify-center"
        aria-label="Contacter"
      >
        <FiMail className="w-5 h-5" />
        Envoyer un email
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start z-50 pt-20">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white gap-2 items-center flex">
                <FiMail className="w-4 h-4" />
                Formulaire de contact
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:bg-gray-200 transition"
              >
                <AiOutlineClose className="w-6 h-6" />
              </button>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="font-semibold text-sm" htmlFor="nom">
                  Nom d'Entreprise
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Ajouter Nom"
                  className="border rounded-lg p-2 px-3 w-full h-12 text-md"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-sm" htmlFor="email">
                  Votre Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="border rounded-lg p-2 px-3 w-full h-12 text-md"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-sm" htmlFor="sujet">
                  Sujet
                </label>
                <input
                  type="text"
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  placeholder="Votre sujet"
                  className="border rounded-lg p-2 px-3 w-full h-12 text-md"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-sm" htmlFor="message">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  className="border rounded-lg p-2 w-full"
                  required
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
                  disabled={loading}
                >
                  {loading ? "Envoi..." : "Envoyer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
