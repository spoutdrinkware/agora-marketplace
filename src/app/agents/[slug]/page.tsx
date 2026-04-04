import Link from "next/link";
import { notFound } from "next/navigation";
import VerificationBadge from "@/components/VerificationBadge";
import AgentCard from "@/components/AgentCard";
import HireForm from "@/components/HireForm";
import { getAgentBySlug, getAgentsByBuilder } from "@/lib/db";

export default async function AgentDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) notFound();

  const relatedAgents = (await getAgentsByBuilder(agent.builderId))
    .filter((a) => a.id !== agent.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/agents" className="text-aegean hover:underline text-sm mb-6 inline-block">&larr; Back to agents</Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-aegean/10 rounded-xl flex items-center justify-center text-aegean text-2xl font-bold shrink-0">
              {agent.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-display text-3xl font-bold text-ink">{agent.name}</h1>
                <VerificationBadge tier={agent.verificationTier} size="md" />
              </div>
              <p className="text-ink/60">
                by <Link href={`/builders/${agent.builderId}`} className="text-aegean hover:underline">{agent.builderName}</Link>
              </p>
            </div>
          </div>

          <p className="text-ink/70 text-lg mb-8">{agent.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-limestone/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-aegean">{agent.rating}</div>
              <div className="text-xs text-ink/50">Rating</div>
            </div>
            <div className="bg-limestone/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-aegean">{agent.hireCount}</div>
              <div className="text-xs text-ink/50">Hires</div>
            </div>
            <div className="bg-limestone/20 rounded-lg p-4 text-center">
              <div className="text-sm font-semibold text-aegean">{agent.framework}</div>
              <div className="text-xs text-ink/50">Framework</div>
            </div>
            <div className="bg-limestone/20 rounded-lg p-4 text-center">
              <div className="text-sm font-semibold text-aegean">{agent.category}</div>
              <div className="text-xs text-ink/50">Category</div>
            </div>
          </div>

          <h2 className="font-display text-xl font-semibold mb-4">Capabilities</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {agent.capabilities.map((cap) => (
              <span key={cap} className="bg-aegean/5 text-aegean border border-aegean/20 px-3 py-1 rounded-full text-sm">
                {cap}
              </span>
            ))}
          </div>

          {relatedAgents.length > 0 && (
            <>
              <h2 className="font-display text-xl font-semibold mb-4">More from {agent.builderName}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedAgents.map((a) => (
                  <AgentCard key={a.id} agent={a} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Sidebar - Hire Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-limestone/30 rounded-xl p-6 sticky top-24">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-aegean mb-1">{agent.pricing}</div>
              <div className="text-sm text-ink/50">Starting price</div>
            </div>
            <HireForm agentSlug={agent.slug} builderName={agent.builderName} />
          </div>
        </div>
      </div>
    </div>
  );
}
