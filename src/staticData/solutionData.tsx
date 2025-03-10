import { RequirementDetails, RequirementDisplay } from "@/models/requirement";
import { SolutionDetails, SolutionDisplay } from "@/models/solution";

// Current data
const latestSolutionsData = [
  {
    title: "Loan Processing AI",
    description: "Automates loan approval workflows for faster processing.",
    likes: 15,
    views: 120,
    href: "/solutions/loan-processing-ai",
  },
  {
    title: "Chatbot Customer Support",
    description: "AI-powered chatbot for customer engagement.",
    likes: 20,
    views: 200,
    href: "/solutions/chatbot-customer-support",
  },
  {
    title: "Data Analytics Dashboard",
    description: "Real-time insights for business decision-making.",
    likes: 18,
    views: 150,
    href: "/solutions/data-analytics-dashboard",
  },
];

// Transform to SolutionDisplay type
export const latestSolutions: SolutionDisplay[] = latestSolutionsData.map((solution, index) => {
  // Extract the ID from the href or use index+1
  const id = index + 1;
  
  // Create current date for demo purposes
  const now = new Date();
  
  return {
    id,
    title: solution.title,
    description: solution.description,
    department: "Technology", // Default department - replace as needed
    likeCount: solution.likes,
    viewCount: solution.views,
    isLiked: null, // Default to null - update based on user state if needed
    createdDate: new Date(now.setDate(now.getDate() - 7)), // 7 days ago
    updatedDate: new Date(), // Current date
  };
});


export const solutions: SolutionDisplay[] = [
  {
    id: 1,
    title: "AI Chatbot",
    description: "An AI-powered chatbot for customer support.",
    department: "Technology",
    likeCount: 15,
    viewCount: 200,
    isLiked: true,
    createdDate: new Date("2025-03-01T10:00:00Z"),
    updatedDate: new Date("2025-03-02T12:00:00Z"),
  },
  {
    id: 2,
    title: "Inventory Management System",
    description: "A system to track and manage inventory efficiently.",
    department: "Logistics",
    likeCount: 30,
    viewCount: 500,
    isLiked: false,
    createdDate: new Date("2025-02-25T14:30:00Z"),
    updatedDate: new Date("2025-02-28T09:45:00Z"),
  },
  {
    id: 3,
    title: "Online Learning Platform",
    description: "A platform for interactive online courses.",
    department: "Education",
    likeCount: 22,
    viewCount: 350,
    isLiked: null,
    createdDate: new Date("2025-02-20T08:15:00Z"),
    updatedDate: new Date("2025-02-27T16:30:00Z"),
  },
];

export const detailedSolutions: SolutionDetails[] = [
  {
    id: 1,
    title: "AI Chatbot",
    description: "An AI-powered chatbot for customer support.",
    department: "Technology",
    likeCount: 15,
    viewCount: 200,
    isLiked: true,
    createdDate: new Date("2025-03-01T10:00:00Z"),
    updatedDate: new Date("2025-03-02T12:00:00Z"),
    problemStatement: "Businesses struggle with high customer service costs and delayed responses.",
    impact: "Reduces response time, increases customer satisfaction, and decreases support costs.",
    category: "Artificial Intelligence",
    tags: "AI, Chatbot, Customer Support",
    createdBy: "alice.smith@company.com",
    deliveryManager: "bob.johnson@company.com",
    pmo: "charlie.davis@company.com",
  },
  {
    id: 2,
    title: "Inventory Management System",
    description: "A system to track and manage inventory efficiently.",
    department: "Logistics",
    likeCount: 30,
    viewCount: 500,
    isLiked: false,
    createdDate: new Date("2025-02-25T14:30:00Z"),
    updatedDate: new Date("2025-02-28T09:45:00Z"),
    problemStatement: "Businesses struggle with inaccurate inventory tracking, leading to losses.",
    impact: "Optimizes stock levels, reduces overstocking and shortages, and improves efficiency.",
    category: "Supply Chain",
    tags: "Logistics, Inventory, Management",
    createdBy: "daniel.wilson@company.com",
    deliveryManager: "eve.miller@company.com",
    pmo: "frank.adams@company.com",
  },
  {
    id: 3,
    title: "Online Learning Platform",
    description: "A platform for interactive online courses.",
    department: "Education",
    likeCount: 22,
    viewCount: 350,
    isLiked: false,
    createdDate: new Date("2025-02-20T08:15:00Z"),
    updatedDate: new Date("2025-02-27T16:30:00Z"),
    problemStatement: "Traditional education lacks accessibility and engagement for remote learners.",
    impact: "Provides an interactive and flexible learning environment for students worldwide.",
    category: "EdTech",
    tags: "Education, Online Learning, Technology",
    createdBy: "george.clark@company.com",
    deliveryManager: "hannah.james@company.com",
    pmo: "ian.brown@company.com",
  },
];

