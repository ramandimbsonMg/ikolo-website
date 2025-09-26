import clsx from "clsx";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export const Container = ({children, className}:Props) => {
    return (
        <div className={clsx("w-full lg:max-w-8xl mx-auto lg:px-10 px-2 relative",className)}>
            {children}
        </div>
    )
}
export const ContainerContenu = ({children, className}:Props) => {
    return (
      <div className={clsx("w-full lg:max-w-8xl mx-auto lg:px-10 px-2", className)}>
        {children}
      </div>
    );
}
