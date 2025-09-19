import { Typography } from "../typography/typography";

interface Props {
  size?: "very-small" | "small" | "medium" | "large";
}

export const Logo = ({ size = "small" }: Props) => {
  let fontSize: string;

  switch (size) {
    case "very-small":
      fontSize = "14px";
      break;
    case "small":
      fontSize = "28px";
      break;
    case "medium":
      fontSize = "40px";
      break;
    case "large":
      fontSize = "60px";
      break;
    default:
      fontSize = "28px";
  }

  return (
    <div className="flex items-center">
      <h2
        className="font-bold text-black dark:text-white"
        style={{ fontSize }}
      >
        Es<span className="text-primary">po</span>ir.mg
      </h2>
    </div>
  );
};
export const LogoLoad = ({ size = "small" }: Props) => {
  let fontSize: string;

  switch (size) {
    case "very-small":
      fontSize = "14px";
      break;
    case "small":
      fontSize = "28px";
      break;
    case "medium":
      fontSize = "40px";
      break;
    case "large":
      fontSize = "50px";
      break;
    default:
      fontSize = "28px";
  }

  return (
    <div className="flex items-center">
      <h2 className="font-bold text-black" style={{ fontSize }}>
        Es<span className="text-primary">po</span>ir.mg
      </h2>
    </div>
  );
};

