import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Méthode non autorisée" });

  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Champs requis manquants" });

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "Cet email est déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "user" },
    });

    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || null,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
