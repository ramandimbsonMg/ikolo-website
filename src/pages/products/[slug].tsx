import { prisma } from "@/lib/prisma";
import { Container } from "@/ui/components/container/container";
import { Layout } from "@/ui/components/layout/layout";
import ProductCard from "@/ui/components/products/product-card";
import { Seo } from "@/ui/components/seo/seo";
import { useCart } from "@/pages/api/cart/use-cart";

export default function ProductDetail({
  product,
  related,
}: {
  product: any;
  related: any[];
}) {
  const { addToCart } = useCart();

  if (!product) {
    return (
      <Layout isDisplayBreakCrumbs={false}>
        <Container>
          <p className="text-center py-20 text-gray-600">
            Produit introuvable.
          </p>
        </Container>
      </Layout>
    );
  }

  return (
    <>
      <Seo
        title={`Ikolo | ${product.name}`}
        description={product.description?.slice(0, 150) || ""}
      />

      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen">
        <Layout isDisplayBreakCrumbs={false}>
          <Container>
            <section className="py-16">
              {/* Header produit */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-xl shadow-lg w-full object-cover"
                  />
                </div>

                {/* Infos produit */}
                <div>
                  <h1 className="text-4xl font-extrabold text-primary mb-4">
                    {product.name}
                  </h1>
                  <p className="text-lg text-gray-700 mb-6">
                    {product.description}
                  </p>
                  <p className="text-2xl font-bold text-green-600 mb-6">
                    {product.price.toLocaleString()} Ar
                  </p>

                  {/* Bouton ajout panier */}
                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                      })
                    }
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </section>

            {/* Produits similaires */}
            {related.length > 0 && (
              <section className="py-12 border-t border-gray-200 mt-12">
                <h2 className="text-2xl font-bold text-primary mb-8 text-center">
                  Produits similaires
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {related.map((p) => (
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
              </section>
            )}
          </Container>
        </Layout>
      </div>
    </>
  );
}

// -----------------------------
// ✅ Récupération côté serveur
// -----------------------------
export async function getServerSideProps({ params }: any) {
  const slug = params.slug as string; // ✅

  const product = await prisma.product.findUnique({
    where: { slug }, // mila string mivantana
  });

  if (!product) {
    return { props: { product: null, related: [] } };
  }

  const related = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
  });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      related: JSON.parse(JSON.stringify(related)),
    },
  };
}

