import clsx from "clsx";
import Image from "next/image";

interface Props {
    size?: "small" | "very-small" | "semimedium" | "medium" | "large" | "xlarge";
    src: string;
    alt: string;
    className?: string;
}

export const Avatar = ({ size = "medium", src, alt, className }: Props) => {
    let sizeStyles: string;

    switch (size) {
        case "very-small":
            sizeStyles = "w-5 h-5";
            break;
        case "small":
            sizeStyles = "w-[33px] h-[33px]";
            break;
        case "semimedium":
            sizeStyles = "w-10 h-10";
            break;
        case "medium":
            sizeStyles = "w-[50px] h-[50px]";
            break;
        case "large":
            sizeStyles = "w-[60px] h-[60px]";
            break;
        case "xlarge":
            sizeStyles = "w-[150px] h-[150px]";
    }
    return (
        <div className={clsx(sizeStyles, "bg-gray-400 rounded-full relative", className)}>
            <Image
            fill
            src={src}
            alt={alt}
            className="object-cover object-center rounded-full" />
        </div>
    )
}