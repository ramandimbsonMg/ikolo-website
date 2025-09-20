interface Props {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "white";
}

export const Spinner = ({ size = "medium", variant = "primary" }: Props) => {
  let sizeClass = "w-8 h-8";
  if (size === "small") sizeClass = "w-5 h-5";
  if (size === "large") sizeClass = "w-12 h-12";

  let colorClass = variant === "white" ? "text-white" : "text-primary";

  return (
    <svg
      role="status"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={`animate-spin ${sizeClass} ${colorClass}`}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M12 2a10 10 0 00-10 10h4a6 6 0 116 6v4a10 10 0 000-20z"
      ></path>
    </svg>
  );
};
