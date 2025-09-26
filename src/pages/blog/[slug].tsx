// src/pages/blog/[slug].tsx
import { prisma } from "@/lib/prisma";
import { Seo } from "@/ui/components/seo/seo";
import { Layout } from "@/ui/components/layout/layout";
import { ContainerContenu } from "@/ui/components/container/container";
import Image from "next/image";
import { GetServerSideProps } from "next";

export default function BlogDetail({ post }: { post: any }) {
  if (!post) return <p>Article non trouvé.</p>;

  return (
    <>
      <Seo title={`Ikolo | ${post.title}`} description={post.excerpt || ""} />

      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen">
        <Layout isDisplayBreakCrumbs={false}>
          <ContainerContenu className="max-w-4xl py-16">
            {post.image && (
              <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

            <h1 className="text-3xl font-bold text-primary mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-gray-600 italic mb-6">{post.excerpt}</p>
            )}

            <div className="prose prose-md max-w-full text-gray-700">
              {post.content.split("\n").map((line: string, idx: number) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </ContainerContenu>
        </Layout>
      </div>
    </>
  );
}

// --- SSR pour récupérer l'article par slug ---
export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;

  const post = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post: {
        ...post,
        createdAt: post.createdAt.toISOString(),
      },
    },
  };
};
