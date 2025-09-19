interface Experience {
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
 
export const experience: Experience[] = [
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
  }
];
