"use client";

import { useState } from "react";
import { AlertCircle, BarChart3, CheckCircle } from "lucide-react";
import { type Solution, OptimaxTable } from "@/components/optimaxTable";
import MergeSelectionModal from "@/components/mergeSelectionModal";

// Initial solutions data
const initialSolutions: Solution[] = [
  {
    id: 1,
    name: "AI Loan Processing",
    owner: "John Doe (IT Team)",
    status: "pending",
    action: "no_change",
    similarSolutions: [
      { id: 2, name: "Loan AI Assistant", similarity: 88 },
      { id: 3, name: "Smart Loan Processing", similarity: 75 },
      { id: 4, name: "Fast Loan Validator", similarity: 72 },
    ],
  },
  {
    id: 2,
    name: "Loan AI Assistant",
    owner: "Sarah Johnson (Retail Banking)",
    status: "pending",
    action: "no_change",
    similarSolutions: [
      { id: 1, name: "AI Loan Processing", similarity: 88 },
      { id: 3, name: "Smart Loan Processing", similarity: 70 },
    ],
  },
  {
    id: 3,
    name: "Smart Loan Processing",
    owner: "Michael Chen (Loan Dept)",
    status: "pending",
    action: "no_change",
    similarSolutions: [
      { id: 1, name: "AI Loan Processing", similarity: 75 },
      { id: 2, name: "Loan AI Assistant", similarity: 70 },
    ],
  },
  {
    id: 4,
    name: "Fast Loan Validator",
    owner: "Emma Wilson (Risk Management)",
    status: "pending",
    action: "no_change",
    similarSolutions: [{ id: 1, name: "AI Loan Processing", similarity: 72 }],
  },
  {
    id: 5,
    name: "Customer Data Analytics",
    owner: "Jane Smith (Data Team)",
    status: "pending",
    action: "no_change",
    similarSolutions: [
      { id: 6, name: "User Analytics Platform", similarity: 92 },
      { id: 7, name: "Customer Insights Tool", similarity: 78 },
    ],
  },
  {
    id: 6,
    name: "User Analytics Platform",
    owner: "David Patel (Marketing)",
    status: "pending",
    action: "no_change",
    similarSolutions: [
      { id: 5, name: "Customer Data Analytics", similarity: 92 },
      { id: 7, name: "Customer Insights Tool", similarity: 85 },
    ],
  },
  {
    id: 7,
    name: "Customer Insights Tool",
    owner: "Lisa Wong (Customer Experience)",
    status: "pending",
    action: "no_change",
    similarSolutions: [
      { id: 5, name: "Customer Data Analytics", similarity: 78 },
      { id: 6, name: "User Analytics Platform", similarity: 85 },
    ],
  },
  {
    id: 8,
    name: "Data Visualization Suite",
    owner: "Robert Kim (Business Intelligence)",
    status: "pending",
    action: "no_change",
    similarSolutions: [
      { id: 7, name: "Customer Insights Tool", similarity: 65 },
    ],
  },
];

export default function OptiMaxPage() {
  const [solutions, setSolutions] = useState<Solution[]>(initialSolutions);
  const [mergeModalOpen, setMergeModalOpen] = useState(false);
  const [currentSolution, setCurrentSolution] = useState<Solution | null>(null);

  // Count total solutions and pending decisions
  const totalSolutions = solutions.length;
  const pendingDecisions = solutions.filter(
    (s) => s.status === "pending"
  ).length;

  const handleActionChange = (
    solutionId: number,
    action: Solution["action"]
  ) => {
    setSolutions((prev) =>
      prev.map((solution) =>
        solution.id === solutionId
          ? { ...solution, action, mergeTarget: undefined }
          : solution
      )
    );
  };

  const handleApprove = (solutionId: number) => {
    const solution = solutions.find((s) => s.id === solutionId);
    if (!solution) return;

    if (solution.action === "no_change") {
      // Just mark as approved
      setSolutions((prev) =>
        prev.map((s) =>
          s.id === solutionId ? { ...s, status: "approved" } : s
        )
      );
    } else if (solution.action === "decommission") {
      // Mark as approved and remove from all similar solutions lists
      setSolutions((prev) =>
        prev.map((s) => {
          if (s.id === solutionId) {
            return { ...s, status: "approved" };
          }

          // Remove the decommissioned solution from similar solutions
          return {
            ...s,
            similarSolutions: s.similarSolutions.filter(
              (similar) => similar.id !== solutionId
            ),
          };
        })
      );
    } else if (solution.action === "merge_into") {
      // Open merge modal
      setCurrentSolution(solution);
      setMergeModalOpen(true);
    }
  };

  const handleMergeConfirm = (solutionId: number, targetId: number) => {
    // Close modal
    setMergeModalOpen(false);

    // Update solution status and remove from all similar solutions lists
    setSolutions((prev) =>
      prev.map((s) => {
        if (s.id === solutionId) {
          return { ...s, status: "approved", mergeTarget: targetId };
        }

        // Remove the merged solution from similar solutions
        return {
          ...s,
          similarSolutions: s.similarSolutions.filter(
            (similar) => similar.id !== solutionId
          ),
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header Section */}
      <div className="gradient-header py-6 px-4 text-center rounded-b-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-1">
          OptiMax - Analyze & Optimize Solutions
        </h1>
      </div>

      <div className="container mx-auto px-4 py-3">
        <div className="container mx-auto px-4 pb-8">
          {/* OptiMax Dashboard */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="text-blue-600 mr-2" size={18} />
              <h2 className="text-lg font-medium text-gray-800">Dashboard</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">
                  Total Solutions Analyzed
                </div>
                <div className="text-2xl font-semibold text-gray-800">
                  150{/*totalSolutions*/}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">
                  Pending Decisions
                </div>
                <div className="text-2xl font-semibold text-amber-600">
                  25{/*pendingDecisions*/}
                </div>
              </div>
            </div>
          </div>

          {/* Solutions List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center">
                <AlertCircle className="text-amber-500 mr-2" size={16} />
                <h2 className="text-base font-medium text-gray-800">
                  Identified Items
                </h2>
              </div>
            </div>

            <OptimaxTable solutions={solutions} onApprove={handleApprove} handleActionChange={handleActionChange} />
          </div>
        </div>
      </div>

      {/* Floating Confirm Actions Button */}
      <button className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium transition-colors duration-200 hover:bg-blue-700 flex items-center">
        <CheckCircle size={16} className="mr-2" /> Confirm All Actions
      </button>

      {/* Merge Selection Modal */}
      <MergeSelectionModal
        solution={currentSolution}
        isOpen={mergeModalOpen}
        onClose={() => setMergeModalOpen(false)}
        onConfirm={handleMergeConfirm}
      />
    </div>
  );
}
