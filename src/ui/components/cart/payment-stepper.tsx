"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FiDownload } from "react-icons/fi";
import jsPDF from "jspdf";
import { getBase64ImageFromUrl } from "@/utils/get-base64-image-from-url";

interface PaymentStepperProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  name: string;
  address: string;
  deliveryDate: string;
  deliveryTime: string;
  cartTotal: number;
  cart: any[];
  saveCartToDB: () => Promise<void>;
  clearCart: () => void;
}

export default function PaymentStepper({
  isOpen,
  setIsOpen,
  name,
  address,
  deliveryDate,
  deliveryTime,
  cartTotal,
  cart,
  saveCartToDB,
  clearCart,
}: PaymentStepperProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentNumber, setPaymentNumber] = useState("");

  const handleNextStep = () => {
    if (
      (paymentMethod === "mobile" || paymentMethod === "card") &&
      !paymentNumber
    ) {
      return alert("Veuillez entrer votre numéro de paiement.");
    }
    setStep(3);
  };

  const handleConfirmOrder = async () => {
    await saveCartToDB();

    setStep(4); // étape confirmation stylisée
  };

const downloadInvoice = async () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [80, 100],
  });

  const logoBase64 = await getBase64ImageFromUrl(
    "/assets/images/logo/logo_ikolo~2.png"
  );
  doc.addImage(logoBase64, "PNG", 5, 5, 20, 20); // x, y, width, height

  let y = 30; // après le logo
  doc.setFontSize(10);
  doc.text("Ikolo Boutique", 5, y);
  y += 5;
  doc.text("Facture d'achat", 5, y);
  y += 5;
  doc.text("------------------------------", 5, y);
  y += 5;
  doc.text(`Nom: ${name}`, 5, y);
  y += 4;
  doc.text(`Adresse: ${address}`, 5, y);
  y += 4;
  doc.text(`Livraison: ${deliveryDate} à ${deliveryTime}`, 5, y);
  y += 4;
  doc.text(
    `Paiement: ${paymentMethod}${paymentNumber ? ` (${paymentNumber})` : ""}`,
    5,
    y
  );
  y += 4;
  doc.text(`Total: ${cartTotal.toLocaleString()} Ar`, 5, y);
  y += 5;
  doc.text("------------------------------", 5, y);
  y += 5;
  doc.text("Produits :", 5, y);
  y += 4;
  cart.forEach((p) => {
    doc.text(`${p.name} x${p.quantity}`, 5, y);
    y += 4;
  });
  y += 4;
  doc.text("Merci pour votre achat !", 5, y);

  doc.save("facture_ikolo.pdf");
};


  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold mb-4">
                💳 Choisissez votre méthode
              </h2>
              <div className="grid gap-3">
                {["cash", "mobile", "card"].map((method) => (
                  <label key={method} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {method === "cash"
                      ? "Paiement à la livraison"
                      : method === "mobile"
                      ? "Mobile Money"
                      : "Carte bancaire"}
                  </label>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  onClick={() => setStep(paymentMethod === "cash" ? 3 : 2)}
                  className="px-4 py-2 bg-primary text-white rounded-lg"
                >
                  Suivant
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold mb-4">
                {paymentMethod === "mobile"
                  ? "📲 Numéro Mobile Money"
                  : "💳 Numéro de carte bancaire"}
              </h2>
              <input
                type="text"
                placeholder={
                  paymentMethod === "mobile"
                    ? "Entrez votre numéro Mvola/OM"
                    : "Entrez votre numéro de carte"
                }
                value={paymentNumber}
                onChange={(e) => setPaymentNumber(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Retour
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-primary text-white rounded-lg"
                >
                  Suivant
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold mb-4">
                ✅ Confirmer la commande
              </h2>
              <div className="space-y-2">
                <p>
                  <strong>Nom :</strong> {name}
                </p>
                <p>
                  <strong>Adresse :</strong> {address}
                </p>
                <p>
                  <strong>Livraison :</strong> {deliveryDate} à {deliveryTime}
                </p>
                <p>
                  <strong>Paiement :</strong> {paymentMethod}{" "}
                  {paymentNumber && `(${paymentNumber})`}
                </p>
                <p>
                  <strong>Total :</strong> {cartTotal.toLocaleString()} Ar
                </p>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setStep(paymentMethod === "cash" ? 1 : 2)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Retour
                </button>
                <button
                  onClick={handleConfirmOrder}
                  className="px-4 py-2 bg-primary text-white rounded-lg"
                >
                  Confirmer
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-green-600">
                🎉 Commande enregistrée !
              </h2>
              <p className="">
                Merci pour votre achat. Votre facture est prête à télécharger.
              </p>
              <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={downloadInvoice}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
              >
                <FiDownload /> Télécharger la facture
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  clearCart();
                }}
                className="ml-3 px-4 py-2 bg-gray-200 rounded-lg"
              >
                Fermer
              </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
}
