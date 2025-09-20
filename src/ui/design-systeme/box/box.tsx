import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  padding_x?: string;
  padding_y?: string;
}

export const Box = ({
  children,
  className,
  padding_x = "px-6",
  padding_y = "py-6",
}: Props) => {
  return (
    <div
      className={clsx(
        className,
        "w-full bg-white border-r-4 border-primary rounded ",
        padding_x,
        padding_y
      )}
    >
      {children}
    </div>
  );
};
