"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Category } from "@/types";
import { cn } from "@/libs/tw";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/categories/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  const categoriesActive = pathname === "/categories";

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      <Link
        key={"categories"}
        href={"/categories"}
        className={cn(
          "text-sm font-medium transition-colors hover:text-black",
          categoriesActive ? "text-black" : "text-neutral-500"
        )}
      >
        All Categories
      </Link>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
