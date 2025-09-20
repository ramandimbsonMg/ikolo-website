"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/ui/components/sidebar/sidebar";
import { Typography } from "@/ui/design-systeme/typography/typography";
import { Box } from "@/ui/design-systeme/box/box";

type Student = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  programme: string;
  matieres: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/student")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Chargement des étudiants...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen md:ml-60">
        <Typography variant="xlarge" weight="bold" className="mb-6">
          👩‍🎓 Liste des Étudiants
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((s) => (
            <Box
              key={s.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
            >
              <Typography variant="medium" weight="bold" className="mb-2">
                {s.nom} {s.prenom}
              </Typography>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {s.email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Programme:</span> {s.programme}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Matières:</span> {s.matieres}
              </p>
            </Box>
          ))}
        </div>
      </main>
    </div>
  );
}
