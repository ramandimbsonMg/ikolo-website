interface Props {
    size?: "small" | "medium" | "large";
    variant?: "primary" | "white";
}

export const Spinner = ({ size, variant = "primary" }: Props) => {
    let variantStyles: string, sizeStyles: string;
    switch (size) {
        case "small":
            sizeStyles = ""
            break;
        case "medium":
            sizeStyles = ""
            break;
        case "large":
            sizeStyles = ""
            break;
    };
    switch (variant) {
        case "primary":
            sizeStyles = ""
            break;
        case "white":
            sizeStyles = ""
            break;
    };
    return (
        <svg
        role="spinner"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="animate-spin w-8 h-8 text-gray-600"
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
      

    )
}