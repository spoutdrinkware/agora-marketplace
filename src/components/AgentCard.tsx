import Link from "next/link";
import VerificationBadge from "./VerificationBadge";
import type { Agent } from "@/data/agents";

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/agents/${agent.slug}`}
      className="block bg-white border border-limestone/30 rounded-xl p-6 hover:shadow-lg hover:border-aegean/30 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-aegean/10 rounded-lg flex items-center justify-center text-aegean font-bold">
          {agent.name[0]}
        </div>
        <VerificationBadge tier={agent.verificationTier} />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink group-hover:text-aegean transition-colors mb-1">
        {agent.name}
      </h3>
      <p className="text-sm text-ink/60 mb-3 line-clamp-2">{agent.description}</p>
      <div className="flex items-center gap-3 text-xs text-ink/50 mb-3">
        <span className="bg-limestone/30 px-2 py-0.5 rounded">{agent.category}</span>
        <span className="bg-limestone/30 px-2 py-0.5 rounded">{agent.framework}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-aegean">{agent.pricing}</span>
        <span className="text-ink/40">{agent.hireCount} hires &middot; {agent.rating}/5</span>
      </div>
    </Link>
  );
}
