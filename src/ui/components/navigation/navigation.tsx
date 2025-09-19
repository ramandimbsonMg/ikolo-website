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
import { useLanguage } from "@/context/language-context";

// ✅ Items avec texte FR/EN
const navItems = [
  { nameFR: "Accueil", nameEN: "Home", path: "/" },
  { nameFR: "À propos", nameEN: "About", path: "/about" },
  { nameFR: "Projets", nameEN: "Projects", path: "/projets" },
  { nameFR: "Mangroves", nameEN: "Mangroves", path: "/mangroves" },
  { nameFR: "Forêts", nameEN: "Forests", path: "/forets" },
  {
    nameFR: "Santé & Humanitaire",
    nameEN: "Health & Humanitarian",
    path: "/sante-humanitaire",
  },
  { nameFR: "Actualités", nameEN: "News", path: "/actualites" },
  { nameFR: "Événements", nameEN: "Events", path: "/evenements" },
  { nameFR: "Galerie", nameEN: "Gallery", path: "/galerie" },
  { nameFR: "Soutenir", nameEN: "Support", path: "/soutenir" },
  { nameFR: "Contact", nameEN: "Contact", path: "/contact" },
  {
    nameFR: "Mentions légales",
    nameEN: "Legal Notice",
    path: "/mentions-legales",
  },
];

export default function Navigation() {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [openResources, setOpenResources] = useState(false);
  const [showMiniNavbar, setShowMiniNavbar] = useState(true);
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();

  // Scroll avec seuil pour mini-navbar
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const delta = 50;
    const handleScroll = () => {
      if (window.scrollY - lastScrollY > delta) setShowMiniNavbar(false);
      else if (lastScrollY - window.scrollY > delta) setShowMiniNavbar(true);
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
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#faf6f6] py-1 px-8 flex justify-end sticky top-0 z-50"
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

      {/* Navbar principale */}
      <nav className="sticky top-0 z-50 bg-[#faf6f6] shadow-sm">
        <div className="max-w-7xl mx-auto h-20 flex justify-between items-center px-4 lg:px-0">
          {/* Logo */}
          <Link href="/" className="w-20 h-20 flex items-center">
            <img src="/assets/images/logo/logo_ong.png" alt="logo ong" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`py-2 px-4 rounded text-xl transition ${
                  pathname === item.path
                    ? "text-green-500"
                    : "hover:text-green-500"
                }`}
              >
                {lang === "FR" ? item.nameFR : item.nameEN}
              </Link>
            ))}

            <button className="p-3 text-green-500 hover:text-green-700 bg-white shadow-sm rounded hover:bg-green-500">
              <AiOutlineSearch className="h-6 w-6" />
            </button>

            {/* MENU Button */}
            <button
              onClick={() => setOpenResources(!openResources)}
              className="rounded text-xl flex items-center gap-2"
            >
              {openResources ? (
                <AiOutlineClose className="h-6 w-6 text-green-500" />
              ) : (
                <span className="flex items-center gap-2 text-green-500">
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
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setOpenMobileNav(false)}
                className={`font-medium py-2 px-4 rounded transition ${
                  pathname === item.path
                    ? "text-green-500 font-semibold"
                    : "text-black hover:text-green-500"
                }`}
              >
                {lang === "FR" ? item.nameFR : item.nameEN}
              </Link>
            ))}
          </div>
        )}

        {/* Fullscreen Resources Menu */}
        <AnimatePresence>
          {openResources && (
            <motion.div
              className="fixed inset-0 bg-[#faf6f6] z-50 h-screen mt-28 overflow-auto"
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="mx-auto max-w-7xl mt-14 px-4 lg:px-0">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8">
                    <h1 className="text-4xl font-bold mb-6">
                      {lang === "FR" ? "Navigation" : "Navigation"}
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setOpenResources(false)}
                          className={`text-xl font-semibold transition ${
                            pathname === item.path
                              ? "text-green-500"
                              : "text-black hover:text-green-500"
                          }`}
                        >
                          {lang === "FR" ? item.nameFR : item.nameEN}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-4">
                    <h1 className="text-4xl font-bold mb-6">
                      {lang === "FR" ? "À la une" : "Featured"}
                    </h1>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-12 border-t border-gray-300 w-full pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                  <span>
                    © {new Date().getFullYear()} ONG MG.{" "}
                    {lang === "FR"
                      ? "Tous droits réservés."
                      : "All rights reserved."}
                  </span>
                  <div className="flex gap-4 mt-2 sm:mt-0">
                    <img
                      src="/icons/facebook.svg"
                      alt="Facebook"
                      className="w-6 h-6 hover:scale-110 transition"
                    />
                    <img
                      src="/icons/instagram.svg"
                      alt="Instagram"
                      className="w-6 h-6 hover:scale-110 transition"
                    />
                    <img
                      src="/icons/twitter.svg"
                      alt="Twitter"
                      className="w-6 h-6 hover:scale-110 transition"
                    />
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
