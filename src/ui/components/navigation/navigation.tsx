"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-secondary/10 backdrop-blur-lg h-[80px] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo + texte */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/images/logo/logo_ikolo~2.png"
            alt="Ikolo"
            width={70}
            height={70}
            className="rounded-full object-cover"
          />
          {/* <div>
            <h1 className="font-bold text-xl tracking-wide text-green-800">
              Ikolo
            </h1>
            <p className="text-xs text-gray-500 italic">
              La beauté enracinée dans la nature malgache
            </p>
          </div> */}
        </Link>

        {/* menu desktop */}
        <nav className="hidden md:flex gap-8 items-center font-medium">
          <Link
            href="/products"
            className="hover:text-green-700 transition-colors"
          >
            Produits
          </Link>
          <Link href="/shop" className="hover:text-green-700 transition-colors">
            Boutique
          </Link>
          <Link href="/blog" className="hover:text-green-700 transition-colors">
            blog
          </Link>
          <Link
            href="/about"
            className="hover:text-green-700 transition-colors"
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className="hover:text-green-700 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/connexion"
            className="px-5 py-3 bg-green-700 text-white rounded-full shadow hover:bg-green-800 transition"
          >
            Se connecter
          </Link>
        </nav>

        {/* bouton mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-green-800"
        >
          {open ? (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="transition"
            >
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="transition"
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* menu mobile */}
      {open && (
        <div className="md:hidden bg-secondary-50 border-t shadow-inner animate-slideDown">
          <div className="px-6 py-4 flex flex-col gap-4 font-medium">
            <Link href="/products" className="hover:text-green-700">
              Produits
            </Link>
            <Link href="/shop" className="hover:text-green-700">
              Boutique
            </Link>
            <Link href="/blog" className="hover:text-green-700">
              Actualités
            </Link>
            <Link href="/about" className="hover:text-green-700">
              À propos
            </Link>
            <Link href="/contact" className="hover:text-green-700">
              Contact
            </Link>
            <Link
              href="/connexion"
              className="px-4 py-2 bg-green-700 text-white rounded-full shadow hover:bg-green-800 transition"
            >
              Se connecter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
