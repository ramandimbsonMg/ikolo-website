import { useState } from "react";
import toast from "react-hot-toast";

export default function NewsletterSection({ initialSubscribers }: any) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return toast.error("Veuillez entrer un email");
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'abonnement");

      const data = await res.json();
      setSubscribers([data.subscriber, ...subscribers]);
      toast.success("Merci pour votre abonnement !");
      setNewsletterEmail("");
    } catch (err: any) {
      toast.error(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Abonnez-vous à notre Newsletter
      </h2>
      <form
        onSubmit={handleSubscribe}
        className="mb-8 space-y-4 bg-white p-6 rounded-lg shadow max-w-md mx-auto"
      >
        <input
          type="email"
          placeholder="Votre email"
          value={newsletterEmail}
          onChange={(e) => setNewsletterEmail(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-primary text-white rounded-lg"
        >
          {loading ? "Envoi..." : "S'abonner"}
        </button>
      </form>

      {subscribers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subscribers.map((s: any) => (
            <div
              key={s.id}
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <p>{s.email}</p>
              <span className="block mt-1 text-gray-400 text-sm">
                {new Date(s.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
