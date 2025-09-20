// src/components/ContactForm.tsx
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  function handleSubmit(e: any) {
    e.preventDefault();
    // envoie vers ton endpoint d'email / CRM
    setSent(true);
  }

  if (sent)
    return (
      <div className="p-4 bg-green-50 rounded-lg">
        Merci ! Nous avons bien reçu votre message.
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
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
        className="bg-ikoloGreen text-white py-2 px-4 rounded-lg"
      >
        Envoyer
      </button>
    </form>
  );
}
