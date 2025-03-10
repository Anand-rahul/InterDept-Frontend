export interface FAQ {
  id: number
  question: string
  answer: string
}

export function FAQItem({ question, answer }: FAQ) {
  return (
    <div className="bg-white rounded-md p-3 shadow-sm">
      <div className="font-medium text-blue-700 mb-1">{question}</div>
      <p className="text-sm text-gray-600">{answer}</p>
    </div>
  )
}

