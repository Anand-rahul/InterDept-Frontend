interface SummaryCardProps {
  icon: string
  title: string
  value: string
}

export function SummaryCard({ icon, title, value }: SummaryCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm font-semibold text-sm">
      {icon} {title} <span className="block text-2xl font-bold text-blue-600">{value}</span>
    </div>
  )
}

