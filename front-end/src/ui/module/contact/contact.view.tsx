import { Container } from "@/ui/components/container/container";
import { Box } from "@/ui/design-systeme/box/box";
import { Typography } from "@/ui/design-systeme/typography/typography";
import Link from "next/link";
import {
  AiOutlineArrowRight,
  AiOutlineEnvironment,
  AiOutlineFacebook,
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { ContactForm } from "./contact.form";
import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";

interface Props {
  contact?: contactItem[];
}

export const ContactView = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container className="mt-4 lg:container lg:mx-auto relative px-6 space-y-2 lg:pt-20">
        <div className="text-center justify-center flex items-center mt-8">
          <Typography variant="display" theme="black">
            Contact
            <svg
              viewBox="0 0 200 20"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
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
        <div className="lg:pt-4 lg:grid grid-cols-1 lg:grid-cols-2 lg:gap-6 space-y-4 lg:space-y-0 lg:items-center h-full">
          <div className="space-y-4 h-full">
            <Typography variant="large" theme="black" className="pb-6 pt-2">
              Je suis disponible pour répondre à toutes vos questions et
              discuter de mes compétences.
            </Typography>
            <div className="grid grid-cols-2 gap-2 space-y-6 shadow-lg pt-2 pb-4 px-3 bg-white rounded-lg">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-primary-100 text-primary rounded-full flex justify-center items-center group-hover:bg-primary group-hover:text-white">
                  <AiOutlineEnvironment className="w-6 h-6" />
                </div>
                <div>
                  <Typography variant="medium" theme="black" weight="medium">
                    Adresse
                  </Typography>
                  <Typography
                    variant="semimedium"
                    className="group-hover:text-primary"
                  >
                    Madagascar - Antananarivo
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-primary-100 text-primary rounded-full flex justify-center items-center transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <AiOutlinePhone className="w-6 h-6" />
                </div>
                <Link
                  href="tel:+261389052467"
                  className="group-hover:text-primary transition-all duration-300"
                >
                  <Typography variant="medium" theme="black" weight="medium">
                    Contact
                  </Typography>
                  <Typography variant="semimedium">
                    +261 38 90 524 67
                  </Typography>
                </Link>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-primary-100 text-primary rounded-full flex justify-center items-center group-hover:bg-primary group-hover:text-white">
                  <AiOutlineMail className="w-6 h-6" />
                </div>
                <div>
                  <Typography variant="medium" theme="black" weight="medium">
                    Email
                  </Typography>
                  <Typography
                    variant="semimedium"
                    className="group-hover:text-primary"
                  >
                    <a href="mailto:ramandimbsonespoir@gmail.com">
                      ramandimbsonespoir@gmail.com
                    </a>
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-primary-100 text-primary rounded-full flex justify-center items-center group-hover:bg-primary group-hover:text-white">
                  <AiOutlineFacebook className="w-6 h-6" />
                </div>
                <div>
                  <Typography variant="medium" theme="black" weight="medium">
                    Facebook
                  </Typography>
                  <a
                    href="https://web.facebook.com/people/Ter-Esp%C3%A9rant%C3%B8/100078807523670/?_rdc=1&_rdr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ter Esperanto
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 group pb-2">
                <div className="w-10 h-10 bg-primary-100 text-primary rounded-full flex justify-center items-center group-hover:bg-primary group-hover:text-white">
                  <AiOutlineLinkedin className="w-6 h-6" />
                </div>
                <div>
                  <Typography variant="medium" theme="black" weight="medium">
                    Linkedin
                  </Typography>
                  <a
                    href="www.linkedin.com/in/ramandimbson-espoir-mathieu-8a4516291"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ramandimbson Espoir Mathieu
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-primary-100 text-primary rounded-full flex justify-center items-center group-hover:bg-primary group-hover:text-white">
                  <AiOutlineWhatsApp className="w-6 h-6" />
                </div>
                <div>
                  <Typography variant="medium" theme="black" weight="medium">
                    WhatsApp
                  </Typography>
                  <a
                    href="https://wa.me/+261389052467"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary hover:underline"
                  >
                    +261 38 90 524 67
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-primary-100 text-primary rounded-full flex justify-center items-center group-hover:bg-primary group-hover:text-white">
                  <AiOutlineGithub className="w-6 h-6" />
                </div>
                <div>
                  <Typography variant="medium" theme="black" weight="medium">
                    Github
                  </Typography>
                  <a
                    href="https://wa.me/+261389052467"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary hover:underline"
                  >
                    RamandimbsonMg
                  </a>
                </div>
              </div>
              <div
                className="hover:text-primary cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <Typography className="flex items-center gap-2">
                  Ouvrir map <AiOutlineArrowRight />
                </Typography>
              </div>
            </div>
          </div>
          <Box padding_x="px-6" padding_y="py-3" className="space-y-6">
            <ContactForm />
          </Box>
        </div>
        <div>
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg w-[90%] max-w-3xl">
                <div className="flex justify-between items-center p-4 border-b">
                  <Typography variant="large" theme="black">
                    Location
                  </Typography>
                  <button
                    className="text-gray-500 hover:text-red-500 text-xl"
                    onClick={() => setOpen(false)}
                  >
                    ✕
                  </button>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m32!1m12!1m3!1d1598.1236675722462!2d47.56086691001837!3d-18.832621306858243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m17!3e2!4m5!1s0x21f0869d6701a5b3%3A0xbb185929a1400399!2sCommune%20Sabotsy%20Namehana!3m2!1d-18.835880799999998!2d47.5555443!4m5!1s0x21f084479c2784a5%3A0xff97772879e1d450!2sSabotsy%20Namehana!3m2!1d-18.836067099999998!2d47.5554746!4m3!3m2!1d-18.8331959!2d47.5620775!5e0!3m2!1sfr!2smg!4v1737395437199!5m2!1sfr!2smg"
                  width="100%"
                  height="300"
                  style={{ border: "0" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
              </div>
            </div>
          )}
        </div>
        
      </Container>
    </>
  );
};
