import { useState } from "react";
import axios from "axios";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const { data } = await axios.post("/api/sendMail", formData);
      setResponseMessage(data.message);
      setFormData({ nom: "", email: "", sujet: "", message: "" });
    } catch (error) {
      setResponseMessage("Erreur lors de l'envoi du message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label
            className="font-semibold text-2xl lg:text-[14px] sm:text-2xl"
            htmlFor="nom"
          >
            Votre Nom
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Ajouter Nom"
            className="border rounded p-2 px-6 w-full h-12 text-md"
            required
          />
        </div>
        <div>
          <label
            className="font-semibold text-2xl lg:text-[14px] sm:text-2xl"
            htmlFor="email"
          >
            Votre Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="votre email@gmail.com"
            className="border rounded p-2 px-6 w-full h-12 text-md"
            required
          />
        </div>
        <div>
          <label
            className="font-semibold text-2xl lg:text-[14px] sm:text-2xl"
            htmlFor="sujet"
          >
            Votre Sujet
          </label>
          <input
            type="text"
            name="sujet"
            value={formData.sujet}
            onChange={handleChange}
            placeholder="Votre sujet"
            className="border rounded p-2 px-6 w-full h-12 text-md"
            required
          />
        </div>
        <div>
          <label
            className="font-semibold text-2xl lg:text-[14px] sm:text-2xl"
            htmlFor="message"
          >
            Votre Message
          </label>
          <textarea
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message"
            className="border rounded p-2 px-6 w-full"
            required
          ></textarea>
        </div>
        <div className="flex justify-between mt-6 items-center">
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded"
            disabled={loading}
          >
            {loading ? "Envoi..." : "Envoyer"}
          </button>
        </div>
      </form>

      {responseMessage && <p className="mt-4">{responseMessage}</p>}
    </div>
  );
};
