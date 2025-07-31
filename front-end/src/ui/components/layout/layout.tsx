import { Footer } from "../navigation/footer";
import { Navigation } from "../navigation/navigation";
import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";

interface Props {
    children: React.ReactNode;
    isDisplayBreakCrumbs?: boolean;
}

export const Layout = ({ children, isDisplayBreakCrumbs = true }: Props) => {
    return (
        <>
            <div className="">
                {/* Contenu occupe 80% */}
                <div className="w-full h-full">
                    {isDisplayBreakCrumbs && <Breadcrumbs />}
                    {children}
                </div>
            </div>
        </>
    );
};