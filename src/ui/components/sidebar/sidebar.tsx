"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AiFillHome,
  AiOutlineUser,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineMail,
} from "react-icons/ai";

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/connexion/acs-zone");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "/", label: "Accueil", icon: <AiFillHome size={20} /> },
    {
      href: "/acs-zone/etudiant",
      label: "Étudiants",
      icon: <AiOutlineUser size={20} />,
    },
    // {
    //   href: "/stats",
    //   label: "Statistiques",
    //   icon: <AiOutlineBarChart size={20} />,
    // },
    {
      href: "/acs-zone/newsletter",
      label: "Newsletter",
      icon: <AiOutlineMail size={20} />,
    },
    {
      href: "/acs-zone/settings",
      label: "Paramètres",
      icon: <AiOutlineSetting size={20} />,
    },
  ];

  return (
    <>
      {/* Bouton hamburger pour mobile */}
      <button
        className="fixed top-4 left-4 z-50 text-gray-900 bg-white p-2 rounded-md shadow-md md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-60 bg-gray-900 text-white flex flex-col z-40 transform transition-transform duration-300
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:flex`}
      >
        {/* Titre */}
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          🎓 School Admin
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              {item.icon} {item.label}
            </Link>
          ))}

          {/* Bouton déconnexion */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-2 mt-6 rounded hover:bg-red-600 bg-red-500 text-white font-semibold"
          >
            <AiOutlineLogout size={20} /> Déconnexion
          </button>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          © 2025 ACS
        </div>
      </aside>

      {/* Overlay pour mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
