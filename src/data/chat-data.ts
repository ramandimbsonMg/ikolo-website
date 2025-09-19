// chatData.ts
import axios from "axios";

// ----- Types -----
export type Message = string;

// ----- Profil -----
export const profile = {
  nom: "Ramandimbson Espoir Matieu Albertin",
  tel: "+261389052467",
  age: "19 ans",
  freelance: "Disponible",
  nationalite: "Malagasy",
  email: "ramandimbsonespoir@gmail.com",
  ville: "Antananarivo, Madagascar",
  objectif:
    "Devenir développeur fullstack compétent et évoluer dans le domaine des technologies modernes.",
  resume:
    "Développeur web passionné, prêt à évoluer et à renforcer mes compétences techniques.",
};

// ----- Compétences & projets -----
export const competences = [
  "HTML",
  "CSS",
  "JavaScript",
  "Python",
  "Django",
  "Laravel",
  "Tailwind",
  "Bootstrap",
  "Next.js",
  "React",
  "PostgreSQL",
  "MySQL",
  "GitHub",
  "Figma",
];

export const projets = ["Portfolio", "Chatbot rule-based", "Site e-commerce"];
export const CV_PDF_URL =
  "/assets/cv/CV_Développeur_Ramandimbson_Espoir_Matieu Albertin_.pdf";
export const LTR_PDF_URL =
  "/assets/cv/CV_Développeur_Ramandimbson_Espoir_Matieu Albertin_.pdf";

// ----- Synonymes / Traductions -----
const synonyms: Record<string, string> = {
  salama: "bonjour",
  hello: "bonjour",
  hi: "bonjour",
  coucou: "bonjour",
  bonsoir: "bonjour",
  salut: "bonjour",
  adieu: "au revoir",
  veloma: "au revoir",
  bye: "au revoir",
  ciao: "au revoir",

  misaotra: "merci",
  thanks: "merci",
  thankyou: "merci",

  "comment va tu": "ça va",
  "comment vas tu": "ça va",
  "how are you": "ça va",
  "ça roule": "ça va",
  "ça marche": "ça va",

  bien: "daccord",
};

// ----- Catégories -----
export const categories: Record<string, string[]> = {
  presentation: [
    "présentation",
    "présente-toi",
    "nom",
    "parle de toi",
    "who are you",
  ],
  portfolio: ["projet", "portfolio", "travail", "réalisation", "site"],
  contact: ["contact", "email", "téléphone", "message"],
  langues: ["langue", "parle", "anglais", "français", "malagasy"],
  competences: ["compétence", "skills", "stack", "outil"],
  formation: ["formation", "éducation", "school", "university", "licence"],
  experience_pro: ["expérience", "travail", "mission", "poste", "job"],
  salutations: ["bonjour"],
  ca_va: ["ça va"],
  merci: ["merci"],
  au_revoir: ["au revoir"],
};

// ----- Normalisation améliorée -----
export const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // enlève accents
    .replace(/[^a-z0-9\s\=\+\-\*\/\%\^\(\)\?\'\!\:]/g, "") // garde lettres, chiffres, opérateurs, ?, !, '
    .replace(/\s+/g, " ")
    .trim();

// ----- Appliquer synonymes -----
const applySynonyms = (msg: string): string => {
  let result = msg;
  for (const [key, value] of Object.entries(synonyms)) {
    if (result.includes(key)) {
      result = result.replace(new RegExp(key, "g"), value);
    }
  }
  return result;
};

// ----- Détecter catégorie -----
export const detectCategory = (message: Message): string | null => {
  let msg = normalizeText(message);
  msg = applySynonyms(msg);
  for (const [cat, keywords] of Object.entries(categories)) {
    for (const kw of keywords) {
      if (msg.includes(normalizeText(kw))) return cat;
    }
  }
  return null;
};

// ----- Mémoire locale + jsonbin.io -----
let memory: Record<string, string> = {};
const BIN_ID = "68b0789bd0ea881f40695f71";
const API_KEY = "$2a$10$0fjo1VoYIOvv11mmvYhcDO1eZNO9w7bJJ47tdezZBj2gqMbel1Nd2";

// Charger mémoire
export const loadMemory = async () => {
  try {
    const res = await axios.get(
      `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`,
      {
        headers: { "X-Master-Key": API_KEY },
      }
    );
    memory = res.data.record.memory || {};
    console.log("Mémoire chargée :", memory);
  } catch (err) {
    console.log("Pas de mémoire chargée :", err);
  }
};

// Sauvegarder mémoire
export const saveMemory = async () => {
  try {
    await axios.put(
      `https://api.jsonbin.io/v3/b/${BIN_ID}`,
      { memory },
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
          "X-Bin-Versioning": "false",
        },
      }
    );
  } catch (err) {
    console.error("Erreur sauvegarde mémoire :", err);
  }
};

