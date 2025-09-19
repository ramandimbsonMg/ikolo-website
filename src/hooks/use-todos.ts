"use client";

import api from "@/lib/api";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// ✅ Type des tâches
export interface Task {
  id: number;
  title: string;
  owner?: string;
  completed: boolean;
  created_at: string;
  start_date?: string;
  end_date?: string;
  priority: "low" | "medium" | "high";
}

// 🔹 Liste de mots interdits
const BAD_WORDS = [
  "puti",
  "tay",
  "shit",
  "fuck",
  "merde",
  "crap",
  "anjing",
  "idiot",
  "damn",
];

export function useTodos() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // 🔹 Charger les tâches depuis l'API
  useEffect(() => {
    api
      .get("tasks/")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  // 🔹 Vérifier les mots interdits
  const containsBadWord = (text: string) => {
    const lower = text.toLowerCase();
    return BAD_WORDS.some((word) => lower.includes(word));
  };

  // 🔹 Ajouter une tâche
  const addTask = (task: Task) => {
    if (containsBadWord(task.title)) {
      toast.error("Cette tâche contient un mot interdit !");
      return;
    }

    api
      .post("tasks/", task)
      .then((res) => {
        setTasks([res.data, ...tasks]);
        toast.success("Tâche ajoutée avec succès !");
      })
      .catch(() => toast.error("Erreur lors de l'ajout de la tâche !"));
  };

  // 🔹 Toggle terminé / non terminé
  const toggleTask = (task: Task) => {
    api
      .put(`tasks/${task.id}/`, {
        ...task,
        completed: !task.completed,
        end_date: !task.completed ? new Date().toISOString() : task.end_date,
      })
      .then((res) => {
        setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
        toast.success(
          `Tâche "${task.title}" marquée ${
            !task.completed ? "terminée" : "non terminée"
          }`
        );
      })
      .catch(() => toast.error("Erreur lors du changement de statut !"));
  };

  // 🔹 Supprimer une tâche
  const deleteTask = (id: number) => {
    api
      .delete(`tasks/${id}/`)
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== id));
        toast.success("Tâche supprimée avec succès !");
      })
      .catch(() => toast.error("Erreur lors de la suppression !"));
  };

  return { tasks, addTask, toggleTask, deleteTask };
}
