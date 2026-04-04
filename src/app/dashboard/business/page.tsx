import Link from "next/link";

const mockRequests = [
  { id: "hr_1", agentName: "DataAnalyst Pro", agentSlug: "data-analyst-pro", useCase: "Weekly revenue reports", budgetRange: "$100 - $250/mo", status: "accepted" as const, createdAt: "2026-04-01" },
  { id: "hr_2", agentName: "CodeReviewer", agentSlug: "code-reviewer", useCase: "PR reviews for 3 repos", budgetRange: "< $100/mo", status: "pending" as const, createdAt: "2026-04-02" },
  { id: "hr_3", agentName: "SupportAgent", agentSlug: "customer-support-ai", useCase: "Handle tier-1 tickets", budgetRange: "$250 - $500/mo", status: "pending" as const, createdAt: "2026-04-03" },
  { id: "hr_4", agentName: "ContentCraft", agentSlug: "content-writer", useCase: "Blog post generation", budgetRange: "$100 - $250/mo", status: "declined" as const, createdAt: "2026-03-28" },
];

const statusColors = {
  pending: "bg-yellow-50 text-yellow-700",
  accepted: "bg-green-50 text-green-700",
  declined: "bg-red-50 text-red-700",
};

export default function BusinessDashboard() {
  const pending = mockRequests.filter((r) => r.status === "pending").length;
  const accepted = mockRequests.filter((r) => r.status === "accepted").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">Business Dashboard</h1>
          <p className="text-ink/60">Track your hire requests and agent deployments</p>
        </div>
        <Link
          href="/agents"
          className="bg-aegean text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-aegean/90 transition-colors"
        >
          Browse Agents
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Requests", value: mockRequests.length },
          { label: "Pending", value: pending },
          { label: "Accepted", value: accepted },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-limestone/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-aegean">{stat.value}</div>
            <div className="text-xs text-ink/50">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Requests */}
      <div className="bg-white border border-limestone/30 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-limestone/20 bg-limestone/10">
              <th className="text-left p-4 text-sm font-semibold text-ink">Agent</th>
              <th className="text-left p-4 text-sm font-semibold text-ink">Use Case</th>
              <th className="text-left p-4 text-sm font-semibold text-ink">Budget</th>
              <th className="text-left p-4 text-sm font-semibold text-ink">Status</th>
              <th className="text-left p-4 text-sm font-semibold text-ink">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockRequests.map((req) => (
              <tr key={req.id} className="border-b border-limestone/10 last:border-0">
                <td className="p-4">
                  <Link href={`/agents/${req.agentSlug}`} className="font-medium text-aegean hover:underline">
                    {req.agentName}
                  </Link>
                </td>
                <td className="p-4 text-sm text-ink/60">{req.useCase}</td>
                <td className="p-4 text-sm text-ink/60">{req.budgetRange}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[req.status]}`}>
                    {req.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-ink/40">{req.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
