"use client";
import { useEffect, useState } from "react";
import { X, Info } from "lucide-react"; // Icône info plus moderne
import { AiFillFilePdf } from "react-icons/ai";
import { Card } from "./card";

export default function PortfolioAlert() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const showAlert = () => {
      setShow(true);

      // Disparition automatique après 20 secondes
      timer = setTimeout(() => {
        setShow(false);
      }, 300000);
    };

    // Premier affichage
    showAlert();

    // Ensuite toutes les 15 minutes
    const interval = setInterval(() => {
      showAlert();
    }, 15 * 60 * 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-20 lg:right-10 z-[60] animate-slideIn border rounded shadow">
      <Card className="p-0 border-none border-primary">
        <div className="border-l-4 border-primary text-gray-800 rounded px-4 pt-1 pb-2 lg:w-[57vh] flex items-start gap-3 relative transition-all duration-300 hover:shadow-2xl">
          {/* Icône info colorée */}
          <Info className="lg:w-6 lg:h-6 w-4 h-4 text-primary mt-1" />

          {/* Contenu texte */}
          <div className="flex-1">
            <h3 className="font-bold text-primary-600 lg:text-base text-xs">
              Bienvenue 👋
            </h3>
            <p className="text-gray-700  dark:text-gray-300 lg:text-sm mt-1 text-xs leading-relaxed">
              Explorez mon portfolio pour découvrir mes{" "}
              <span className="font-semibold text-primary">projets</span>,
              <span className="font-semibold text-primary"> expériences</span>{" "}
              et
              <span className="font-semibold text-primary">
                {" "}
                télécharger mon CV
              </span>
              <span className="font-semibold text-primary">
                {" "}
                télécharger mon Lettre de motivation
              </span>
              .
            </p>
            <div className="flex justify-end gap-2">
              <a
                href="/assets/pdf/CV_Développeur_Ramandimbson_Espoir_Matieu_Albertin_.pdf"
                target="_blank"
                className="flex items-center gap-2 mt-2 text-sm lg:w-40 bg-primary font-bold text-white px-3 py-1 rounded-lg shadow hover:bg-cyan-600 transition"
              >
                <AiFillFilePdf className="text-red-400 w-4 h-4" /> Voir mon CV
              </a>
              <a
                href="/assets/pdf/Lettre_de_motivation_Ramandimbson_Espoir_Mathieu_A.pdf"
                target="_blank"
                className="flex items-center gap-2 mt-2 text-sm lg:w-40 border border-bg-primary font-bold dark:text-white px-3 py-1 rounded-lg shadow hover:bg-cyan-600 transition"
              >
                <AiFillFilePdf className="text-red-400 w-4 h-4" /> Voir mon LTR
              </a>
            </div>
          </div>

          {/* Bouton de fermeture */}
          <button
            onClick={() => setShow(false)}
            className="absolute top-2 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      </Card>
    </div>
  );
}
