import clsx from "clsx";
import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";
import Navigation from "../navigation/navigation";
import Footer from "../navigation/footer";

interface Props {
    children: React.ReactNode;
    className?: string;
    isDisplayBreakCrumbs?: boolean;
}

export const Layout = ({ children, className, isDisplayBreakCrumbs = true }: Props) => {
    return (
        <>
            <Navigation />
            {isDisplayBreakCrumbs && <Breadcrumbs />}
            {children}
            <Footer />
        </>
    );
};
export const LayoutConnexion = ({ children, className, isDisplayBreakCrumbs = true }: Props) => {
    return (
        <>
            {isDisplayBreakCrumbs && <Breadcrumbs />}
            {children}
            <Footer />
        </>
    );
};
export const LayoutDetails = ({ children, className, isDisplayBreakCrumbs = true }: Props) => {
    return (
        <>
            {children}
        </>
    );
};