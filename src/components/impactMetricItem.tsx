interface ImpactMetricRowProps {
  solutionName: string
  category: string
  adoptionRate: string
  roi: string
  costSavings: string
  trend: "up" | "down"
}

export function ImpactMetricItem({
  solutionName,
  category,
  adoptionRate,
  roi,
  costSavings,
  trend,
}: ImpactMetricRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3">{solutionName}</td>
      <td className="px-4 py-3">{category}</td>
      <td className="px-4 py-3">{adoptionRate}</td>
      <td className="px-4 py-3">{roi}</td>
      <td className="px-4 py-3">{costSavings}</td>
      <td className="px-4 py-3">{trend === "up" ? "📈" : "📉"}</td>
    </tr>
  )
}

