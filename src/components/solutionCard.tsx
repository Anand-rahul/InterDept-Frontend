import { SolutionDisplay, statusColors } from "@/models/solution";
import { Eye, ThumbsUp } from "lucide-react";
import Link from "next/link";

export function SolutionCard({ solution }: { solution: SolutionDisplay }) {
  return (
    <Link href={`/solutions/${solution.id}`} className="block h-full">
      <div className="card flex flex-col h-full">
      <div className="flex justify-between items-start gap-4">
          <h5 className="font-semibold text-blue-700 flex-shrink">🔹 {solution.title}</h5>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusColors[solution.status]}`}>
            {solution.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2 flex-grow">{solution.description}</p>
        <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
          <span className="text-sm text-gray-700 flex items-center space-x-3">
            <span className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1 text-gray-500" />
              {solution.likeCount}
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1 text-gray-500" />
              {solution.viewCount}
            </span>
          </span>
          <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 py-1 rounded text-sm font-medium">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
