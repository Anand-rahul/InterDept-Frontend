import { UseCase } from "@/models/solution"
import { X } from "lucide-react"
import { useState } from "react"

interface EditModalProps {
    useCase: UseCase | null
    isOpen: boolean
    onClose: () => void
    onSave: (id: number, dashboardUrl: string, comments: string) => void
  }
  
 export function EditModal({ useCase, isOpen, onClose, onSave }: EditModalProps) {
    const [dashboardUrl, setDashboardUrl] = useState(useCase?.dashboardUrl || "")
    const [comments, setComments] = useState(useCase?.comments || "")

    console.log(useCase)
  
    if (!isOpen || !useCase) return null
  
    const handleSave = () => {
      onSave(useCase.id, dashboardUrl, comments)
      onClose()
    }
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Edit ROI Data</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
  
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Solution</p>
            <p className="text-sm text-gray-600">{useCase.solution}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Use Case</p>
            <p className="text-sm text-gray-600">{useCase.title}</p>
          </div>
  
          <div className="mb-4">
            <label htmlFor="dashboardUrl" className="block text-sm font-medium text-gray-700 mb-1">
              PowerBI Dashboard URL
            </label>
            <input
              type="text"
              id="dashboardUrl"
              value={dashboardUrl}
              onChange={(e) => setDashboardUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              placeholder="https://app.powerbi.com/..."
            />
          </div>
  
          <div className="mb-6">
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
              ROI Comments
            </label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              rows={3}
              placeholder="Add ROI metrics and comments..."
            />
          </div>
  
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )
  }