"use client";

import type React from "react";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FileText, X, Upload, Download } from "lucide-react";
import AutoDownloadLink from "@/components/autoDownloadLink";

const solutionNames: string[] = [
  "AI-Powered Customer Support Chatbot",
  "Cybersecurity Threat Detection System",
  "Enterprise Data Technology Platform (EDTP)",
  "Intelligent Document Processing System",
  "DNC Partner Mobile Response Portal DB to Data Lake",
  "Predictive Maintenance System",
  "Rapid Lead Response (Rapid LR)",
  "Empanelment Table Column Addition Data Lake",
  "Background Verification Data Migration to Data Lake",
  "MCO - BL - Communication Priority Logic in PLPOS",
  "NetCore Email Communication Data Migration SFTP to Data Lake",
  "KARIX WHATSAPP PROMO Data Lake Migration",
  "Partner Feedback Data Lake Migration",
  "SME CW SFDC Lead Allocation",
  "DNC Partner Batch Master Migration to Data Lake",
  "WHEELS Tractor Financing SFDC Lead Allocation API",
  "RMS DLOnboard Order & Payment Details Migration",
  "Miles Data Migration to Data Lake",
  "NDCSubmissionSummaryTrail Data Migration",
  "AI-Powered Re-Engagement Platform",
  "Real-Time Promotional Calling System",
  "SME ProfLoan SFDC Lead Allocation",
  "Photo Match & OVD Document Validation",
  "Cloud Migration Project",
  "IT Asset Management System",
  "Settlement High Pos Validation Migration",
  "Payments Acquiring Integration with PL@POS",
  "PartnerOne Historical Data Migration",
  "RMS DLOnboard Customer Subscription Mapping",
];

