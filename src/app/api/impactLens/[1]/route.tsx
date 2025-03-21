import { UseCase } from "@/models/solution";
import { jwtAuth } from "@/utils/jwtAuth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<NextResponse> {
    try {
      const id = (await params).id
    //   const { searchParams } = new URL(request.url);
      
      // Extract request body
      const requestBody = await request.json(); 
      console.log(requestBody)
      const jsonBody = { comments: requestBody?.user , dashboardURL: requestBody?.dashboardURL};
  
      const url = `http://localhost:8080/api/usecase/${id}`;
  
      // Make the API request with the bearer token from the incoming request
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${jwtAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonBody)
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
      const data: UseCase = await response.json();
  
      // Return successful response with the useCase data
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      console.error("Error updating useCase:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }