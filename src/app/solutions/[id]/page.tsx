"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChatBubble } from "@/components/chatBubble";
import { FAQ } from "@/components/faqItem";
import { SolutionDetails } from "@/models/solution";
import { Download, Eye, ThumbsUp } from "lucide-react";
import { LoadingSpinner } from "@/components/loadingSpinner";
import AutoDownloadLink from "@/components/autoDownloadLink";

export default function SolutionDetailsPage() {
  const [solution, setSolution] = useState<SolutionDetails | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFaqsLoading, setIsFaqsLoading] = useState(true);
  const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isLiked, setIsLiked] = useState(solution?.isLiked || false);
  const [likeCount, setLikeCount] = useState(solution?.likeCount || 0);

  const params = useParams();
  const id = params.id as string;

  // Handle like button click
  const handleLikeClick = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    async function fetchSolutionDetails() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/solutions/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Solution not found");
          }
          throw new Error("Failed to fetch solution details");
        }

        const data = await response.json();
        setSolution(data);
        setLikeCount(data.likeCount);
        setIsLiked(data.isLiked);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching solution details:", err);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchFaqs() {
      try {
        setIsFaqsLoading(true);
        const response = await fetch(`/api/solutions/${id}/faqs`);

        if (!response.ok) {
          console.error("Failed to fetch FAQs");
          return;
        }

        const data = await response.json();
        setFaqs(data);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      } finally {
        setIsFaqsLoading(false);
      }
    }

    async function fetchDocuments() {
      try {
        setIsDocumentsLoading(true);
        const response = await fetch(`/api/solutions/${id}/documents`);

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

    fetchSolutionDetails();
    fetchFaqs();
    fetchDocuments();
  }, [id]);

  const similarSolutions = ["AI Fraud Detection", "Automated Credit Scoring"];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex justify-center items-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !solution) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-xl font-bold mb-4">Solution Not Found</h1>
        <p className="mb-4 text-gray-600">
          {error ||
            "The solution you're looking for doesn't exist or has been removed."}
        </p>
        <Link href="/solutions" className="btn-primary">
          Browse All Solutions
        </Link>
      </div>
    );
  }

  if (isFaqsLoading) {
    console.log("Loading FAQs");
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9] pb-20">
      {/* Header Section */}
      <div className="gradient-header py-12 px-4 text-center rounded-b-[40px] shadow-lg">
        <h1 className="text-4xl font-bold mb-2">{solution.title}</h1>
        <p className="text-xl opacity-90">{solution.description}</p>
      </div>

      <div className="container mx-auto px-4 mt-4">
        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <button
              onClick={handleLikeClick}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 focus:outline-none"
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <ThumbsUp
                size={16}
                className={`mr-1 ${
                  isLiked ? "fill-blue-600 text-blue-600" : "text-blue-600"
                }`}
              />
              <span>{likeCount} Likes</span>
            </button>
            <div className="flex items-center text-gray-600">
              <Eye size={16} className="mr-1 text-blue-600" />
              <span>{solution.viewCount} Views</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Download size={16} className="mr-1 text-blue-600" />
              <span>{10} Adoptions</span>
            </div>
          </div>
        </div>

        {/* Solution Overview */}
        <div className="bg-white rounded-lg p-5 shadow-md mt-4">
          <h2 className="text-xl font-bold text-blue-700 mb-3">
            Business Problem & Solution
          </h2>
          <p className="text-gray-700">{solution.problemStatement}</p>
        </div>

        {/* Key Benefits */}
        <div className="bg-white rounded-lg p-5 shadow-md mt-4">
          <h2 className="text-xl font-bold text-blue-700 mb-3">
            Key Benefits & ROI
          </h2>
          <p className="text-gray-700">{solution.impact}</p>
        </div>

        {/* Supporting Documents */}
        <div className="bg-white rounded-lg p-5 shadow-md mt-4">
          <h2 className="text-xl font-bold text-blue-700 mb-3">
            Supporting Documents
          </h2>
          <ul className="list-disc pl-5">
            {isDocumentsLoading ? (
              <LoadingSpinner size="small" />
            ) : documents.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                No documents available for this solution.
              </p>
            ) : (
              Object.entries(documents).map(([fileName, value], index) => (
                <li key={index} className="mb-2">
                  <AutoDownloadLink
                    fileId={value}
                    className="text-blue-500 hover:underline"
                  >
                    {fileName}
                  </AutoDownloadLink>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Similar Solutions */}
        <div className="bg-white rounded-lg p-5 shadow-md mt-4">
          <h2 className="text-xl font-bold text-blue-700 mb-3">
            AI-Suggested Similar Solutions
          </h2>
          <ul className="list-none">
            {similarSolutions.map((similar, index) => (
              <li key={index} className="mb-2">
                🔹 {similar}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat Bubble Component */}
      <ChatBubble faqs={faqs} />

      {/* Sticky Submit Requirement Button */}
      <Link
        href={{
          pathname: "/solveIT/submit",
          query: {
            solutionId: solution.id,
            solutionTitle: solution.title,
          },
        }}
        className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-lg font-semibold transition-colors duration-300"
      >
        Submit a Requirement
      </Link>
    </div>
  );
}
