import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/design-systeme/typography/typography"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import { AiOutlineCheckCircle, AiOutlineLink } from "react-icons/ai"
import { FaBriefcase } from "react-icons/fa"

interface Competence {
    id: number;
    titre: string;
    nom_entreprise: string;
    location: string;
    date: string;
    liens_entreprise: string;
    description: string;
}

export const EducationView = () => {
    const [competences] = useState<Competence[]>([
        {
            id: 1,
            titre: "Etudiant",
            nom_entreprise: "CNTEMAD (Centre National de télé-enseignement à Madagascar)",
            location: "Ihosy - Andrefatsena - Madagascar",
            date: "04 janvier 2023",
            liens_entreprise: "https://www.cntemad.com/",
            description: "BDGL(base de donnée et Génie Logiciel) Etudiant en Informatique",
        },
        {
            id: 2,
            titre: "Formation développeur web Vue.js",
            nom_entreprise: "Chez Orange digital Center",
            location: "Antananarivo - gars Soaranao Madagascar",
            date: "10 Octobre 2024",
            liens_entreprise: "https://www.orangedigitalcenters.com/",
            description: "Développement web utilise technologie web Vue.js, a fin de formation on obtient un certificat che orange digital center",
        },
        {
            id: 3,
            titre: "Formation développeur web",
            nom_entreprise: "DevelopA (entreprise Informatique)",
            location: "Antananarivo - 67H - Madagascar",
            date: "22 Novembre 2024",
            liens_entreprise: "https://www.developa.net/",
            description: "Maîtrisez les concepts avancés de Symfony pour créer des applications web performantes et bien structurées. Apprenez les bases de GitHub pour gérer vos projets et collaborer efficacement en équipe. Préparez-vous aux exigences du marché avec des projets professionnels et des conseils adaptés à votre carrière.",
        },
        {
            id: 4,
            titre: "Formation développeur web en Django",
            nom_entreprise: "Technical Deveper",
            location: "Ihosy - Andrefatsena - Madagascar",
            date: "04 janvier 2023",
            liens_entreprise: "sur whatsapp",
            description: "Formation du module django rest framework, cette formation durée 2 mois, après on a fini avec un projet sur django en remote",
        },
    ]);
    return (
        <Container className="px-6 lg:pt-20 w-screen relative  lg:container lg:mx-auto space-y-10 lg:mb-10">

            <Typography variant="medium" theme="black" className="w-80 border-b-4 border-primary">
                Formation et Education
            </Typography>
            <Typography>
                Étude des concepts avancés en programmation, architecture logicielle et gestion de bases de données et Apprentissage à distance, favorisant l’autonomie, la discipline et une grande capacité d’adaptation.
            </Typography>

            <div className="lg:mt-4 lg:grid lg:grid-cols-2 grid-cols-1 lg:gap-y-10 space-y-4">
                {competences.map((resume, index) => (
                    <>
                        <div>
                            <div>
                                <p className="w-4 h-4 rounded border-4 border-primary absolute -mx-2"></p>
                                <p className="border-l-3 border mt-3 border-primary h-60 absolute"></p>
                            </div>
                            <div className="px-4 space-y-2">
                                <Typography variant="medium" theme="black" className="">{resume.titre}</Typography>

                                <Typography variant="large" theme="black">{resume.nom_entreprise}</Typography>
                                <Typography>{resume.description}</Typography>
                                <div className="px-2 space-y-3">
                                    <Typography className="flex items-center gap-2"><AiOutlineCheckCircle />
                                        {resume.location}
                                    </Typography>
                                    <Typography className="flex items-center gap-2"><AiOutlineCheckCircle />
                                        {resume.date}
                                    </Typography>
                                    <Link href={`${resume.liens_entreprise}`} className="flex items-center gap-2 text-lg"><AiOutlineLink />
                                        {resume.liens_entreprise}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>

            <ExperienceSection />
        </Container >
    )
}


interface Experience {
    id: number;
    titre: string;
    companie: string;
    duration: string;
    description: string;
}

export const ExperienceSection = () => {
    const [experience] = useState<Experience[]>([
        {
            id: 1,
            titre: "Développeur front-end",
            companie: "Mtechniix(Entreprise informatique)",
            duration: "2025-01-16",
            description: "Développement d'applications web avec Django, intégration de services externes, et optimisation des performances front-end sur la deuxième société de Mtechniix",

        },
        {
            id: 2,
            titre: "Développeur projet personnel",
            companie: "Projet réseau sociaux commerce",
            duration: "depuis 2024",
            description: "Crée une expérience utilisateur immersive où les interactions sociales et les échanges commerciaux deviennent un plaisir quotidien, Nos objectifs est de transformer le parcours d'achat traditionnel en une expérience interactive et engageante",

        },
    ]);

    return (
        <>
            <div className="pt-20 lg:mx-auto lg:container">
                <Typography variant="large" theme="black" className="w-24 border-b-4 border-primary mb-4">
                    Expériences
                </Typography>
                <Typography>
                    Ces expériences reflètent mon parcours dans le développement de solutions web et mobiles, en mettant en avant ma capacité à créer des applications performantes et à collaborer efficacement avec des équipes multidisciplinaires.
                </Typography>
                <div className="grid grid-cols-2">
                    {experience.map((exper, index) => (
                        <div className="bg-shadow p-6 hover:shadow-xl transition-all">
                            <div key={index}>
                                <div className="flex items-center gap-2">
                                    <div className="bg-primary text-white p-3 rounded-full">
                                        <FaBriefcase size={24} />
                                    </div>
                                    <div>
                                        <Typography variant="large" theme="black" className="font-semibold">
                                            {exper.titre}
                                        </Typography>
                                        <Typography variant="small" theme="gray">
                                            {exper.companie}
                                        </Typography>
                                    </div>
                                </div>
                                <Typography variant="small" theme="gray" className="mt-2">
                                    {exper.duration}
                                </Typography>
                                <Typography variant="semimedium" theme="black" className="mt-4 text-justify">
                                    {exper.description}
                                </Typography>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};
