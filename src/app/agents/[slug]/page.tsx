"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import VerificationBadge from "@/components/VerificationBadge";
import { getAgentBySlug, getAgentsByBuilder } from "@/data/agents";
import AgentCard from "@/components/AgentCard";

export default function AgentDetail() {
  const params = useParams();
  const agent = getAgentBySlug(params.slug as string);
  const [hireForm, setHireForm] = useState({ email: "", useCase: "", budgetRange: "< $100/mo" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!agent) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold text-ink mb-4">Agent Not Found</h1>
        <p className="text-ink/60 mb-8">The agent you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/agents" className="text-aegean hover:underline">Browse all agents &rarr;</Link>
      </div>
    );
  }

  const relatedAgents = getAgentsByBuilder(agent.builderId)
    .filter((a) => a.id !== agent.id)
    .slice(0, 3);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/hire-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentSlug: agent!.slug, ...hireForm }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

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

            {submitted ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">✓</div>
                <h3 className="font-display text-xl font-semibold mb-2">Request Submitted</h3>
                <p className="text-sm text-ink/60">We&apos;ll connect you with {agent.builderName} shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={hireForm.email}
                    onChange={(e) => setHireForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-limestone/50 text-sm focus:outline-none focus:border-aegean"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Use Case</label>
                  <textarea
                    required
                    rows={3}
                    value={hireForm.useCase}
                    onChange={(e) => setHireForm((f) => ({ ...f, useCase: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-limestone/50 text-sm focus:outline-none focus:border-aegean"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Budget Range</label>
                  <select
                    value={hireForm.budgetRange}
                    onChange={(e) => setHireForm((f) => ({ ...f, budgetRange: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-limestone/50 text-sm focus:outline-none focus:border-aegean"
                  >
                    <option>{"< $100/mo"}</option>
                    <option>$100 - $250/mo</option>
                    <option>$250 - $500/mo</option>
                    <option>{"> $500/mo"}</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-terracotta text-white py-3 rounded-lg font-medium hover:bg-terracotta/90 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Request to Hire"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
