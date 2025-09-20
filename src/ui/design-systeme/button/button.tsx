import { LinkType, LinkTypes } from "@/lib/link-type";
import { IconProps } from "@/types/iconProps";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "accent" | "outline" | "disable";
  icon?: IconProps;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // ✅ correction
  children?: React.ReactNode;
  baseUrl?: string;
  type?: "button" | "reset" | "submit";
  LinkType?: LinkType;
}

export const Button = ({
  size = "medium",
  variant = "primary",
  icon,
  iconPosition = "right",
  disabled = false,
  isLoading = false,
  className,
  children,
  baseUrl,
  type = "button",
  LinkType = "internal",
  onClick, // ✅ utiliser directement
}: Props) => {
  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles =
        "bg-primary hover:bg-primary-500 text-white shadow-md transition transform hover:scale-105 rounded-full";
      break;
    case "secondary":
      variantStyles =
        "bg-secondary hover:bg-secondary-500 text-white shadow-md transition transform hover:scale-105 rounded-full";
      break;
    case "accent":
      variantStyles =
        "bg-accent hover:bg-accent-500 text-gray-900 shadow-md transition transform hover:scale-105 rounded-full";
      break;
    case "outline":
      variantStyles =
        "bg-white border border-primary text-primary hover:bg-primary hover:text-white transition rounded-full";
      break;
    case "disable":
      variantStyles =
        "bg-gray-200 text-gray-500 cursor-not-allowed rounded-full";
      break;
  }

  let sizeStyles = "px-4 py-2 text-sm";
  switch (size) {
    case "small":
      sizeStyles = "px-3 py-2 text-xs";
      break;
    case "medium":
      sizeStyles = "px-4 py-4 text-sm";
      break;
    case "large":
      sizeStyles = "px-6 py-3 text-lg";
      break;
  }

  const buttonElement = (
    <button
      type={type}
      className={clsx(
        variantStyles,
        sizeStyles,
        "flex items-center justify-center gap-2 font-semibold duration-300",
        className
      )}
      onClick={onClick} // ✅ plus besoin de wrapper
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className="animate-spin rounded-full border-2 border-white border-t-transparent w-4 h-4"></span>
      ) : (
        <>
          {icon && iconPosition === "left" && icon.icon && (
            <icon.icon size={18} />
          )}
          {children}
          {icon && iconPosition === "right" && icon.icon && (
            <icon.icon size={18} />
          )}
        </>
      )}
    </button>
  );

  if (baseUrl) {
    if (LinkType === LinkTypes.EXTERNAL) {
      return (
        <a href={baseUrl} target="__blank" rel="noopener noreferrer">
          {buttonElement}
        </a>
      );
    } else {
      return <Link href={baseUrl}>{buttonElement}</Link>;
    }
  }

  return buttonElement;
};
