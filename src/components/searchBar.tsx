"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="text-center mt-5">
      <div className="relative inline-block w-1/2 ">
        <input
          type="text"
          placeholder="🔍 AI-Powered Solution Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm"
        >
          Search
        </button>
      </div>
    </form>
  )
}

