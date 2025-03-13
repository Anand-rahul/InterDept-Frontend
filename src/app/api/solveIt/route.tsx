import { PageResponse } from "@/models/pageResponse";
import { RequirementDisplay } from "@/models/requirement";
import { jwtAuth } from "@/utils/jwtAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("section");

    let url = `http://localhost:8080/api/requirement`;

    switch (category) {
      case "all":
        url = `http://localhost:8080/api/requirement/new`;
        break;
      case "my":
        url = `http://localhost:8080/api/requirement/byMe`;
        break;
      default:
        url = `http://localhost:8080/api/requirement`;
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
    const data: PageResponse<RequirementDisplay> = await response.json();

    // Return successful response with the requirments data
    return NextResponse.json(data.content, { status: 200 });
  } catch (error) {
    console.error("Error fetching requirments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
