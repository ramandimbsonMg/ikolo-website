// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Traductions
const resources = {
  en: {
    translation: {
      welcome: "Welcome to my portfolio",
      contact: "Contact me",
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue sur mon portfolio",
      contact: "Contactez-moi",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr", // langue par défaut
    fallbackLng: "fr",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
