import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Bull component (animation légère)
const Bull = ({ size, x, y, delay }: any) => (
  <div
    className="absolute bg-white/40 rounded-full animate-bounce"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      animationDelay: `${delay}s`,
    }}
  />
);

export default function HeroBanner() {
  const [bulls, setBulls] = useState<any[]>([]);

  useEffect(() => {
    // Crée 10 bulls aléatoires
    const newBulls = Array.from({ length: 10 }).map(() => ({
      size: Math.random() * 15 + 5 + "px",
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setBulls(newBulls);
  }, []);

  return (
      <div className="bg-secondary/10 min-h-screen lg:h-[535px] relative z-10 shadow-lg shadow-secondary/20">
    <section className="relative min-h-screen lg:h-[535px] overflow-hidden lg:rounded-bl-full">
        {/* Image de fond */}
        <Image
          src="/assets/images/banier/2.jpg"
          alt="Plantes malgaches"
          fill
          style={{ objectFit: "cover" }}
          className="brightness-90"
        />

        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex lg:items-center z-10 lg:pt-0 pt-14">
          <div className="container mx-auto px-6 text-white max-w-3xl relative z-10">
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
    </section>
      </div>
  );
}
