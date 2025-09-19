"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Experience, Project } from "@/types/types";
import ExperienceList from "@/ui/components/experience/experience.list";
import FormationList from "@/ui/components/formation/formation.list";
import ProfileHeader from "@/ui/components/profile/profile.header";
import Sidebar from "@/ui/components/sidebar/sidebar";
import { Card } from "@/ui/components/ui/card";

export default function LandingPageView() {
  const [activeTab, setActiveTab] = useState<"experiences" | "formations">(
    "experiences"
  );
  const experiences: Experience[] = [
    {
      id: 1,
      title: "Développeur Fullstack",
      company: "American Christian School (ACS)",
      location: "Alasora, Antananarivo, Madagascar",
      start: "Février 2025",
      end: "Mai 2025",
      summary:
        "Développement d’un système automatisé de gestion des paiements pour élèves et enseignants : facturation automatique, génération et envoi de reçus, tableaux de bord de suivi et rapprochement des paiements. Mise en place d’une interface d’administration sous Laravel permettant la gestion des tarifs, des remises, des abonnements et des exports comptables, avec contrôle d’accès par rôles et validations côté serveur. Conception et déploiement d’un site vitrine dynamique en Laravel pour l’American School, multilingue (FR/EN), responsive et optimisé SEO. Résultat : réduction significative du travail manuel, meilleure traçabilité des paiements et satisfaction accrue des équipes pédagogiques.",
      tags: ["Laravel", "Php", "WordPress", "Html", "Tailwind", "Simafri"],
    },
    {
      id: 2,
      title: "Stagiaire Développeur Odoo / Django",
      company: "Chez Mtechiix",
      location: "Antananarivo, Madagascar",
      start: "Février 2024",
      end: "Avril 2024",
      summary:
        "Participation au développement d'applications métiers en Odoo. Développement d’interfaces modernes en Django. Utilisation de Figma pour la création de maquettes interactives et optimisation UX. Collaboration avec l’équipe pour transformer les maquettes en interfaces fonctionnelles et responsives.",
      tags: ["Python", "Odoo", "Xml", "Postgress", "Django", "Figma", "Docker"],
    },
    {
      id: 3,
      title: "Projet Personnel – Mis’era (Plateforme Social-Commerce)",
      company: "Projet indépendant",
      location: "Antananarivo, Madagascar",
      start: "2024",
      end: "En cours",
      summary:
        "Conception et développement d’une plateforme social-commerce inspirée des réseaux sociaux modernes. Backend en Django avec gestion des utilisateurs, produits et commandes. Fonctionnalités e-commerce (panier, favoris, commandes). Ajout d’interactions sociales (réactions, commentaires, partage). UI moderne aux couleurs cyan. Prototypage sur Figma.",
      tags: [
        "Django",
        "Python",
        "PostgreSQL",
        "TailwindCSS",
        "Next.js",
        "Figma",
      ],
    },
  ];

  const projects: Project[] = [
    { id: 1, name: "Biziina (React + Django)" },
    { id: 2, name: "Gestion Scolaire (Laravel + PostgreSQL)" },
    { id: 3, name: "Portfolio interactif" },
  ];

  return (
    <div className="w-full min-h-screen font-montserrat py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4">
        {/* Main Content */}
        <main className="flex-1 space-y-6 mt-10">
          <ProfileHeader />
          <div>
            {/* Tabs header */}
            <Card className="">
              <div className="flex gap-4">
                <button
                  className={`px-4 py-2 font-semibold rounded-t-md transition-all duration-300 ${
                    activeTab === "experiences"
                      ? "border-b-2 border-primary-600 text-primary-600"
                      : "text-gray-500 hover:text-primary"
                  }`}
                  onClick={() => setActiveTab("experiences")}
                >
                  Expériences
                </button>
                <button
                  className={`px-4 py-2 font-semibold rounded-t-md transition-all duration-300 ${
                    activeTab === "formations"
                      ? "border-b-2 border-primary-600 text-primary-600"
                      : "text-gray-500 hover:text-primary"
                  }`}
                  onClick={() => setActiveTab("formations")}
                >
                  Formations
                </button>
              </div>
            </Card>

            {/* Tabs content with animation */}
            <div className="relative min-h-[200px] mt-2">
              <AnimatePresence mode="wait">
                {activeTab === "experiences" && (
                  <motion.div
                    key="experiences"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    <ExperienceList experiences={experiences} />
                  </motion.div>
                )}

                {activeTab === "formations" && (
                  <motion.div
                    key="formations"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    <FormationList />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <Sidebar projects={projects} className="md:w-1/3 lg:w-1/4" />
      </div>
    </div>
  );
}
