"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "@/ui/components/sidebar/sidebar";
import { Box } from "@/ui/design-systeme/box/box";
import { Typography } from "@/ui/design-systeme/typography/typography";

type Student = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  programme: string;
  matieres: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem("token");

  // Si pas de token, redirection directe vers "/"
  if (!token) {
    router.push("/");
    return;
  }
 
  fetch("/api/student", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erreur API");
      return res.json();
    })
    .then((data) => {
      setStudents(data);
      setLoading(false);
    })
    .catch(() => {
      // En cas d'erreur (ex: token invalide), redirige directement vers "/"
      router.push("/");
    });
}, [router]);


  if (loading)
    return <p className="p-4 text-gray-500">Chargement des étudiants...</p>;

  const chartData = Object.values(
    students.reduce((acc: any, s) => {
      acc[s.programme] = acc[s.programme] || {
        programme: s.programme,
        count: 0,
      };
      acc[s.programme].count++;
      return acc;
    }, {})
  );

  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-screen text-white flex flex-col z-40 transform transition-transform duration-300">
      <Sidebar />
      </div>
      <main className="flex-1 p-6 bg-gray-50 min-h-screen md:ml-60">
        <Typography variant="xlarge" weight="bold" className="mb-6 lg:mx-0 mx-10">
          Dashboard Étudiants
        </Typography>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Box className="bg-white shadow-xl rounded-xl p-6 text-center">
            <Typography variant="large" weight="medium">
              Total Étudiants
            </Typography>
            <p className="text-3xl font-bold text-blue-600">
              {students.length}
            </p>
          </Box>
          <Box className="bg-white shadow-xl rounded-xl p-6 text-center">
            <Typography variant="large" weight="medium">
              Programmes
            </Typography>
            <p className="text-3xl font-bold text-green-600">
              {new Set(students.map((s) => s.programme)).size}
            </p>
          </Box>
          <Box className="bg-white shadow-xl rounded-xl p-6 text-center">
            <Typography variant="large" weight="medium">
              Matières suivies
            </Typography>
            <p className="text-3xl font-bold text-purple-600">
              {new Set(students.map((s) => s.matieres)).size}
            </p>
          </Box>
        </div>

        {/* Graphique */}
        <Box className="bg-white shadow-xl rounded-xl p-6 mb-6">
          <Typography
            variant="large"
            weight="medium"
            className="mb-4 text-gray-800"
          >
            Répartition par programme
          </Typography>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="programme"
                stroke="#4b5563"
                tick={{ fontSize: 14 }}
              />
              <YAxis stroke="#4b5563" tick={{ fontSize: 14 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  borderRadius: 8,
                  border: "none",
                }}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Bar
                dataKey="count"
                fill="#3b82f6"
                radius={[10, 10, 0, 0]}
                barSize={40}
                animationDuration={1500}
                label={{ position: "top", fill: "#111827", fontWeight: "bold" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Liste des étudiants */}
        <Box className="bg-white shadow-xl rounded-xl p-6">
          <Typography variant="large" weight="medium" className="mb-4">
            Liste des étudiants
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((s) => (
              <Box
                key={s.id}
                className="bg-cyan-50 rounded-xl p-4 shadow hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <Typography
                  variant="medium"
                  weight="bold"
                  className="text-cyan-800 mb-2"
                >
                  {s.nom} {s.prenom}
                </Typography>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Email:</span> {s.email}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Programme:</span>{" "}
                  {s.programme}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Matières:</span> {s.matieres}
                </p>
              </Box>
            ))}
          </div>
        </Box>
      </main>
    </div>
  );
}
