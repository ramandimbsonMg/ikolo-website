import HeroBanner from "@/ui/components/actuality/hero-baner";
import ProductCard from "@/ui/components/products/product-card";
import SectionTitle from "@/ui/components/section/section-title";
import { PrismaClient } from "@prisma/client";

// Prisma Client
const prisma = new PrismaClient();

export function LandignPageView({ products }: { products: any[] }) {
  return (
    <>
      <HeroBanner />
      <section className="container mx-auto px-6 py-12">
        <SectionTitle title="Nos best-sellers" subtitle="Les favoris Ikolo" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}

// Récupération côté serveur
export async function getServerSideProps() {
  const products = await prisma.product.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
