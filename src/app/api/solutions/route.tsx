import { PageResponse } from "@/models/pageResponse";
import { SolutionDisplay } from "@/models/solution";
import { jwtAuth } from "@/utils/jwtAuth";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {

    const url = `http://localhost:8080/api/solution?sort=createdDate,desc`;

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
