import { AppLinks } from "@/types/app-links";
import {
  RiFacebookFill,
  RiLinkedinFill,
  RiInstagramFill,
} from "react-icons/ri";

const footerNavigationLinks: AppLinks[] = [
  {
    label: "Accueil",
    baseUrl: "#home",
    type: "internal",
  },
  {
    label: "À propos",
    baseUrl: "#about",
    type: "internal",
  },
  {
    label: "Programmes",
    baseUrl: "#programs",
    type: "internal",
  },
  {
    label: "Événements",
    baseUrl: "#events",
    type: "internal",
  },
  {
    label: "Galerie",
    baseUrl: "#gallery",
    type: "internal",
  },
  {
    label: "Contact",
    baseUrl: "#contact",
    type: "internal",
  },
];

const footerInformationLinks: AppLinks[] = [
  {
    label: "Confidentialité",
    baseUrl: "/confidentialite",
    type: "internal",
  },
  {
    label: "Conditions d’utilisation",
    baseUrl: "/conditions",
    type: "internal",
  },
  {
    label: "Support",
    baseUrl: "/support",
    type: "internal",
  },
];

export const footerReseauLinks: AppLinks[] = [
  {
    label: "Facebook",
    baseUrl: "https://facebook.com/biizina",
    type: "external",
    icon: RiFacebookFill,
  },
  {
    label: "LinkedIn",
    baseUrl: "https://linkedin.com/company/biizina",
    type: "external",
    icon: RiLinkedinFill,
  },
  {
    label: "Instagram",
    baseUrl: "https://instagram.com/biizina",
    type: "external",
    icon: RiInstagramFill,
  },
];

