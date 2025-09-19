export interface RepoUrl {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  images: string[];
  repoUrls?: RepoUrl[];
  tags: string[];
}

// 🔹 Liste des projets
export const projects: Project[] = [
  {
    slug: "misera",
    title: "Misera",
    description:
      "Misera est une application web qui fusionne réseau social et e-commerce.",
    images: [
      "/assets/images/portfolio/Misera/actu.png",
      "/assets/images/portfolio/Misera/login.png",
      "/assets/images/portfolio/Misera/signup.png",
      "/assets/images/portfolio/Misera/article.png",
    ],
    repoUrls: [
      {
        label: "Frontend",
        url: "https://github.com/ramandimbsonMg/Frontend_Misera",
      },
      {
        label: "Backend",
        url: "https://github.com/ramandimbsonMg/Backend_Misera",
      },
    ],
    tags: ["React", "Next.js", "TailwindCSS", "Python", "Django", "PostgreSQL"],
  },
  {
    slug: "gestion-scolaire",
    title: "Gestion Scolaire",
    description:
      "Application web Laravel pour la gestion des élèves, paiements et reçus.",
    images: [
      "/assets/images/portfolio/GestionScholaire/login.png",
      "/assets/images/portfolio/GestionScholaire/registre.png",
      "/assets/images/portfolio/GestionScholaire/dashboard.png",
      "/assets/images/portfolio/GestionScholaire/listuser.png",
      "/assets/images/portfolio/GestionScholaire/eleves.png",
      "/assets/images/portfolio/GestionScholaire/sold.png",
      "/assets/images/portfolio/GestionScholaire/sold2.png",
    ],
    tags: ["Laravel", "PHP", "MySQL", "Simafri"],
  },
  {
    slug: "GJReligieux",
    title: "Groupe de Jeunes Religieux",
    description:
      "Application de génération de cartes scolaires avec Django et dashboard.",
    images: ["/assets/images/portfolio/church/landing.png"],
    repoUrls: [
      {
        label: "Voir le dépôt GitHub",
        url: "https://github.com/ramandimbsonMg/groupe_de_jeunes_religieux",
      },
    ],
    tags: ["NextJs", "TailwindCSS", "Netlify"],
  },
  {
    slug: "sekprint",
    title: "Badge Scolaire",
    description:
      "Application de génération de cartes scolaires avec Django et dashboard.",
    images: [
      "/assets/images/portfolio/SekPrint/landing.png",
      "/assets/images/portfolio/SekPrint/dashboard.png",
      "/assets/images/portfolio/SekPrint/ecole.png",
      "/assets/images/portfolio/SekPrint/etudiant.png",
      "/assets/images/portfolio/SekPrint/classe.png",
    ],
    repoUrls: [
      {
        label: "GitHub",
        url: "https://github.com/ramandimbsonMg/groupe_de_jeunes_religieux",
      },
    ],
    tags: ["Django", "TailwindCSS", "PostgreSQL"],
  },
];

