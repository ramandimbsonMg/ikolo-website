import { Typography } from "@/ui/design-systeme/typography/typography";
import clsx from "clsx";
import { useRouter } from "next/router";
import { RiHome3Line } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import { Container } from "../container/container";
import Link from "next/link";

export const Breadcrumbs = () => {
    const router = useRouter();
    const asPath = router.asPath;
    const segments = asPath.split("/");
    const lastSegment = segments[segments.length - 1];
    segments[0] = "acceuil";

    const view = segments.map((path, index) => (
        <div key={uuidv4()}>
            <Link href={
                index > 0
                    ? `/${segments.slice(1, index + 1).join("/")}` : "/"
            }>
                <Typography
                    variant="small"
                    component="span"
                    className={clsx(
                        path !== lastSegment ? "text-gray" : "text-gray-950", "font-medium",
                        "capitalize hover:text-gray-950 animate"
                    )}
                >
                    {path !== "acceuil" ? path.replace(/-/g, " ") : <RiHome3Line className="inline -mt-1" />}
                </Typography>

                {path !== lastSegment && (
                    <Typography variant="small" component="span" className="ml-2 text-gray">
                        /
                    </Typography>
                )}
            </Link>

        </div>
    ))

    return <>
        <Container className="flex items-center gap-2 py-7">
            {view}
        </Container>
    </>
}