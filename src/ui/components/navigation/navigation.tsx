"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/pages/api/cart/use-cart";
import { AiOutlineShoppingCart } from "react-icons/ai";

interface User {
  name: string;
  avatar?: string | null;
}

export default function Navigation() {
  const [open, setOpen] = useState(false); // menu mobile
  const [dropdown, setDropdown] = useState(false); // dropdown avatar
  const [user, setUser] = useState<User | null>(null); // vrai user
  const [scrolled, setScrolled] = useState(false); // état scroll
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart(); // compteur temps réel

  // scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 72) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Récupérer l'utilisateur depuis le backend
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser({ name: data.user.name, avatar: data.user.avatar || null });

      // Cache local
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, avatar: data.user.avatar || "" })
      );
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la récupération de l'utilisateur");
      setUser(null);
    }
  };

  // Au montage
  useEffect(() => {
    fetchUser();
  }, []);

  // classes des liens
  const linkClass = (href: string) =>
    pathname === href
      ? scrolled
        ? "text-white font-semibold border-b-2 border-white pb-1 h-[72px] pt-8"
        : "text-green-700 font-semibold border-b-2 border-green-700 pb-1 h-[72px] pt-8"
      : scrolled
      ? "hover:text-gray-200 transition-colors text-white"
      : "hover:text-green-700 transition-colors";

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/connexion");
  };

  return (
    <header
      className={`h-[80px] sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-green-800 shadow-md text-white"
          : "bg-secondary/10 backdrop-blur-lg shadow-md"
      }`}
    >
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/images/logo/logo_ikolo~2.png"
            alt="Ikolo"
            width={70}
            height={70}
            className="rounded-full object-cover"
          />
        </Link>

        {/* menu desktop */}
        <nav className="hidden md:flex gap-8 items-center font-medium">
          <Link href="/" className={linkClass("/")}>
            Actualités
          </Link>
          <Link href="/about" className={linkClass("/about")}>
            À propos
          </Link>
          <Link href="/products" className={linkClass("/products")}>
            Produits
          </Link>
          <Link href="/shop" className={linkClass("/shop")}>
            <div className="relative">
              Boutique
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
          <Link href="/blog" className={linkClass("/blog")}>
            Blog
          </Link>
          <Link href="/contact" className={linkClass("/contact")}>
            Contact
          </Link>

          {/* Avatar / Connexion */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="w-14 h-14 flex text-4xl items-center justify-center bg-green-700 text-white rounded-full font-bold shadow"
              >
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-2 w-40 pt-4 pb-4 bg-white shadow-lg rounded border overflow-hidden z-50">
                  <Link
                    href="/profil"
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50"
                  >
                    Mon profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/connexion"
              className={`px-5 py-3 rounded-full shadow transition ${
                pathname === "/connexion"
                  ? "bg-green-800 text-white"
                  : scrolled
                  ? "bg-white text-green-800 hover:bg-gray-200"
                  : "bg-green-700 text-white hover:bg-green-800"
              }`}
            >
              Se connecter
            </Link>
          )}
        </nav>

        {/* bouton mobile */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden ${scrolled ? "text-white" : "text-green-800"}`}
        >
          {open ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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
        <div className="md:hidden bg-white border-t shadow-inner animate-slideDown">
          <div className="px-6 py-4 flex flex-col gap-4 font-medium">
            <Link href="/" className={linkClass("/")}>
              Actualités
            </Link>
            <Link href="/about" className={linkClass("/about")}>
              À propos
            </Link>
            <Link href="/products" className={linkClass("/products")}>
              Produits
            </Link>
            <Link href="/shop" className={linkClass("/shop")}>
              <div className="relative">
                <AiOutlineShoppingCart size={28} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
            <Link href="/blog" className={linkClass("/blog")}>
              Blog
            </Link>
            <Link href="/contact" className={linkClass("/contact")}>
              Contact
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="w-10 h-10 flex items-center justify-center bg-green-700 text-white rounded-full font-bold shadow"
                >
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </button>

                {dropdown && (
                  <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg border overflow-hidden z-50">
                    <Link
                      href="/profil"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50"
                    >
                      Mon profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/connexion"
                className={`px-4 py-2 rounded-full shadow transition ${
                  pathname === "/connexion"
                    ? "bg-green-800 text-white"
                    : "bg-green-700 text-white hover:bg-green-800"
                }`}
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
