"use client";

import { useState } from "react";
import { type DuplicateSolution } from "@/components/optimaxItem";
import { AlertCircle, BarChart3, CheckCircle } from "lucide-react";
import { OptimaxTable } from "@/components/optimaxTable";

export default function OptiMaxPage() {
  const [duplicateSolutions, setDuplicateSolutions] = useState<
    DuplicateSolution[]
  >([
    {
      id: 1,
      name: "AI Loan Processing",
      owner: "John Doe (IT Team)",
      status: "pending",
      comparedSolutions: [
        {
          name: "Loan AI Assistant",
          id: "#123",
          similarity: 88,
          status: "duplicate",
        },
        {
          name: "Smart Loan Processing",
          id: "#456",
          similarity: 75,
          status: "redundant",
        },
        {
          name: "Fast Loan Validator",
          id: "#789",
          similarity: 72,
          status: "optimize",
        },
      ],
    },
    {
      id: 2,
      name: "Customer Data Analytics",
      owner: "Jane Smith (Data Team)",
      status: "pending",
      comparedSolutions: [
        {
          name: "User Analytics Platform",
          id: "#234",
          similarity: 92,
          status: "duplicate",
        },
        {
          name: "Customer Insights Tool",
          id: "#567",
          similarity: 78,
          status: "redundant",
        },
      ],
    },
  ]);

  const handleApprove = (id: number, decision: string) => {
    setDuplicateSolutions((prev) =>
      prev.map((solution) =>
        solution.id === id ? { ...solution, status: "approved" } : solution
      )
    );
    // In a real app, you would send this to your backend
    console.log(`Solution ${id} approved with decision: ${decision}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header Section */}
      <div className="gradient-header py-6 px-4 text-center rounded-b-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-1">
          OptiMax - Optimize & Eliminate Inefficiencies
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">
                  Total Solutions Analyzed
                </div>
                <div className="text-2xl font-semibold text-gray-800">150</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">
                  Pending Decisions
                </div>
                <div className="text-2xl font-semibold text-amber-600">25</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">
                  Estimated Cost Savings
                </div>
                <div className="text-2xl font-semibold text-green-600">
                ₹2,00,000
                </div>
              </div>
            </div>
          </div>

          {/* Identified Duplicates List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center">
                <AlertCircle className="text-amber-500 mr-2" size={16} />
                <h2 className="text-base font-medium text-gray-800">
                  Identified Items
                </h2>
              </div>
            </div>

            <OptimaxTable
              solutions={duplicateSolutions}
              onApprove={handleApprove}
            />
          </div>
        </div>
      </div>

      {/* Floating Confirm Actions Button */}
      <button className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium transition-colors duration-200 hover:bg-blue-700 flex items-center">
        <CheckCircle size={16} className="mr-2" /> Confirm Actions
      </button>
    </div>
  );
}
