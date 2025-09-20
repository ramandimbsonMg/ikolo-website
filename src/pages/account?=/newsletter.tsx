"use client";
import { useState } from "react";
import Sidebar from "@/ui/components/sidebar/sidebar";
import { Box } from "@/ui/design-systeme/box/box";
import { Typography } from "@/ui/design-systeme/typography/typography";

export default function NewsletterPage() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content, imageUrl }),
      });
      const data = await res.json();
      setMessage(data.message);
      setSubject(""); setContent(""); setImageUrl("");
    } catch {
      setMessage("Erreur serveur");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen md:ml-60">
        <Typography variant="xlarge" weight="bold" className="mb-6">
          📧 Créer une Newsletter
        </Typography>

        <Box className="bg-white shadow-xl rounded-xl p-6 max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Sujet"
              className="w-full border p-3 rounded-md"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <textarea
              placeholder="Contenu"
              className="w-full border p-3 rounded-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="URL de l'image (optionnel)"
              className="w-full border p-3 rounded-md"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Envoyer
            </button>
          </form>
          {message && <p className="mt-4 text-gray-700">{message}</p>}
        </Box>
      </main>
    </div>
  );
}
