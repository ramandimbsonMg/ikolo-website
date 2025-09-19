import { useState } from "react";
import api from "@/lib/api";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("send-contact/", formData);
      if (response.status === 200) {
        toast.success("✅ Message envoyé avec succès !");
        setFormData({ nom: "", email: "", sujet: "", message: "" });
      }
    } catch (error) {
      toast.error("❌ Erreur lors de l'envoi du message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* tes inputs ici */}
        <div>
          <label className="font-semibold lg:text-[14px]" htmlFor="nom">
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
          <label className="font-semibold lg:text-[14px]" htmlFor="email">
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
          <label className="font-semibold lg:text-[14px]" htmlFor="sujet">
            Votre Sujet
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
          <label className="font-semibold lg:text-[14px]" htmlFor="message">
            Votre Message
          </label>
          <textarea
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message"
            className="border rounded-lg p-2 pt-3 px-3 w-full"
            required
          ></textarea>
          Ramandimbson Espoir Mathieu Albertin
        </div>
        <div className="flex justify-between mt-4 items-center">
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Envoi..." : "Envoyer"}
          </button>
        </div>
      </form>
    </div>
  );
};
