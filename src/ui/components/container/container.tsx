import clsx from "clsx";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export const Container = ({children, className}:Props) => {
    return (
      <div className={clsx("max-w-6xl w-full mx-auto lg:px-6", className)}>
        {children}
      </div>
    );
}
