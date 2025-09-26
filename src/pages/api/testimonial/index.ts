import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, comment, rating } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ error: "Nom et témoignage obligatoires" });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        message: comment,
        rating: rating ? Number(rating) : null,
      },
    });

    return res.status(201).json({ testimonial });
  }

  if (req.method === "GET") {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ testimonials });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
