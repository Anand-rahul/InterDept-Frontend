export type SolutionDisplay = {
  id: number;
  title: string;
  description: string;
  department: string;
  likeCount: number;
  viewCount: number;
  isLiked: boolean | null;
  createdDate: Date;
  updatedDate: Date;
  status: "POC" | "LIVE" | "INACTIVE";
};

export const statusColors = {
  LIVE: "bg-green-100 text-green-800",
  POC: "bg-blue-100 text-blue-800",
  INACTIVE: "bg-red-100 text-red-800",
};

export type UseCase = {
  id: number;
  title: string;
  description: string;
  documentId: string;
  dashboardUrl: string;
  comments: string;
  department: string;
  solutionId: string;
  solutionTitle: string;
  // createdDate: Date;
  // updatedDate: Date;
};

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export type SolutionDetails = {
  id: number;
  title: string;
  description: string;
  department: string;
  likeCount: number;
  viewCount: number;
  adoption: 10;
  isLiked: boolean;
  createdDate: Date;
  updatedDate: Date;
  problemStatement: string;
  impact: string;
  category: string;
  tags: string; // If tags should be an array, change this to `string[]`
  createdBy: string;
  deliveryManager: string;
  pmo: string;
  status: "POC" | "LIVE" | "INACTIVE";
  preReqDocumentId: number | null;
  useCases: UseCase[];
};
