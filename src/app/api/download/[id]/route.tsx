// app/api/download/[id]/route.ts
import { jwtAuth } from "@/utils/jwtAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id
    
    // URL to your Java backend
    const url = `http://localhost:8080/api/file/${id}`
    
    // Make the request to your Java controller
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwtAuth}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API request failed with status ${response.status}` },
        { status: response.status }
      );
    }

    // Get file data and content type
    const fileData = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const contentDisposition = response.headers.get("content-disposition");
    
    // Create a new response with the file data
    const newResponse = new NextResponse(fileData, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // Forward content-disposition header if present (for filename)
        ...(contentDisposition && { "Content-Disposition": contentDisposition }),
      },
    });

    return newResponse;
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}