"use client";

import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import { Typography } from "@/ui/design-systeme/typography/typography";
import { useLanguage } from "@/context/language-context";

export const AboutSections = () => {
  const { lang } = useLanguage();

  const sections = [
    {
      title: lang === "FR" ? "Qui nous sommes" : "Who We Are",
      description:
        lang === "FR"
          ? "Nous sommes une équipe dévouée d’experts environnementaux, de leaders communautaires et de bénévoles, travaillant ensemble pour protéger la biodiversité, restaurer les écosystèmes et renforcer la résilience des communautés locales à Madagascar."
          : "We are a dedicated team of environmental experts, community leaders, and volunteers working together to protect biodiversity, restore ecosystems, and strengthen the resilience of local communities in Madagascar.",
      link: "/about/who-we-are",
    },
    {
      title: lang === "FR" ? "Ce que nous faisons" : "What We Do",
      description:
        lang === "FR"
          ? "Nous menons des actions concrètes pour lutter contre le changement climatique et préserver l’environnement : reboisement, agroforesterie, énergies renouvelables, agriculture durable et développement économique local."
          : "We take concrete actions to tackle climate change and preserve the environment: reforestation, agroforestry, renewable energy, sustainable agriculture, and local economic development.",
      link: "/about/what-we-do",
    },
    {
      title: lang === "FR" ? "Comment aider" : "How To Help",
      description:
        lang === "FR"
          ? "Vous pouvez contribuer à la protection de notre planète en rejoignant nos programmes de bénévolat, en réduisant votre empreinte carbone, ou en soutenant financièrement nos projets de conservation et d’éducation environnementale."
          : "You can contribute to protecting our planet by joining our volunteer programs, reducing your carbon footprint, or financially supporting our conservation and environmental education projects.",
      link: "/about/how-to-help",
    },
    {
      title: lang === "FR" ? "Où nous intervenons" : "Where We Work",
      description:
        lang === "FR"
          ? "Nous intervenons dans toute Madagascar : forêts denses, mangroves, récifs coralliens, et communautés rurales. Nos stratégies sont adaptées aux différents écosystèmes et besoins locaux."
          : "We operate throughout Madagascar: dense forests, mangroves, coral reefs, and rural communities. Our strategies are tailored to the diverse ecosystems and local needs.",
      link: "/about/where-we-work",
    },
  ];

  return (
    <div className="lg:grid lg:grid-cols-12 gap-6">
      <div className="col-span-4">
        <Typography variant="xlarge" className="text-primary-800 font-semibold">
          {lang === "FR"
            ? "Avancer résolument dans cette décennie déterminante"
            : "Stepping Up Progress in this Defining Decade"}
        </Typography>
        <Typography className="mt-4 text-gray-700">
          {lang === "FR"
            ? "Aux côtés des communautés locales, nous levons rapidement les obstacles et mettons en œuvre des solutions concrètes pour lutter contre le changement climatique et préserver la biodiversité à Madagascar."
            : "Alongside local communities, we are urgently removing obstacles and implementing concrete solutions to combat climate change and protect biodiversity in Madagascar."}
        </Typography>
      </div>

      <div className="lg:col-span-8 lg:pt-0 pt-6">
        <div className="lg:grid grid-cols-1 md:grid-cols-2 lg:gap-2 lg:px-0 max-w-7xl mx-auto lg:space-y-0 space-y-2">
          {sections.map((section, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg rounded-bl-none hover:shadow-lg transition relative group bg-white"
            >
              {/* Title avec icon */}
              <div className="flex items-center justify-between mb-4">
                <Typography
                  variant="xlarge"
                  className="text-green-500 font-semibold"
                >
                  {section.title}
                </Typography>
                <Link href={section.link}>
                  <AiOutlineArrowRight className="h-6 w-6 text-green-500 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Description */}
              <Typography className="text-gray-700 leading-relaxed">
                {section.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
