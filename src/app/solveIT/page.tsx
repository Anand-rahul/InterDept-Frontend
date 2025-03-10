"use client";

import { RequirementCard } from "@/components/requirementCard";
import { requirements } from "@/staticData/solutionData";
import { useState } from "react";

type TabType = "solution-requests" | "my-requests"
const allRequirements = requirements;
const myRequirements = requirements;

export default function SolveItPage() {
  const [activeTab, setActiveTab] = useState<TabType>("solution-requests")

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header Section */}
      <div className="gradient-header py-6 px-4 text-center rounded-b-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-1">
          SolveIT - Review & Accept Solution Requests
        </h1>
      </div>

      <div className="container mx-auto px-4 py-3">
        <div className="max-w-5xl mx-auto bg-white p-5 rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "solution-requests"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("solution-requests")}
            >
              Solution Requests
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "my-requests"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("my-requests")}
            >
              My Requests
            </button>
          </div>

          {/* Requests Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Submitted By</th>
                  <th className="px-4 py-2 text-left">Department</th>
                  <th className="px-4 py-2 text-left">Priority</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
              {activeTab === "solution-requests"
                  ? allRequirements.map((requirement) => (
                      <RequirementCard
                        key={requirement.id}
                        requirement={requirement}
                      />
                    ))
                  : myRequirements.map((requirement) => (
                  <RequirementCard
                    requirement={requirement}
                    key={requirement.id}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state for My Requests if needed */}
          {activeTab === "my-requests" && myRequirements.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">You haven`&apos;`t submitted any requests yet.</p>
              <a href="/submit-requirement" className="text-blue-600 hover:underline mt-2 inline-block">
                Submit a new requirement
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
