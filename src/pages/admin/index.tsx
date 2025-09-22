"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Seo } from "@/ui/components/seo/seo";
import { Layout } from "@/ui/components/layout/layout";
import AdminSidebar from "@/ui/components/sidebar/admin-sidebar";
import AdminChart from "@/ui/components/admin/admin-chart";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.replace("/connexion");

    fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (!data.user || data.user.role !== "admin") router.replace("/");
        else setUser(data.user);
      });
  }, [router]);

  if (!user) return <div>Chargement...</div>;

  const menuItems = [
    { name: "Produits", key: "products" },
    { name: "Catégories", key: "categories" },
    { name: "Blog", key: "blog" },
    { name: "Newsletter", key: "newsletter" },
  ];

  return (
    <>
      <Seo title="Admin | Ikolo" description="Dashboard administrateur" />
      {/* <Layout isDisplayBreakCrumbs={false}> */}
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Contenu principal */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            👋 Bienvenue {user.name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.key}
                className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => router.push(`/admin/${item.key}`)}
              >
                <h2 className="font-bold mb-2 text-gray-800">{item.name}</h2>
                <p className="text-gray-500 text-sm">
                  Gérer et ajouter {item.name.toLowerCase()}
                </p>
              </div>
            ))}
          </div>
          {/* Chart */}
          <div className="mb-6 mt-4">
            <AdminChart />
          </div>{" "}
        </main>
      </div>
      {/* </Layout> */}
    </>
  );
}
