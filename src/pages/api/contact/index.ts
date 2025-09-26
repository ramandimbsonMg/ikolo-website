import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    // Configure ton transporteur email (ici Gmail par exemple)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // ton email
        pass: process.env.EMAIL_PASS, // ton mot de passe ou App Password Gmail
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO, // ton email de réception
      subject: `Nouveau message de contact de ${name}`,
      text: message,
      html: `<p><strong>Nom:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    res.status(200).json({ message: "Email envoyé !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
  }
}
