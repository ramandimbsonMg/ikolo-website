import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Email invalide" });
  }

  try {
    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE === "true",
      auth: {
        user: process.env.MAIL_FROM_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"ACS Newsletter" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: email,
      subject: "Confirmation d'inscription à la Newsletter",
      html: `<h2>Merci de vous être inscrit à notre Newsletter !</h2>
             <p>Vous recevrez bientôt nos dernières nouvelles et ressources éducatives.</p>`,
    });

    return res
      .status(201)
      .json({ message: "Inscription réussie, email envoyé !", subscriber });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Cet email est déjà inscrit" });
    }
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
