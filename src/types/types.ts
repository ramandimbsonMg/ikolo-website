// src/types/types.ts

// Exemple pour les utilisateurs
export interface UserType {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "user";
}

// Exemple pour une vidéo YouTube
export interface YoutubeVideoType {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  description?: string;
}

// Tu peux ajouter d'autres types ici selon besoin