// ----- Générer réponse intelligente -----
export const generateReply = async (message: Message): Promise<string> => {
  let normalizedMsg = normalizeText(message);
  normalizedMsg = applySynonyms(normalizedMsg);

  // 1️⃣ Vérifie mémoire existante
  if (memory[normalizedMsg]) return memory[normalizedMsg];

  // 2️⃣ Vérifie si calcul
  const mathRegex = /^[0-9\+\-\*\/\%\^\(\)\s]+$/;
  if (mathRegex.test(normalizedMsg)) {
    try {
      const result = Function(`"use strict"; return (${normalizedMsg})`)();
      if (typeof result === "number" && !isNaN(result)) {
        return `${message} = ${result}`;
      }
    } catch {
      return "Je n'ai pas réussi à calculer ça 😅";
    }
  }

  // 3️⃣ Détecte catégorie
  const cat = detectCategory(message);
  let reply = "Désolé, je n'ai pas compris. Pouvez-vous reformuler ? 🙂";

  switch (cat) {
    case "salutations":
      reply = "Bonjour 👋! Comment allez-vous ?";
      break;
    case "ca_va":
      reply = "Je vais très bien merci 🙏 et vous ?";
      break;
    case "presentation":
      reply = `Je m'appelle ${profile.nom}, j'ai ${profile.age}. ${profile.resume}`;
      break;
    case "portfolio":
      reply = `Mes projets personnels : ${projets.join(", ")}.`;
      break;
    case "contact":
      reply = `📧 Email : ${profile.email} | 📞 Tél : ${profile.tel} | Freelance : ${profile.freelance}`;
      break;
    case "langues":
      reply = "Je parle : Malagasy 🇲🇬, Français 🇫🇷 et Anglais 🇬🇧.";
      break;
    case "competences":
      reply = `Compétences : ${competences.join(", ")}.`;
      break;
    case "formation":
      reply = "Formation et études en informatique disponibles sur demande.";
      break;
    case "experience_pro":
      reply = "Expériences professionnelles disponibles sur demande.";
      break;
    case "merci":
      reply = "Tsy misy fisaorana 🙏 (Avec plaisir)";
      break;
    case "au_revoir":
      reply = "Veloma 👋 Au revoir et à bientôt !";
      break;
    default:
      // CV
      if (
        normalizedMsg.includes("cv") ||
        normalizedMsg.includes("curiclulime") ||
        normalizedMsg.includes("resume") ||
        normalizedMsg.includes("résumé")
      ) {
        reply = `Voici mon CV : ${CV_PDF_URL} et ici mon Lettre de motivation si besoins : ${LTR_PDF_URL}`;
      }
      // 4️⃣ Apprentissage
      else if (normalizedMsg.includes("=")) {
        const [question, answer] = normalizedMsg
          .split("=")
          .map((s) => s.trim());
        if (question && answer) {
          memory[normalizeText(question)] = answer;
          await saveMemory();
          reply = `Merci, j'ai appris que "${question}" vaut "${answer}" ✅`;
        }
      }
      // 5️⃣ Vérifie si correspond à quelque chose appris
      else if (memory[normalizedMsg]) {
        reply = memory[normalizedMsg];
      }
      break;
  }

  return reply;
};
