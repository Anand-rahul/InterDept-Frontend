import { PageResponse } from "@/models/pageResponse";
import { SolutionDisplay } from "@/models/solution";
import { jwtAuth } from "@/utils/jwtAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let url = `http://localhost:8080/api/solution;`;

    switch (category) {
      case "latest":
        url = `http://localhost:8080/api/solution?size=3&sort=createdDate,desc`;
        break;
      case "trending":
        url = `http://localhost:8080/api/solution?size=3&sort=viewCount,desc`;
        break;
      default:
        url = `http://localhost:8080/api/solution?size=5`;
    }

    // Make the API request with the bearer token from the incoming request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwtAuth}`,
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
    const data: PageResponse<SolutionDisplay> = await response.json();

    // Return successful response with the solutions data
    return NextResponse.json(data.content, { status: 200 });
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
