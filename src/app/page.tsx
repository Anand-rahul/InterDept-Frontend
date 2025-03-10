"use client";

import { useEffect, useState } from "react";
import { MainPageButtons } from "@/components/mainPageButtons";
import { SolutionCard } from "@/components/solutionCard";
import { SolutionDisplay } from "@/models/solution";
import { Loader2 } from "lucide-react";

// import {jwtAuth} from "@/utils/jwtAuth"

// const latestSolutions = async function getLatestSolutions(): Promise<SolutionResponse> {
//   const res = await fetch("http://localhost:8080/api/solution?size=5&sort=viewCount,desc", { headers: {
//     "Authorization": `Bearer ${jwtAuth}`,
//     "Content-Type": "application/json"
//   }, })
//   if (!res.ok) {
//     throw new Error("Failed to fetch latest solutions")
//   }
//   return res.json()
// }

export default function Home() {
  const [latestSolutions, setLatestSolutions] = useState<SolutionDisplay[]>([]);
  const [trendingSolutions, setTrendingSolutions] = useState<SolutionDisplay[]>(
    []
  );
  const [isLoading, setIsLoading] = useState({
    latest: true,
    trending: true,
  });
  const [error, setError] = useState({
    latest: false,
    trending: false,
  });

  useEffect(() => {
    // Fetch latest solutions
    const fetchLatestSolutions = async () => {
      try {
        const response = await fetch(
          "/api/solutions/categories?category=latest"
        );
        if (!response.ok) throw new Error("Failed to fetch latest solutions");
        const data = await response.json();
        setLatestSolutions(data);
      } catch (err) {
        console.error("Error fetching latest solutions:", err);
        setError((prev) => ({ ...prev, latest: true }));
      } finally {
        setIsLoading((prev) => ({ ...prev, latest: false }));
      }
    };

    // Fetch trending solutions
    const fetchTrendingSolutions = async () => {
      try {
        const response = await fetch(
          "/api/solutions/categories?category=trending"
        );
        if (!response.ok) throw new Error("Failed to fetch trending solutions");
        const data = await response.json();
        setTrendingSolutions(data);
      } catch (err) {
        console.error("Error fetching trending solutions:", err);
        setError((prev) => ({ ...prev, trending: true }));
      } finally {
        setIsLoading((prev) => ({ ...prev, trending: false }));
      }
    };

    // Execute all fetch operations
    fetchLatestSolutions();
    fetchTrendingSolutions();
  }, []);

  // Helper function to render loading or error state
  const renderLoadingOrError = (type: "latest" | "trending") => {
    if (isLoading[type]) {
      return (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      );
    }

    if (error[type]) {
      return (
        <div className="text-center py-8">
          <p className="text-red-500">
            Failed to load solutions. Please try again later.
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      {/* Hero Section */}
      <div className="gradient-header py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to BITS HUB</h1>

        <div className="space-x-4">
          <MainPageButtons />
        </div>
      </div>
      <div className="container mx-auto px-4 mt-10">
        {/* Latest Added Solutions */}
        <div>
          <h2 className="text-xl font-bold mb-4 col-3">Latest Added Solutions</h2>

          {renderLoadingOrError("latest") ||
            (latestSolutions.length > 0 ? (
              latestSolutions.map((solution) => (
                <div key={solution.title} className="p-1">
                  <SolutionCard solution={solution} key={solution.id} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No solutions available
              </p>
            ))}
        </div>

        {/* Trending Solutions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Trending Solutions</h2>
          {renderLoadingOrError("trending") ||
            (trendingSolutions.length > 0 ? (
              trendingSolutions.map((solution) => (
                <div key={solution.title} className="p-1">
                  <SolutionCard solution={solution} key={solution.id} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No solutions available
              </p>
            ))}
        </div>

        {/* AI-Powered Personalized Recommendations */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            AI-Powered Personalized Recommendations
          </h2>
          <p className="text-gray-700">
            Suggested solutions based on your browsing history and interests.
          </p>
        </div>

        {/* Top Contributor Departments */}
        <div className="mt-8 mb-10">
          <h2 className="text-xl font-bold mb-4">
            Top Contributor Departments
          </h2>
          <ul className="bg-white rounded-lg divide-y">
            <li className="px-4 py-3">🔹 Risk Management</li>
            <li className="px-4 py-3">🔹 Data Science</li>
            <li className="px-4 py-3">🔹 IT Security</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
