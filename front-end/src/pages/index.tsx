import { useEffect, useState } from "react";
import { Container } from "@/ui/components/container/container";
import { Layout } from "@/ui/components/layout/layout";
import { Seo } from "@/ui/components/seo/seo";
import { LandingPageContainer } from "@/ui/module/landing-page/landing-page.container";
import { AProposContainer } from "@/ui/module/propos/propos.container";
import { ContactView } from "@/ui/module/contact/contact.view";
import { Navigation } from "@/ui/components/navigation/navigation";
import { PortfolioContainer } from "@/ui/module/portfolio/portfolio.container";
import { ResumeContainer } from "@/ui/module/resume/resume.container";
import { Footer } from "@/ui/components/navigation/footer";

export default function Home() {
  const [isHomeVisible, setIsHomeVisible] = useState(true);

  useEffect(() => {
    const homeSection = document.querySelector("#home");

    if (!homeSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHomeVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 } // à ajuster selon le comportement désiré
    );

    observer.observe(homeSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".fade-in");
    sections.forEach((section) => fadeObserver.observe(section));

    return () => fadeObserver.disconnect();
  }, []);

  return (
    <>
      <Seo
        title="Espoir Portfolio"
        description="L'expérience sociale et commerciale ultime"
      />

      <div className="relative overflow-hidden">
        <header className="fixed top-0 w-full z-50">
          <Navigation isTransparent={isHomeVisible} />
        </header>
        <Layout isDisplayBreakCrumbs={false}>
          <Container className="space-y-6 relative">
            <div id="home" className="fade-in">
              <LandingPageContainer />
            </div>
            <div id="about" className="fade-in bg-gray-50 lg:mt-0 mt-10">
              <AProposContainer />
            </div>
            <div id="resume" className="fade-in">
              <ResumeContainer />
            </div>
            <div id="portfolio" className="">
              <PortfolioContainer />
            </div>
            <div id="contact" className="fade-in mb-4">
              <ContactView />
            </div>
          </Container>
        </Layout>
        <Footer />
      </div>
    </>
  );
}
