"use client";

import { useState, useMemo } from "react";
import AgentCard from "@/components/AgentCard";
import type { Agent } from "@/data/agents";

interface Props {
  initialAgents: Agent[];
  categories: string[];
  frameworks: string[];
}

export default function AgentBrowser({ initialAgents, categories, frameworks }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [framework, setFramework] = useState("");

  const results = useMemo(() => {
    let filtered = initialAgents;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.capabilities.some((c) => c.toLowerCase().includes(q))
      );
    }
    if (category) filtered = filtered.filter((a) => a.category === category);
    if (framework) filtered = filtered.filter((a) => a.framework === framework);
    return filtered;
  }, [initialAgents, query, category, framework]);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search agents by name, capability, or category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-limestone/50 bg-white text-ink placeholder:text-ink/40 focus:outline-none focus:border-aegean focus:ring-1 focus:ring-aegean"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-lg border border-limestone/50 bg-white text-ink focus:outline-none focus:border-aegean"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
          className="px-4 py-3 rounded-lg border border-limestone/50 bg-white text-ink focus:outline-none focus:border-aegean"
        >
          <option value="">All Frameworks</option>
          {frameworks.map((fw) => (
            <option key={fw} value={fw}>{fw}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="text-center py-20 text-ink/40">
          <p className="text-xl mb-2">No agents found</p>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </>
  );
}
