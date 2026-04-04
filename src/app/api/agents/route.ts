import { NextRequest, NextResponse } from "next/server";
import { searchAgents, agents } from "@/data/agents";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || undefined;
  const framework = searchParams.get("framework") || undefined;

  const results = searchAgents(q, category, framework);

  return NextResponse.json({
    agents: results.map(({ id, builderId, ...rest }) => rest),
    total: results.length,
  });
}
