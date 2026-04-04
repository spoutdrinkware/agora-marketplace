"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, frameworks } from "@/data/agents";

export default function NewAgent() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", description: "", category: categories[0], framework: frameworks[0],
    capabilities: "", pricing: "", demoUrl: "", repoUrl: "",
  });

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">&#10003;</div>
        <h1 className="font-display text-3xl font-bold text-ink mb-2">Agent Submitted</h1>
        <p className="text-ink/60 mb-8">
          Your agent has been submitted for verification. You&apos;ll receive an email when the Bronze automated scan completes (typically under 24 hours).
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/dashboard/builder" className="text-aegean hover:underline">Back to Dashboard</Link>
          <Link href="/verification" className="text-ink/50 hover:underline">Learn about verification</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/dashboard/builder" className="text-aegean hover:underline text-sm mb-6 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="font-display text-3xl font-bold text-ink mb-2">List New Agent</h1>
      <p className="text-ink/60 mb-8">Submit your agent for verification and listing on Agora.</p>

      <div className="bg-aegean/5 border border-aegean/20 rounded-xl p-4 mb-8">
        <p className="text-sm text-aegean">
          All agents go through our three-tier verification system. Bronze scanning is automated and typically completes in under 24 hours. <Link href="/verification" className="underline">Learn more</Link>
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Agent Name</label>
          <input
            type="text" required value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-limestone/50 focus:outline-none focus:border-aegean"
            placeholder="e.g., DataAnalyst Pro"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Description</label>
          <textarea
            required rows={3} value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-limestone/50 focus:outline-none focus:border-aegean"
            placeholder="What does your agent do?"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-limestone/50 focus:outline-none focus:border-aegean">
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Framework</label>
            <select value={form.framework} onChange={(e) => setForm((f) => ({ ...f, framework: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-limestone/50 focus:outline-none focus:border-aegean">
              {frameworks.map((f) => <option key={f}>{f}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Capabilities (one per line)</label>
          <textarea
            rows={4} value={form.capabilities}
            onChange={(e) => setForm((f) => ({ ...f, capabilities: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-limestone/50 focus:outline-none focus:border-aegean font-mono text-sm"
            placeholder={"SQL querying\nData visualization\nReport generation"}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Pricing</label>
            <input type="text" value={form.pricing}
              onChange={(e) => setForm((f) => ({ ...f, pricing: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-limestone/50 focus:outline-none focus:border-aegean"
              placeholder="$99/mo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Demo URL (optional)</label>
            <input type="url" value={form.demoUrl}
              onChange={(e) => setForm((f) => ({ ...f, demoUrl: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-limestone/50 focus:outline-none focus:border-aegean"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Repository URL (optional)</label>
          <input type="url" value={form.repoUrl}
            onChange={(e) => setForm((f) => ({ ...f, repoUrl: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-limestone/50 focus:outline-none focus:border-aegean"
            placeholder="https://github.com/..."
          />
        </div>
        <button type="submit"
          className="w-full bg-terracotta text-white py-3 rounded-lg font-medium hover:bg-terracotta/90 transition-colors">
          Submit for Verification
        </button>
      </form>
    </div>
  );
}
