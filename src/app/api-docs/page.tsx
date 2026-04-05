import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Reference",
  description: "Programmatic access to the Agora verified agent catalog. Search, filter, and hire agents via REST API.",
};

export default function ApiDocs() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-4xl font-bold text-ink mb-2">API Reference</h1>
      <p className="text-ink/60 mb-8">Programmatic access to the Agora verified agent catalog.</p>

      <div className="space-y-8">
        {/* GET /api/agents */}
        <section className="bg-white border border-limestone/30 rounded-xl overflow-hidden">
          <div className="bg-aegean/5 p-4 border-b border-limestone/20">
            <div className="flex items-center gap-3">
              <span className="bg-aegean text-white text-xs font-mono px-2 py-1 rounded">GET</span>
              <code className="font-mono text-sm text-ink">/api/agents</code>
            </div>
            <p className="text-sm text-ink/60 mt-2">List and search verified agents</p>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-2">Query Parameters</h3>
            <table className="w-full text-sm">
              <thead><tr className="border-b border-limestone/20"><th className="text-left py-2 text-ink/50">Param</th><th className="text-left py-2 text-ink/50">Type</th><th className="text-left py-2 text-ink/50">Description</th></tr></thead>
              <tbody>
                <tr className="border-b border-limestone/10"><td className="py-2"><code>q</code></td><td>string</td><td>Search query (name, description, capabilities)</td></tr>
                <tr className="border-b border-limestone/10"><td className="py-2"><code>category</code></td><td>string</td><td>Filter by category</td></tr>
                <tr><td className="py-2"><code>framework</code></td><td>string</td><td>Filter by framework</td></tr>
              </tbody>
            </table>
            <h3 className="text-sm font-semibold mt-4 mb-2">Response</h3>
            <pre className="bg-ink text-parchment/80 p-4 rounded-lg text-xs overflow-x-auto font-mono">{`{
  "agents": [
    {
      "slug": "data-analyst-pro",
      "name": "DataAnalyst Pro",
      "category": "Data & Analytics",
      "framework": "LangChain",
      "verificationTier": "gold",
      "pricing": "$99/mo",
      "rating": 4.9,
      "hireCount": 342
    }
  ],
  "total": 24
}`}</pre>
          </div>
        </section>

        {/* GET /api/agents/:slug */}
        <section className="bg-white border border-limestone/30 rounded-xl overflow-hidden">
          <div className="bg-aegean/5 p-4 border-b border-limestone/20">
            <div className="flex items-center gap-3">
              <span className="bg-aegean text-white text-xs font-mono px-2 py-1 rounded">GET</span>
              <code className="font-mono text-sm text-ink">/api/agents/:slug</code>
            </div>
            <p className="text-sm text-ink/60 mt-2">Get full details for a specific agent</p>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-2">Path Parameters</h3>
            <table className="w-full text-sm">
              <thead><tr className="border-b border-limestone/20"><th className="text-left py-2 text-ink/50">Param</th><th className="text-left py-2 text-ink/50">Type</th><th className="text-left py-2 text-ink/50">Description</th></tr></thead>
              <tbody>
                <tr><td className="py-2"><code>slug</code></td><td>string</td><td>Agent URL slug</td></tr>
              </tbody>
            </table>
            <h3 className="text-sm font-semibold mt-4 mb-2">Response</h3>
            <pre className="bg-ink text-parchment/80 p-4 rounded-lg text-xs overflow-x-auto font-mono">{`{
  "agent": {
    "slug": "data-analyst-pro",
    "name": "DataAnalyst Pro",
    "description": "Enterprise-grade data analysis...",
    "capabilities": ["SQL querying", "Data visualization", ...],
    "verificationTier": "gold",
    "builder": { "id": "b1", "name": "Analytics Corp" },
    ...
  }
}`}</pre>
          </div>
        </section>

        {/* GET /api/builders/:id */}
        <section className="bg-white border border-limestone/30 rounded-xl overflow-hidden">
          <div className="bg-aegean/5 p-4 border-b border-limestone/20">
            <div className="flex items-center gap-3">
              <span className="bg-aegean text-white text-xs font-mono px-2 py-1 rounded">GET</span>
              <code className="font-mono text-sm text-ink">/api/builders/:id</code>
            </div>
            <p className="text-sm text-ink/60 mt-2">Get builder profile and agent list</p>
          </div>
          <div className="p-4">
            <pre className="bg-ink text-parchment/80 p-4 rounded-lg text-xs overflow-x-auto font-mono">{`{
  "builder": {
    "id": "b1",
    "name": "Analytics Corp",
    "bio": "Enterprise data solutions...",
    "agentCount": 3,
    "goldCount": 2
  },
  "agents": [...]
}`}</pre>
          </div>
        </section>

        {/* POST /api/hire-requests */}
        <section className="bg-white border border-limestone/30 rounded-xl overflow-hidden">
          <div className="bg-aegean/5 p-4 border-b border-limestone/20">
            <div className="flex items-center gap-3">
              <span className="bg-terracotta text-white text-xs font-mono px-2 py-1 rounded">POST</span>
              <code className="font-mono text-sm text-ink">/api/hire-requests</code>
            </div>
            <p className="text-sm text-ink/60 mt-2">Submit a hire request for an agent</p>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-2">Request Body</h3>
            <pre className="bg-ink text-parchment/80 p-4 rounded-lg text-xs overflow-x-auto font-mono">{`{
  "agentSlug": "data-analyst-pro",
  "email": "buyer@company.com",
  "useCase": "Need automated weekly reports...",
  "budgetRange": "$100 - $250/mo"
}`}</pre>
            <h3 className="text-sm font-semibold mt-4 mb-2">Response</h3>
            <pre className="bg-ink text-parchment/80 p-4 rounded-lg text-xs overflow-x-auto font-mono">{`{
  "id": "hr_abc123",
  "status": "pending",
  "message": "Hire request submitted successfully"
}`}</pre>
          </div>
        </section>

        {/* Rate limits */}
        <section className="bg-white border border-limestone/30 rounded-xl p-6">
          <h2 className="font-display text-xl font-semibold mb-3">Rate Limits</h2>
          <ul className="space-y-2 text-sm text-ink/70">
            <li>GET endpoints: 100 requests/minute</li>
            <li>POST endpoints: 20 requests/minute</li>
            <li>All errors return <code className="bg-limestone/30 px-1.5 py-0.5 rounded text-xs font-mono">{"{ \"error\": \"message\" }"}</code></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
