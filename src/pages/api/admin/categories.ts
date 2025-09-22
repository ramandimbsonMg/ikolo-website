import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const categories = await prisma.category.findMany({
      include: { products: true },
    });
    return res.status(200).json({ categories });
  }

  if (req.method === "POST") {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Nom requis" });

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const newCategory = await prisma.category.createMany({
      data: [{ name, slug }],
      skipDuplicates: true, // ignore si déjà existant
    });

    return res
      .status(201)
      .json({ message: "Catégorie ajoutée ou déjà existante" });
  }


  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Méthode ${req.method} non autorisée`);
}
