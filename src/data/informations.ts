export interface Information {
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

export const informations: Information[] = [
  {
    nom: "Ramandimbson",
    avatar: "assets/images/avatar/user-profile.jpg",
    prenom: "Espoir Matieu Albertin",
    date_naissance: "02 Février 2006",
    age: "10011",
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
];
