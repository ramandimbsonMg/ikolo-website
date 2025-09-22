// pages/api/cart/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mon_secret_ultra_secure_123";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Non autorisé" });

    const token = authHeader.split(" ")[1];
    const payload: any = jwt.verify(token, JWT_SECRET);
    const userId = payload.userId;

    if (!userId) return res.status(401).json({ error: "Utilisateur invalide" });

    if (req.method === "GET") {
      // Récupérer les commandes existantes de l'utilisateur
      const orders = await prisma.order.findMany({
        where: { userId },
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json({ orders });
    }

    if (req.method === "POST") {
      const { cart } = req.body; // [{id, quantity}]
      if (!cart || !cart.length)
        return res.status(400).json({ error: "Panier vide" });

      const order = await prisma.order.create({
        data: {
          userId,
          items: {
            create: cart.map((item: any) => ({
              productId: item.id,
              quantity: item.quantity,
            })),
          },
        },
        include: { items: { include: { product: true } } },
      });

      res.status(201).json({ order });
    }
  } catch (err: any) {
    console.error(err);
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token invalide" });
    }
    res.status(500).json({ error: "Erreur serveur" });
  }
}
