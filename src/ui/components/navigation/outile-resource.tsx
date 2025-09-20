import { useState } from "react";
import { Typography } from "@/ui/design-systeme/typography/typography";
import { outlines } from "@/data/outiles/outiles";
import { AiOutlineFacebook } from "react-icons/ai";

export const OutlinesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const current = outlines[activeTab];

  const nextImage = () => {
    setCarouselIndex((prev) => (prev + 1) % current.carousel.length);
  };
  const prevImage = () => {
    setCarouselIndex(
      (prev) => (prev - 1 + current.carousel.length) % current.carousel.length
    );
  };

  // Vérifie si le média est une vidéo
  const renderMedia = (src: string, className: string) => {
    if (src.endsWith(".mp4")) {
      return <video src={src} controls className={`${className} bg-black`} />;
    }
    return <img src={src} alt="media" className={className} />;
  };

  return (
    <section className="z-20">
      <div>
        <Typography
          variant="2xlarge"
          theme="primary"
          className="text-center mb-8"
        >
          Nos Outlines & Ressources
        </Typography>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-4 mb-6">
          {outlines.map((outline, idx) => (
            <button
              key={outline.title}
              onClick={() => {
                setActiveTab(idx);
                setCarouselIndex(0);
              }}
              className="flex flex-col items-center"
            >
              <div
                className={`relative z-10 flex flex-col items-center border-r-4 border-gray-600 rounded-xl transition-transform cursor-pointer w-20 h-20 sm:w-24 sm:h-24 ${
                  activeTab === idx
                    ? "bg-primary text-white scale-105"
                    : "bg-white text-white hover:scale-105"
                }`}
              >
                <img
                  src={outline.thumbnail}
                  alt={outline.title}
                  className="w-full h-full object-containe pointer-events-none"
                />
              </div>
              <Typography
                variant="small"
                className="font-bold mt-2 text-center w-[80px] sm:w-[120px]"
              >
                {outline.title}
              </Typography>
            </button>
          ))}
        </div>

        {/* Contenu du tab */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 rounded-2xl pt-6 lg:pt-14">
          {/* Left: media principal + carousel */}
          <div className="w-full lg:col-span-7 rounded border-[6px] lg:border-[8px] border-primary flex-col items-center h-56 sm:h-72 lg:h-[24.5rem] overflow-hidden">
            <div className="relative w-full flex items-center justify-center">
              {renderMedia(
                current.carousel[carouselIndex],
                "w-full h-56 sm:h-72 lg:h-[24.5rem] object-cover"
              )}
              <button
                onClick={prevImage}
                className="absolute left-2 bg-white w-8 h-8 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors"
              >
                ◀
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 bg-white w-8 h-8 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors"
              >
                ▶
              </button>
            </div>
          </div>

          {/* Right: description */}
          <div className="w-full lg:col-span-5 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Titre + thumbnail */}
              <div className="flex flex-col sm:flex-row items-center sm:gap-4 text-center sm:text-left">
                <div className="border-r-4 border-gray-600 rounded-xl w-28 h-20 sm:w-40 sm:h-22 bg-primary text-white flex items-center justify-center mb-2 sm:mb-0">
                  <img
                    src={current.thumbnail}
                    alt={current.title}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  {current.title}
                </h1>
              </div>

              {/* Bouton */}
              <div className="flex justify-center sm:justify-end">
                <button className="border-2 border-primary rounded-full flex gap-1 items-center px-4 py-2 text-sm sm:text-base hover:bg-primary hover:text-white text-primary font-bold">
                  <AiOutlineFacebook className="w-5 h-5 sm:w-6 sm:h-6" />
                  Visiter
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-200 px-3 pt-4 pb-4 mt-2 rounded-lg text-center sm:text-left">
              <Typography
                variant="small"
                theme="gray"
                className="text-base sm:text-lg"
              >
                {current.description}
              </Typography>
            </div>
            {/* Programme & Transport */}
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Programme */}
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full p-2 text-xl">
                  🕒
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Programme</p>
                  <p className="text-sm text-gray-600">
                    08h30 - 10h30 : Activité
                  </p>
                  <p className="text-sm text-gray-600">
                    10h30 - 12h00 : Jeux éducatifs
                  </p>
                </div>
              </div>

              {/* Transport */}
              <div className="flex items-center gap-3 bg-white rounded-lg">
                <div className="flex-shrink-0 bg-green-100 text-green-600 rounded-full p-2 text-xl">
                  🚌
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Transport</p>
                  <p className="text-sm text-gray-600">
                    Bus scolaire disponible
                  </p>
                  <p className="text-sm text-gray-600">
                    🚲 Accès vélo & 🚶 Marche
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
