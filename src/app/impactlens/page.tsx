"use client"

import type React from "react"

import { useState } from "react"
import { ExternalLink, Filter, Search } from "lucide-react"
import Link from "next/link"

// Mock data for solutions with ROI tracking
const solutionsData = [
  {
    id: "loan-processing-ai",
    name: "Loan Processing AI",
    category: "Process Automation",
    dashboardUrl: "https://app.powerbi.com/loan-processing-dashboard",
    comments: "40% reduction in processing time, $2.3M annual savings",
    department: "Retail Banking",
  },
  {
    id: "chatbot-customer-support",
    name: "Chatbot Customer Support",
    category: "Customer Experience",
    dashboardUrl: "https://app.powerbi.com/chatbot-metrics-dashboard",
    comments: "75% faster response time, 30% increase in customer satisfaction",
    department: "Customer Service",
  },
  {
    id: "cloud-cost-optimizer",
    name: "Cloud Cost Optimizer",
    category: "Infrastructure",
    dashboardUrl: "https://app.powerbi.com/cloud-cost-dashboard",
    comments: "32% reduction in cloud spend, $1.8M annual savings",
    department: "IT",
  },
  {
    id: "fraud-detection-system",
    name: "AI Fraud Detection",
    category: "Risk Management",
    dashboardUrl: "https://app.powerbi.com/fraud-detection-dashboard",
    comments: "65% improvement in fraud detection, $4.2M in prevented losses",
    department: "Risk Management",
  },
  {
    id: "predictive-maintenance",
    name: "Predictive Maintenance System",
    category: "Operations",
    dashboardUrl: "https://app.powerbi.com/predictive-maintenance-dashboard",
    comments: "45% reduction in downtime, $3.1M in maintenance savings",
    department: "Operations",
  },
  {
    id: "customer-segmentation",
    name: "Customer Segmentation Engine",
    category: "Marketing",
    dashboardUrl: "https://app.powerbi.com/customer-segmentation-dashboard",
    comments: "28% increase in campaign conversion rates, $1.5M additional revenue",
    department: "Marketing",
  },
]

export default function ImpactLensPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | "all">("all")

  // Filter solutions based on search term and selected department
  const filteredSolutions = solutionsData.filter((solution) => {
    const matchesSearch =
      solution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solution.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = selectedDepartment === "all" || solution.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  // Get unique departments for filter
  const departments = ["all", ...new Set(solutionsData.map((solution) => solution.department))]

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header Section */}
      <div className="gradient-header py-6 px-4 text-center rounded-b-lg shadow-md">
        <h1 className="text-2xl font-bold mb-1">ImpactLens - Business ROI Tracker</h1>
        
      </div>


      <div className="container mx-auto px-4 py-3">
        
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search solutions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm appearance-none bg-white"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments
                  .filter((d) => d !== "all")
                  .map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Solutions Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-medium text-gray-800">Business Impact Tracking</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Solution Name</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Reporting</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Comments</th>
                </tr>
              </thead>
              <tbody>
                {filteredSolutions.map((solution) => (
                  <tr key={solution.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link href={`/solutions/${solution.id}`} className="text-blue-600 hover:underline font-medium">
                        {solution.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {solution.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={solution.dashboardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        PowerBI Dashboard
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{solution.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state if no results */}
          {filteredSolutions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No solutions match your search criteria.</p>
            </div>
          )}
        </div>
        </div>

    </div>
  )
}

