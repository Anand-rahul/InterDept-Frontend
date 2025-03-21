"use client";

import Link from "next/link";
import { getUserData } from "@/components/userData";
import { UserMenu } from "./userMenu";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/solutions" },
  { name: "SolveIT", href: "/solveIt" },
  { name: "ImpactLens", href: "/impactlens" },
  { name: "OptiMax", href: "/optimax" },
];

export function Header() {
  const pathname = usePathname();
  const userData = getUserData();

  const handleLogout = () => {
    // In a real app, this would handle the logout process
    console.log("Logging out...");
    // setIsUserMenuOpen(false);
    // You would typically redirect to login page or clear auth state here
  };

  return (
    <header className="w-full">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-blue-500">
          BITS HUB
        </Link>
        <div className="flex items-center">
          {/* Navigation */}
          <nav className="flex items-center space-x-1 mr-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 ${
                    isActive
                      ? "border-2 border-blue-500 rounded"
                      : "text-gray-700 hover:text-blue-500"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <UserMenu {...userData} handleLogout={handleLogout} />
        </div>
      </div>
      <div className="h-1 w-full bg-blue-500" />
    </header>
  );
}
