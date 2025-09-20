import { Typography } from "@/ui/design-systeme/typography/typography";
import { useRef, useState } from "react";
import { AiOutlineAlert } from "react-icons/ai";

interface Props {
  text: string;
  emoji?: string; // Exemple: "😂" ou "👋"
  gifUrl?: string; // URL vers un GIF animé
}

export const AnnouncementBar = ({ text }: Props) => {
  const [isPaused, setIsPaused] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);


  return (
    <div className="w-full h-10 bg-primary-500 overflow-hidden relative">
      <div className="bg-primary w-42 absolute h-10 z-20 px-2  flex gap-2 items-center ">
        <Typography variant="semimedium" className="text-white">🎉 Miarahaba tompoko</Typography>
      </div>
      <div
        ref={textRef}
        className={`whitespace-nowrap absolute text-white flex items-center h-full`}
        style={{
          animation: `scroll-left 50s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <span className="text-xl animate-bounce px-4">👋😊👋</span>
        {text}
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};
