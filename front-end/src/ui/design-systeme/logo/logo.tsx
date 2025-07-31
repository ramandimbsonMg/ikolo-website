import Image from "next/image";
import { Typography } from "../typography/typography";

interface Props {
    size?: "very-small" | "small" | "medium" | "large"
}


export const Logo = ({ size = "small" }: Props) => {
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
        {/* <Image
            src="/assets/favicon_io/Biizina logo.svg"
            alt="logo"
            width={sizeLogo}
            height={40}
         /> */}
        <Typography variant="2xlarge" className="font-bold text-white">
          He<span className="text-red-700">ll</span>o
        </Typography>
      </div>
    );
}