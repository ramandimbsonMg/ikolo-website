import React, { useState } from "react";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-systeme/typography/typography";

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

// InfoItem component
const InfoItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string;
  icon: React.ReactNode;
}) => (
  <Typography weight="medium" className="flex items-center gap-2">
    {icon}
    <span className="text-lg text-black font-medium">{label}:</span>
    {value}
  </Typography>
);

const Section = ({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) => (
  <div className="space-y-4 mt-6">
    <Typography variant="large" theme="black">
      {title}
      <hr className="w-28 border-2 border-primary" />
    </Typography>
    {children}
  </div>
);
export const ResumeView = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const fullDescription = `
    Je suis un passionné d'informatique, toujours curieux d'explorer de nouvelles technologies et de résoudre des défis complexes. Actuellement étudiant en informatique, je me spécialise dans le développement front-end et la création d'expériences utilisateurs fluides et intuitives. J'ai un fort intérêt pour l'innovation technologique et l'impact que le numérique peut avoir sur le monde.

    Mon parcours m'a permis d'acquérir une solide base en programmation, en développement web, ainsi qu'en design d'interface utilisateur. Je suis particulièrement attiré par les projets dynamiques et créatifs où je peux contribuer activement au sein d'une équipe. En parallèle de mes études, je cherche des opportunités pour mettre en pratique mes compétences et apprendre davantage dans un environnement stimulant.

    Je suis également intéressé par le travail en freelance, où je peux apporter mes idées tout en collaborant avec divers clients pour créer des solutions sur mesure adaptées à leurs besoins. En dehors du développement, j'aime explorer les domaines de l'intelligence artificielle et du design UX/UI, des domaines qui me passionnent particulièrement.
  `;
  const shortDescription =
    fullDescription.split("\n")[0] + " " + fullDescription.split("\n")[1];
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
      pays: "Madagascar",
      freelance: "Disponible",
      description:
        "Découverte du monde professionnel à travers des missions concrètes.",
      image: "/assets/images/avatar/ramandimbson.jpg",
    },
  ]);

  interface Languages {
    id: number;
    titre: string;
    tache: string;
    des1: string;
    des2: string;
    des3: string;
    des4: string;
    des5: string;
    des6: string;
    description: string;
    date: string;
  }

  const [experience] = useState<Languages[]>([
    {
      id: 1,
      titre: "American Christian School (ACS)",
      tache: "Développeur Full-stack",
      des1: "Développement d’un système automatisé de gestion des paiements pour les élèves et les enseignants, utilisant des technologies modernes.",
      des2: "Création d’un site vitrine dynamique en Laravel, adapté aux besoins des étudiants anglophones de l’American School.",
      des3: "Contribution au développement du site web Global Study pour l’Université GSI, en assurant une interface claire et professionnelle.",
      des4: "",
      des5: "",
      des6: "",
      description:
        "Développement web complet (Laravel, UI/UX, automatisation) pour des projets éducatifs et institutionnels.",
      date: "Février 2024, Mai 2025",
    },
    {
      id: 2,
      titre: "Chez Mtechiix",
      tache: "Stagiaire Développeur Odoo / Django",
      des1: "Conception d'interfaces utilisateur et développement de modules personnalisés sur Odoo (v16, v17).",
      des2: "Création de maquettes d’interfaces modernes et fonctionnelles sur Figma pour guider le développement frontend.",
      des3: "",
      des4: "",
      des5: "",
      des6: "",
      description:
        "Participation au développement d'applications métiers en Odoo et Django, avec une attention particulière portée sur l’ergonomie des interfaces (Figma) et la personnalisation fonctionnelle de modules.",
      date: "Février 2024 - Avril 2024",
    },
  ]);
  interface Etudes {
    id: number;
    nom: string;
    titre: string;
    description: string;
    date: string;
  }
