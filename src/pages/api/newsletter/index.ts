import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email requis" });

    try {
      const subscriber = await prisma.newsletterSubscriber.create({
        data: { email },
      });
      return res.status(201).json({ subscriber });
    } catch (err: any) {
      if (err.code === "P2002")
        return res.status(400).json({ error: "Email déjà abonné" });
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }

  if (req.method === "GET") {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ subscribers });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
