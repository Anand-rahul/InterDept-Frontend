import { NextRequest, NextResponse } from "next/server";
import { jwtAuth } from "@/utils/jwtAuth";
import { SolutionDisplay } from "@/models/solution";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }
    

    const response = await fetch("http://localhost:8080/v1/vectorize/fetchTopK", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtAuth}`
      },
      body: JSON.stringify({
        query: query,
        k: 5
      })
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch search results" },
        { status: response.status }
      );
    }

    
    const data = await response.json();
    console.log(data)
    // Process the data - convert date strings to Date objects
    const processedData: SolutionDisplay[] = data.map((item: SolutionDisplay) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      department: item.department,
      likeCount: item.likeCount,
      viewCount: item.viewCount,
      isLiked: item.isLiked,
      createdDate: item.createdDate,
      updatedDate: item.updatedDate
    }));

    return NextResponse.json(processedData);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}