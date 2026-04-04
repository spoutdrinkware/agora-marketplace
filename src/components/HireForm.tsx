"use client";

import { useState } from "react";

export default function HireForm({ agentSlug, builderName }: { agentSlug: string; builderName: string }) {
  const [hireForm, setHireForm] = useState({ email: "", useCase: "", budgetRange: "< $100/mo" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/hire-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentSlug, ...hireForm }),
      });
      if (!res.ok) throw new Error("Failed to submit request");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-3">&#10003;</div>
        <h3 className="font-display text-xl font-semibold mb-2">Request Submitted</h3>
        <p className="text-sm text-ink/60">We&apos;ll connect you with {builderName} shortly.</p>
      </div>
    );
  }

  return (
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
      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-terracotta text-white py-3 rounded-lg font-medium hover:bg-terracotta/90 transition-colors disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Request to Hire"}
      </button>
    </form>
  );
}
