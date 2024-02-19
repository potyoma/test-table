import clsx from "clsx";
import { PropsWithChildren } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = PropsWithChildren & {
  level?: HeadingLevel;
  className?: string;
};

export function Heading({ children, level = "h3", className }: HeadingProps) {
  const HeadingComponent = level;

  return (
    <HeadingComponent
      className={clsx(
        {
          "text-5xl font-bold": level === "h1",
          "text-4xl font-semibold": level === "h2",
          "text-3xl font-semibold": level === "h3",
          "text-2xl font-semibold": level === "h4",
          "text-xl font-medium": level === "h5",
          "text-base font-light": level === "h6",
        },
        className
      )}
    >
      {children}
    </HeadingComponent>
  );
}
