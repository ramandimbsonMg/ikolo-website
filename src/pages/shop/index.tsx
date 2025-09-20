// src/pages/shop.tsx
import prisma from "@/lib/prisma";
import ProductCard from "@/ui/components/products/product-card";
import { Seo } from "@/ui/components/seo/seo";
import { Layout } from "@/ui/components/layout/layout";
import { ContainerContenu } from "@/ui/components/container/container";
import { useState } from "react";

export default function Shop({ products }: { products: any[] }) {
  const [cartOpen, setCartOpen] = useState(false);

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
              {/* En-tête boutique */}
              <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-extrabold text-primary">
                  🌿 Boutique Ikolo
                </h1>
                <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                  Découvrez nos produits cosmétiques à base de plantes
                  malgaches.
                  <br />
                  Commande simulée — aucun paiement réel.
                </p>
              </div>

              {/* Liste des produits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {/* Séparateur */}
              <div className="my-16 border-t border-gray-200" />

              {/* Formulaire de commande */}
              <div className="max-w-lg mx-auto bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-semibold text-gray-800">
                  📝 Simuler une commande
                </h3>
                <p className="text-gray-600 mt-1">
                  Remplissez ce formulaire pour simuler une commande.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(
                      "✅ Commande simulée — Backend requis pour réel envoi."
                    );
                  }}
                  className="grid gap-4 mt-6"
                >
                  <input
                    placeholder="Nom complet"
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    required
                  />
                  <input
                    placeholder="Adresse de livraison"
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    required
                  />
                  <select
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    required
                  >
                    <option value="">Choisir un produit</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition"
                  >
                    Envoyer la commande
                  </button>
                </form>
              </div>
            </section>
          </ContainerContenu>
        </Layout>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
