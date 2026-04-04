import AgentBrowser from "@/components/AgentBrowser";
import { getAllAgents, getCategories, getFrameworks } from "@/lib/db";

export default async function BrowseAgents() {
  const [agents, categories, frameworks] = await Promise.all([
    getAllAgents(),
    getCategories(),
    getFrameworks(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-ink mb-2">Browse Agents</h1>
        <p className="text-ink/60">{agents.length} verified agents available</p>
      </div>
      <AgentBrowser initialAgents={agents} categories={categories} frameworks={frameworks} />
    </div>
  );
}
