"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineBook, AiOutlineClose } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "@/ui/design-systeme/button/button";
import { ListProgram } from "@/data/list_program";
import toast from "react-hot-toast";

export const StudentRegisterModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // États pour le formulaire
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
    <>
      {/* Bouton ouverture */}
      <Button onClick={() => setIsOpen(true)} className="truncate">
        Inscrire un élève
      </Button>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Contenu */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-xl bg-white rounded-xl shadow-lg flex flex-col max-h-[85vh] overflow-hidden">
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
              <div className="flex items-center gap-3">
                <AiOutlineBook className="text-2xl text-indigo-500 w-10 h-10" />
                <div>
                  <Dialog.Title className="text-lg md:text-xl font-bold text-primary">
                    Inscription élève
                  </Dialog.Title>
                  <p className="text-xs text-gray-600 mt-1">
                    Veuillez remplir le formulaire ci-dessous pour inscrire
                    votre enfant.
                  </p>
                </div>
              </div>
              {/* Bouton Fermer */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xl text-gray-500 hover:text-gray-800 transition"
              >
                <AiOutlineClose />
              </button>
            </div>

            {/* Formulaire scrollable */}
            <div className="overflow-y-auto p-4 flex-1">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                <input
                  type="text"
                  placeholder="Nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full px-3 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Prénom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full px-3 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <input
                  type="date"
                  value={naissance}
                  onChange={(e) => setNaissance(e.target.value)}
                  className="w-full px-3 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <select
                  value={sexe}
                  onChange={(e) => setSexe(e.target.value)}
                  className="w-full px-3 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500"
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
                  className="w-full px-3 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <PhoneInput
                  country={"mg"}
                  value={telephone}
                  onChange={(val) => setTelephone(val)}
                  placeholder="34 00 000 00"
                  containerClass="w-full"
                  inputClass="!pl-14 !pr-4 !py-2 !rounded-full !w-full !text-base !border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Adresse"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  className="w-full md:col-span-2 px-3 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <select
                  value={programme}
                  onChange={(e) => setProgramme(e.target.value)}
                  className="w-full px-3 py-2 h-10 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500"
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
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Anglais</option>
                  <option>Mathématiques</option>
                  <option>Sciences</option>
                  <option>Informatique</option>
                  <option>Bible</option>
                </select>

                {/* Footer avec boutons */}
                <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-32 bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Fermer
                  </button>
                  <Button type="submit">Enregistrer</Button>
                </div>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
