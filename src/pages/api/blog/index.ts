import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const posts = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ posts });
  }

  if (req.method === "POST") {
    try {
      const { title, slug, excerpt, content, image } = req.body;
      const post = await prisma.blog.create({
        data: {
          title,
          slug,
          excerpt,
          content,
          image,
        },
      });
      return res.status(201).json({ post });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }

  return res.status(405).json({ error: "Méthode non autorisée" });
}
