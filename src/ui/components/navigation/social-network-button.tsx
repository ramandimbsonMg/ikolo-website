import { Button } from "@/ui/design-systeme/button/button"
import { footerReseauLinks } from "./app-links"
import { v4 as uuidv4 } from "uuid";
import { RiFacebookFill } from "react-icons/ri";
import clsx from "clsx";

interface Props {
    theme?: "gray" | "accent" | "secondary";
    className?: string;
}
export const SocialNetworkButton = ({
    className,
    theme = "accent",

}:Props) => {

    const socialList = footerReseauLinks.map((socialNetwork) => (
        <Button
            key={uuidv4()}
            size="small"
            variant="outline"
            icon={{icon: socialNetwork.icon ? socialNetwork.icon : RiFacebookFill}}
            baseUrl={socialNetwork.baseUrl}
            LinkType={socialNetwork.type}
         />
    ))
    return (
        <>
            <div className={clsx(className, "flex items-center gap-2.5")}>{socialList}</div>
        </>
    )
}