import { useState } from "react";
import { Container } from "../container/container";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { ActiveLink } from "./active-link";
import { Typography } from "@/ui/design-systeme/typography/typography";
import { Logo } from "@/ui/design-systeme/logo/logo";
import { SocialNetworkButton } from "./social-network-button";
import clsx from "clsx";
import { FaFlagUsa, FaFlag } from "react-icons/fa";
import { BsChevronExpand } from "react-icons/bs";
import i18n from "@/i18n";

interface Props {
  className?: string;
  isTransparent?: boolean;
}

export const Navigation = ({ className, isTransparent = false }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [selectedLang, setSelectedLang] = useState(i18n.language || "en");

  const handleChange = (lang: string) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
  };

  const textColorClass = isTransparent ? "text-white" : "text-black";
  const hoverColorClass = isTransparent
    ? "hover:text-gray-200"
    : "hover:text-gray-700";

  return (
    <div className={clsx(className, "w-full")}>
      <Container
        className={clsx(
          "max-w-[97em] mx-auto rounded-full px-6 py-3 mt-6 flex justify-between items-center transition-all duration-300",
          {
            "bg-white shadow-lg": !isTransparent,
            "bg-transparent shadow-none": isTransparent,
          }
        )}
      >
        <Logo />

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {["Home", "About", "Resume", "Portfolio", "Contact"].map(
            (item, index) => (
              <ActiveLink key={index} href={`#${item.toLowerCase()}`}>
                <Typography
                  variant="medium"
                  className={clsx(
                    "font-medium transition-colors",
                    textColorClass,
                    hoverColorClass
                  )}
                >
                  {item}
                </Typography>
              </ActiveLink>
            )
          )}
        </div>

        {/* Réseaux sociaux + langue */}
        <div className="hidden md:block">
          <div className="flex items-center gap-4">
            {/* Sélecteur de langue amélioré */}
            <div className="relative">
              <label className="swap swap-rotate cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedLang === "fr"}
                  onChange={() =>
                    handleChange(selectedLang === "en" ? "fr" : "en")
                  }
                />

                <div
                  className={clsx(
                    "swap-on text-sm uppercase font-semibold px-3 py-1 rounded-md border transition-colors",
                    textColorClass,
                    hoverColorClass
                  )}
                >
                  FR
                </div>

                <div
                  className={clsx(
                    "swap-off text-sm uppercase font-semibold px-3 py-1 rounded-md border transition-colors",
                    textColorClass,
                    hoverColorClass
                  )}
                >
                  EN
                </div>
              </label>
            </div>

            <SocialNetworkButton />
          </div>
        </div>

        {/* Menu Burger (Mobile) */}
        <button
          onClick={toggleMenu}
          className={clsx(
            "md:hidden text-2xl transition-colors",
            textColorClass
          )}
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </Container>

      {/* Menu Mobile */}
      <div
        className={clsx(
          "fixed top-0 left-0 w-60 h-full bg-white shadow-md transform transition-transform duration-300",
          {
            "translate-x-0": menuOpen,
            "-translate-x-full": !menuOpen,
          },
          "md:hidden"
        )}
      >
        <div className="p-6 flex flex-col items-center">
          <button
            onClick={toggleMenu}
            className="mt-4 text-xl absolute right-3"
          >
            <AiOutlineClose />
          </button>
          {["Home", "About", "Resume", "Portfolio", "Contact"].map(
            (item, index) => (
              <ActiveLink
                key={index}
                href={`#${item.toLowerCase()}`}
                className="py-2 text-lg"
              >
                {item}
              </ActiveLink>
            )
          )}
        </div>
      </div>
    </div>
  );
};
