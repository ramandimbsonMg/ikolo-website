import { Typography } from "@/ui/design-systeme/typography/typography";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineCode } from "react-icons/ai";

interface Competence {
    id: number;
    titre: string;
    description: string;
}

export const CompetenceSection = () => {
    const [activeTab, setActiveTab] = useState<keyof typeof tabs>("languages");
    const tabs = {
        languages: [
            {
                id: 1,
                titre: "HTML5",
                description:
                    "(HyperTextLanguage) Langage standard de balisage utilisé pour structurer et afficher le contenu sur le web",
            },
            {
                id: 2,
                titre: "CSS",
                description:
                    "Langage de style utilisé pour personnaliser l’apparence visuelle des pages web (couleurs, polices, mises en page).",
            },
            {
                id: 3,
                titre: "JS",
                description:
                    "(Json) Langage standard de balisage utilisé pour structurer et afficher le contenu sur le web",
            },
            {
                id: 4,
                titre: "Python 3.10 | 3.12",
                description:
                    "Langage de programmation polyvalent, apprécié pour sa lisibilité et sa richesse en bibliothèques.",
            },
            {
                id: 5,
                titre: "PHP(base)",
                description:
                    "Langage de programmation polyvalent, apprécié pour sa lisibilité et sa richesse en bibliothèques.",
            },
            {
                id: 6,
                titre: "Firebase",
                description:
                    "Plateforme cloud de Google offrant des services pour le backend, comme l'authentification et les bases de données.",
            },
            {
                id: 7,
                titre: "GitHub (Base)",
                description:
                    "Plateforme de gestion de code source et de collaboration via Git.",
            },
            {
                id: 8,
                titre: "MySQL/Postgres",
                description:
                    "Système de gestion de base de données relationnelle connu pour sa rapidité et sa fiabilité.",
            },
        ],
        frameworks: [
            {
                id: 1,
                titre: "React Native",
                description:
                    "Framework JavaScript pour développer des applications mobiles natives pour Android et iOS.",
            },
            {
                id: 2,
                titre: "Django",
                description:
                    "Framework Python puissant pour créer des API RESTful robustes et évolutives.",
            },
            {
                id: 3,
                titre: "Django REST API",
                description:
                    "Framework Python puissant pour créer des API RESTful robustes et évolutives.",
            },
            {
                id: 4,
                titre: "Symfony",
                description:
                    "Framework PHP populaire pour construire des applications web robustes.",
            },
            {
                id: 5,
                titre: "Vue.js",
                description:
                    "Framework JavaScript progressif pour construire des interfaces utilisateur.",
            },
            {
                id: 6,
                titre: "Laravel",
                description:
                    "Framework PHP moderne pour des applications robustes et élégantes.",
            },
        ],
        css: [
            {
                id: 1,
                titre: "Tailwind CSS",
                description:
                    "Framework CSS utilitaire pour concevoir rapidement des interfaces en utilisant des classes prédéfinies.",
            },
            {
                id: 2,
                titre: "Bootstrap CSS",
                description:
                    "Framework CSS populaire pour créer des sites responsifs avec des composants prêts à l'emploi.",
            },
        ],
    };

    return (
        <div className="p-4">
            <div className="flex space-x-4 border-b text-xl font-semibold text-black">
                <button
                    onClick={() => setActiveTab("languages")}
                    className={`px-4 py-2 ${activeTab === "languages" ? "border-b-2 border-primary" : ""
                        }`}
                >
                    Languages
                </button>
                <button
                    onClick={() => setActiveTab("frameworks")}
                    className={`px-4 py-2 ${activeTab === "frameworks" ? "border-b-2 border-primary" : ""
                        }`}
                >
                    Frameworks
                </button>
                <button
                    onClick={() => setActiveTab("css")}
                    className={`px-4 py-2 ${activeTab === "css" ? "border-b-2 border-primary" : ""
                        }`}
                >
                    CSS
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {tabs[activeTab].map((competence) => (
                            <div key={competence.id} className="bg-gray-100 border p-4 shadow-sm">
                                <div className="flex justify-center items-center">
                                    <p className="flex items-center justify-center border rounded-full w-10 h-10 shadow-sm">
                                        <AiOutlineCode className="w-8 h-8 text-primary" />
                                    </p>
                                </div>
                                <Typography weight="medium">{competence.titre}</Typography>
                                <Typography>{competence.description}</Typography>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
