import { Objectifs } from "@/data/objectif/objectif";
import { Button } from "@/ui/design-systeme/button/button";
import { Typography } from "@/ui/design-systeme/typography/typography";
import { motion } from "framer-motion";
import {
  AiOutlineLeftCircle,
  AiOutlineSignature,
} from "react-icons/ai";

export const TestimonialCard = () => {
    const objectifs = Objectifs;
  
  return (
    <>
      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 py-4 lg:py-10 flex flex-col lg:grid items-center gap-12">
        {/* Section à propos */}
        <div className="lg:py-12 space-y-4">
          <Typography variant="2xlarge" theme="primary" className="text-center">
            À propos de notre école
          </Typography>
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Texte */}
            <motion.div
              className="col-span-12 lg:col-span-7 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <p className="text-gray-700 text-md md:text-lg text-start pt-6 leading-relaxed">
                American Christian School offre un cadre d’apprentissage unique
                où chaque enfant peut s’épanouir pleinement. Nous combinons
                excellence académique et valeurs chrétiennes pour former des
                enfants curieux, responsables et confiants. Nos enseignants
                passionnés accompagnent chaque élève selon ses besoins et ses
                talents.
              </p>

              <Typography
                variant="xlarge"
                theme="primary"
                className="text-center lg:text-left mt-6"
              >
                Nos objectifs
              </Typography>

              <motion.div
                className="bg-gray-200 lg:px-5 px-1 pt-5 pb-6 mt-4 rounded-lg shadow-md text-center sm:text-left space-y-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {objectifs.map((objectif, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-2 text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <AiOutlineLeftCircle className="text-primary text-lg" />
                    <Typography theme="gray">{objectif.description}</Typography>
                  </motion.div>
                ))}
              </motion.div>

              <Typography variant="small" className="mt-4 text-gray-600 italic">
                Chez American Christian School Madagascar, nous croyons qu’un
                monde meilleur commence par une éducation meilleure. En alliant
                les valeurs chrétiennes, la pédagogie Montessori et un
                environnement riche en opportunités, nous construisons l’avenir
                — un enfant à la fois.
              </Typography>
            </motion.div>

            {/* Image */}
            <motion.div
              className="col-span-12 lg:col-span-5 hidden lg:flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img
                src="/assets/images/photo/draw/5.svg"
                alt="Illustration école"
                className="w-4/5 h-auto drop-shadow-lg hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>

        {/* Titre */}
        <Typography variant="2xlarge" theme="primary" className="text-center">
          L'avantage de l'école chrétienne
        </Typography>

        {/* Card principale */}
        <div className="relative w-full lg:items-start lg:gap-12">
          {/* Texte principal */}
          <div className="text-center lg:text-left space-y-6 bg-white border-primary border-2 px-10 pt-3 pb-3 rounded lg:rounded-full">
            <h2 className="text-md font-bold italic">
              Bienvenue à American Christian School, une école anglophone
              engagée à révéler le potentiel unique de chaque enfant. Notre
              programme, basé sur le système éducatif américain et enrichi par
              l’approche Montessori, offre un environnement stimulant où les
              enfants apprennent à leur rythme, dans la joie et le respect. Nous
              croyons en une éducation centrée sur les valeurs chrétiennes,
              l’excellence académique et le développement global de l’enfant.
              Merci de faire partie de cette belle aventure.
            </h2>
          </div>

          {/* Image et décorations */}
          <div className="relative mt-10 lg:mt-0">
            {/* Cercles animés */}
            <div className="absolute -top-8 left-40 flex flex-col gap-4">
              <span className="border-2 rounded-full w-6 h-6 border-primary animate-bounce"></span>
              <span className="border-2 rounded-full w-4 h-4 border-primary animate-bounce"></span>
              <span className="border-2 rounded-full w-3 h-3 border-primary animate-bounce"></span>
              <span className="border-2 rounded-full w-2 h-2 border-primary animate-bounce"></span>
            </div>

            {/* Image */}
            <div className="bg-white rounded-full border border-primary w-[100px] h-[100px] flex items-center justify-center overflow-hidden shadow-lg mt-10 mx-10">
              <img
                src="/assets/images/teacher/12.png"
                alt="Enfants jouant et apprenant"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
