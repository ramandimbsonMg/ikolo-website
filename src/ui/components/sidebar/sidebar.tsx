"use client";

import { Card, CardContent, CardTitle } from "@/ui/components/ui/card";
import { Badge } from "@/ui/components/ui/badge";
import { Project } from "@/types/types";
import { Mail, Github, Download, Phone } from "lucide-react";
import clsx from "clsx";
import { Button } from "../ui/button";
import { AiOutlineLinkedin } from "react-icons/ai";

interface SidebarProps {
  projects: Project[];
  className?: string;
}

export default function Sidebar({ projects, className }: SidebarProps) {
  return (
    <aside
      className={clsx(
        "w-full md:w-1/3 space-y-5 lg:mt-10 sticky top-10 self-start lg:px-0 px-4",
        className
      )}
    >
      {/* Projet Mis’era */}
      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition">
        <CardContent className="items-center text-center">
          <img
            src="assets/images/portfolio/Misera/actu.png"
            alt="Projet Mis’era"
            className="w-full h-28 object-cover"
          />
          <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">Mis’era</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Plateforme Social-Commerce – Vendre, partager et interagir autour de
            produits
          </p>
          <hr className="mt-2 mb-2 mx-4" />
          <p className="text-sm text-gray-500 mt-1">
            Développement fullstack avec Django, React et Next.js. UI moderne et
            responsive.
          </p>
          <br />
          <p className="text-xs text-gray-400 mt-1">
            Antananarivo, Madagascar | Projet personnel
          </p>
        </CardContent>
      </Card>

      {/* Contact rapide */}
      <Card className="border border-gray-200 sticky top-10 shadow-sm hover:shadow-md transition">
        <CardContent>
          <CardTitle>Contact rapide</CardTitle>
          <div className="flex flex-wrap gap-2 mt-3">
            {/* Email */}
            <a
              href="mailto:contact@misera.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Mail size={16} /> Email
              </Button>
            </a>

            {/* Téléphone */}
            <a href="tel:+261349052467">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Phone /> Tel
              </Button>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/tonprofil"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <AiOutlineLinkedin size={16} /> LinkedIn
              </Button>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/ramandimbsonMg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Github size={16} /> GitHub
              </Button>
            </a>

            {/* Téléchargement CV */}
            <a
              href="/assets/pdf/Ramandimbson_Espoir_CV.pdf"
              download="Ramandimbson_Espoir_CV.pdf"
              className=""
            >
              <Button
                size="sm"
                className="flex items-center w-60 gap-1 text-white"
              >
                <Download size={16} /> CV
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Compétences */}
      <Card className=" border border-gray-200">
        <CardContent>
          <CardTitle>Compétences</CardTitle>
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              { name: "Python", url: "https://www.python.org/" },
              { name: "Django", url: "https://www.djangoproject.com/" },
              { name: "Odoo", url: "https://www.odoo.com/" },
              { name: "React", url: "https://react.dev/" },
              { name: "Next.js", url: "https://nextjs.org/" },
              { name: "TailwindCSS", url: "https://tailwindcss.com/" },
              { name: "PostgreSQL", url: "https://www.postgresql.org/" },
              { name: "Figma", url: "https://www.figma.com/" },
              { name: "Docker", url: "https://www.docker.com/" },
            ].map((skill) => (
              <a
                key={skill.name}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge
                  variant="outline"
                  className="border-primary text-primary-600 text-sm px-3 py-1 hover:bg-primary-50 hover:underline transition"
                >
                  {skill.name}
                </Badge>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projets récents */}
      <Card className=" border border-gray-200">
        <CardContent>
          <CardTitle>Projets récents</CardTitle>
          <ul className="mt-3 space-y-2 text-gray-700 dark:text-white dark:hover:text-gray-700">
            {projects.map((p) => (
              <li
                key={p.id}
                className="p-2 rounded-md hover:bg-gray-100 transition text-sm"
              >
                {p.name}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
}