const [etudes] = useState<Etudes[]>([
  {
    id: 1,
    titre: "Licence 3 – Informatique",
    description:
      "Parcours axé sur les bases de données, le développement logiciel, et la modélisation des systèmes informatiques.",
    date: "2023 – Présent",
    nom: "CNTEMAD (Centre National de Télé-Enseignement à Madagascar)",
  },
  {
    id: 2,
    titre: "Formation Développeur Web",
    description:
      "Approfondissement en Symfony, bonnes pratiques de développement, gestion de versions avec GitHub et conseils de carrière encadrés par des professionnels.",
    date: "2024",
    nom: "Developa (Centre de formation en technologies numériques – Antananarivo)",
  },
  {
    id: 3,
    titre: "Certificat en Développement Web",
    description:
      "Formation axée sur le développement web dynamique avec Vue.js, incluant des projets pratiques et des ateliers encadrés.",
    date: "2024",
    nom: "Orange Digital Center (Programme d’initiation au numérique – Antananarivo)",
  },
]);


  return (
    <Container className="mt-20 px-6  max-w-[94em] mx-auto container space-y-4 w-screen relative">
      <div className="text-center justify-center flex items-center">
        <Typography variant="display" theme="black" className="mt-28">
          Résumé
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
      <Typography weight="medium" className="text-center max-w-3xl mx-auto">
        Prêt à évoluer et à renforcer mes compétences techniques.
      </Typography>
      <div>
        <Typography variant="xlarge" theme="black" className="pt-16">
          Expérience professionnelle
        </Typography>
        {inform.map((info) => (
          <Typography>{info.description}</Typography>
        ))}
      </div>
      <div className="pt-10 space-y-8">
        {experience.map((exper, index) => (
          <div className="transition-all">
            <div key={index}>
              <div className="grid grid-cols-12">
                <div className="space-y-3 col-span-2">
                  <Typography theme="black" className="font-[700]">
                    {exper.titre}
                  </Typography>
                  <Typography variant="semimedium" theme="primary">
                    {exper.date}
                  </Typography>
                </div>
                <div className="col-span-1">
                  <div className="border rotate-90 border-primary-100"></div>
                  <div className="w-3 h-3 rounded-full bg-primary absolute mx-[41px] lg:block hidden"></div>
                </div>
                <div className="col-span-9 space-y-3">
                  <Typography theme="black" className="font-[700]">
                    {exper.tache}
                  </Typography>
                  {exper.description}
                  {[
                    exper.des1,
                    exper.des2,
                    exper.des3,
                    exper.des4,
                    exper.des5,
                    exper.des6,
                  ].some((desc) => desc.trim() !== "") && ( // Vérifie s'il y a au moins une donnée
                    <ul className="list-disc list-inside">
                      {[
                        exper.des1,
                        exper.des2,
                        exper.des3,
                        exper.des4,
                        exper.des5,
                        exper.des6,
                      ]
                        .filter((desc) => desc.trim() !== "") // Filtrer les valeurs vides
                        .map((desc, i) => (
                          <li
                            key={i}
                            className="space-y-2 font-[500] text-primary-900"
                          >
                            {desc}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Typography variant="xlarge" theme="black" className="pt-16">
          Mon éducation
        </Typography>
        {inform.map((info) => (
          <Typography>{info.description}</Typography>
        ))}
      </div>
      <div className="pt-10 space-y-8">
        {etudes.map((etud, index) => (
          <div className="transition-all">
            <div key={index}>
              <div className="grid grid-cols-12">
                <div className="space-y-3 col-span-2">
                  <Typography theme="black" className="font-[700]">
                    {etud.nom}
                  </Typography>
                  <Typography variant="semimedium" theme="primary">
                    {etud.date}
                  </Typography>
                </div>
                <div className="col-span-1">
                  <div className="border rotate-90 border-primary-100"></div>
                  <div className="w-3 h-3 rounded-full bg-primary absolute mx-[41px] lg:block hidden"></div>
                </div>
                <div className="col-span-9 space-y-3">
                  <Typography theme="black" className="font-[700]">
                    {etud.titre}
                  </Typography>
                  <Typography variant="small">{etud.description}</Typography>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
