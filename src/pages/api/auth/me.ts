import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "mon_secret_ultra_secure_123";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Non autorisé" });

  const token = authHeader.split(" ")[1];
  try {
    const payload: any = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, avatar: true, role: true },
    });

    if (!user)
      return res.status(404).json({ error: "Utilisateur introuvable" });

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(401).json({ error: "Token invalide" });
  }
}
