import { NextResponse } from "next/server";
import { getAgentBySlug, getBuilderById } from "@/data/agents";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const builder = getBuilderById(agent.builderId);
  return NextResponse.json({
    agent: {
      ...agent,
      builder: builder ? { id: builder.id, name: builder.name } : null,
    },
  });
}
