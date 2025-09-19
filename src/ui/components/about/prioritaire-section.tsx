"use client";

import { Typography } from "@/ui/design-systeme/typography/typography";
import { useLanguage } from "@/context/language-context";
import { AiOutlineRight } from "react-icons/ai";

export const PrioritaireCards = () => {
  const { lang } = useLanguage();

  const cards = [
    {
      title: lang === "FR" ? "Espèces locales" : "Local Species",
      image: "assets/images/prioritaire/2.jpg",
    },
    {
      title: lang === "FR" ? "Zones dégradées" : "Degraded Areas",
      image: "assets/images/prioritaire/1.jpg",
    },
  ];

  return (
    <div className="lg:grid lg:grid-cols-2 gap-4 mb-10 space-y-4 lg:space-y-0">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative h-[25rem] rounded-lg rounded-bl-none overflow-hidden shadow hover:shadow-lg transition group flex items-end justify-center"
          style={{
            backgroundImage: `url(${card.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay sombre */}
          <div className="absolute inset-0 group-hover:bg-black/20 transition"></div>

          {/* Contenu avec hover effect */}
          <div className="z-10 flex-col space-y-3 w-full absolute bottom-4 px-4 py-3 bg-black/30 group-hover:bg-black/60 transition-all duration-300">
            <Typography
              variant="large"
              className="relative uppercase font-bold text-white z-10 text-center group-hover:text-green-400 transition-colors"
            >
              {card.title}
            </Typography>
            <button className="w-full bg-primary pb-3 pt-3 px-4 text-center justify-center flex items-center group-hover:scale-105 transform transition rounded  rounded-bl-none">
              <AiOutlineRight className="text-white text-xl font-bold" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
