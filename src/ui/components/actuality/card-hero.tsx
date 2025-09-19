"use client";

import { useLanguage } from "@/context/language-context";

type CardHeroActualityProps = {
  className?: string;
};

const socialNetworks = [
  { name: "facebook", icon: "/assets/icons/facebook.png" },
  { name: "instagram", icon: "/assets/icons/instagram.png" },
  { name: "twitter", icon: "/assets/icons/twitter.png" },
];

export function CardHeroActuality({ className }: CardHeroActualityProps) {
  const { lang } = useLanguage();

  // ✅ Texte selon la langue
  const title =
    lang === "FR"
      ? "Là où la conservation prend son envol"
      : "Where Conservation Takes Flight";
  const description =
    lang === "FR"
      ? "Découvrez les meilleures réserves naturelles pour la migration des oiseaux en automne."
      : "Discover the best natural reserves for bird migration in autumn.";
  const buttonText =
    lang === "FR" ? "Trouver des migrations" : "Find Migrations";

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 px-6 pt-20 pb-4 space-y-4 rounded-lg rounded-bl-none overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-b-4 border-b-blue-500 group ${
        className || ""
      }`}
    >
      {/* Titre et description */}
      <h2 className="text-primary-800 font-bold text-2xl lg:text-4xl font-serif">
        {title}
      </h2>
      <p className="text-primary-800 text-sm md:text-base">{description}</p>

      {/* Bouton */}
      <div className="pt-10">
        <button className="bg-primary-500 text-white px-4 lg:pt-4 lg:pb-4 pt-2 pb-2 lg:text-lg font-bold rounded-full rounded-bl-none">
          {buttonText}
        </button>
      </div>

      {/* Social Icons */}
      <div className="absolute bottom-20 right-3 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {socialNetworks.map((network) => (
          <a
            key={network.name}
            href="#"
            className="lg:w-12 lg:h-12 w-8 h-8 flex items-center justify-center bg-primary-500/50 rounded-full rounded-bl-none text-white hover:bg-green-600 transition-colors"
          >
            <img src={network.icon} alt={network.name} className="lg:w-8 lg:h-8 w-5 h-5" />
          </a>
        ))}
      </div>
    </div>
  );
}
