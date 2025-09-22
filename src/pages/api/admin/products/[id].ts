import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "ID manquant" });

  if (req.method === "DELETE") {
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id as string) },
      });

      if (!product)
        return res.status(404).json({ error: "Produit non trouvé" });

      // ⚡ Supprimer l'image si elle existe
      if (product.image) {
        const imagePath = path.join(process.cwd(), "public", product.image);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      }

      await prisma.product.delete({ where: { id: parseInt(id as string) } });
      return res.status(200).json({ message: "Produit supprimé" });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message || "Erreur serveur" });
    }
  }

  res.setHeader("Allow", ["DELETE"]);
  return res.status(405).end(`Méthode ${req.method} non autorisée`);
}
