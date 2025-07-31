import { LinkType, LinkTypes } from "@/lib/link-type";
import { IconProps } from "@/types/iconProps";
import clsx from "clsx";
import Link from "next/link";

interface Props {
    size?: "very-small" | "small" | "medium" | "large" | "xlarge";
    variant?: "accent" | "secondary" | "outline" | "disable" | "ico";
    icon?: IconProps;
    iconTheme?: "accent" | "secondary" | "gray";
    iconPosition?: "left" | "right"; // Position de l'icône
    disabled?: boolean;
    isLoading?: boolean; // Indicateur de chargement
    className?: string;
    children?: React.ReactNode;
    baseUrl?: string;
    LinkType?: LinkType;
    action?: Function;
}

export const Button = ({
    size = "medium", // Taille par défaut
    variant = "accent", // Variante par défaut
    icon,
    iconTheme = "accent", // Thème par défaut de l'icône
    iconPosition = "right", // Position de l'icône par défaut
    disabled = false,
    isLoading = false,
    className,
    children,
    baseUrl,
    LinkType = "internal",
    action = () => { },
}: Props) => {
    // Styles dynamiques pour les variantes
    let variantStyles: string = "";
    switch (variant) {
        case "accent":
            variantStyles = "bg-primary hover:bg-primary-400 text-white rounded-full cursor-pointter font-medium";
            break;
        case "secondary":
            variantStyles = "bg-primary-100 hover:bg-primary-200 text-primary rounded-full cursor-pointter";
            break;
        case "outline":
            variantStyles =
                "hover:bg-gray-100 border border-primary text-primary rounded-full cursor-pointter";
            break;
        case "disable":
            variantStyles =
                "bg-gray-200 border border-gray text-gray-900 rounded-full cursor-pointter cursor-not-allowed";
            break;
        case "ico":
            if (iconTheme === "accent") {
                variantStyles = "bg-primary hover:bg-primary-400 text-white rounded-full";
            } else if (iconTheme === "secondary") {
                variantStyles = "bg-primary-100 hover:bg-primary-200 text-primary rounded-full";
            } else if (iconTheme === "gray") {
                variantStyles = "bg-gray-400 hover:bg-gray-200 text-white rounded-full";
            }
            break;
    }

    // Styles dynamiques pour les tailles
    let sizeStyles: string = "",
        icoSize: number = 0;
    switch (size) {
        case "very-small":
            sizeStyles = `font-medium text-xs ${variant === "ico"
                ? "flex items-center justify-center w-[30px] h-[30px]"
                : "px-5 h-9"
                }`;
            icoSize = 14;
            break;
        case "small":
            sizeStyles = `font-medium text-xs ${variant === "ico"
                ? "flex items-center justify-center w-[40px] h-[40px]"
                : "px-5 h-9"
                }`;
            icoSize = 18;
            break;
        case "medium":
            sizeStyles = `font-medium text-sm ${variant === "ico"
                ? "flex items-center justify-center w-[50px] font-[600] h-[50px]"
                : "px-8 py-2 h-[40px]"
                }`;
            icoSize = 20;
            break;
        case "large":
            sizeStyles = `font-medium text-lg ${variant === "ico"
                ? "flex items-center justify-center w-[60px] h-[60px]"
                : "px-5 py-2 h-12"
                }`;
            icoSize = 24;
            break;
        case "xlarge":
            sizeStyles = `font-medium text-xl ${variant === "ico"
                ? "flex items-center justify-center w-[70px] h-[70px]"
                : "px-6.5 py-3 h-14"
                }`;
            icoSize = 28;
            break;
    }

    const handlClick = () => {
        if (action) {
            action()
        }
    }

    const buttonContent = (
        <>
            {isLoading ? (
                <span className="loader border-white"></span> // Indicateur de chargement
            ) : (
                <>
                    {icon && iconPosition === "left" && (
                        icon.icon && <icon.icon size={icoSize} />
                    )}
                    {children}
                    {icon && iconPosition === "right" && (
                        icon.icon && <icon.icon size={icoSize} />
                    )}
                </>
            )}</>
    )
    const buttonElement = (
        <button
            type="button"
            className={clsx(
                variantStyles, className,
                sizeStyles,
                "flex items-center justify-center gap-2"
            )} // Combine les styles
            onClick={handlClick}
            disabled={disabled || isLoading} // Désactive le bouton si en chargement
        >
            {buttonContent}
        </button>
    )

    if (baseUrl) {
        if (LinkType === LinkTypes.EXTERNAL) {
            return (
                <a href={baseUrl} target="__blank">
                    {buttonElement}
                </a>
            ) 
        } else {
            return <Link href={baseUrl}>{buttonElement}</Link>
        }
    }
    return buttonElement
};
