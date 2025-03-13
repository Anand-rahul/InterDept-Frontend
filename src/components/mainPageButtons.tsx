"use client"

import { useRouter } from "next/navigation"

export function MainPageButtons() {
  const router = useRouter()

  return (
    <div className="space-x-4">
      <button
        onClick={() => router.push("/solutions")}
        className="bg-white text-blue-500 px-5 py-3 rounded font-medium transition-all duration-200 hover:bg-blue-100 hover:scale-105"
      >
        Browse Solutions
      </button>
      <button
        onClick={() => router.push("/solveIt/submit")}
        className="bg-yellow-500 text-white px-5 py-3 rounded font-medium transition-all duration-200 hover:bg-yellow-600 hover:scale-105"
      >
        SolveIt Now
      </button>
    </div>
  )
}

