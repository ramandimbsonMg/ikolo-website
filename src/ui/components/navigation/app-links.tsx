import { AppLinks } from "@/types/app-links"
import { RiFacebookFill, RiLinkedinFill, RiSlackFill } from "react-icons/ri";

const footerApplicationLinks: AppLinks[] = [
    {
        label: "Acceuil",
        baseUrl: "/actuality",
        type: "internal",
    },
    {
        label: "Boutique",
        baseUrl: "/boutique",
        type: "external",
    },
    {
        label: "Listes de populaire",
        baseUrl: "/design-system",
        type: "internal",
    }
];
const footerUserLinks: AppLinks[] = [
    {
        label: "Connexion",
        baseUrl: "/connexion",
        type: "internal",
    },
    {
        label: "S'inscrire",
        baseUrl: "/connexion/inscription",
        type: "internal",
    },
    {
        label: "Mots de passe oublié",
        baseUrl: "/mots-de-passe-perdu",
        type: "internal",
    }
];
const footerInformationLinks: AppLinks[] = [
    {
        label: "BiiziinaWrl",
        baseUrl: "/",
        type: "internal",
    },
    {
        label: "Confidentialié",
        baseUrl: "/boutique",
        type: "internal",
    },
    {
        label: "A propos",
        baseUrl: "/a-propos",
        type: "internal",
    },
    {
        label: "Contact",
        baseUrl: "/contact",
        type: "internal",
    }
];
export const footerReseauLinks: AppLinks[] = [
    {
        label: "Facebook",
        baseUrl: "https://web.facebook.com/people/Ter-Esp%C3%A9rant%C3%B8/100078807523670/?_rdc=1&_rdr",
        type: "external",
        icon: RiFacebookFill,
    },
    {
        label: "Linkedin",
        baseUrl: "www.linkedin.com/in/ramandimbson-espoir-mathieu-8a4516291",
        type: "external",
        icon: RiLinkedinFill,
    },
];

export const Footer_Links = [
    {
        label: "App",
        links: footerApplicationLinks,
    },
    {
        label: "Utilisateurs",
        links: footerUserLinks,
    },
    {
        label: "Informations",
        links: footerInformationLinks,
    },
    {
        label: "Réseaux",
        links: footerReseauLinks,
    },
]
