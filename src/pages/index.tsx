
import { ContainerContenu } from "@/ui/components/container/container";
import { Layout } from "@/ui/components/layout/layout";
import { Seo } from "@/ui/components/seo/seo";
import { LandingPageContainer } from "@/ui/module/landing-page/landing-page.container";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 } // L'élément doit être à 10% visible
    );

    const sections = document.querySelectorAll(".fade-in");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect(); // Nettoie l'observateur au démontage
  }, []);

  return (
    <>
      <Seo
        title="Ikolo | Beauté naturelle malgache"
        description="Produits cosmétiques à base de plantes de Madagascar."
      />

      <div className="bg-white bg-opacity-50">
        <Layout isDisplayBreakCrumbs={false}>
          <ContainerContenu>
            <LandingPageContainer />
          </ContainerContenu>
        </Layout>
      </div>
    </>
  );
}
