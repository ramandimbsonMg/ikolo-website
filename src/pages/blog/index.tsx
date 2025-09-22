// src/pages/blog.tsx
import { prisma } from "@/lib/prisma";
import BlogCard from "@/ui/components/blog/blog-card";
import { Seo } from "@/ui/components/seo/seo";
import { Layout } from "@/ui/components/layout/layout";
import { ContainerContenu } from "@/ui/components/container/container";

export default function Blog({ posts }: { posts: any[] }) {
  return (
    <>
      <Seo
        title="Ikolo | Blog & Actualités"
        description="Découvrez nos actualités, conseils beauté et articles autour des plantes malgaches."
      />

      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen">
        <Layout isDisplayBreakCrumbs={false} className="">
          <ContainerContenu>
            <section className="px-6 py-16">
              <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl font-extrabold text-primary">
                  📰 Blog
                </h1>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Explorez nos derniers articles sur la beauté naturelle,
                  l’utilisation des plantes malgaches et les initiatives Ikolo.
                </p>
              </div>

              {/* Liste des articles */}
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
                  {posts.map((p) => (
                    <BlogCard key={p.id} post={p} />
                  ))}
                </div>
              ) : (
                <p className="mt-12 text-center text-gray-500">
                  Aucun article publié pour le moment. 🌱
                </p>
              )}
            </section>
          </ContainerContenu> 
        </Layout>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const posts = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
  return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
}
