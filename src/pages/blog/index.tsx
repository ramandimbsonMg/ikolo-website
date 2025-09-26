import { prisma } from "@/lib/prisma";
import { Seo } from "@/ui/components/seo/seo";
import { Layout } from "@/ui/components/layout/layout";
import { ContainerContenu } from "@/ui/components/container/container";
import Testimonials from "@/ui/components/testimonials/testimonials";
import NewsletterSection from "@/ui/components/newsletter/newsletter";
import BlogList from "@/ui/components/blog/blog-list";


export default function Blog({ posts, testimonials, newsletters }: any) {
  return (
    <>
      <Seo
        title="Ikolo | Blog & Actualités"
        description="Découvrez nos actualités, conseils beauté et articles autour des plantes malgaches."
      />
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen">
        <Layout isDisplayBreakCrumbs={false}>
          <ContainerContenu>
            <BlogList posts={posts} />
            <Testimonials initialTestimonials={testimonials} />
            <NewsletterSection initialSubscribers={newsletters} />
          </ContainerContenu>
        </Layout>
      </div>
    </>
  );
}

// --- SSR ---
export async function getServerSideProps() {
  const posts = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
  const newsletters = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return {
    props: {
      posts: posts.map((p) => ({
        ...p,
        createdAt: p.createdAt.toISOString(),
      })),
      testimonials: testimonials.map((t) => ({
        ...t,
        createdAt: t.createdAt.toISOString(),
      })),
      newsletters: newsletters.map((n) => ({
        ...n,
        createdAt: n.createdAt.toISOString(),
      })),
    },
  };
}
