"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

// Bull décoratif
const Bull = ({ size, x, y, delay }: any) => (
  <div
    className="absolute bg-white/50 rounded-full animate-bounce pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      animationDelay: `${delay}s`,
    }}
  />
);

// Icône réseau social flottant
const SocialBull = ({ Icon, link, color, x, y, delay }: any) => (
  <Link
    href={link}
    target="_blank"
    className="absolute transition transform hover:scale-125 z-20"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      animationDelay: `${delay}s`,
      animation: "float 6s ease-in-out infinite",
      color: color,
    }}
  >
    <Icon className="text-3xl md:text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] text-gray-300 hover:drop-shadow-[0_0_15px_currentColor]" />
  </Link>
);

export default function HeroBanner() {
  const [bulls, setBulls] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);

  useEffect(() => {
    // Bulls décoratifs
    const newBulls = Array.from({ length: 10 }).map(() => ({
      size: Math.random() * 15 + 5 + "px",
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setBulls(newBulls);

    // Icônes sociales flottantes avec couleurs spécifiques
    const socialIcons = [
      { Icon: FaFacebookF, link: "https://facebook.com", color: "#1877F2" },
      { Icon: FaInstagram, link: "https://instagram.com", color: "#E1306C" },
      { Icon: FaTiktok, link: "https://tiktok.com", color: "#69C9D0" },
      { Icon: FaTwitter, link: "https://twitter.com", color: "#1DA1F2" },
    ];

    const newSocials = socialIcons.map((s) => ({
      ...s,
      x: Math.random() * 80 + 10, // positions aléatoires
      y: Math.random() * 80 + 10,
      delay: Math.random() * 5,
    }));

    setSocials(newSocials);
  }, []);

  return (
    <div className=" min-h-screen lg:min-h-[unset] lg:h-[500px] relative z-10">
      <section className="relative min-h-screen lg:min-h-[unset] lg:h-[520px] overflow-hidden lg:rounded-bl-full lg:rounded-tr-full">
        {/* Image de fond */}
        <Image
          src="/assets/images/banier/3.jpg"
          alt="Plantes malgaches"
          fill
          style={{ objectFit: "cover" }}
          className="brightness-90"
        />

        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex lg:items-center z-10 lg:pt-0 pt-14 pointer-events-none">
          <div className="container mx-auto px-6 text-white max-w-3xl relative z-10 pointer-events-auto">
            <h2 className="lg:text-6xl text-5xl font-serif font-bold leading-snug">
              La beauté enracinée dans la nature malgache
            </h2>
            <p className="mt-4 text-sm md:text-lg text-white/90">
              Produits naturels formulés à base de plantes malgaches : aloe
              vera, ravintsara, baobab...
            </p>

            <div className="mt-6 lg:flex lg:gap-4 space-y-10 lg:space-y-0">
              <div>
                <Link
                  href="/products"
                  className="px-5 py-3 rounded-full bg-secondary-400/80 hover:bg-secondary-400 transition text-white font-medium shadow-lg"
                >
                  Découvrir nos produits
                </Link>
              </div>
              <div>
                <Link
                  href="/shop"
                  className="px-5 py-3 rounded-full bg-white/30 hover:bg-white/50 transition text-white font-medium shadow-lg"
                >
                  Commander maintenant
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bulls animation */}
        {bulls.map((b, i) => (
          <Bull key={i} {...b} />
        ))}

        {/* Réseaux sociaux flottants */}
        {socials.map((s, i) => (
          <SocialBull key={i} {...s} />
        ))}
      </section>

      {/* Animation CSS custom */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}
