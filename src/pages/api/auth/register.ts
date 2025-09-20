// src/pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email et mot de passe requis" });
  }

  try {
    // Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error: any) {
    // Gestion spécifique de l'erreur P2002 (doublon)
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
