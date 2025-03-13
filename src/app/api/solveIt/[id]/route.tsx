import { RequirementDetails } from "@/models/requirement";
import { jwtAuth } from "@/utils/jwtAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const id = (await params).id
    const url = `http://localhost:8080/api/requirement/${id}`

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
    const data: RequirementDetails = await response.json();

    // Return successful response with the requirments data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching requirments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
