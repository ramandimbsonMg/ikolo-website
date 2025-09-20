import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // identique à login.ts

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Non autorisé" });
  }

  const token = authHeader.split(" ")[1];
  let decoded: any;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).json({ error: "Token invalide" });
  }

  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: "Champs requis" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) {
      return res.status(400).json({ error: "Ancien mot de passe incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword },
    });

    return res
      .status(200)
      .json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur changement mot de passe:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
