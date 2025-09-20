"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ListProgram } from "@/data/list_program";
import { Container } from "@/ui/components/container/container";
import { Box } from "@/ui/design-systeme/box/box";
import { Button } from "@/ui/design-systeme/button/button";
import { Typography } from "@/ui/design-systeme/typography/typography";
import { AiOutlineCalendar } from "react-icons/ai";

// Fonction pour transformer un titre en slug URL-friendly
const toSlug = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

export const ProgramView = () => {
  const programs = ListProgram;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setItemsPerPage(window.innerWidth < 768 ? 2 : 4);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(programs.length / itemsPerPage);

  const scrollToPage = (page: number) => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({
      left: containerWidth * page,
      behavior: "smooth",
    });
    setCurrentPage(page);
  };

  return (
    <div className="pt-14">
      <Container>
        <div className="max-w-4xl mx-auto px-6 lg:px-20 mb-8 text-center space-y-4">
          <Typography variant="2xlarge" theme="primary" className="text-center">
            Nos Programmes
          </Typography>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {programs.map((program) => (
            <div
              key={program.title}
              className="min-w-[100%] lg:min-w-[25%] px-2 snap-start cursor-pointer"
              onClick={() => router.push(`/programs/${program.slug}`)}
            >
              <Box padding_x="0" padding_y="0">
                <img
                  src={program.thumbnail}
                  alt={program.title}
                  className="object-cover h-60 rounded w-full hover:scale-105 transition-transform"
                />
                <hr />
                <div className="px-3 pt-2 pb-2">
                  <Typography variant="large" theme="primary">
                    {program.title}
                  </Typography>
                  <Typography variant="semimedium" className="line-clamp-2">
                    {program.description}
                  </Typography>
                  <div className="flex justify-between pt-4 pb-2">
                    <Typography
                      variant="semimedium"
                      className="flex gap-1 items-center"
                    >
                      <AiOutlineCalendar /> {program.age}
                    </Typography>
                    <Button size="small">Voir détail</Button>
                  </div>
                </div>
              </Box>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPage(i)}
              className={`w-4 h-4 rounded-full border ${
                currentPage === i
                  ? "bg-primary-400 border-primary-400"
                  : "bg-white border-gray-400"
              }`}
            />
          ))}
        </div>
      </Container>

      <style>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
