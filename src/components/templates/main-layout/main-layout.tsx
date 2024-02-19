import type { PropsWithChildren } from "react";

type MainLayoutProps = PropsWithChildren;

export function MainLayout({ children }: MainLayoutProps) {
  return <main>{children}</main>;
}
