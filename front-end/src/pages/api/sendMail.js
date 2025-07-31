// import { NextApiRequest, NextApiResponse } from "next";
// import nodemailer from "nodemailer";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "POST") {
//         return res.status(405).json({ message: "Méthode non autorisée" });
//     }

//     const { nom, email, sujet, message } = req.body;

//     if (!nom || !email || !sujet || !message) {
//         return res.status(400).json({ message: "Tous les champs sont requis" });
//     }

//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER as string,
//                 pass: process.env.EMAIL_PASS as string,
//             },
//         });

//         transporter.sendMail({
//             from: email,
//             to: process.env.EMAIL_RECEIVER as String,
//             subject: sujet,
//             text: `Nom: ${nom}\nEmail: ${email}\n\nMessage:\n${message}`,
//         });

//         res.status(200).json({ message: "Email envoyé avec succès" });
//     } catch (error: any) {
//         console.error("Erreur lors de l'envoi d'email:", error);
//         res.status(500).json({ message: "Erreur serveur", error: error.message });
//     }
// }
