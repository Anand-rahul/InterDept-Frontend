"use client";

import { LoadingSpinner } from "@/components/loadingSpinner";
import { RequirementCard } from "@/components/requirementCard";
import { RequirementDisplay } from "@/models/requirement";
import { useEffect, useState } from "react";

type TabType = "solution-requests" | "my-requests";

export default function SolveItPage() {
  const [activeTab, setActiveTab] = useState<TabType>("solution-requests");
  const [allRequirements, setAllRequirements] = useState<RequirementDisplay[]>(
    []
  );
  const [myRequirements, setMyRequirements] = useState<RequirementDisplay[]>(
    []
  );
  const [isLoading, setIsLoading] = useState({
    all: true,
    my: true,
  });
  const [error, setError] = useState({
    all: false,
    my: false,
  });

  useEffect(() => {
    async function fetchAllRequirements() {
      try {
        const response = await fetch("/api/solveIt?section=all");

        if (!response.ok) {
          throw new Error("Failed to fetch all requirements");
        }

        const data = await response.json();
        setAllRequirements(data);
      } catch (err) {
        setError((prev) => ({ ...prev, all: true }));
        console.error("Error fetching All requirements:", err);
      } finally {
        setIsLoading((prev) => ({ ...prev, all: false }));
      }
    }

    async function fetchMyRequirements() {
      try {
        const response = await fetch("/api/solveIt?section=my");

        if (!response.ok) {
          throw new Error("Failed to fetch my requirements");
        }

        const data = await response.json();
        setMyRequirements(data);
      } catch (err) {
        setError((prev) => ({ ...prev, my: true }));
        console.error("Error fetching my requirements:", err);
      } finally {
        setIsLoading((prev) => ({ ...prev, my: false }));
      }
    }

    fetchAllRequirements();
    fetchMyRequirements();
  }, []);

  // Helper function to render loading or error state
  const renderRowsOrError = (
    type: "all" | "my",
    requirements: RequirementDisplay[]
  ) => {
    return isLoading[type] ? (
      <tr>
        <td colSpan={6}>
          <LoadingSpinner />
        </td>
      </tr>
    ) : error[type] ? (
      <tr>
        <td colSpan={6}>
          <div className="text-red-500 p-4 text-center">
            Failed to load. Please try again later.
          </div>
        </td>
      </tr>
    ) : requirements.length === 0 ? (
      <tr>
        <td colSpan={6}>
          <div className="text-gray-500 p-4 text-center">
            No requirements found
          </div>
        </td>
      </tr>
    ) : (
      requirements.map((requirement) => (
        <RequirementCard key={requirement.id} requirement={requirement} />
      ))
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header Section */}
      <div className="gradient-header py-6 px-4 text-center rounded-b-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-1">
          SolveIT - Review & Accept Solution Requests
        </h1>
        {/* <div className="mt-4 space-x-4">
          <Link
            href={`submit`}
            className="bg-yellow-500 text-white px-5 py-3 rounded font-medium transition-all duration-200 hover:bg-yellow-600 hover:scale-105"
          >
            SolveIt Now
          </Link>
        </div> */}
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
                  ? renderRowsOrError("all", allRequirements)
                  : renderRowsOrError("my", myRequirements)}
              </tbody>
            </table>
          </div>

          {/* Empty state for My Requests if needed */}
          {activeTab === "my-requests" && myRequirements.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                You haven &apos;t submitted any requests yet.
              </p>
              <a
                href="/solveIt/submit"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Submit a new requirement
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
