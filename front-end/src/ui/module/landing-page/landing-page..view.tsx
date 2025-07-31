"use client";

import { useEffect, useState } from "react";
import { FaTwitter, FaCodepen, FaLinkedin, FaYoutube, FaFacebook, FaEnvelope, FaGithub } from "react-icons/fa";
import Image from "next/image";
import { Typography } from "@/ui/design-systeme/typography/typography";
import Link from "next/link";

export const LandignPageView = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <div className="text-center font-montserrat">
      {/* HEADER SECTION */}
      <section
        className="bg-cover bg-center bg-no-repeat text-white py-[14vh] px-4 relative z-10"
        style={{
          backgroundImage: "url('/assets/images/background/bg-code.png')",
        }}
      >
        {/* CONTENU principal en haut */}
        <div className="max-w-4xl mx-auto flex flex-col items-center z-20">
          <Image
            src="/assets/images/photo/Ramandimbson-espoir.jpeg"
            alt="Ramandimbson Espoir"
            width={150}
            height={150}
            className="rounded-full border-4 border-gray-300 w-48 h-48 object-cover object-top mt-12"
          />
          <Typography variant="xlarge" className="mt-6">
            Développeur Web & Mobile - Étudiant
          </Typography>
          <Typography className="mt-4 max-w-xl">
            Je suis <strong>RAMANDIMBSON Espoir Matieu Albertin</strong>,
            étudiant en informatique au <strong>CNTEMAD</strong>. Passionné par
            le développement web et les technologies modernes, je me forme
            activement à React, Next.js, Django et Laravel.
          </Typography>
          <div className="flex gap-6 mt-14 text-white text-3xl">
            <Link href="https://www.facebook.com/teresperant/">
              <FaFacebook className="hover:text-primary transition cursor-pointer" />
            </Link>
            <FaLinkedin className="hover:text-primary transition cursor-pointer" />
            <FaEnvelope className="hover:text-primary transition cursor-pointer" />
            <FaGithub className="hover:text-primary transition cursor-pointer" />
          </div>
        </div>

        {/* Overlay color */}
        <div className="absolute inset-0 bg-primary-800 opacity-50 -z-10"></div>
      </section>
    </div>
  );
};
