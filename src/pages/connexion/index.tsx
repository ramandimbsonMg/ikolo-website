"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Seo } from "@/ui/components/seo/seo";
import { Layout } from "@/ui/components/layout/layout";
import { ContainerContenu } from "@/ui/components/container/container";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (token && user?.role) {
      if (user.role === "admin") router.replace("/admin/dashboard");
      else router.replace("/");
    } else setLoading(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint =
      mode === "login" ? "/api/auth/login" : "/api/auth/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          ...(mode === "register" && { name }),
        }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success(
          mode === "login"
            ? "Connexion réussie !"
            : "Inscription réussie ! Connectez-vous"
        );

        if (mode === "login") {
          router.push(data.user.role === "admin" ? "/admin" : "/");
        } else setMode("login");
      } else {
        toast.error(data.error || "Une erreur est survenue");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur, réessayez plus tard");
    }
  };

  if (loading) return null;

  return (
    <>
      <Seo title="Ikolo | Auth" description="Connexion et inscription" />
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50">
        <Layout isDisplayBreakCrumbs={false}>
          <div className="min-h-screen flex items-center justify-center">
            <ContainerContenu>
              <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-primary mb-6">
                  {mode === "login" ? "Connexion" : "Inscription"}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "register" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nom
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      placeholder="exemple@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="********"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                      >
                        {showPassword ? (
                          <FiEyeOff size={20} />
                        ) : (
                          <FiEye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition"
                  >
                    {mode === "login" ? "Se connecter" : "S'inscrire"}
                  </button>
                </form>

                <p
                  className="mt-4 text-center text-sm text-gray-600 cursor-pointer hover:text-primary transition"
                  onClick={() =>
                    setMode(mode === "login" ? "register" : "login")
                  }
                >
                  {mode === "login"
                    ? "Pas encore de compte ? Créez-en un"
                    : "Déjà inscrit ? Connectez-vous"}
                </p>
              </div>
            </ContainerContenu>
          </div>
        </Layout>
      </div>
    </>
  );
}
