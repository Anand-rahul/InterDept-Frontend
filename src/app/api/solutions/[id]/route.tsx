import { SolutionDetails } from "@/models/solution"
import { jwtAuth } from "@/utils/jwtAuth";
import { NextRequest, NextResponse } from "next/server";

// const useCases:UseCase[] = [
//   {
//     id :1,
//     title: "AWS Cost Optimization",
//     description:
//       "Identifies and eliminates unused AWS resources and rightsizes EC2 instances based on usage patterns.",
//     documentId: "7",
//   },
//   {
//     id:2,
//     title: "Multi-Cloud Resource Management",
//     description:
//       "Provides unified view and management of resources across AWS, Azure, and Google Cloud to prevent redundancy.",
//       documentId: "7",
//   },
//   {
//     id:3,
//     title: "Automated Scaling Policies",
//     description: "Implements intelligent scaling policies based on historical usage patterns and business hours.",
//     documentId: "7",
//   },
// ]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const id = (await params).id
    const url = `http://localhost:8080/api/solution/${id}`

    // Make the API request with the bearer token from the incoming request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtAuth}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    // Check if the response is successful
    if (!response.ok) {
      return NextResponse.json(
        { error: `API request failed with status ${response.status}` },
        { status: response.status }
      );
    }

    // Parse the response data
    const data: SolutionDetails = await response.json();
    // data.useCases = useCases;

    // Return successful response with the solutions data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
