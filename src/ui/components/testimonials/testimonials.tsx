import { useState } from "react";
import toast from "react-hot-toast";

export default function Testimonials({ initialTestimonials }: any) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRatingChange = (value: number) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi du témoignage");

      const data = await res.json();
      setTestimonials([data.testimonial, ...testimonials]);
      toast.success("Merci pour votre témoignage !");
      setFormData({ name: "", comment: "", rating: 5 });
    } catch (err: any) {
      toast.error(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-16 mx-auto max-w-8xl">
      <h2 className="text-2xl font-bold mb-6 text-primary text-center">
        Témoignages de clientes
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-4 bg-white p-6 rounded-lg shadow max-w-md mx-auto"
      >
        <input
          type="text"
          name="name"
          placeholder="Votre nom"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
          required
        />
        <textarea
          name="comment"
          placeholder="Votre témoignage"
          value={formData.comment}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
          rows={4}
          required
        />

        {/* Rating étoiles */}
        <div className="rating flex gap-1 justify-center">
          {[1, 2, 3, 4, 5].map((n) => (
            <input
              key={n}
              type="radio"
              name="rating"
              className="mask mask-star bg-yellow-400"
              aria-label={`${n} star`}
              checked={formData.rating === n}
              onChange={() => handleRatingChange(n)}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition"
        >
          {loading ? "Envoi..." : "Envoyer"}
        </button>
      </form>

      {testimonials.length > 0 && (
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
          {testimonials.map((t: any) => (
            <div
              key={t.id}
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <p className="italic">"{t.message}"</p>
              <span className="block mt-2 text-sm text-gray-500">
                - {t.name}
              </span>
              {t.rating && (
                <p className="mt-1 text-yellow-500">⭐ {t.rating}/5</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
