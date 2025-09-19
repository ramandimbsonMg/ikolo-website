"use client";

import { AboutSections } from "@/ui/components/about/about-sections";
import { HeroActuality } from "@/ui/components/actuality/hero";
import { Layout } from "@/ui/components/layout/layout";
import Navigation from "@/ui/components/navigation/navigation";
import { Seo } from "@/ui/components/seo/seo";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 } // L'élément doit être à 10% visible
    );

    const sections = document.querySelectorAll(".fade-in");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect(); // Nettoie l'observateur au démontage
  }, []);

  return (
    <>
      <Seo
        title="ONG MADA SINK MAINTSO "
        description="%s | une Organisation Non Gouvernementale malgache œuvrant
pour la protection de l’environnement, le développement rural durable et la création de
puits de carbone naturels à Madagascar"
      />
      <Navigation />
      <Layout isDisplayBreakCrumbs={false}>
        <div className="relative min-h-screen flex flex-col">
          {/* Hero Section */}
          <HeroActuality />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <AboutSections />
          <hr className="mb-3 mt-3 border border-primary-800" />
        </div>
      </Layout>
    </>
  );
}
