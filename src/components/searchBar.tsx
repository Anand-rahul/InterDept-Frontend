"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SolutionDisplay } from "@/models/solution";

interface SearchBarProps {
  onSearchResults: (results: SolutionDisplay[]) => void;
}

export function SearchBar({ onSearchResults }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      setIsSearching(true);
      
      try {
        // Use the middleware endpoint instead of calling the external API directly
        const response = await fetch(`/api/solutions/search?query=${encodeURIComponent(searchTerm)}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log("Search Results:", data);
          
          // Pass the search results to the parent component
          onSearchResults(data);
          
          // Update URL with search query parameter
          router.push(`/solutions?q=${encodeURIComponent(searchTerm)}`);
        } else {
          console.error("Search Error:", response.status, await response.text());
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="text-center mt-5">
      <div className="relative inline-block w-1/2">
        <input
          type="text"
          placeholder="🔍 AI-Powered Solution Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm"
          disabled={isSearching}
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}