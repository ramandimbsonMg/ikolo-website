import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "mon_secret_ultra_secure_123";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Méthode non autorisée" });

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email et mot de passe requis" });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Utilisateur non trouvé" });

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid)
      return res.status(401).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      token,
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
