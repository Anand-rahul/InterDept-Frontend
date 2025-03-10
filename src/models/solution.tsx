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
};



export type SolutionDetails  = {
  id: number;
  title: string;
  description: string;
  department: string;
  likeCount: number;
  viewCount: number;
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
};
