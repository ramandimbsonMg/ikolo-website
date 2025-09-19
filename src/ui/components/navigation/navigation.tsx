"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineGlobal,
  AiOutlineSearch,
} from "react-icons/ai";
 
const navItems = [
  { name: "Accueil", path: "/" },
  { name: "À propos", path: "about" },
  { name: "Projets", path: "projets" },
  { name: "Mangroves", path: "mangroves" },
  { name: "Forêts", path: "forets" },
  { name: "Santé & Humanitaire", path: "sante-humanitaire" },
  { name: "Actualités", path: "actualites" },
  { name: "Événements", path: "evenements" },
  { name: "Galerie", path: "galerie" },
  { name: "Soutenir", path: "soutenir" },
  { name: "Contact", path: "contact" },
  { name: "Mentions légales", path: "mentions-legales" },
];

export default function Navigation() {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [openResources, setOpenResources] = useState(false);
  const [lang, setLang] = useState("FR");
  const [showMiniNavbar, setShowMiniNavbar] = useState(true);

  const pathname = usePathname();

  // Détecter scroll pour mini-navbar
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowMiniNavbar(false);
      } else {
        setShowMiniNavbar(true);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer menu mobile au resize desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenMobileNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mini-navbar */}
      <AnimatePresence>
        {showMiniNavbar && (
          <motion.div
            className="bg-[#faf6f6] py-1 px-28 flex justify-end sticky top-0 z-50"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex gap-2 items-center">
              <AiOutlineGlobal className="h-6 w-6" />
              <button
                onClick={() => setLang("FR")}
                className={`px-2 py-1 rounded text-sm transition ${
                  lang === "FR" ? "text-green-500" : "hover:text-gray-600"
                }`}
              >
                Français
              </button>
              <span className="border-t border h-4 mt-1.5"></span>
              <button
                onClick={() => setLang("EN")}
                className={`px-2 py-1 rounded text-sm transition ${
                  lang === "EN" ? "text-green-500" : "hover:text-gray-600"
                }`}
              >
                English
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grande Navbar */}
      <nav className="sticky top-0 z-50 bg-[#faf6f6]">
        <div className="max-w-7xl mx-auto h-20 flex justify-between items-center px-4 lg:px-0">
          {/* Logo */}
          <Link href="/" className="w-20 h-20 flex items-center">
            <img src="/assets/images/logo/logo_ong.png" alt="logo ong" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className={`py-2 px-4 rounded text-xl transition ${
                pathname === "/" ? "text-green-500" : "hover:text-green-500"
              }`}
            >
              {lang === "FR" ? "Qui sommes-nous ?" : "What we do?"}
            </Link>
            <Link
              href="/contact"
              className={`py-2 px-4 rounded text-xl transition ${
                pathname === "/contact"
                  ? "text-green-500"
                  : "hover:text-green-500"
              }`}
            >
              {lang === "FR" ? "Contact" : "Contact"}
            </Link>
            <button className="p-3 text-green-500 hover:text-green-700 bg-white shadow-sm rounded hover:bg-green-500">
              <AiOutlineSearch className="h-6 w-6" />
            </button>

            {/* MENU Button */}
            <button
              onClick={() => setOpenResources(!openResources)}
              className="rounded text-xl flex items-center gap-2"
            >
              {openResources ? (
                <span className="flex items-center gap-2 border border-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-500 hover:text-white transition hover:font-bold">
                  <AiOutlineClose className="h-6 w-6" />
                </span>
              ) : (
                <span className="flex items-center gap-2 border border-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-500 hover:text-white transition hover:font-bold">
                  <AiOutlineMenu className="h-6 w-6" />
                  MENU
                </span>
              )}
            </button>
          </div>

          {/* Mobile Button */}
          <button
            className="lg:hidden text-green-500 hover:text-green-700"
            onClick={() => setOpenMobileNav(!openMobileNav)}
          >
            {openMobileNav ? (
              <AiOutlineClose className="h-6 w-6" />
            ) : (
              <AiOutlineMenu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {openMobileNav && (
          <div className="lg:hidden mt-2 flex flex-col gap-2 bg-[#faf6f6] p-4 rounded">
            <button
              onClick={() => setOpenResources(true)}
              className="text-black font-medium py-2 px-4 hover:bg-white/10 rounded text-left"
            >
              {lang === "FR" ? "Ressources" : "Resources"}
            </button>
            <Link
              href="/contact"
              className={`font-medium py-2 px-4 rounded transition ${
                pathname === "/contact"
                  ? "text-green-500 font-semibold"
                  : "text-black hover:text-green-500"
              }`}
            >
              {lang === "FR" ? "Contact" : "Contact"}
            </Link>
          </div>
        )}

        {/* Fullscreen Resources Menu */}
        <AnimatePresence>
          {openResources && (
            <motion.div
              className="fixed inset-0 bg-[#faf6f6] z-50 h-screen mt-28"
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="mx-auto max-w-7xl mt-14 px-4 lg:px-0">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8">
                    <h1 className="text-6xl">Navigation</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mt-10">
                      {navItems.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex flex-col items-start"
                        >
                          <Link
                            href={item.path}
                            onClick={() => setOpenResources(false)}
                            className={`text-xl font-semibold transition ${
                              pathname === item.path
                                ? "text-green-500"
                                : "text-black hover:text-green-500"
                            }`}
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-600 mt-1">
                            Découvrez plus sur {item.name.toLowerCase()}.
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-4">
                    <h1 className="text-6xl">À la une</h1>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-12 border-t border-gray-300 w-full pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                  <span>
                    © {new Date().getFullYear()} ONG MG. Tous droits réservés.
                  </span>
                  <div className="flex gap-6 mt-2 sm:mt-0">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <img
                        src="/icons/facebook.svg"
                        alt="Facebook"
                        className="w-6 h-6 hover:scale-110 transition"
                      />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <img
                        src="/icons/instagram.svg"
                        alt="Instagram"
                        className="w-6 h-6 hover:scale-110 transition"
                      />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <img
                        src="/icons/twitter.svg"
                        alt="Twitter"
                        className="w-6 h-6 hover:scale-110 transition"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
