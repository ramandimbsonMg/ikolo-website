"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/ui/components/layout/layout";
import { ContainerContenu } from "@/ui/components/container/container";
import { Seo } from "@/ui/components/seo/seo";
import Image from "next/image";
import toast from "react-hot-toast";

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
}

export default function ProfilPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/connexion");
        return;
      }

      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          toast.error("Session expirée, reconnectez-vous");
          router.push("/connexion");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        toast.error("Impossible de récupérer vos informations");
        router.push("/connexion");
      }
    };

    fetchUser();
  }, [router]);

  if (!user) return null;

  return (
    <>
      <Seo title="Profil | Ikolo" description="Votre profil utilisateur" />
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen">
        <Layout isDisplayBreakCrumbs={true}>
          <ContainerContenu>
            <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 mt-10">
              {/* Header profil */}
              <div className="flex items-center gap-6 mb-6">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={100}
                    height={100}
                    className="rounded-full object-cover border-4 border-green-700"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-green-700 flex items-center justify-center text-white text-4xl font-bold border-4 border-green-700">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-primary">
                    {user.name}
                  </h1>
                  <p className="text-gray-700">{user.email}</p>
                </div>
              </div>

              {/* Info supplémentaires */}
              <div className="mt-6 space-y-3">
                <div className="flex gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-gray-700">Nom :</span>
                  <span className="text-gray-900">{user.name}</span>
                </div>
                <div className="flex gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-gray-700">Email :</span>
                  <span className="text-gray-900">{user.email}</span>
                </div>
              </div>

              {/* Bouton déconnexion */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    router.push("/connexion");
                  }}
                  className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </ContainerContenu>
        </Layout>
      </div>
    </>
  );
}
