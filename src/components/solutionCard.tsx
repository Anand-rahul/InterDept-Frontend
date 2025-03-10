import { SolutionDisplay } from "@/models/solution";
import { Eye, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function SolutionCard({ solution }: { solution: SolutionDisplay }) {
  const [isLiked, setIsLiked] = useState(solution.isLiked);
  const [likeCount, setLikeCount] = useState(solution.likeCount);

  const handleLikeClick = (e: React.MouseEvent) => {
    // Prevent the click from navigating to the solution details page
    e.preventDefault();
    e.stopPropagation();

    // Toggle like state
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div key={solution.id} className="card">
      <h5 className="font-semibold text-blue-700">🔹 {solution.title}</h5>
      <p className="text-sm text-gray-600 mt-2">{solution.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700 flex items-center space-x-3">
          <button
            onClick={handleLikeClick}
            className="flex items-center transition-colors duration-200 hover:text-blue-600 focus:outline-none"
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <ThumbsUp
              className={`h-4 w-4 mr-1 ${
                isLiked ? "fill-blue-600 text-blue-600" : "text-gray-500"
              }`}
            />
            {likeCount}
          </button>
          <span className="flex items-center">
            <Eye className="h-4 w-4 mr-1 text-gray-500" />
            {solution.viewCount}
          </span>
        </span>

        <Link
          href={`/solutions/${solution.id}`}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
