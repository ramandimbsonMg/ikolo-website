"use client";

import { useState } from "react";
import { Typography } from "@/ui/design-systeme/typography/typography";
import { AiOutlineMail } from "react-icons/ai";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erreur");

      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  // Animation float pour les logos
  const floatVariant = {
    float: {
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="mt-20 relative rounded-2xl shadow p-10 text-center text-white w-[40em] z-20 overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{
        backgroundImage: `url('/assets/images/photo/draw/new.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay pour lisibilité */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

      <div className="relative z-10">
        <Typography
          variant="xlarge"
          className="mb-3 font-bold flex items-center gap-2 text-white"
        >
          <AiOutlineMail /> Rejoignez notre Newsletter
        </Typography>

        <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
          Recevez nos dernières nouvelles, événements et ressources éducatives
          directement dans votre boîte mail. Soyez les premiers informés !
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
        >
          <div className="relative w-full sm:w-2/3">
            <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-yellow-400 text-indigo-900 font-semibold shadow-md hover:bg-yellow-300 transition cursor-pointer"
          >
            {status === "loading" ? "Envoi..." : "S’inscrire"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-3 text-green-200">{message}</p>
        )}
        {status === "error" && <p className="mt-3 text-red-200">{message}</p>}

        {/* Logos sociaux */}
        <div className="flex items-center justify-center gap-8 mt-10">
          <motion.a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={floatVariant}
            animate="float"
            className="text-5xl text-blue-600 hover:text-blue-400 transition"
          >
            <FaFacebookF />
          </motion.a>

          <motion.a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={floatVariant}
            animate="float"
            className="text-3xl text-red-600 hover:text-red-400 transition"
          >
            <FaYoutube />
          </motion.a>

          <motion.a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={floatVariant}
            animate="float"
            className="text-3xl text-cyan-400 hover:text-cyan-300 transition"
          >
            <FaTwitter />
          </motion.a>

          <motion.a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={floatVariant}
            animate="float"
            className="text-3xl text-pink-500 hover:text-pink-400 transition"
          >
            <FaInstagram />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};
