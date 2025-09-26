import Image from "next/image";
import { Seo } from "@/ui/components/seo/seo";
import { Layout } from "@/ui/components/layout/layout";
import { ContainerContenu } from "@/ui/components/container/container";

export default function About() {
  return (
    <>
      <Seo
        title="Ikolo | Beauté naturelle malgache"
        description="Produits cosmétiques à base de plantes de Madagascar, respectueux de la peau et de l'environnement."
      />
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen">
        <Layout isDisplayBreakCrumbs={false} className="">
          <ContainerContenu>
            <section className="px-6 py-8">
                  {/* Header */}
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-primary">
                      🌿 À propos d’Ikolo
                    </h2>
                  </div>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Texte */}
                <div>

                  <p className="mt-6 text-gray-700 leading-relaxed">
                    Ikolo est née de la passion pour la beauté naturelle et la
                    richesse botanique unique de Madagascar. Notre marque
                    propose des cosmétiques formulés à partir des plantes
                    malgaches les plus précieuses, en combinant traditions
                    locales et innovation moderne.
                  </p>

                  <p className="mt-4 text-gray-700 leading-relaxed">
                    Notre mission est de valoriser le savoir-faire malgache,
                    soutenir les communautés locales et offrir des produits
                    efficaces, doux pour la peau et respectueux de
                    l’environnement. Chaque produit Ikolo est pensé pour
                    apporter bien-être, authenticité et confiance à celles et
                    ceux qui l’utilisent.
                  </p>

                  <h3 className="mt-8 text-2xl font-semibold text-gray-800">
                    Nos valeurs
                  </h3>
                  <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-600">
                    <li>
                      🌱 Authenticité : des formulations naturelles et
                      transparentes
                    </li>
                    <li>
                      🍃 Naturalité : des ingrédients purs, issus des plantes
                      malgaches
                    </li>
                    <li>
                      💪 Empowerment féminin : soutenir l’indépendance et la
                      créativité des femmes
                    </li>
                    <li>
                      🤝 Soutien aux filières locales : favoriser le commerce
                      équitable et durable
                    </li>
                  </ul>

                  <h3 className="mt-8 text-2xl font-semibold text-gray-800">
                    Nos engagements
                  </h3>
                  <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-600">
                    <li>
                      🌿 Bienfaits naturels : des soins efficaces pour tous
                      types de peau
                    </li>
                    <li>
                      🌍 Respect de l’environnement : des emballages
                      écoresponsables et une production durable
                    </li>
                    <li>
                      👩‍🌾 Soutien aux communautés : partenariats avec des
                      producteurs locaux pour valoriser le patrimoine végétal
                    </li>
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
