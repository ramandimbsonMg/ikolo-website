// 🎨 Palette de couleurs type WhatsApp/contacts
export const colors = [
  "bg-emerald-400", // vert doux
  "bg-sky-400", // bleu clair
  "bg-violet-400", // violet doux
  "bg-rose-400", // rose clair
  "bg-orange-400", // orange pastel
  "bg-lime-400", // vert citron doux
  "bg-cyan-400", // cyan clair
  "bg-red-400", // rouge pastel
  "bg-indigo-400", // indigo doux
];

// 🔤 Génère la couleur selon la première lettre
export const getColorForRepo = (name: string) => {
  const firstChar = name.charAt(0).toUpperCase();
  const index = (firstChar.charCodeAt(0) - 65) % colors.length; // A=0, B=1...
  return colors[index];
};
