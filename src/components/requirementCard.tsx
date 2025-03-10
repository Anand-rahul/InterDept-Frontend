import Link from "next/link"
import { RequirementDisplay } from "@/models/requirement"

export function RequirementCard({ requirement }: {requirement: RequirementDisplay}) {
  return (
    <tr className="hover:bg-gray-50 border-b border-gray-200">
      <td className="px-4 py-3">{requirement.title}</td>
      <td className="px-4 py-3">{requirement.createdBy}</td>
      <td className="px-4 py-3">{requirement.requestingDepartment}</td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${
           requirement.priority === "High"
              ? "bg-red-100 text-red-800"
              : requirement.priority === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {requirement.priority}
        </span>
      </td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${
            requirement.status === "NEW"
              ? "bg-yellow-100 text-yellow-800"
              : requirement.status === "DISCUSSION"
                ? "bg-blue-100 text-blue-800"
                : requirement.status === "IN_PROGRESS"
                  ? "bg-indigo-100 text-indigo-800"
                  : requirement.status === "COMPLETED"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
          }`}
        >
          {requirement.status.replace("_", " ")}
        </span>
      </td>
      <td className="px-4 py-3">
        <Link
          href={`/solveIT/${requirement.id}`}
          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
        >
          View Details
        </Link>
      </td>
    </tr>
  )
}

