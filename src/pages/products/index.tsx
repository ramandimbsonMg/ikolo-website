"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { prisma } from "@/lib/prisma";
import { Container } from "@/ui/components/container/container";
import { Layout } from "@/ui/components/layout/layout";
import ProductCard from "@/ui/components/products/product-card";
import ProductFilter from "@/ui/components/products/product-filter";
import { Seo } from "@/ui/components/seo/seo";

export default function Products({
  products,
  plants,
}: {
  products: any[];
  plants: string[];
}) {
  const [list, setList] = useState(products);
  const { addToCart } = useCart();

  function handleFilter(filters: { plant: string; categoryId: number | "" }) {
    const { plant, categoryId } = filters;

    let filtered = products;

    // Filtre catégorie
    if (categoryId !== "") {
      filtered = filtered.filter((p) => p.categoryId === categoryId);
    }

    // Filtre plante
    if (plant) {
      filtered = filtered.filter((p) => p.plant === plant);
    }

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
          <Container>
            <section className="py-8">
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
              <div className="bg-white/70 backdrop-blur-md shadow-md rounded-xl px-6 pt-3 pb-3 mb-10 w-full md:w-1/3 mx-auto">
                <ProductFilter plants={plants} onFilter={handleFilter} />
              </div>

              {/* Produits */}
              {list.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {list.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onAdd={() =>
                        addToCart({
                          id: p.id,
                          name: p.name,
                          price: p.price,
                          image: p.image,
                          quantity: 1,
                        })
                      }
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 mt-8">
                  Aucun produit trouvé pour ce filtre.
                </p>
              )}
            </section>
          </Container>
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
