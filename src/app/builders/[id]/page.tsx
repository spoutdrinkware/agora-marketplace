import Link from "next/link";
import { notFound } from "next/navigation";
import AgentCard from "@/components/AgentCard";
import { getBuilderById, getAgentsByBuilder } from "@/data/agents";

export default async function BuilderProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const builder = getBuilderById(id);
  if (!builder) notFound();

  const builderAgents = getAgentsByBuilder(id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/agents" className="text-aegean hover:underline text-sm mb-6 inline-block">&larr; Back to agents</Link>

      <div className="bg-white border border-limestone/30 rounded-xl p-8 mb-8">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-aegean/10 rounded-full flex items-center justify-center text-aegean text-3xl font-bold shrink-0">
            {builder.name[0]}
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-ink mb-2">{builder.name}</h1>
            <p className="text-ink/60 mb-4">{builder.bio}</p>
            <div className="flex items-center gap-6 text-sm text-ink/50">
              <span><strong className="text-ink">{builder.agentCount}</strong> agents</span>
              <span><strong className="text-ink">{builder.goldCount}</strong> gold verified</span>
              <span>Joined {builder.joinedAt}</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-display text-2xl font-bold text-ink mb-6">Agents by {builder.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {builderAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
