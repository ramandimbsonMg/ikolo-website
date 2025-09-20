import clsx from "clsx";

interface Props {
  variant?: "display" | "xlarge" | "2xlarge" | "large" | "medium" | "semimedium" | "small";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "div" | "p" | "span";
  theme?: "black" | "gray" | "white" | "primary" | "secondary" | "accent";
  weight?: "regular" | "medium" | "bold";
  className?: string;
  children: React.ReactNode;
}

export const Typography = ({
  variant = "medium",
  component: Component = "div",
  theme = "black",
  weight = "regular",
  className,
  children,
}: Props) => {
  let varianStyles = "";
  switch (variant) {
    case "display":
      varianStyles = "lg:text-7xl text-6xl font-extrabold tracking-tight";
      break;
    case "2xlarge":
      varianStyles = "lg:text-5xl text-4xl font-bold";
      break;
    case "xlarge":
      varianStyles = "text-3xl font-bold";
      break;
    case "large":
      varianStyles = "text-xl font-semibold";
      break;
    case "medium":
      varianStyles = "text-lg";
      break;
    case "semimedium":
      varianStyles = "text-md";
      break;
    case "small":
      varianStyles = "text-sm";
      break;
  }

  let colorStyles = "";
  switch (theme) {
    case "black":
      colorStyles = "text-gray-900";
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
    case "accent":
      colorStyles = "text-accent";
      break;
  }

  let weightStyle =
    weight === "medium" ? "font-medium" : weight === "bold" ? "font-bold" : "";

  return (
    <Component
      className={clsx(varianStyles, colorStyles, weightStyle, className)}
    >
      {children}
    </Component>
  );
};
