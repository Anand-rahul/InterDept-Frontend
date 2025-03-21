"use client";

import { LoadingSpinner } from "@/components/loadingSpinner";
import { SearchBar } from "@/components/searchBar";
import { SolutionCard } from "@/components/solutionCard";
import { SolutionDisplay } from "@/models/solution";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Solutions() {
  const [solutions, setSolutions] = useState<SolutionDisplay[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  
  // Handle search results from the SearchBar component
  const handleSearchResults = (results: SolutionDisplay[]) => {
    // Process the data to ensure dates are Date objects
    const processedResults = results.map(item => ({
      ...item,
      createdDate: item.createdDate instanceof Date ? 
        item.createdDate : 
        new Date(item.createdDate),
      updatedDate: item.updatedDate instanceof Date ? 
        item.updatedDate : 
        new Date(item.updatedDate)
    })) as SolutionDisplay[];
    
    setSolutions(processedResults);
    setIsLoading(false);
  };

  useEffect(() => {
    // Only fetch initial solutions if there's no search query
    const query = searchParams.get("q");
    if (!query) {
      fetchInitialSolutions();
    }
  }, [searchParams]);

  async function fetchInitialSolutions() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/solutions");

      if (!response.ok) {
        throw new Error("Failed to fetch solutions");
      }

      const data: SolutionDisplay[] = await response.json();
      
      // Convert date strings to Date objects
      const processedData = data.map(solution => ({
        ...solution,
        createdDate: solution.createdDate instanceof Date ? 
          solution.createdDate : 
          new Date(solution.createdDate),
        updatedDate: solution.updatedDate instanceof Date ? 
          solution.updatedDate : 
          new Date(solution.updatedDate)
      })) as SolutionDisplay[];
      
      setSolutions(processedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching solutions:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 text-center rounded-b-[50px]">
        <h1 className="text-4xl font-semibold mb-2">Explore Solutions</h1>
      </div>

      <SearchBar onSearchResults={handleSearchResults} />
      
      <div className="container mx-auto px-4 mt-4 mb-10">
        {/* Solutions Grid */}
        {isLoading ? (
          <LoadingSpinner size="large" />
        ) : error ? (
          <div className="text-red-500 p-4 text-center">Error: {error}</div>
        ) : solutions.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No solutions found. Try a different search term.
          </div>
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

export default function SolutionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Solutions />
    </Suspense>
  );
}