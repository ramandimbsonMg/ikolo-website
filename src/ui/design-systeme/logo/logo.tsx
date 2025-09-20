import Image from "next/image";

interface Props {
    size?: "very-small" | "small" | "medium" | "large"
}


export const Logo = ({ size = "medium" }: Props) => {
    let sizeLogo: number;

    switch (size) {
        case "very-small":
            sizeLogo = 34
            break;
        case "small":
            sizeLogo = 77
            break;
        case "medium":
            sizeLogo = 140
            break;
        case "large":
            sizeLogo = 160
            break;
    }
    return (
      <div>
        <Image
          src="/assets/images/logo/acs_logo.jpg"
          alt="logo"
          width={sizeLogo}
          height={50}
        />
      </div>
    );
}