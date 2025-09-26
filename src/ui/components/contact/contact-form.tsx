import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erreur lors de l'envoi");
      }

      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (sent)
    return (
      <div className="p-4 bg-green-50 rounded-lg">
        Merci ! Nous avons bien reçu votre message.
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      {error && <p className="text-red-500">{error}</p>}
      <input
        name="name"
        required
        placeholder="Nom"
        className="border px-3 py-3 rounded-lg"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="border px-3 py-3 rounded-lg"
      />
      <textarea
        name="message"
        required
        placeholder="Votre message"
        rows={5}
        className="border px-3 py-3 rounded-lg"
      />
      <button
        type="submit"
        className="bg-primary text-white py-2 px-4 rounded-lg"
        disabled={loading}
      >
        {loading ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
}
