export type RequirementDisplay = {
    id: number;
    title: string;
    description: string;
    requestingDepartment: string;
    subDepartment: string;
    lineOfBusiness: string;
    productName: string;
    priority: "Low" | "Medium" | "High";
    status:"NEW" | "DISCUSSION" | "APPROVED" | "ACCEPTED" | "COMPLETED" | "CANCELLED";
    createdDate: string; // ISO date string
    createdBy: string; 
  };
  
 export type RequirementDetails = {
    id: number;
    title: string;
    description: string;
    requestingDepartment: string;
    subDepartment: string;
    lineOfBusiness: string;
    productName: string;
    priority: "Low" | "Medium" | "High";
    status: "NEW" | "DISCUSSION" | "APPROVED" | "ACCEPTED" | "COMPLETED" | "CANCELLED";
    createdDate: string; // ISO date string
    solutionId: number | null;
    problemStatement: string;
    expectedImpact: string;
    userStory: string | null;
    updatedDate: string;
    pickedDate: string | null;
    closedDate: string |null ;
    assignedTo: string |null;
    createdBy: string;
  };
  