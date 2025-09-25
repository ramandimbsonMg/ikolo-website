import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import formidable from "formidable";
import fs from "fs";

// ⚠️ Désactiver bodyParser pour FormData
export const config = { api: { bodyParser: false } };

// Supabase server-side
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Générer slug unique
async function generateUniqueSlug(name: string) {
  const base = name.toLowerCase().replace(/\s+/g, "-");
  let slug = base;
  let i = 1;
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`;
  }
  return slug;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // ---------------- GET produits ----------------
    if (req.method === "GET") {
      const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ products });
    }

    // ---------------- POST ajout produit ----------------
    if (req.method === "POST") {
      const form = formidable({ multiples: false, keepExtensions: true });

      const { fields, files }: any = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      });

      const { name, description, price, categoryId, plant, type } = fields;
      if (!name || !price || !categoryId) {
        return res.status(400).json({ error: "Champs requis manquants" });
      }

      let publicUrl = "";
      const file = files.image;
      if (file && !Array.isArray(file)) {
        const buffer = fs.readFileSync(file.filepath);
        const ext = file.originalFilename?.split(".").pop() || "png";
        const fileName = `products/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${ext}`;

        const { error } = await supabase.storage
          .from("products")
          .upload(fileName, buffer, {
            contentType: file.mimetype || "image/png",
          });

        if (error) throw error;

        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);
        publicUrl = data.publicUrl;
      }

      const slug = await generateUniqueSlug(name);

      const product = await prisma.product.create({
        data: {
          name,
          slug,
          description: description || "",
          price: parseFloat(price),
          image: publicUrl,
          plant: plant || "",
          type: type || "",
          categoryId: parseInt(categoryId),
        },
        include: { category: true },
      });

      return res.status(201).json(product);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
