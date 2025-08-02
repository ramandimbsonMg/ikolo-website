import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typography } from "@/ui/design-systeme/typography/typography";
import { AiFillEye, AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Button } from "@/ui/design-systeme/button/button";
import { Container } from "@/ui/components/container/container";

// Types
type Product = {
  id: number;
  link?: string;
  title: string;
  subtitle: string;
  img: string;
  images?: string[];
  description: string;
};

type Tab = {
  id: string;
  title: string;
  products: Product[];
};

// Contenu du portfolio
const tabs: Tab[] = [
  {
    id: "web",
    title: "Applications Web",
    products: [
      {
        id: 1,
        link: "https://missera.netlify.app/",
        title: "Biizina",
        subtitle: "Plateforme sociale et e-commerce",
        img: "/assets/images/portfolio/pc1.png",
        images: [
          "/assets/images/portfolio/pc1.png",
          "/assets/images/portfolio/pc2.png",
        ],
        description:
          "Biizina est une application web qui fusionne réseau social et e-commerce. Elle permet aux utilisateurs de publier, partager et vendre leurs produits à travers une interface moderne et intuitive.",
      },
      {
        id: 2,
        link: "https://youngforchrist.netlify.app/",
        title: "Badge Scolaire – Génération automatique de cartes étudiants",
        subtitle: "Interface de vente dynamique",
        img: "/assets/images/portfolio/church/landing.png",
        images: ["/assets/images/portfolio/church/landing.png"],
        description:
          "Application web développée avec Django permettant la création, l’affichage et l’impression de badges scolaires personnalisés pour chaque étudiant. Elle facilite : l’enregistrement des informations (nom, photo, classe, etc.), la génération de badges PDF par étudiant ou en lot, l’utilisation d’un QR code ou d’un identifiant unique pour chaque badge, un affichage responsive adapté à l’impression papier.",
      },
    ],
  },
  {
    id: "design",
    title: "UI/UX Design",
    products: [
      {
        id: 3,
        title: "Mobile App Design",
        subtitle: "Design moderne pour application",
        img: "/assets/images/portfolio/mobile1.png",
        images: [
          "/assets/images/portfolio/mobile1.png",
          "/assets/images/portfolio/pc2.png",
        ],
        description:
          "Conception d'une interface mobile intuitive avec focus sur l'expérience utilisateur et la simplicité de navigation.",
      },
      {
        id: 4,
        title: "Redesign site vitrine",
        subtitle: "Modernisation d’une interface existante",
        img: "/assets/images/portfolio/design2.jpg",
        images: [
          "/assets/images/portfolio/design2.jpg",
          "/assets/images/portfolio/pc2.png",
        ],
        description:
          "Refonte visuelle complète d’un site vitrine pour améliorer l’ergonomie et la clarté du contenu.",
      },
    ],
  },
  {
    id: "fullstack",
    title: "Projets Full Stack",
    products: [
      {
        id: 5,
        title: "Gestion scolaire – développée avec Laravel PHP et PostgreSQL",
        subtitle: "CRUD + Auth + Dashboard",
        img: "/assets/images/portfolio/GestionScholaire/dashboard.png",
        images: [
          "/assets/images/portfolio/GestionScholaire/login.png",
          "/assets/images/portfolio/GestionScholaire/registre.png",
          "/assets/images/portfolio/GestionScholaire/listuser.png",
          "/assets/images/portfolio/GestionScholaire/eleves.png",
          "/assets/images/portfolio/GestionScholaire/sold.png",
          "/assets/images/portfolio/GestionScholaire/sold2.png",
        ],
        description:
          "Une application web de gestion scolaire développée avec Laravel PHP et PostgreSQL. Elle permet aux administrateurs de gérer les informations des professeurs et des élèves, de suivre les paiements des frais de scolarité et d’imprimer des reçus via une petite imprimante.",
      },
      {
        id: 6,
        title: "Badge Scolaire – Génération automatique de cartes étudiants",
        subtitle: "CRUD + Auth + Dashboard",
        img: "/assets/images/portfolio/SekPrint/etudiant.png",
        images: [
          "/assets/images/portfolio/SekPrint/landing.png",
          "/assets/images/portfolio/SekPrint/dashboard.png",
          "/assets/images/portfolio/SekPrint/ecole.png",
          "/assets/images/portfolio/SekPrint/classe.png",
          "/assets/images/portfolio/SekPrint/etudiant.png",
        ],
        description:
          "Application web développée avec Django permettant la création, l’affichage et l’impression de badges scolaires personnalisés pour chaque étudiant. Elle facilite : l’enregistrement des informations (nom, photo, classe, etc.), la génération de badges PDF par étudiant ou en lot, l’utilisation d’un QR code ou d’un identifiant unique pour chaque badge, un affichage responsive adapté à l’impression papier.",
      },
    ],
  },
];

