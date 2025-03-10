"use client"

import React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, Check } from "lucide-react"

export interface ComparedSolution {
  name: string
  id: string
  similarity: number
  status: "duplicate" | "redundant" | "optimize"
}

export interface DuplicateSolution {
  id: number
  name: string
  owner: string
  comparedSolutions: ComparedSolution[]
  status: "pending" | "approved" | "rejected"
}

interface DuplicateSolutionsTableProps {
  solutions: DuplicateSolution[]
  onApprove: (id: number, decision: string) => void
}

export function OptimaxTable({ solutions, onApprove }: DuplicateSolutionsTableProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [decisions, setDecisions] = useState<Record<number, string>>({})

  const toggleComparison = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleDecisionChange = (id: number, decision: string) => {
    setDecisions((prev) => ({ ...prev, [id]: decision }))
  }

  const handleApprove = (id: number) => {
    onApprove(id, decisions[id] || "Merge")
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-y border-gray-200">
            <th className="px-4 py-2 text-left font-medium text-gray-600">Solution Name</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Owner</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Compared</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Status</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Decision</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {solutions.map((solution) => (
            <React.Fragment key={solution.id}>
              <tr className="hover:bg-gray-50 border-b border-gray-100">
                <td className="px-4 py-3 text-gray-800">{solution.name}</td>
                <td className="px-4 py-3 text-gray-600">{solution.owner}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleComparison(solution.id)}
                    className="text-blue-600 text-xs flex items-center hover:text-blue-800"
                  >
                    {solution.comparedSolutions.length} solutions
                    {expandedId === solution.id ? (
                      <ChevronUp size={14} className="ml-1" />
                    ) : (
                      <ChevronDown size={14} className="ml-1" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      solution.status === "pending"
                        ? "bg-amber-50 text-amber-700"
                        : solution.status === "approved"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                    }`}
                  >
                    {solution.status.charAt(0).toUpperCase() + solution.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    className="w-full p-1 text-xs border border-gray-200 rounded bg-white"
                    value={decisions[solution.id] || "Merge"}
                    onChange={(e) => handleDecisionChange(solution.id, e.target.value)}
                  >
                    <option>Merge</option>
                    <option>Decommission</option>
                    <option>Ignore</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                    onClick={() => handleApprove(solution.id)}
                  >
                    <Check size={12} className="mr-1" /> Approve
                  </button>
                </td>
              </tr>

              {expandedId === solution.id && (
                <tr>
                  <td colSpan={6} className="px-4 py-0 bg-gray-50 border-b border-gray-200">
                    <div className="p-3">
                      <h3 className="text-xs font-medium text-gray-700 mb-2">Compared Solutions</h3>
                      <div className="space-y-2">
                        {solution.comparedSolutions.map((compared, index) => (
                          <div key={index} className="bg-white p-2 rounded border border-gray-100 text-xs">
                            <div className="flex justify-between">
                              <span className="font-medium">{compared.name}</span>
                              <span className="text-gray-500">ID: {compared.id}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span>
                                Similarity: <span className="font-medium">{compared.similarity}%</span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

