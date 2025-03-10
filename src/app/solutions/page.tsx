"use client";

import { LoadingSpinner } from "@/components/loadingSpinner";
import { SearchBar } from "@/components/searchBar";
import { SolutionCard } from "@/components/solutionCard";
import { SolutionDisplay } from "@/models/solution";
import { useEffect, useState } from "react";

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<SolutionDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchSolutions() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/solutions");

        if (!response.ok) {
          throw new Error("Failed to fetch solutions");
        }

        const data = await response.json();
        setSolutions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching solutions:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSolutions();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 text-center rounded-b-[50px]">
        <h1 className="text-4xl font-semibold mb-2">Explore Solutions</h1>
        
        {/* Search Bar */}
      </div>

      <SearchBar />
      <div className="container mx-auto px-4 mt-4 mb-10">
        {/* Solutions Grid */}
        {isLoading ? (
          <LoadingSpinner size="large" />
        ) : error ? (
          <div className="text-red-500 p-4 text-center">Error: {error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution) => (
              <SolutionCard solution={solution} key={solution.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