export default function PortfolioView() {
  const [activeTab, setActiveTab] = useState("web");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <Container className="mt-10 px-6 max-w-[94em] mx-auto container space-y-4 w-screen relative">
      {/* Header du portfolio */}
      <div className="text-center mt-24">
        <div className="flex flex-col items-center">
          <Typography variant="display" theme="black" className="mt-28">
            Projets Techniques
            <svg
              viewBox="0 0 200 20"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary text-lg w-full h- text-center"
            >
              <path
                d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              ></path>
            </svg>
          </Typography>
        </div>

        <Typography weight="medium" className="text-center max-w-3xl mx-auto">
          Portfolio regroupant des applications web dynamiques, intégration
          d’APIs, gestion des utilisateurs, interfaces responsive, et tableaux
          de bord interactifs. Les projets démontrent mes capacités en
          conception, logique métier et intégration moderne.
        </Typography>
      </div>

      {/* Boutons de navigation (tabs) */}
      <div className="flex space-x-4 justify-center pt-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition ${
              activeTab === tab.id
                ? "bg-primary text-white hover:scale-105 duration-300"
                : "text-gray-800 hover:bg-primary-100 hover:text-primary"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Liste des projets (grille) */}
      <AnimatePresence mode="wait">
        {!selectedProduct && (
          <motion.div
            initial={{ opacity: 0, y: 1 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {currentTab?.products.map((product) => (
              <div
                key={product.id}
                className="shadow-lg rounded-lg group hover:shadow-xl transition-transform duration-300"
              >
                {/* Image du projet */}
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="relative rounded-t-lg h-40 lg:h-[30em] bg-cover bg-center cursor-pointer transition"
                  style={{ backgroundImage: `url(${product.img})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black group-hover:opacity-80 opacity-0 transition duration-700 flex items-end p-4 gap-4">
                    <Button
                      variant="ico"
                      size="small"
                      icon={{ icon: AiFillEye }}
                    />
                    <Button
                      variant="ico"
                      baseUrl={product.link}
                      size="small"
                      icon={{ icon: AiOutlineArrowRight }}
                    />
                  </div>
                </div>

                {/* Infos du projet */}
                <div className="bg-white h-40 p-4 lg:p-6 rounded-b-lg space-y-2">
                  <Typography variant="medium" theme="primary">
                    {product.title}
                  </Typography>
                  <Typography
                    variant="medium"
                    theme="black"
                    className="font-bold"
                  >
                    {product.subtitle}
                  </Typography>
                  <Typography variant="small" className="line-clamp-2">
                    {product.description}
                  </Typography>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de détail projet */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md max-w-4xl w-full relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-50 text-black bg-white p-2"
            >
              <AiOutlineClose size={20} />
            </button>

            {/* Carousel d’images */}
            <div className="w-full h-[500px] relative">
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay
                className="w-full h-full"
              >
                {selectedProduct.images?.map((img, index) => (
                  <SwiperSlide key={index} className="relative w-full h-full">
                    <Image
                      src={img}
                      alt={selectedProduct.title}
                      fill
                      className="object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Détail du projet (optionnel à réactiver si besoin) */}
            {/* <Typography variant="large" className="text-center mt-4">
              {selectedProduct.title}
            </Typography>
            <Typography className="text-center mt-2">
              {selectedProduct.description}
            </Typography> */}
          </div>
        </div>
      )}
    </Container>
  );
}
