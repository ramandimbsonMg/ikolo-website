"use client";

import { useState } from "react";
import Sidebar from "@/ui/components/sidebar/sidebar";
import { Typography } from "@/ui/design-systeme/typography/typography";
import { Box } from "@/ui/design-systeme/box/box";

export default function SettingsPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Vous devez être connecté.");
      return;
    }

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (error) {
      console.error(error);
      setMessage("Erreur serveur.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen md:ml-60">
        <Typography variant="xlarge" weight="bold" className="mb-6">
          ⚙️ Paramètres
        </Typography>

        <Box className="bg-white shadow-xl rounded-xl p-6 max-w-lg">
          <Typography variant="large" weight="medium" className="mb-4">
            Changer mon mot de passe
          </Typography>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <input
              type="password"
              placeholder="Ancien mot de passe"
              className="w-full border p-3 rounded-md"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              className="w-full border p-3 rounded-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Mettre à jour
            </button>
          </form>

          {message && <p className="mt-4 text-gray-700">{message}</p>}
        </Box>
      </main>
    </div>
  );
}
