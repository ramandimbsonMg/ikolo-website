"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ListProgram } from "@/data/list_program";
import { Button } from "@/ui/design-systeme/button/button";
import { Box } from "@/ui/design-systeme/box/box";
import toast from "react-hot-toast";

export const ProgramRegisterSidebar = () => {
  // Form states
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [naissance, setNaissance] = useState("");
  const [sexe, setSexe] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [programme, setProgramme] = useState("");
  const [matieres, setMatieres] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      nom,
      prenom,
      naissance,
      sexe,
      email,
      telephone,
      adresse,
      programme,
      matieres,
    };


    try {
      const res = await fetch("/api/student/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("✅ Élève inscrit avec succès !");
        setNom("");
        setPrenom("");
        setNaissance("");
        setSexe("");
        setEmail("");
        setTelephone("");
        setAdresse("");
        setProgramme(""); 
        setMatieres([]);
      } else {
        const errorData = await res.json();
        toast.error(`❌ Erreur : ${errorData.error}`);
      }
    } catch {
      toast.error("⚠️ Erreur réseau");
    }
  };

  return (
    <Box className="bg-white shadow-xl rounded-xl overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Inscrire un élève
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <input
          type="date"
          value={naissance}
          onChange={(e) => setNaissance(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <select
          value={sexe}
          onChange={(e) => setSexe(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">— Sexe —</option>
          <option value="Masculin">Masculin</option>
          <option value="Féminin">Féminin</option>
        </select>
        <input
          type="email"
          placeholder="Email du parent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <PhoneInput
          country="mg"
          value={telephone}
          onChange={(val) => setTelephone(val)}
          containerClass="w-full"
          inputClass="!w-full !rounded-md !border !pl-14 !pr-4 !py-2"
        />
        <input
          type="text"
          placeholder="Adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <select
          value={programme}
          onChange={(e) => setProgramme(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">— Programme —</option>
          {ListProgram.map((prog) => (
            <option key={prog.title} value={prog.title}>
              {prog.title} ({prog.age})
            </option>
          ))}
        </select>
        <select
          multiple
          value={matieres}
          onChange={(e) =>
            setMatieres(
              Array.from(e.target.selectedOptions, (opt) => opt.value)
            )
          }
          className="w-full px-3 py-2 border rounded-md"
        >
          <option>Anglais</option>
          <option>Mathématiques</option>
          <option>Sciences</option>
          <option>Informatique</option>
          <option>Bible</option>
        </select>

        <Button type="submit" className="w-full">
          Enregistrer
        </Button>
      </form>
    </Box>
  );
};
