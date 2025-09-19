"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardHeroActuality } from "./card-hero";
import { useLanguage } from "@/context/language-context";

const images = [
  "/assets/images/hero/actuality.jpg",
  "/assets/images/hero/actuality2.jpg",
  "/assets/images/hero/actuality3.jpg",
];

export function HeroActuality() {
  const [current, setCurrent] = useState(0);
  const { lang } = useLanguage(); // FR / EN

  // Changer l'image toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-white overflow-hidden relative">
      {/* Progress bar en haut */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-300 z-20">
        <motion.div
          key={current}
          className="h-1.5 bg-green-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
        />
      </div>

      {/* Images de fond */}
      <AnimatePresence>
        {images.map(
          (img, index) =>
            index === current && (
              <motion.div
                key={index}
                className="absolute inset-0 h-[30rem] bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${img})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            )
        )}
      </AnimatePresence>

      {/* Overlay noir */}
      <div className="absolute inset-0 bg-black opacity-50 z-10 h-[30rem]"></div>

      {/* Contenu */}
      <div className="lg:grid px-3 lg:grid-cols-12 mx-auto max-w-7xl relative z-20 pb-6">
        <div className="lg:col-span-7 lg:max-w-4xl mx-auto px-6 lg:mt-10 mt-2">
          <p className="mt-4 lg:text-lg bg-white pt-2 pb-2 px-4 rounded-lg rounded-bl-none text-gray-800 inline-block">
            {lang === "FR"
              ? "ONG MADA SINK MAINTSO : Environnement & développement durable"
              : "MADA SINK MAINTSO ONG: Environment & Sustainable Development"}
          </p>
          <div className="space-y-1">
            <h1 className="mt-6 text-3xl lg:text-5xl font-bold bg-green-500/20 rounded-lg rounded-bl-none px-3 pt-3 pb-3 font-serif">
              {lang === "FR"
                ? "Luttons ensemble contre l’injustice"
                : "Let’s fight together against injustice"}
            </h1>
            <h1 className="mt-6 text-3xl lg:text-5xl font-bold bg-green-500/20 rounded-lg rounded-bl-none px-3 pt-3 pb-3 font-serif">
              {lang === "FR"
                ? "et pour un avenir équitable."
                : "and for a fair future."}
            </h1>
          </div>
        </div>

        <CardHeroActuality className="lg:col-span-5 text-center text-green-700 shadow-lg border lg:mt-60 z-10 absolute inset-0 pt-4" />
      </div>
    </section>
  );
}
