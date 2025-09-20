import prisma from "@/lib/prisma";
import { ContainerContenu } from "@/ui/components/container/container";
import { Layout } from "@/ui/components/layout/layout";
import ProductCard from "@/ui/components/products/product-card";
import ProductFilter from "@/ui/components/products/product-filter";
import { Seo } from "@/ui/components/seo/seo";
import { useState } from "react";

export default function Products({
  products,
  plants,
}: {
  products: any[];
  plants: string[];
}) {
  const [list, setList] = useState(products);

  function handleFilter(filters: any) {
    let filtered = products;
    if (filters.category)
      filtered = filtered.filter((p) => p.category === filters.category);
    if (filters.plant)
      filtered = filtered.filter((p) => p.plant === filters.plant);
    setList(filtered);
  }

  return (
    <>
      <Seo
        title="Ikolo | Beauté naturelle malgache"
        description="Produits cosmétiques à base de plantes de Madagascar."
      />

      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen">
        <Layout isDisplayBreakCrumbs={false}>
          <ContainerContenu>
            <section className="py-16">
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-primary">
                  Nos Produits
                </h2>
                <p className="text-gray-600 mt-3">
                  Découvrez nos cosmétiques naturels et filtrez par type ou
                  plante.
                </p>
              </div>

              {/* Filtres */}
              <div className="bg-white/70 backdrop-blur-md shadow-md rounded-xl p-6 mb-10">
                <ProductFilter plants={plants} onFilter={handleFilter} />
              </div>

              {/* Produits */}
              {list.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {list.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 mt-8">
                  Aucun produit trouvé pour ce filtre.
                </p>
              )}
            </section>
          </ContainerContenu>
        </Layout>
      </div>
    </>
  );
}

// Récupération côté serveur
export async function getServerSideProps() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const plants = Array.from(
    new Set(products.map((p) => p.plant).filter(Boolean))
  );

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      plants,
    },
  };
}
