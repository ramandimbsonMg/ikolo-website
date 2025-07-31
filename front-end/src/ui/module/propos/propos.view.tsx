import React, { useState } from "react";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-systeme/typography/typography";
import Image from "next/image";
import { Box } from "@/ui/design-systeme/box/box";
import { Logo } from "@/ui/design-systeme/logo/logo";
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

interface Information {
  nom: string;
  prenom: string;
  avatar: string;
  image: string;
  date_naissance: string;
  age: string;
  site_web: string;
  diplome: string;
  numero_phone: string;
  email: string;
  pays: string;
  freelance: string;
  description: string;
}

interface Languages {
  id: number;
  titre: string;
  description: string;
  progress: string;
  icon: React.ReactNode;
}

export const AProposView = () => {
  const [inform] = useState<Information[]>([
    {
      nom: "Ramandimbson",
      avatar: "assets/images/avatar/user-profile.jpg",
      prenom: "Espoir Matieu Albertin",
      date_naissance: "02 Février 2006",
      age: "19",
      site_web: "https://biizina.web.app/",
      diplome: "L3 en informatique",
      numero_phone: "+261 38 90 524 67",
      email: "ramandimbsonespoir@gmail.com",
      pays: "Malagasy",
      freelance: "Disponible",
      description:
        "Développeur web passionné, en quête de nouvelles opportunités.",
      image: "/assets/images/avatar/ramandimbson.jpg",
    },
  ]);

  const [experience] = useState<Languages[]>([
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
  ]);
  return (
    <Container className="lg:mt-6 px-6 max-w-[94em] mx-auto container space-y-4 mb-10 w-screen relative">
      <div className="text-center justify-center flex items-center mt-8">
        <Typography variant="display" theme="black" className="mt-28">
          À propos de moi
          <svg
            viewBox="0 0 200 20"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path
              d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            ></path>
          </svg>
        </Typography>
      </div>
      <Typography
        weight="medium"
        className="text-center max-w-3xl mx-auto pb-16"
      >
        Je suis un jeune développeur passionné par la création d’applications
        utiles et modernes. J’ai acquis des compétences en HTML, CSS, Tailwind
        CSS, JavaScript, React, Next.js et Django, Laravel. Je me forme
        également sur l’ERP Odoo pour la création de modules personnalisés.
      </Typography>
      <div className="lg:grid-cols-12 lg:grid">
        <div className="lg:col-span-6 lg:h-[40em] rounded-b-lg lg:overflow-hidden">
          <Image
            src="assets/images/avatar/ramandimbson.jpg"
            alt=""
            width={500}
            height={500}
            className="z-40 object-cover shadow-xl rounded-lg"
          />
        </div>
        <div className="lg:col-span-6 pt-10 space-y-4">
          <Typography theme="secondary">Sur moi</Typography>
          <Typography variant="xlarge" theme="black">
            Développeur Web
          </Typography>
          {inform.map((info) => (
            <Typography>{info.description}</Typography>
          ))}
          <Typography variant="small" className="font-[600]" theme="black">
            L3 en Ingénierie informatique
          </Typography>
          <Box>
            {inform.map((info) => (
              <div className="grid-cols-12 grid space-y-4">
                <div className="col-span-6">
                  <Typography variant="semimedium">Nom</Typography>
                  <Typography
                    variant="semimedium"
                    theme="black"
                    className="font-[600]"
                    component="h4"
                  >
                    {info.nom} {info.prenom}
                  </Typography>
                </div>
                <div className="col-span-6">
                  <Typography variant="semimedium">Tél</Typography>
                  <Typography
                    variant="semimedium"
                    theme="black"
                    className="font-[600]"
                    component="h4"
                  >
                    {info.numero_phone}
                  </Typography>
                </div>
                <div className="col-span-6">
                  <Typography variant="semimedium">Age</Typography>
                  <Typography
                    variant="semimedium"
                    theme="black"
                    className="font-[600]"
                    component="h4"
                  >
                    {info.age} Ans
                  </Typography>
                </div>
                <div className="col-span-6">
                  <Typography variant="semimedium">Email</Typography>
                  <Typography
                    variant="semimedium"
                    theme="black"
                    className="font-[600]"
                    component="h4"
                  >
                    {info.email}
                  </Typography>
                </div>
                <div className="col-span-6">
                  <Typography variant="semimedium">Freelance</Typography>
                  <Typography
                    variant="semimedium"
                    theme="black"
                    className="font-[600]"
                    component="h4"
                  >
                    {info.freelance}
                  </Typography>
                </div>
                <div className="col-span-6">
                  <Typography variant="semimedium">Nationalité</Typography>
                  <Typography
                    variant="semimedium"
                    theme="black"
                    className="font-[600]"
                    component="h4"
                  >
                    {info.pays}
                  </Typography>
                </div>
              </div>
            ))}
          </Box>
          {inform.map((info) => (
            <div className="items-center flex gap-6">
              <Logo />
              {/* <Typography theme="black" className="text-center font-[600]">
                {info.prenom}
              </Typography> */}
            </div>
          ))}
        </div>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 pt-10">
        {experience.map((exper) => (
          <Box className="transition-all text-center" key={exper.id}>
            <div className="space-y-3">
              {exper.icon}
              <Typography theme="black" className="font-[700] mt-2">
                {exper.titre}
              </Typography>
              <Typography variant="semimedium">{exper.description}</Typography>
              {/* <div className="flex items-center gap-3">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-500"
                    style={{ width: exper.progress }}
                  ></div>
                </div>
                <Typography variant="semimedium">{exper.progress}</Typography>
              </div> */}
            </div>
          </Box>
        ))}
      </div>
    </Container>
  );
};
