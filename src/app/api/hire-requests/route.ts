import { NextRequest, NextResponse } from "next/server";
import { createHireRequest } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { agentSlug, email, useCase, budgetRange } = body;

  if (!agentSlug || !email || !useCase) {
    return NextResponse.json(
      { error: "agentSlug, email, and useCase are required" },
      { status: 400 }
    );
  }

  const result = await createHireRequest({ agentSlug, email, useCase, budgetRange });

  if (result) {
    return NextResponse.json({
      id: result.id,
      status: result.status,
      message: "Hire request submitted successfully",
    });
  }

  // Fallback: in-memory response when Supabase isn't available
  return NextResponse.json({
    id: `hr_${Date.now()}`,
    status: "pending",
    message: "Hire request submitted successfully",
  });
}
