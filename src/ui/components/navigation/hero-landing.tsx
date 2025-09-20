"use client";

import { Typography } from "@/ui/design-systeme/typography/typography";
import { Button } from "@/ui/design-systeme/button/button";
import { AnnouncementBar } from "@/ui/components/navigation/announcement-bar";
import { OutlinesSection } from "./outile-resource";
import { Container } from "../container/container";
import { motion } from "framer-motion";
import { VideoDropdown } from "./video.modal";
import { StudentRegisterModal } from "../inscription/incription";

export const HeroLanding = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      {/* Background illustration */}
      <div className="absolute inset-0">
        <img
          src="/assets/images/backgrounds/bg-2.png"
          alt="Enfants jouant et apprenant"
          className="w-screen h-screen object-cover opacity-40"
        />
      </div>

      <AnnouncementBar text="Bienvenue à l’American Christian School à Madagascar ! Inscrivez vos enfants dès maintenant !" />

      {/* Contenu */}
      <div className="relative z-10 max-w-7xl  mx-auto px-6 lg:px-20 py-24 lg:py-40 flex flex-col lg:grid lg:grid-cols-12 items-center gap-12">
        {/* Texte */}
        <motion.div
          className="col-span-7 text-center lg:text-left space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="display"
            theme="primary"
            className="lg:text-start text-start"
          >
            American Christian School
          </Typography>
          <Typography variant="xlarge" className="text-lg lg:text-xl">
            Montessori & Christian education pour les enfants dès 1 an, dans un
            environnement sûr, stimulant et joyeux.
          </Typography>
          <motion.div
            className="mt-8 flex justify-center items-center lg:justify-start gap-1 lg:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <StudentRegisterModal />
            <VideoDropdown />
          </motion.div>
        </motion.div>

        {/* Image / illustration */}
        <motion.div
          className="col-span-5  relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="/assets/images/photo/BackgroundEraser_20250906_132332167.png"
            alt="Enfants apprenant Montessori"
            className="w-full max-w-xl mx-auto rounded-2xl"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Formes décoratives flottantes */}
          <motion.span
            className="absolute top-10 left-6 w-6 h-6 bg-yellow-300 rounded-full"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.span
            className="absolute bottom-12 right-10 w-8 h-8 bg-pink-400 rounded-full"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.span
            className="absolute top-20 right-20 w-4 h-4 bg-green-400 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Outlines */}
      <Container className="mb-10 z-20 relative">
        <OutlinesSection />
      </Container>
    </section>
  );
};
