import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { subject, content, imageUrl } = req.body;
  if (!subject || !content)
    return res.status(400).json({ message: "Subject et content requis" });

  try {
    // 1. Créer la newsletter dans la base
    const newsletter = await prisma.newsletter.create({
      data: { subject, content, imageUrl },
    });

    // 2. Récupérer tous les abonnés
    const subscribers = await prisma.newsletterSubscriber.findMany();

    // 3. Configurer nodemailer (ici exemple Gmail, adapter selon ton SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.MAIL_SECURE === "true", // true pour 465, false pour 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Envoyer à tous les abonnés
    for (const sub of subscribers) {
      await transporter.sendMail({
        from: `"Ikolo" <${process.env.EMAIL_USER}>`,
        to: sub.email,
        subject,
        html: `<p>${content}</p>${
          imageUrl ? `<img src="${imageUrl}" alt="newsletter" />` : ""
        }`,
      });
    }

    return res.status(201).json({ newsletter, sentTo: subscribers.length });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
