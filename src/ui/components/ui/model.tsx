"use client";
import { ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string; // 🔹 Pour ajouter des classes supplémentaires
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 rounded backdrop-blur-sm flex justify-center items-center z-50">
      <div
        className={clsx(
          "bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative",
          className // 🔹 Merge avec la classe passée en props
        )}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          <AiOutlineClose size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}
