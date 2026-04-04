import { NextRequest, NextResponse } from "next/server";

const hireRequests: Array<{
  id: string;
  agentSlug: string;
  email: string;
  useCase: string;
  budgetRange: string;
  status: string;
  createdAt: string;
}> = [];

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { agentSlug, email, useCase, budgetRange } = body;

  if (!agentSlug || !email || !useCase) {
    return NextResponse.json(
      { error: "agentSlug, email, and useCase are required" },
      { status: 400 }
    );
  }

  const hireRequest = {
    id: `hr_${Date.now()}`,
    agentSlug,
    email,
    useCase,
    budgetRange: budgetRange || "Not specified",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  hireRequests.push(hireRequest);

  return NextResponse.json({
    id: hireRequest.id,
    status: "pending",
    message: "Hire request submitted successfully",
  });
}
