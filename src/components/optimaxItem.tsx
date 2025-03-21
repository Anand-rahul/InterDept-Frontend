"use client"

import type React from "react"
import { useState } from "react"

interface SimilarSolution {
  id: number
  name: string
  similarity: number
}

export interface Solution {
  id: number
  name: string
  owner: string
  similarSolutions: SimilarSolution[]
  status: "pending" | "approved" | "rejected"
  action: "no_change" | "decommission" | "merge_into"
  mergeTarget?: number
}

interface DuplicateSolutionItemProps {
  solution: Solution
  onApprove: (id: number, decision: string) => void
}

export function OptimaxItem({ solution, onApprove }: DuplicateSolutionItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [decision, setDecision] = useState("Merge")

  const toggleComparison = () => {
    setIsExpanded(!isExpanded)
  }

  const handleDecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDecision(e.target.value)
  }

  const handleApprove = () => {
    onApprove(solution.id, decision)
  }

  const getStatusColor = (status: "duplicate" | "redundant" | "optimize") => {
    switch (status) {
      case "duplicate":
        return "text-red-600"
      case "redundant":
        return "text-yellow-600"
      case "optimize":
        return "text-green-600"
    }
  }

  const getStatusText = (status: "duplicate" | "redundant" | "optimize") => {
    switch (status) {
      case "duplicate":
        return "Possible Duplicate"
      case "redundant":
        return "Might be redundant"
      case "optimize":
        return "Could be optimized"
    }
  }

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-4 py-3">{solution.name}</td>
        <td className="px-4 py-3">{solution.owner}</td>
        <td className="px-4 py-3">
          <button onClick={toggleComparison} className="text-blue-600 underline text-sm cursor-pointer">
            Compared to {solution.similarSolutions.length} solutions
          </button>
        </td>
        <td className="px-4 py-3">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded ${
              solution.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : solution.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {solution.status.charAt(0).toUpperCase() + solution.status.slice(1)}
          </span>
        </td>
        <td className="px-4 py-3">
          <select className="w-full p-1 text-sm border rounded" value={decision} onChange={handleDecisionChange}>
            <option>Merge</option>
            <option>Decommission</option>
            <option>Ignore</option>
          </select>
        </td>
        <td className="px-4 py-3">
          <button
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleApprove}
          >
            Approve
          </button>
        </td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan={6} className="px-4 py-0">
            <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 mb-3">
              <h3 className="text-sm font-semibold mb-2">🆚 Compared Solutions</h3>
              <ul className="space-y-2">
                {solution.similarSolutions.map((compared, index) => (
                  <li key={index} className="text-sm">
                    <strong>{compared.name}</strong> (ID: {compared.id}) - Similarity: {compared.similarity}% -{" "}
                  </li>
                ))}
              </ul>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

