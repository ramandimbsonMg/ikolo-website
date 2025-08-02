import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import QRCode from "qrcode";

export async function POST(req: Request) {
  const body = await req.json();
  const { nom, email, sujet, message } = body;

  try {
    // QR Code content
    const contactInfo = `
Nom : Ramandimbson Espoir
Téléphone : +261 34 00 000 00
Email : teresperanto@gmail.com
LinkedIn : https://linkedin.com/in/ramandimbson
Portfolio : https://monportfolio.com
Instagram : https://instagram.com/ramandimbson
    `;

    const qrCodeDataURL = await QRCode.toDataURL(contactInfo, {
      type: "image/png",
      width: 200,
      margin: 1,
    });

    // Configurer le transport d’email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format date/heure pour l’email
    const now = new Date();
    const date = now.toLocaleDateString("fr-FR");
    const time = now.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Email pour TOI
    const htmlContent = `
      <div style="max-width: 650px; margin: auto; padding: 20px; font-family: sans-serif;">
        <h2 style="text-align: center; color: #0070f3;">📨 Nouveau message via ton portfolio</h2>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${sujet}</p>
        <p><strong>Message :</strong></p>
        <pre style="background: #f9f9f9; padding: 15px; border-left: 4px solid #0070f3;">${message}</pre>
        <hr />
        <h3 style="text-align: center;">Coordonnées (QR Code)</h3>
        <div style="text-align: center;">
          <img src="${qrCodeDataURL}" style="max-width: 180px; margin-top: 10px;" alt="QR Code" />
        </div>
      </div>
    `;

    // Email de confirmation pour l’expéditeur
    const confirmationHtml = `
      <div style="max-width: 380px; margin: 30px auto; font-family: Arial, sans-serif; background: #fff;">
        <div style="border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
          <div style="padding: 20px; text-align: center;">
            <h2 style="color: #0070f3; margin-bottom: 10px;">🎫 Confirmation de message</h2>
            <p style="font-size: 15px; color: #333; margin-bottom: 15px;">
              Merci de m’avoir contacté via mon portfolio ! Voici un ticket de confirmation de votre message.
            </p>
            <img src="${qrCodeDataURL}" alt="QR Code" style="width: 160px; height: 160px; margin: 10px auto; display: block;" />
            <div style="margin-top: 10px;">
              <h3 style="margin: 5px 0;">${nom}</h3>
              <p style="font-size: 13px; color: #777;">Non-transférable</p>
              <p style="font-size: 14px; color: #000;">Valide jusqu’au <span style="background: #000; color: #fff; padding: 3px 8px; border-radius: 4px;">${date}</span></p>
              <p style="font-size: 14px; color: #000;">Heure d’entrée : <span style="color: #0070f3;">${time}</span></p>
            </div>
          </div>
          <div style="padding: 10px 20px; background: #f0f8ff; font-size: 14px; color: #333; text-align: center;">
            Nous vous répondrons bientôt.<br />
            – Ramandimbson Espoir
          </div>
        </div>
      </div>
    `;

    // Envoi du message à TOI
    await transporter.sendMail({
      from: `"${nom}" <${email}>`,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: `📥 Contact - ${sujet}`,
      html: htmlContent,
    });

    // Envoi du message à l’expéditeur
    await transporter.sendMail({
      from: `"Ramandimbson Espoir" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🎫 Confirmation - Merci pour votre message`,
      html: confirmationHtml,
    });

    return NextResponse.json(
      {
        message: "✅ Email envoyé avec succès ! Merci pour votre message.",
        sent: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur email:", error);
    return NextResponse.json(
      {
        message:
          "❌ Une erreur est survenue lors de l'envoi. Merci de réessayer plus tard.",
        sent: false,
      },
      { status: 500 }
    );
  }
}
