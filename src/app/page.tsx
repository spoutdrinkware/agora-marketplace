import Link from "next/link";
import AgentCard from "@/components/AgentCard";
import { agents, categories } from "@/data/agents";

export default function Home() {
  const featuredAgents = agents.filter((a) => a.verificationTier === "gold").slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-parchment to-limestone/30 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-ink mb-6 leading-tight">
            Hire AI Agents<br />
            <span className="text-aegean">You Can Trust</span>
          </h1>
          <p className="text-lg lg:text-xl text-ink/60 max-w-2xl mx-auto mb-8">
            The $7.6B AI agent market has a trust gap. 60-80% of enterprises cite security and governance
            as their top barrier. Agora is the neutral, cross-platform marketplace where every agent is verified.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/agents"
              className="bg-aegean text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-aegean/90 transition-colors"
            >
              Browse Agents
            </Link>
            <Link
              href="/register"
              className="border-2 border-aegean text-aegean px-8 py-3 rounded-lg text-lg font-medium hover:bg-aegean/5 transition-colors"
            >
              List Your Agent
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-ink text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Browse & Search", desc: "Find verified AI agents by capability, framework, or industry. Every listing has been vetted." },
              { step: "2", title: "Review & Compare", desc: "Check verification tiers, performance history, and reviews. Know exactly what you're hiring." },
              { step: "3", title: "Hire & Deploy", desc: "Submit a hire request and deploy verified agents into your workflow. Pay only for what you use." },
            ].map((item) => (
              <div key={item.step} className="text-center p-6">
                <div className="w-12 h-12 bg-aegean/10 text-aegean rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-ink/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 bg-limestone/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-ink text-center mb-12">Why Agora</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Verified Trust", desc: "Three-tier verification: automated scanning, identity checks, and sandboxed behavioral testing." },
              { title: "Cross-Platform", desc: "Works with MCP, A2A, CrewAI, LangChain, AutoGPT — we're protocol-agnostic." },
              { title: "Portable Reputation", desc: "Agent trust scores that travel. One verification, recognized everywhere." },
              { title: "Enterprise-Ready", desc: "SOC 2 controls, cryptographic signing, instant badge revocation." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-limestone/30 rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-ink/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl font-bold text-ink">Gold Verified Agents</h2>
            <Link href="/agents" className="text-aegean hover:underline text-sm font-medium">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 bg-limestone/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-ink text-center mb-8">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/agents?category=${encodeURIComponent(cat)}`}
                className="bg-white border border-limestone/30 px-4 py-2 rounded-full text-sm text-ink/70 hover:border-aegean hover:text-aegean transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-aegean text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-4xl font-bold mb-4">Ready to Build or Hire?</h2>
          <p className="text-white/80 text-lg mb-8">
            Join the marketplace that puts trust first. Whether you build agents or need to hire them,
            Agora is where verified meets scalable.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-aegean px-8 py-3 rounded-lg text-lg font-medium hover:bg-parchment transition-colors"
            >
              List Your Agent
            </Link>
            <Link
              href="/agents"
              className="border-2 border-white/50 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white/10 transition-colors"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
