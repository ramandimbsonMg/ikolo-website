"use client";

import { useRouter } from "next/navigation";

interface MenuItem {
  name: string;
  key: string;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", key: "" },
  { name: "Produits", key: "products" },
  { name: "Catégories", key: "categories" },
  { name: "Blog", key: "blog" },
  { name: "Newsletter", key: "newsletter" },
];

export default function AdminSidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-white shadow-md border-r border-gray-200 flex flex-col">
      <div className="p-6 text-2xl font-bold text-cyan-600">Ikolo Admin</div>
      <nav className="mt-6 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => router.push(`/admin/${item.key}`)}
            className="w-full text-left px-6 py-3 hover:bg-cyan-50 text-gray-700 font-medium rounded-lg transition mb-1"
          >
            {item.name}
          </button>
        ))}
      </nav>
      <div className="p-6">
        <button
          onClick={() => {
            localStorage.clear();
            router.replace("/connexion");
          }}
          className="w-full px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
        >
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
