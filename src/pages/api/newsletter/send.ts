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

  const { subject, content, imageUrl } = req.body;

  if (!subject || !content) {
    return res.status(400).json({ message: "Sujet et contenu requis" });
  }

  try {
    // Sauvegarder la newsletter dans la base
    await prisma.newsletter.create({
      data: { subject, content, imageUrl: imageUrl || null },
    });

    const subscribers = await prisma.newsletterSubscriber.findMany();
    if (subscribers.length === 0) {
      return res
        .status(200)
        .json({ message: "Aucun abonné pour envoyer la newsletter." });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE === "true",
      auth: {
        user: process.env.MAIL_FROM_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await Promise.all(
      subscribers.map((sub) =>
        transporter.sendMail({
          from: `"ACS Newsletter" <${process.env.MAIL_FROM_ADDRESS}>`,
          to: sub.email,
          subject,
          html: `
              <div style="font-family:sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:10px; overflow:hidden;">
                <div style="background:#004aad; color:white; padding:15px; text-align:center;">
                  <h1 style="margin:0; font-size:24px;">${subject}</h1>
                </div>

                <div style="padding:20px; font-size:13px; color:#333;">
                  <p>${content}</p>
                </div>

                ${
                  imageUrl
                    ? `<div style="text-align:center; width:100%;">
                        <img src="${imageUrl}" alt="Newsletter" style="width:100%; height:auto; display:block;" />
                      </div>`
                    : ""
                }

                <div style="background:#f2f2f2; text-align:center; padding:10px; font-size:14px; color:#666;">
                  Vous recevez cet email car vous êtes inscrit à notre newsletter ACS.
                  <br/>
                  <a href="http://ecoleanglophone-acs.com" style="color:#004aad;">retourn sur la site</a>
                </div>
              </div>

            `,
        })
      )
    );

    return res
      .status(200)
      .json({ message: "Newsletter envoyée avec succès !" });
  } catch (error) {
    console.error("Erreur newsletter:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
