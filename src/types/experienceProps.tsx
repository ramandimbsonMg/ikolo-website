interface experienceItem {
    titre_experience?: string;
    nom_entreprise?: string;
    location?: string;
    date?: string;
    description_experience?: string;
    liens_entreprise?: string;
}

interface experienceTitreProps {
    titre?: string;
    description?: string;
}

interface contactItem {
    id: number;
    nom: string;
    email: string;
    sujet: string;
    message: string;
    reponse: string | null;
    statut: string;
}