import { useEffect, useState } from "react"
import { Solution } from "./optimaxItem"
import { X } from "lucide-react"

// Merge selection modal component
interface MergeSelectionModalProps {
    solution: Solution | null
    isOpen: boolean
    onClose: () => void
    onConfirm: (solutionId: number, targetId: number) => void
  }
  
export default function MergeSelectionModal({ solution, isOpen, onClose, onConfirm }: MergeSelectionModalProps) {
    const [selectedTarget, setSelectedTarget] = useState<number>(0)
  
    useEffect(() => {
      if (solution && solution.similarSolutions.length > 0) {
        setSelectedTarget(solution.similarSolutions[0].id)
      }
    }, [solution])
  
    if (!isOpen || !solution) return null
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Select Solution to Merge Into</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
  
          <p className="text-sm text-gray-600 mb-4">
            Select which solution <span className="font-medium">{solution.name}</span> should be merged into:
          </p>
  
          <div className="mb-6">
            <select
              className="w-full p-2 border border-gray-300 rounded text-sm"
              value={selectedTarget}
              onChange={(e) => setSelectedTarget(parseInt(e.target.value))}
            >
              {solution.similarSolutions.map((similar) => (
                <option key={similar.id} value={similar.id}>
                  {similar.name} ({similar.similarity}% similar)
                </option>
              ))}
            </select>
          </div>
  
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(solution.id, selectedTarget)}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Confirm Merge
            </button>
          </div>
        </div>
      </div>
    )
  }
  