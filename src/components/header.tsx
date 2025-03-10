"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "Solutions", href: "/solutions" },
  { name: "SolveIT", href: "/solveIT" },
  { name: "OptiMax", href: "/optimax" },
  { name: "ImpactLens", href: "/impactlens" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="w-full">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-blue-500">
          BITS HUB
        </Link>
        <nav className="flex items-center space-x-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 ${
                  isActive ? "border-2 border-blue-500 rounded" : "text-gray-700 hover:text-blue-500"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="h-1 w-full bg-blue-500" />
    </header>
  )
}

