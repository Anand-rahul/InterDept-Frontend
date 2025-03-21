"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { ExternalLink, Filter, Search, Edit } from "lucide-react";
import Link from "next/link";
import { UseCase } from "@/models/solution";
import { EditModal } from "@/components/impactLensPopup";
import { LoadingSpinner } from "@/components/loadingSpinner";

// Mock data for solutions with ROI tracking
const solutionsData: UseCase[] = [
  {
    id: 1,
    solutionId: "1",
    solutionTitle: "Loan Processing AI",
    title: "Process Automation",
    dashboardUrl: "https://app.powerbi.com/loan-processing-dashboard",
    description: "",
    documentId: "7",
    comments: "40% reduction in processing time, $2.3M annual savings",
    department: "Retail Banking",
  },
  {
    id: 2,
    solutionId: "1",
    solutionTitle: "Chatbot Customer Support",
    title: "Customer Experience",
    dashboardUrl: "https://app.powerbi.com/chatbot-metrics-dashboard",
    description: "",
    documentId: "7",
    comments: "75% faster response time, 30% increase in customer satisfaction",
    department: "Customer Service",
  },
  {
    id: 3,
    solutionId: "1",
    solutionTitle: "Cloud Cost Optimizer",
    title: "Infrastructure",
    dashboardUrl: "https://app.powerbi.com/cloud-cost-dashboard",
    description: "",
    documentId: "7",
    comments: "32% reduction in cloud spend, $1.8M annual savings",
    department: "IT",
  },
  {
    id: 4,
    solutionId: "1",
    solutionTitle: "AI Fraud Detection",
    title: "Risk Management",
    dashboardUrl: "https://app.powerbi.com/fraud-detection-dashboard",
    description: "",
    documentId: "7",
    comments: "65% improvement in fraud detection, $4.2M in prevented losses",
    department: "Risk Management",
  },
  {
    id: 5,
    solutionId: "1",
    solutionTitle: "Predictive Maintenance System",
    title: "Operations",
    dashboardUrl: "https://app.powerbi.com/predictive-maintenance-dashboard",
    description: "",
    documentId: "7",
    comments: "45% reduction in downtime, $3.1M in maintenance savings",
    department: "Operations",
  },
  {
    id: 6,
    solutionId: "1",
    solutionTitle: "Customer Segmentation Engine",
    title: "Marketing",
    dashboardUrl: "https://app.powerbi.com/customer-segmentation-dashboard",
    description: "",
    documentId: "7",
    comments:
      "28% increase in campaign conversion rates, $1.5M additional revenue",
    department: "Marketing",
  },
];

export default function ImpactLensPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | "all">(
    "all"
  );
  const [useCases, setUseCases] = useState(solutionsData);
  const [editingUseCase, setEditingUseCase] = useState<
    (typeof useCases)[0] | null
  >(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUseCases() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/impactlens");

        if (!response.ok) {
          throw new Error("Failed to fetch all use cases");
        }

        const data = await response.json();
        setUseCases(data);
      } catch (err) {
        setError(true);
        console.error("Error fetching All use cases:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUseCases();
    setUseCases(solutionsData);
  }, []);

  // async function updateUseCase(
  //   id: number,
  //   dashboardUrl: string,
  //   comments: string
  // ) {
  //   try {
  //     const body = { id, comments, dashboardUrl };
  //     const response = await fetch(`/api/impactlens/${id}`, {
  //       method: "PUT",
  //       body: JSON.stringify(body),
  //     });

  //     if (!response.ok) {
  //       if (response.status === 404) {
  //         throw new Error("UseCase not updated");
  //       }
  //       throw new Error("Failed to update UseCase");
  //     }

  //     const data = await response.json();
  //   } catch (err) {
  //     console.error("Error updating requirement details:", err);
  //   }
  // }

  // Filter solutions based on search term and selected department
  const filteredSolutions = useCases.filter((uc) => {
    const matchesSearch =
      uc.solutionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uc.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "all" || uc.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  // Get unique departments for filter
  const departments = [
    "all",
    ...new Set(useCases.map((useCase) => useCase.department)),
  ];

  const handleEdit = (solution: (typeof solutionsData)[0]) => {
    setEditingUseCase(solution);
    setIsEditModalOpen(true);
  };

  const handleSave = async (
    id: number,
    dashboardUrl: string,
    comments: string
  ) => {
    // updateUseCase(id, dashboardUrl, comments)
    setUseCases(
      useCases.map((uc) =>
        uc.id === id ? { ...uc, dashboardUrl, comments } : uc
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header Section */}
      <div className="gradient-header py-6 px-4 text-center rounded-b-lg shadow-md">
        <h1 className="text-2xl font-bold mb-1">
          ImpactLens - Business ROI Tracker
        </h1>
      </div>

      <div className="container mx-auto px-4 py-3">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search solutions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <select
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm appearance-none bg-white"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments
                  .filter((d) => d !== "all")
                  .map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Solutions Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-medium text-gray-800">
              Business Impact Tracking
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Solution Name
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Use Case
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Business Report
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Comments
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6}>
                      <LoadingSpinner />
                    </td>
                  </tr>
                ) : (
                  filteredSolutions.map((solution) => (
                    <tr
                      key={solution.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/solutions/${solution.id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {solution.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                          {solution.title}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={solution.dashboardUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          PowerBI Dashboard
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                        {solution.comments}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleEdit(solution)}
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <Edit size={14} className="mr-1" />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Empty state if no results */}
          {error ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Failed to load. Please try again later.
              </p>
            </div>
          ) : useCases.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No items found.</p>
            </div>
          ) : (
            filteredSolutions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No items match your search criteria.
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        useCase={editingUseCase}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
