import { cn } from "@/utils";
import Link from "next/link";
import { PropsWithChildren, ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";

export type NavItemProps = {
  icon?: ReactNode;
  link: string;
} & PropsWithChildren;

export function NavItem({ icon, children, link }: NavItemProps) {
  const pathname = usePathname()
  const selected = useMemo(() => pathname === link, [pathname, link]);
  return (
    <Link
      href={link}
      className={cn(
        selected ? "text-pink-500" : "text-gray-500",
        "flex items-center gap-1",
        "hover:text-pink-500 hover:bg-grap-200"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
