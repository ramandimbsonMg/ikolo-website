import clsx from "clsx";

interface Props {
  variant?:
    | "display"
    | "2xlarge"
    | "xlarge"
    | "large"
    | "medium"
    | "semimedium"
    | "small";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "div" | "p" | "span";
  theme?: "black" | "gray" | "white" | "primary" | "secondary";
  weight?: "regular" | "medium";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Typography = ({
  variant = "medium",
  component: Component = "div",
  theme,
  weight = "regular",
  style,
  className,
  children,
}: Props) => {
  let variantStyles = "";
  let colorStyles = "";

  switch (variant) {
    case "display":
      variantStyles =
        "text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]";
      break;
    case "2xlarge":
      variantStyles =
        "text-4xl md:text-5xl lg:text-5xl font-semibold tracking-tight leading-snug";
      break;
    case "xlarge":
      variantStyles =
        "text-3xl md:text-4xl lg:text-4xl font-semibold tracking-tight leading-snug";
      break;
    case "large":
      variantStyles =
        "text-2xl md:text-3xl lg:text-3xl font-medium tracking-wide leading-snug";
      break;
    case "medium":
      variantStyles =
        "text-base md:text-lg lg:text-lg font-medium tracking-wide leading-relaxed";
      break;
    case "semimedium":
      variantStyles =
        "text-sm md:text-base lg:text-base font-medium tracking-wide leading-relaxed";
      break;
    case "small":
      variantStyles =
        "text-xs md:text-sm lg:text-sm font-medium tracking-wide leading-relaxed";
      break;
  }

  switch (theme) {
    case "black":
      colorStyles = "text-primary-900";
      break;
    case "gray":
      colorStyles = "text-gray-500";
      break;
    case "white":
      colorStyles = "text-white";
      break;
    case "primary":
      colorStyles = "text-primary";
      break;
    case "secondary":
      colorStyles = "text-secondary";
      break;
  }

  return (
    <Component
      className={clsx(
        "font-serif", // police serif
        className,
        variantStyles,
        colorStyles,
        weight === "medium" && "font-medium"
      )}
      style={{
        ...style,
        letterSpacing: "0.025em", // légèrement augmenté pour un style pro
      }}
    >
      {children}
    </Component>
  );
};
