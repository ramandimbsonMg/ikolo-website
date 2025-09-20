import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const ActiveLink = ({ href, children, className }: Props) => {
  const router = useRouter();

  const isActive: boolean = useMemo(() => {
    return router.pathname === href;
  }, [router.pathname, href]);
  return (
    <Link
      href={href}
      className={clsx(
        isActive &&
          "text-primary font-medium px-2 animate justify-center items-center flex",
        "px-2 flex hover:text-primary justify-center items-center",
        className
      )}
    >
      {children}
    </Link>
  );
};
export const ActiveFooterLink = ({ href, children }: Props) => {
  const router = useRouter();

  const isActive: boolean = useMemo(() => {
    return router.pathname === href;
  }, [router.pathname, href]);
  return (
    <Link
      href={href}
      className={clsx(
        isActive && "font-medium animate text-primary",
        "hover:text-primary text-primary"
      )}
    >
      {children}
    </Link>
  );
};
