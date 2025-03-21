"use client";

import React from "react";

import { useState } from "react";
import { ChevronDown, ChevronUp, Check, CheckCircle } from "lucide-react";

interface SimilarSolution {
  id: number;
  name: string;
  similarity: number;
}

export interface Solution {
  id: number;
  name: string;
  owner: string;
  similarSolutions: SimilarSolution[];
  status: "pending" | "approved" | "rejected";
  action: "no_change" | "decommission" | "merge_into";
  mergeTarget?: number;
}

interface DuplicateSolutionsTableProps {
  solutions: Solution[];
  onApprove: (id: number, decision: string) => void;
  handleActionChange: (id: number, decision: Solution["action"]) => void;
}

export function OptimaxTable({
  solutions,
  onApprove,
  handleActionChange,
}: DuplicateSolutionsTableProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [decisions, setDecisions] = useState<Record<number, string>>({});

  const toggleComparison = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleApprove = (id: number) => {
    onApprove(id, decisions[id] || "Merge");
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-y border-gray-200">
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              Solution Name
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              Owner
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              Similar Solutions
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              Status
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              Action
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {solutions.map((solution) => (
            <React.Fragment key={solution.id}>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{solution.name}</td>
                <td className="px-4 py-3 text-gray-600">{solution.owner}</td>
                <td className="px-4 py-3">
                  {solution.similarSolutions.length > 0 ? (
                    <button
                      onClick={() => toggleComparison(solution.id)}
                      className="text-blue-600 text-xs flex items-center hover:text-blue-800"
                    >
                      {solution.similarSolutions.length} solutions
                      {expandedId === solution.id ? (
                        <ChevronUp size={14} className="ml-1" />
                      ) : (
                        <ChevronDown size={14} className="ml-1" />
                      )}
                    </button>
                  ) : (
                    <span className="text-xs text-gray-500 italic">
                      No similar solutions
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      solution.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : solution.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {solution.status === "pending"
                      ? "Pending"
                      : solution.status === "approved"
                      ? solution.action === "no_change"
                        ? "Approved"
                        : solution.action === "decommission"
                        ? "Decommissioned"
                        : `Merged into ${
                            solutions.find((s) => s.id === solution.mergeTarget)
                              ?.name || "another solution"
                          }`
                      : "Rejected"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    className="w-full p-1.5 text-xs border border-gray-200 rounded bg-white"
                    value={solution.action}
                    onChange={(e) =>
                      handleActionChange(
                        solution.id,
                        e.target.value as Solution["action"]
                      )
                    }
                    disabled={solution.status !== "pending"}
                  >
                    <option value="no_change">No Change</option>
                    <option value="decommission">Decommission</option>
                    {solution.similarSolutions.length > 0 && (
                      <option value="merge_into">Merge Into</option>
                    )}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleApprove(solution.id)}
                    disabled={solution.status !== "pending"}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
                  >
                    <CheckCircle size={12} className="mr-1" /> Approve
                  </button>
                </td>
              </tr>

              {expandedId === solution.id &&
                solution.similarSolutions.length > 0 && (
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <td colSpan={6} className="px-4 py-2">
                      <div className="p-2">
                        <h3 className="text-xs font-medium text-gray-700 mb-2">
                          Similar Solutions
                        </h3>
                        <div className="space-y-2">
                          {solution.similarSolutions.map((similar) => (
                            <div
                              key={similar.id}
                              className="bg-white p-2 rounded border border-gray-200 text-xs"
                            >
                              <div className="flex justify-between">
                                <span className="font-medium">
                                  {similar.name}
                                </span>
                                <span className="text-blue-600">
                                  {similar.similarity}% similar
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
  );
}
