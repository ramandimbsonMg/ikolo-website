import clsx from "clsx";
import { Typography } from "../typography/typography";
import { IconProps } from "@/types/iconProps";

interface Props {
    type?: "text" | "email" | "password" | "date" | "number" | "color" | "button" | "submit" | "search"; // Champ optionnel avec "text" par défaut
    register?: any; // Pour les formulaires utilisant React Hook Form
    iconSize?: "small" | "medium" | "large";
    id: string; // Identifiant unique pour l'input
    errors?: any; // Erreurs associées à cet input
    errorMg?: string; // Message d'erreur personnalisé
    className?: string; // Classes CSS supplémentaires
    placeholder?: string; // Texte de remplacement dans l'input
    icon?: IconProps; // Propriété pour ajouter une icône
    required?: boolean; // Indique si le champ est requis
    isLoading?: boolean; // Désactiver l'input si en cours de chargement
    isAutocompleted?: boolean; // Activer/désactiver l'auto-complétion
}

export const Input = ({
    type = "text", // Par défaut, le type est "text"
    register,
    id,
    errors,
    errorMg = "Ce champ est requis",
    className,
    placeholder,
    icon,
    iconSize = "medium",
    required = false,
    isLoading = false,
    isAutocompleted = false,
}: Props) => {
    let variantStyles: string = "";

    switch (iconSize) {
        case "small":
            variantStyles ="w-3 h-3"
            break;
        case "medium":
            variantStyles ="w-4 h-4"
            break;
        case "large":
            variantStyles ="w-6 h-6"
            break;
    }
    return (
        <div>
            {/* Conteneur principal de l'input */}
            <div className="relative h-full py-2">
                {/* Champ input avec gestion des erreurs et état */}
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    disabled={isLoading}
                    autoComplete={isAutocompleted ? "on" : "off"}
                    className={clsx(
                        "h-full w-full rounded-xl border py-3 pb-2 pl-4 text-sm font-medium focus:outline-none",
                        errors?.[id]
                            ? "placeholder-alert-danger text-alert-danger focus:ring-alert-danger"
                            : "placeholder-gray-300 focus:ring-primary text-primary",
                        isLoading && "cursor-not-allowed",
                        className
                    )}
                    {...(register &&
                        register(id, {
                            required: required && {
                                value: true,
                                message: errorMg,
                            },
                        }))}
                />
                {/* Bouton contenant une icône si elle est définie */}
                {icon && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                            type="button"
                            disabled={isLoading}
                            className={clsx("focus:outline-none flex items-center text-primary", variantStyles)}
                        >
                            <icon.icon /> {/* Affiche l'icône */}
                        </button>
                    </div>
                )}
            </div>

            {/* Affichage du message d'erreur si une erreur est présente */}
            {errors?.[id]?.message && (
                <Typography variant="small" theme="gray">
                    {errors[id].message}
                </Typography>
            )}
        </div>
    );
};
