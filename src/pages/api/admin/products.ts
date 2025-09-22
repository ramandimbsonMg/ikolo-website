import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false }, // ⚡ obligatoire pour gérer FormData
};

// ✅ Fonction pour créer un slug unique
async function generateUniqueSlug(name: string) {
  const baseSlug = name.toLowerCase().replace(/\s+/g, "-");
  let slug = baseSlug;
  let count = 1;

  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // ------------------ GET : récupérer les produits ------------------
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erreur lors de la récupération" });
    }
  }

  // ------------------ POST : ajouter un produit ------------------
if (req.method === "POST") {
  try {
    const result = await new Promise<any>((resolve, reject) => {
      const form = formidable({
        multiples: false,
        uploadDir: path.join(process.cwd(), "public/uploads"),
        keepExtensions: true,
      });

      form.parse(req, async (err, fields, files) => {
        if (err) return reject(err);

        const { name, description, price, plant, type, categoryId } = fields;

        if (!name || !price || !categoryId) {
          return reject(
            new Error("Champs requis manquants (name, price, categoryId)")
          );
        }

        let imagePath = "";
        if (files.image) {
          const file = Array.isArray(files.image)
            ? files.image[0]
            : files.image;
          if (file && file.filepath) {
            const fileName = Date.now() + "-" + file.originalFilename;
            const newPath = path.join(
              process.cwd(),
              "public/uploads",
              fileName
            );
            fs.renameSync(file.filepath, newPath);
            imagePath = "/uploads/" + fileName;
          }
        }

        // Slug unique
        const slugBase = String(name).toLowerCase().replace(/\s+/g, "-");
        let slug = slugBase;
        let count = 1;
        while (await prisma.product.findUnique({ where: { slug } })) {
          slug = `${slugBase}-${count}`;
          count++;
        }

        const newProduct = await prisma.product.create({
          data: {
            name: String(name),
            slug,
            description: String(description || ""),
            price: parseFloat(String(price)),
            image: imagePath,
            plant: String(plant || ""),
            type: String(type || ""),
            categoryId: parseInt(String(categoryId)),
          },
        });

        resolve(newProduct);
      });
    });

    return res.status(201).json(result); // ✅ Ici, outside du callback
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Erreur lors de l'ajout du produit" });
  }
}


  // ------------------ Méthode non autorisée ------------------
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Méthode ${req.method} non autorisée`);
}
