import { NextResponse } from "next/server";
import { getBuilderById, getAgentsByBuilder } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const builder = await getBuilderById(id);
  if (!builder) {
    return NextResponse.json({ error: "Builder not found" }, { status: 404 });
  }

  const builderAgents = await getAgentsByBuilder(id);
  return NextResponse.json({
    builder,
    agents: builderAgents,
  });
}
