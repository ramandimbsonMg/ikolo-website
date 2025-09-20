"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/ui/design-systeme/button/button";

export const VideoDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Une vidéo éducative pour enfants (chansons et apprentissage des couleurs)
  const videoUrl = "/assets/video/tes.mp4";

  // Fermer si clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Bouton */}
      <Button
        variant="secondary"
        onClick={() => setIsOpen((prev) => !prev)}
        className="truncate"
      >
        Vidéo pour enfants
      </Button>

      {/* Dropdown vidéo (ouvre au-dessus du bouton) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute lg:left-1/2 right-0 -translate-x-1/2 bottom-full mb-4 w-[560px] max-w-[90vw] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden p-2"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Titre coloré */}
            <h3 className="text-center text-lg font-bold text-pink-500 mb-2">
              🎉 Vidéo surprise pour enfants 🎉
            </h3>

            {/* Vidéo responsive */}
            <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={videoUrl}
                title="Vidéo éducative pour enfants"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Bulles flottantes */}
            <motion.span
              className="absolute -top-5 -left-3 w-6 h-6 bg-pink-400 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.span
              className="absolute -top-6 right-6 w-8 h-8 bg-yellow-300 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.span
              className="absolute -bottom-0 left-10 w-5 h-5 bg-green-400 rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity }}
            />
            <motion.span
              className="absolute -bottom-1 right-5 w-7 h-7 bg-blue-400 rounded-full"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2.8, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
