export const getBase64ImageFromUrl = async (url: string): Promise<string> => {
  const res = await fetch(url); // récupère l'image depuis l'URL
  const blob = await res.blob(); // convertit en blob
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader(); // crée un lecteur de fichier
    reader.onloadend = () => resolve(reader.result as string); // résultat base64
    reader.onerror = reject;
    reader.readAsDataURL(blob); // lit le blob comme base64
  });
};
