// src/pages/about.tsx
import Image from "next/image";
import { Seo } from "@/ui/components/seo/seo";
import { Layout } from "@/ui/components/layout/layout";
import { ContainerContenu } from "@/ui/components/container/container";

export default function About() {
  return (
    <>
      <Seo
        title="Ikolo | Beauté naturelle malgache"
        description="Produits cosmétiques à base de plantes de Madagascar."
      />
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen">
        <Layout isDisplayBreakCrumbs={false} className="">
          <ContainerContenu>
            <section className="px-6 py-16">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Texte */}
                <div>
                  <h1 className="text-4xl font-extrabold text-primary">
                    🌿 À propos d’Ikolo
                  </h1>
                  <p className="mt-6 text-gray-700 leading-relaxed">
                    Ikolo est une marque de cosmétiques naturels formulés à
                    partir des plantes malgaches. Notre mission est de{" "}
                    <span className="text-primary-600 font-medium">
                      valoriser la richesse floristique de Madagascar
                    </span>
                    , soutenir les communautés locales et proposer des soins
                    efficaces et respectueux de la peau.
                  </p>

                  <h3 className="mt-8 text-2xl font-semibold text-gray-800">
                    Nos valeurs
                  </h3>
                  <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-600">
                    <li>🌱 Authenticité</li>
                    <li>🍃 Naturalité</li>
                    <li>💪 Empowerment féminin</li>
                    <li>🤝 Soutien aux filières locales</li>
                  </ul>
                </div>

                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/assets/images/apropos/1.jpg"
                    alt="Fondatrice d’Ikolo"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            </section>
          </ContainerContenu>
        </Layout>
      </div>
    </>
  );
}