function SubmitRequirement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const solutionId = searchParams.get("solutionId");
  const solutionTitle = searchParams.get("solutionTitle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log("solutionId", solutionId);
  console.log("solutionTitle", solutionTitle);

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [requirementType, setRequirementType] = useState(
    "Propose a New Requirement"
  );
  const [formData, setFormData] = useState({
    department: "",
    subDepartment: "",
    lob: "",
    product: "",
    priority: "Low",
    solutionToUtilize: "",
    businessProblem: "",
    expectedImpact: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

  // Load solution data if solutionId is provided
  useEffect(() => {
    if (solutionId && solutionTitle) {
      setRequirementType("Utilize Existing Solution");
      setFormData((prevData) => ({
        ...prevData,
        solutionToUtilize: solutionTitle,
      }));
    }
  }, [solutionId, solutionTitle]); // Remove formData from dependencies

  // Get requirements document URL for the selected solution
  const getRequirementsDocUrl = (): string => {
    return "1";
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRequirementTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRequirementType(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const selectedFiles = e.target.files;

    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: File[] = [];
    let hasError = false;

    Array.from(selectedFiles).forEach((file) => {
      // Check if file is a PDF
      if (!file.type.includes("pdf")) {
        setFileError("Only PDF files are allowed");
        hasError = true;
        return;
      }

      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setFileError("File size should be less than 10MB");
        hasError = true;
        return;
      }

      newFiles.push(file);
    });

    if (!hasError) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setFileError("");
    const droppedFiles = e.dataTransfer.files;

    if (!droppedFiles || droppedFiles.length === 0) return;

    const newFiles: File[] = [];
    let hasError = false;

    Array.from(droppedFiles).forEach((file) => {
      // Check if file is a PDF
      if (!file.type.includes("pdf")) {
        setFileError("Only PDF files are allowed");
        hasError = true;
        return;
      }

      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setFileError("File size should be less than 10MB");
        hasError = true;
        return;
      }

      newFiles.push(file);
    });

    if (!hasError) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // In a real application, you would submit the form data and files to your backend here
    console.log("Form submitted:", formData);
    console.log("Files submitted:", files);

    // Show success toast
    setShowSuccessToast(true);

    // Hide toast after 2 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
      router.push("/solveIt");
    }, 2000);
  };

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Check if a solution was passed to this page
  const isSolutionPassed = !!solutionId && !!solutionTitle;

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header Section */}
      <div className="gradient-header py-6 px-4 text-center rounded-b-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-1">Submit a Requirement</h1>
      </div>

      <div className="container mx-auto px-4 py-3">
        <div className="max-w-3xl mx-auto bg-white p-5 rounded-lg shadow-sm">
          {/* Requester Details */}
          <div>
            <div className="text-base font-semibold text-blue-700 mb-2">
              Requester Details
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">
                  Requesting Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full p-2 text-sm border rounded"
                >
                  <option>Business</option>
                  <option>Operations</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Sub-Department</label>
                <select
                  name="subDepartment"
                  value={formData.subDepartment}
                  onChange={handleInputChange}
                  className="w-full p-2 text-sm border rounded"
                >
                  <option>COE</option>
                  <option>Data Analytics</option>
                  <option>Cloud Infrastructure</option>
                  <option>Customer Support</option>
                </select>
              </div>
            </div>
          </div>

          {/* LOB and Product Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm mb-1">
                Line of Business (LOB)
              </label>
              <input
                type="text"
                name="lob"
                value={formData.lob}
                onChange={handleInputChange}
                className="w-full p-2 text-sm border rounded"
                placeholder="E.g. Retail Banking"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Product Name</label>
              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleInputChange}
                className="w-full p-2 text-sm border rounded"
                placeholder="E.g. Personal Loan App"
              />
            </div>
          </div>

          {/* Priority Field */}
          <div className="mt-4">
            <div className="text-base font-semibold text-blue-700 mb-2">
              Request Priority
            </div>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full p-2 text-sm border rounded"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          {/* Requirement Type */}
          <div className="mt-4">
            <div className="text-base font-semibold text-blue-700 mb-2">
              Select Requirement Type
              {isSolutionPassed && (
                <span className="text-xs text-gray-500 ml-2">
                  (Pre-filled from solution)
                </span>
              )}
            </div>
            <select
              value={requirementType}
              onChange={handleRequirementTypeChange}
              className={`w-full p-2 text-sm border rounded ${
                isSolutionPassed ? "bg-gray-100" : ""
              }`}
              disabled={isSolutionPassed}
            >
              <option>Utilize Existing Solution</option>
              <option>Propose a New Requirement</option>
            </select>
          </div>

          {/* Solution Mapping (Conditional) */}
          {requirementType === "Utilize Existing Solution" && (
            <div className="mt-4">
              <div className="text-base font-semibold text-blue-700 mb-2">
                Select Solution to Utilize
                {isSolutionPassed && (
                  <span className="text-xs text-gray-500 ml-2">
                    (Pre-filled from solution)
                  </span>
                )}
              </div>
              <select
                name="solutionToUtilize"
                value={formData.solutionToUtilize}
                onChange={handleInputChange}
                className={`w-full p-2 text-sm border rounded ${
                  isSolutionPassed ? "bg-gray-100" : ""
                }`}
                disabled={isSolutionPassed}
              >
                <option value="">Select a solution</option>
                {solutionNames.map((solution, index) => (
                  <option key={index} id={solution}>
                    {solution}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Requirements Document Download Link */}
          {requirementType === "Utilize Existing Solution" &&
            formData.solutionToUtilize &&
            getRequirementsDocUrl() && (
              <div className="mt-2">
                <AutoDownloadLink
                  fileId={getRequirementsDocUrl()}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <Download size={14} className="mr-1" />
                  Download pre-requisite document
                </AutoDownloadLink>
              </div>
            )}

          {/* Business Problem & Expected Impact */}
          <div className="mt-4">
            <div className="text-base font-semibold text-blue-700 mb-2">
              Business Problem & Expected Impact
            </div>
            <textarea
              name="businessProblem"
              value={formData.businessProblem}
              onChange={handleInputChange}
              className="w-full p-2 text-sm border rounded mb-2"
              rows={2}
              placeholder="Describe the business problem..."
            ></textarea>
            <textarea
              name="expectedImpact"
              value={formData.expectedImpact}
              onChange={handleInputChange}
              className="w-full p-2 text-sm border rounded"
              rows={2}
              placeholder="Explain the expected impact of the solution..."
            ></textarea>
          </div>

          {/* File Upload Section */}
          <div className="mt-4">
            <div className="text-base font-semibold text-blue-700 mb-2">
              Upload Supporting Documents
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              multiple
              className="hidden"
            />

            {/* Drag & Drop Area */}
            <div
              className="border-2 border-dashed border-blue-500 p-3 text-center rounded-md bg-blue-50 hover:bg-blue-100 cursor-pointer text-sm transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <p>Drag & Drop PDF Files or Click to Upload</p>
            </div>

            {/* File Error Message */}
            {fileError && (
              <p className="text-xs text-red-500 mt-1">{fileError}</p>
            )}

            {/* Allowed formats */}
            <p className="text-xs text-gray-500 mt-1">
              Allowed format: PDF only (Max size: 10MB per file)
            </p>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium mb-2">Uploaded Files:</p>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm"
                    >
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="truncate max-w-[200px]">
                          {file.name}
                        </span>
                        <span className="text-gray-500 text-xs ml-2">
                          ({formatFileSize(file.size)})
                        </span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Submit Button */}
      <button
        onClick={handleSubmit}
        className="fixed bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md font-semibold text-sm transition-colors duration-300"
      >
        Submit Requirement
      </button>

      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md text-sm">
          Requirement Submitted Successfully!
        </div>
      )}
    </div>
  );
}

export default function SubmitRequirementPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubmitRequirement />
    </Suspense>
  );
}
