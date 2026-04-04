import Link from "next/link";
import VerificationBadge from "@/components/VerificationBadge";
import { agents } from "@/data/agents";

export default function BuilderDashboard() {
  // Mock: show all agents as if owned by current builder
  const myAgents = agents.slice(0, 6);
  const goldCount = myAgents.filter((a) => a.verificationTier === "gold").length;
  const totalHires = myAgents.reduce((sum, a) => sum + a.hireCount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">Builder Dashboard</h1>
          <p className="text-ink/60">Manage your agents and track performance</p>
        </div>
        <Link
          href="/dashboard/builder/new"
          className="bg-aegean text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-aegean/90 transition-colors"
        >
          List New Agent
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Agents", value: myAgents.length },
          { label: "Listed", value: myAgents.filter((a) => a.listed).length },
          { label: "Gold Verified", value: goldCount },
          { label: "Total Hires", value: totalHires },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-limestone/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-aegean">{stat.value}</div>
            <div className="text-xs text-ink/50">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Agent list */}
      <div className="bg-white border border-limestone/30 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-limestone/20 bg-limestone/10">
              <th className="text-left p-4 text-sm font-semibold text-ink">Agent</th>
              <th className="text-left p-4 text-sm font-semibold text-ink">Status</th>
              <th className="text-left p-4 text-sm font-semibold text-ink">Category</th>
              <th className="text-left p-4 text-sm font-semibold text-ink">Pricing</th>
              <th className="text-left p-4 text-sm font-semibold text-ink">Hires</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {myAgents.map((agent) => (
              <tr key={agent.id} className="border-b border-limestone/10 last:border-0">
                <td className="p-4">
                  <div className="font-medium text-ink">{agent.name}</div>
                  <VerificationBadge tier={agent.verificationTier} />
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${agent.listed ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                    {agent.listed ? "Listed" : "Draft"}
                  </span>
                </td>
                <td className="p-4 text-sm text-ink/60">{agent.category}</td>
                <td className="p-4 text-sm font-medium text-aegean">{agent.pricing}</td>
                <td className="p-4 text-sm text-ink/60">{agent.hireCount}</td>
                <td className="p-4">
                  <Link href={`/agents/${agent.slug}`} className="text-aegean text-sm hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
