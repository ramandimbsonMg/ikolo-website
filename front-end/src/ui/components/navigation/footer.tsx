import { Container } from "../container/container";
import Image from "next/image";
import { RiMessage2Fill } from "react-icons/ri";
import { Footer_Links } from "./app-links";
import { v4 as uuidv4 } from "uuid";
import { ActiveFooterLink } from "./active-link";
import clsx from "clsx";
import { Typography } from "@/ui/design-systeme/typography/typography";
import { AppLinks, FooterLinks } from "@/types/app-links";
import { LinkTypes } from "@/lib/link-type";
import { SocialNetworkButton } from "./social-network-button";
import {
    FaChevronUp,
  FaGithub,
  FaGooglePlusG,
  FaHtml5,
  FaSkype,
  FaStackOverflow,
} from "react-icons/fa";
import { useEffect, useState } from "react";
interface Props {
  className?: string;
}
export const Footer = ({ className }: Props) => {
  const currentYear = new Date().getFullYear();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className={clsx("", className)}>
      <Container>
        {/* FOOTER SECTION */}
        <footer className="bg-white py-16 px-4 text-gray-500">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-6 text-3xl text-gray-400 mb-6">
              <FaGithub className="hover:text-blue-500 transition cursor-pointer" />
              <FaGooglePlusG className="hover:text-blue-500 transition cursor-pointer" />
              <FaStackOverflow className="hover:text-blue-500 transition cursor-pointer" />
              <FaHtml5 className="hover:text-blue-500 transition cursor-pointer" />
              <FaSkype className="hover:text-blue-500 transition cursor-pointer" />
            </div>
            <p>Merci de visiter mon profil. N’hésitez pas à me contacter !</p>
            <p className="mt-2">
              Espoir — Développeur & Étudiant à Madagascar 🇲🇬
            </p>

            {showTopBtn && (
              <div className="mt-10">
                <button
                  onClick={scrollToTop}
                  className="text-4xl hover:animate-bounce text-gray-500 hover:text-primary transition"
                >
                  <FaChevronUp />
                </button>
              </div>
            )}
          </div>
        </footer>
      </Container>
    </div>
  );
};

interface FooterLinkProps {
  data: FooterLinks;
}

const FooterLink = ({ data }: FooterLinkProps) => {
  const linksList = data.links.map((link) => (
    <div key={uuidv4()}>
      {link.type === LinkTypes.INTERNAL && (
        <ActiveFooterLink href={link.baseUrl}>{link.label}</ActiveFooterLink>
      )}
      {link.type === LinkTypes.EXTERNAL && (
        <a href={link.baseUrl} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      )}
    </div>
  ));

  return (
    <div className="min-w-[150px]">
      <Typography
        variant="semimedium"
        weight="medium"
        className="pb-5 text-black"
      >
        {data.label}
      </Typography>
      <div className="space-y-4">{linksList}</div>
    </div>
  );
};
