import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
  FaLaravel,
  FaBootstrap,
  FaReact,
  FaPhp,
  FaDatabase,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import { SiAdobe } from "react-icons/si";

import {
  SiTailwindcss,
  SiNextdotjs,
  SiDjango,
  SiMysql,
  SiPostgresql,
  SiXml,
} from "react-icons/si";
import type { ReactNode } from "react";

export interface Languages {
  id: number;
  titre: string;
  description: string;
  progress: string;
  icon: ReactNode;
}

export const competence: Languages[] = [
 {
      id: 1,
      titre: "HTML",
      description: "Langage de balisage utilisé pour structurer les pages web.",
      progress: "90%",
      icon: <FaHtml5 className="text-4xl text-orange-600 mx-auto" />,
    },
    {
      id: 2,
      titre: "CSS",
      description: "Langage de style pour la mise en forme des pages HTML.",
      progress: "90%",
      icon: <FaCss3Alt className="text-4xl text-blue-600 mx-auto" />,
    },
    {
      id: 3,
      titre: "JavaScript",
      description: "Langage de script pour rendre les pages web interactives.",
      progress: "80%",
      icon: <FaJs className="text-4xl text-yellow-400 mx-auto" />,
    },
    {
      id: 4,
      titre: "Python",
      description: "Langage polyvalent utilisé dans de nombreux domaines.",
      progress: "65%",
      icon: <FaPython className="text-4xl text-blue-500 mx-auto" />,
    },
    {
      id: 5,
      titre: "Django Rest Framework",
      description: "Framework pour créer des API REST avec Django.",
      progress: "70%",
      icon: <SiDjango className="text-4xl text-green-800 mx-auto" />,
    },
    {
      id: 6,
      titre: "Laravel",
      description: "Framework PHP robuste pour le développement web.",
      progress: "70%",
      icon: <FaLaravel className="text-4xl text-red-600 mx-auto" />,
    },
    {
      id: 7,
      titre: "Tailwind & Bootstrap",
      description: "Frameworks CSS pour le design rapide et responsive.",
      progress: "85%",
      icon: (
        <div className="flex justify-center gap-2">
          <SiTailwindcss className="text-3xl text-cyan-500" />
          <FaBootstrap className="text-3xl text-purple-700" />
        </div>
      ),
    },
    {
      id: 8,
      titre: "Next.js",
      description: "Framework React pour le SSR et la génération statique.",
      progress: "75%",
      icon: <SiNextdotjs className="text-4xl mx-auto" />,
    },
    {
      id: 9,
      titre: "React",
      description:
        "Bibliothèque JavaScript pour construire des interfaces utilisateur interactives.",
      progress: "75%",
      icon: <FaReact className="text-4xl text-cyan-500 mx-auto" />,
    },
    {
      id: 10,
      titre: "XML",
      description:
        "Langage de balisage pour le stockage et transfert de données.",
      progress: "60%",
      icon: <SiXml className="text-4xl text-gray-600 mx-auto" />,
    },
    {
      id: 11,
      titre: "PHP 8.1",
      description: "Langage de script côté serveur pour le web dynamique.",
      progress: "70%",
      icon: <FaPhp className="text-4xl text-indigo-700 mx-auto" />,
    },
    {
      id: 12,
      titre: "PostgreSQL & MySQL",
      description: "Bases de données relationnelles puissantes et fiables.",
      progress: "75%",
      icon: (
        <div className="flex justify-center gap-2">
          <SiPostgresql className="text-3xl text-blue-800" />
          <SiMysql className="text-3xl text-sky-600" />
        </div>
      ),
    },
    {
      id: 13,
      titre: "GitHub",
      description: "Plateforme de versioning et de collaboration sur Git.",
      progress: "85%",
      icon: <FaGithub className="text-4xl mx-auto" />,
    },
    {
      id: 14,
      titre: "Figma",
      description: "Outil collaboratif pour design UI/UX et prototypage.",
      progress: "60%",
      icon: <FaFigma className="text-4xl text-pink-500 mx-auto" />,
    },
    {
      id: 15,
      titre: "Photoshop & Illustrator",
      description: "Outils de création graphique pour l'image et le vectoriel.",
      progress: "65%",
      icon: <SiAdobe className="text-4xl text-red-500 mx-auto" />,
    },
];
