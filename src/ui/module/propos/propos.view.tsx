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

import { competence } from "@/data/competence";
import { informations } from "@/data/informations";

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

interface Props {
  className?: string;
  isTransparent?: boolean;
}
export const AProposView = ({ className, isTransparent = false }: Props) => {
  const textColorClass = isTransparent ? "text-white" : "text-black";

  const [inform] = useState(informations);

  const [compet] = useState(competence);

  return (
    <Container className="lg:mt-6 px-3 lg:px-6 max-w-[94em] mx-auto container space-y-4 lg:mb-10 mb-4 w-screen relative">
      <div className="text-center justify-center flex items-center lg:mt-6">
        <Typography variant="display" theme="black" className="lg:mt-20 mt-6">
          À propos
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
        className="text-center max-w-3xl mx-auto lg:pb-12 pb-4"
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
                <div className="lg:col-span-6 text-center lg:text-start col-span-12 space-y-2">
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
                <div className="col-span-6 text-center lg:text-start space-y-2">
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
                <div className="col-span-6 text-center lg:text-start space-y-2">
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
                <div className="col-span-6 text-center lg:text-start space-y-2">
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
                <div className="col-span-6 text-center lg:text-start space-y-2">
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
                <div className=" lg:col-span-6 text-center lg:text-start col-span-12 space-y-2">
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
      <div className="text-center relative lg:pt-20 mt-6">
        <Typography variant="display" theme="black">
          Mes Compétences
        </Typography>
        <svg
          viewBox="0 0 200 20"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary w-80 mx-auto"
        >
          <path
            d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 pt-10">
        {competence.map((compet) => (
          <Box className="transition-all text-center" key={compet.id}>
            <div className="space-y-3">
              {compet.icon}
              <Typography theme="black" className="font-[700] mt-2">
                {compet.titre}
              </Typography>
              <Typography variant="semimedium">{compet.description}</Typography>
              {/* <div className="flex items-center gap-3">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-500"
                    style={{ width: compet.progress }}
                  ></div>
                </div>
                <Typography variant="semimedium">{compet.progress}</Typography>
              </div> */}
            </div>
          </Box>
        ))}
      </div>
    </Container>
  );
};
