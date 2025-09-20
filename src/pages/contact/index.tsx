// src/pages/contact.tsx

import {
  FiMail,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiMessageCircle,
} from "react-icons/fi";
import ContactForm from "@/ui/components/contact/contact-form";
import { Seo } from "@/ui/components/seo/seo";
import { Layout } from "@/ui/components/layout/layout";
import Link from "next/link";
import Image from "next/image";

export default function Contact() {
  return (
    <>
      <Seo
        title="Ikolo | Beauté naturelle malgache"
        description="Produits cosmétiques à base de plantes de Madagascar."
      />
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50">
        <Layout isDisplayBreakCrumbs={false} className="">
          <section className="container mx-auto px-6 py-16">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-primary">
                Contactez-nous
              </h2>
              <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                Une question, une suggestion ou besoin d’information ?
                Envoyez-nous un message ou retrouvez-nous sur les réseaux
                sociaux.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Formulaire */}
              <div className="bg-white shadow-lg rounded-2xl lg:pt-20 p-8">
                <Link href="/" className="flex items-center gap-3 justify-center">
                  <Image
                    src="/assets/images/logo/logo_ikolo~2.png"
                    alt="Ikolo"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                  {/* <div>
                        <h1 className="font-bold text-xl tracking-wide text-green-800">
                          Ikolo
                        </h1>
                        <p className="text-xs text-gray-500 italic">
                          La beauté enracinée dans la nature malgache
                        </p>
                      </div> */}
                </Link>
                <h1 className="text-3xl font-bold text-center text-primary mb-6">
                  Envoyez-nous un message
                </h1>
                <ContactForm />
              </div>

              {/* Coordonnées */}
              <div className="space-y-6">
                <div className="bg-white shadow-md rounded-2xl p-6 flex items-start gap-4">
                  <FiMail className="text-secondary text-2xl mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-primary">
                      Email
                    </h4>
                    <p className="text-gray-600">contact@ikolo.mg</p>
                  </div>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 flex items-start gap-4">
                  <FiMessageCircle className="text-secondary text-2xl mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-primary">
                      Réseaux sociaux
                    </h4>
                    <p className="text-gray-600">Instagram, Facebook, TikTok</p>
                    <div className="flex gap-4 mt-2 text-xl text-gray-500">
                      <FiInstagram className="hover:text-secondary cursor-pointer" />
                      <FiFacebook className="hover:text-secondary cursor-pointer" />
                      <FiMessageCircle className="hover:text-secondary cursor-pointer" />
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 flex items-start gap-4">
                  <FiMapPin className="text-secondary text-2xl mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-primary">
                      Adresse
                    </h4>
                    <p className="text-gray-600">Antananarivo, Madagascar</p>
                    {/* Si tu as une adresse physique précise, tu peux intégrer Google Maps ici */}
                    <div className="mt-3 rounded-lg overflow-hidden w-full">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127651.76937614328!2d47.4782734!3d-18.8791906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07d4b7f10c2a7%3A0x6b5d5b3f9a8a9e3!2sAntananarivo!5e0!3m2!1sfr!2smg!4v1679936017391!5m2!1sfr!2smg"
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        loading="lazy"
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </div>
    </>
  );
}
