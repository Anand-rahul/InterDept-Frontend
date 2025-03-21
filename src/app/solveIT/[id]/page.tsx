"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, User, Building, FileText } from "lucide-react";
import { RequirementDetails } from "@/models/requirement";
import { LoadingSpinner } from "@/components/loadingSpinner";
import AutoDownloadLink from "@/components/autoDownloadLink";

export default function RequirementDetailsPage() {
  const [showAssignPanel, setShowAssignPanel] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requirement, setRequirement] = useState<RequirementDetails | null>(
    null
  );
  const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [users, setUsers] = useState([]);
  const params = useParams();
  const id = parseInt(params.id as string, 10);

  // Get requirement data based on ID
  console.log(id);
  console.log(requirement);

  useEffect(() => {
    setRequirement(requirement);
  }, [requirement]);

  useEffect(() => {
    async function fetchRequirementDetails() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/solveIt/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Requirement not found");
          }
          throw new Error("Failed to fetch requirement details");
        }

        const data = await response.json();
        setRequirement(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching requirement details:", err);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchDocuments() {
      try {
        setIsDocumentsLoading(true);
        const response = await fetch(`/api/solveIt/${id}/documents`);

        if (!response.ok) {
          console.error("Failed to fetch documents");
          return;
        }

        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        console.error("Error fetching documents:", err);
      } finally {
        setIsDocumentsLoading(false);
      }
    }

    async function fetchUsers() {
      try {
        const response = await fetch(`/api/appUser/get-all`);

        if (!response.ok) {
          console.error("Failed to fetch users");
          return;
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching documents:", err);
      }
    }

    fetchRequirementDetails();
    fetchDocuments();
    fetchUsers();
  }, [id]);

  async function updateAssigned(email: string) {
    try {
      const body = {user: email}
      const response = await fetch(`/api/solveIt/${id}/status?value=accepted`,{method: "PUT", body: JSON.stringify(body)} );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Requirement not updated");
        }
        throw new Error("Failed to update requirement");
      }

      // const data = await response.json();
      requirement!.status = "ACCEPTED"
    } catch (err) {
      console.error("Error updating requirement details:", err);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex justify-center items-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !requirement) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Requirement Not Found</h1>
        <p className="mb-4">
          {error ||
            "The requirement you're looking for doesn't exist or has been removed."}
        </p>
        <Link href="/solveIt" className="btn-primary">
          Back to SolveIT
        </Link>
      </div>
    );
  }

  const handleAssign = () => {
    setShowAssignPanel(!showAssignPanel);
  };

  //TODO: get users from backend
  const handleConfirmAssignment = async () => {
    if (selectedEngineer) {
      // alert(`Requirement assigned to ${selectedEngineer}`);
      await updateAssigned(selectedEngineer);
      setShowAssignPanel(false);
    } else {
      alert("Please select an engineer to assign");
    }
  };
  return (
    <div className="min-h-screen bg-[#f4f6f9] pb-20">
      {/* Header Section */}
      <div className="gradient-header py-12 px-4 text-center rounded-b-[40px] shadow-lg">
        <h1 className="text-4xl font-bold mb-2">{requirement.title}</h1>
        <p className="text-xl opacity-90">{requirement.description}</p>
      </div>

      <div className="container mx-auto px-4 mt-4">
        {/* Status Bar */}
        <div className="bg-white rounded-lg p-4 shadow-md flex justify-between items-center">
          <div className="flex items-center">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                requirement.status === "NEW"
                  ? "bg-yellow-100 text-yellow-800"
                  : requirement.status === "DISCUSSION"
                  ? "bg-blue-100 text-blue-800"
                  : requirement.status === "ACCEPTED"
                  ? "bg-indigo-100 text-indigo-800"
                  : requirement.status === "COMPLETED"
                  ? "bg-green-100 text-green-800"
                  : requirement.status === "CANCELLED"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {requirement.status.replace("_", " ")}
            </span>
            <span className="mx-2">•</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                requirement.priority?.toUpperCase() === "HIGH"
                  ? "bg-red-100 text-red-800"
                  : requirement.priority?.toUpperCase() === "MEDIUM"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {requirement.priority?.toUpperCase()} Priority
            </span>
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Submitted: {new Date(requirement.createdDate).toLocaleDateString()}
          </div>
        </div>

        {/* Requester Information */}
        <div className="bg-white rounded-lg p-5 shadow-md mt-4">
          <h2 className="text-xl font-bold text-blue-700 mb-3">
            Requester Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-gray-700">
                <strong>Submitted By:</strong> {requirement.createdBy}
              </span>
            </div>
            <div className="flex items-center">
              <Building className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-gray-700">
                <strong>Department:</strong> {requirement.requestingDepartment}{" "}
                {requirement.subDepartment && `(${requirement.subDepartment})`}
              </span>
            </div>
          </div>
        </div>

        {/* Business Problem & Expected Impact */}
        <div className="bg-white rounded-lg p-5 shadow-md mt-4">
          <h2 className="text-xl font-bold text-blue-700 mb-3">
            Business Problem & Expected Impact
          </h2>
          <p className="text-gray-700 mb-4">{requirement.problemStatement}</p>

          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            Expected Impact:
          </h3>
          <p className="text-gray-700 mb-4">{requirement.expectedImpact}</p>
        </div>

        {/* Supporting Documents */}
        <div className="bg-white rounded-lg p-5 shadow-md mt-4">
          <h2 className="text-xl font-bold text-blue-700 mb-3">
            Supporting Documents
          </h2>
          <ul className="space-y-2">
            {isDocumentsLoading ? (
              <LoadingSpinner size="small" />
            ) : documents.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                No documents available.
              </p>
            ) : (
              Object.entries(documents).map(([fileName, value], index) => (
                <li key={index} className="flex items-center">
                  <FileText className="h-5  w-5 text-blue-500 mr-2" />
                  <AutoDownloadLink
                    fileId={value}
                    className="text-blue-600 hover:underline"
                  >
                    {fileName}
                  </AutoDownloadLink>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Related Solution (if applicable) */}
        {requirement.solutionId && (
          <div className="bg-white rounded-lg p-5 shadow-md mt-4">
            <h2 className="text-xl font-bold text-blue-700 mb-3">
              🔄 Related Solution
            </h2>
            <Link
              href={`/solutions/${requirement.solutionId}`}
              className="flex items-center text-blue-600 hover:underline"
            >
              <span className="mr-2">View Related Solution</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Assignment Panel (conditionally shown) */}
      {showAssignPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold text-blue-700 mb-4">
              Assign Requirement
            </h3>
            <p className="mb-4">
              Select an engineer to assign this requirement to:
            </p>

            <select
              className="w-full p-2 border rounded mb-4"
              value={selectedEngineer}
              onChange={(e) => setSelectedEngineer(e.target.value)}
            >
              <option value="">Select an engineer</option>
              {Object.entries(users).map(([email, name], index) => (
                <option key={index} value={email}>
                  {name}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                onClick={() => setShowAssignPanel(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleConfirmAssignment}
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {requirement.status === "NEW" && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
          <button
            onClick={handleAssign}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md text-sm font-medium transition-colors duration-300"
          >
            Accept & Assign
          </button>
        </div>
      )}
    </div>
  );
}
