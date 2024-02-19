import clsx from "clsx";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
