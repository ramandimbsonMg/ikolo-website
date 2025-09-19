import clsx from "clsx";

interface Props {
    variant?: "display" | "xlarge" | "2xlarge" | "large" | "medium" | "semimedium" | "small";
    component?: "h1" | "h2" | "h3" | "h4" | "h5" | "div" | "p" | "span";
    theme?: "black" | "gray" | "white" | "primary" | "secondary";
    weight?: "regular" | "medium";
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}

export const Typography = ({
    variant = "medium",
    component: Component = "div", // Default to "div" if no component is specified
    theme,
    weight = "regular",
    style,
    className,
    children,
}: Props) => {
    let varianStyles: string = "",
        colorStyles: string = "";

    switch (variant) {
        case "display":
            varianStyles = "text-4xl lg:text-7xl font-[600] text-primary-900 tracking-tight leading-[1.1]";
            break;
        case "2xlarge":
            varianStyles = "text-3xl lg:text-5xl font-medium";
            break;
        case "xlarge":
            varianStyles = "text-2xl lg:text-3xl font-[700]";
            break;
        case "large":
            varianStyles = "text-2xl lg:text-xl font-medium";
            break;
        case "medium":
            varianStyles = "text-[12px] lg:text-[14px]";
            break;
        case "semimedium":
            varianStyles = "text-md lg:text-sm";
            break;
        case "small":
            varianStyles = "text-sm lg:text-xs";
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
            className={clsx(className, varianStyles, colorStyles, weight === "medium" && "font-medium")}
        >
            {children}
        </Component>
    );
};
