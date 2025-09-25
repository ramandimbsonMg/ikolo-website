import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import formidable from "formidable";
import fs from "fs";

// Désactiver bodyParser pour gérer FormData
export const config = { api: { bodyParser: false } };

// Client Supabase (server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Slug unique
async function generateUniqueSlug(name: string) {
  const base = name.toLowerCase().replace(/\s+/g, "-");
  let slug = base;
  let i = 1;
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`;
  }
  return slug;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    try {
      const form = formidable({ multiples: false, keepExtensions: true });
      const data: any = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      });

      const { name, description, price, categoryId, plant, type } = data.fields;
      if (!name || !price || !categoryId) {
        return res.status(400).json({ error: "Champs requis manquants" });
      }

      // Upload image vers Supabase
      let publicUrl = "";
      const file = data.files.image;
      if (file && !Array.isArray(file)) {
        const fileExt = file.originalFilename?.split(".").pop() || "png";
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const buffer = fs.readFileSync(file.filepath);

        const { error } = await supabase.storage
          .from("products") // ⚡ nom de ton bucket Supabase
          .upload(fileName, buffer, { contentType: file.mimetype || "image/png" });

        if (error) throw error;

        const { data } = supabase.storage.from("products").getPublicUrl(fileName);
        publicUrl = data.publicUrl;
      }

      // Slug unique
      const slug = await generateUniqueSlug(String(name));

      // Sauvegarde DB
      const product = await prisma.product.create({
        data: {
          name: String(name),
          slug,
          description: String(description || ""),
          price: parseFloat(String(price)),
          image: publicUrl,
          plant: String(plant || ""),
          type: String(type || ""),
          categoryId: parseInt(String(categoryId)),
        },
        include: { category: true },
      });

      return res.status(201).json(product);
    } catch (e: any) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Méthode ${req.method} non autorisée`);
}
