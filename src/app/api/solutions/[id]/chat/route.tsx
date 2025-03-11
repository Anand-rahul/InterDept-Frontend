import { jwtAuth } from "@/utils/jwtAuth";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const solutionId = (await params).id;
    
    // Get query parameters from the URL instead of the body
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const guid = url.searchParams.get('guid') || "";
    console.log(query)
    if (query === null || query=="") {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    // Call the backend API
    const response = await fetch(
      `http://localhost:8080/v1/ai/conversational?solId=${solutionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtAuth}`
        },
        body: JSON.stringify({
          guid: guid,
          query: query
        }),
        cache: "no-store"
      }
    );

    if (!response.ok) {
      console.error(`Backend API error: ${response.status} - ${response.statusText}`);
      return NextResponse.json(
        { error: "Failed to get response from backend" },
        { status: response.status }
      );
    }
    const data = await response.json();
    let assistantResponse = "";
    let conversationGuid = data.guid || "";
    
    if (data.content && Array.isArray(data.content)) {
      // Find the last assistant entry in the content array
      for (let i = data.content.length - 1; i >= 0; i--) {
        const entry = data.content[i];
        if (entry.assistant) {
          assistantResponse = entry.assistant;
          break;
        }
      }
    }

    return NextResponse.json({
      response: assistantResponse,
      guid: conversationGuid
    });
    
  } catch (error) {
    console.error("Error in chat API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}