export const detailedRequirments: RequirementDetails[] = [
  {
    id: 4,
    title: "AI Chatbot for Customer Support",
    description: "An AI-powered chatbot to assist customers in real time.",
    requestingDepartment: "IT",
    subDepartment: "Software Development",
    lineOfBusiness: "Customer Service",
    productName: "ChatAssist",
    priority: "High",
    status: "NEW",
    createdDate: "2025-02-28T14:26:11.810329Z",
    solution: null,
    problemStatement: "Customers experience long wait times for support.",
    expectedImpact: "Faster response times and improved customer satisfaction.",
    userStory: null,
    updatedDate: "2025-02-28T14:26:12.080331Z",
    pickedDate: null,
    closedDate: null,
    assignedTo: null,
    createdBy: "john.doe@company.com",
  },
  {
    id: 5,
    title: "Automated Inventory Management",
    description: "A system to track and manage inventory levels efficiently.",
    requestingDepartment: "Operations",
    subDepartment: "Supply Chain",
    lineOfBusiness: "Retail",
    productName: "StockMaster",
    priority: "Medium",
    status: "IN_PROGRESS",
    createdDate: "2025-02-20T09:15:22.123456Z",
    solution: 1,
    problemStatement: "Frequent stockouts due to inaccurate inventory tracking.",
    expectedImpact: "Reduced stockouts and optimized inventory levels.",
    userStory: "As a warehouse manager, I want to track inventory in real time to reduce errors.",
    updatedDate: "2025-02-25T10:30:45.456789Z",
    pickedDate: "2025-02-22T08:45:00.123456Z",
    closedDate: null,
    assignedTo: "sarah.lee@company.com",
    createdBy: "daniel.wilson@company.com",
  },
  {
    id: 6,
    title: "Predictive Maintenance System",
    description: "An IoT-based solution for predicting equipment failures.",
    requestingDepartment: "Engineering",
    subDepartment: "Maintenance",
    lineOfBusiness: "Manufacturing",
    productName: "PredictX",
    priority: "High",
    status: "APPROVED",
    createdDate: "2025-02-18T14:45:10.987654Z",
    solution: 2,
    problemStatement: "Frequent machine breakdowns causing production delays.",
    expectedImpact: "Reduced maintenance costs and improved uptime.",
    userStory: "As a maintenance engineer, I want to receive early warnings about equipment failures to prevent downtime.",
    updatedDate: "2025-02-26T15:20:30.654321Z",
    pickedDate: "2025-02-20T12:00:00.123456Z",
    closedDate: "2025-02-27T17:00:00.654321Z",
    assignedTo: "michael.smith@company.com",
    createdBy: "george.clark@company.com",
  },
];

export const requirements: RequirementDisplay[] = detailedRequirments.map(
  ({ id, title, description, requestingDepartment, subDepartment, lineOfBusiness, productName, priority, status, createdDate, createdBy }) => ({
    id,
    title,
    description,
    requestingDepartment,
    subDepartment,
    lineOfBusiness,
    productName,
    priority,
    status,
    createdDate,
    createdBy
  })
);
