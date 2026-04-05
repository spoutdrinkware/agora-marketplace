import { createServerClient } from "@/lib/supabase/server";
import {
  agents as mockAgents,
  builders as mockBuilders,
  categories as mockCategories,
  frameworks as mockFrameworks,
  type Agent,
  type Builder,
} from "@/data/agents";

// Re-export types and static data
export type { Agent, Builder, HireRequest } from "@/data/agents";
export { categories, frameworks } from "@/data/agents";

interface DbAgent {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  framework: string;
  verification_tier: string;
  capabilities: string[];
  pricing: string;
  builder_id: string;
  rating: number;
  hire_count: number;
  listed: boolean;
  created_at: string;
  builder_name?: string;
}

function toAgent(row: DbAgent): Agent {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    category: row.category,
    framework: row.framework,
    verificationTier: row.verification_tier as Agent["verificationTier"],
    capabilities: row.capabilities || [],
    pricing: row.pricing || "Contact",
    builderId: row.builder_id,
    builderName: row.builder_name || "Unknown Builder",
    rating: Number(row.rating) || 0,
    hireCount: row.hire_count || 0,
    listed: row.listed,
    createdAt: row.created_at,
  };
}

interface DbBuilder {
  id: string;
  name: string;
  bio: string;
  avatar_url: string;
  email: string;
  created_at: string;
}

function toBuilder(row: DbBuilder, agentCount: number, goldCount: number): Builder {
  return {
    id: row.id,
    name: row.name || row.email || "Unknown",
    bio: row.bio || "",
    avatar: row.avatar_url || "",
    agentCount,
    goldCount,
    joinedAt: row.created_at?.split("T")[0] || "",
  };
}

export async function getAllAgents(): Promise<Agent[]> {
  const supabase = createServerClient();
  if (!supabase) return mockAgents;

  const { data, error } = await supabase
    .from("agents")
    .select("*, builders!builder_id(name)")
    .eq("listed", true)
    .order("hire_count", { ascending: false });

  if (error || !data || data.length === 0) return mockAgents;

  return data.map((row: any) => toAgent({
    ...row,
    builder_name: row.builders?.name || "Unknown Builder",
  }));
}

export async function getFeaturedAgents(limit = 6): Promise<Agent[]> {
  const supabase = createServerClient();
  if (!supabase) return mockAgents.filter((a) => a.verificationTier === "gold").slice(0, limit);

  const { data, error } = await supabase
    .from("agents")
    .select("*, builders!builder_id(name)")
    .eq("listed", true)
    .eq("verification_tier", "gold")
    .order("hire_count", { ascending: false })
    .limit(limit);

  if (error || !data || data.length === 0) {
    return mockAgents.filter((a) => a.verificationTier === "gold").slice(0, limit);
  }

  return data.map((row: any) => toAgent({
    ...row,
    builder_name: row.builders?.name || "Unknown Builder",
  }));
}

export async function searchAgentsDb(
  query: string,
  category?: string,
  framework?: string
): Promise<Agent[]> {
  const supabase = createServerClient();
  if (!supabase) {
    // Fall back to mock search
    let results = mockAgents.filter((a) => a.listed);
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.capabilities.some((c) => c.toLowerCase().includes(q))
      );
    }
    if (category) results = results.filter((a) => a.category === category);
    if (framework) results = results.filter((a) => a.framework === framework);
    return results;
  }

  let q = supabase
    .from("agents")
    .select("*, builders!builder_id(name)")
    .eq("listed", true);

  if (query) {
    q = q.textSearch("search_vector", query, { type: "websearch", config: "english" });
  }
  if (category) q = q.eq("category", category);
  if (framework) q = q.eq("framework", framework);

  const { data, error } = await q.order("hire_count", { ascending: false });

  if (error || !data || data.length === 0) {
    // On search error or empty results, try mock fallback for basic queries
    if (error) {
      let results = mockAgents.filter((a) => a.listed);
      if (query) {
        const ql = query.toLowerCase();
        results = results.filter(
          (a) =>
            a.name.toLowerCase().includes(ql) ||
            a.description.toLowerCase().includes(ql)
        );
      }
      if (category) results = results.filter((a) => a.category === category);
      if (framework) results = results.filter((a) => a.framework === framework);
      return results;
    }
    return [];
  }

  return data.map((row: any) => toAgent({
    ...row,
    builder_name: row.builders?.name || "Unknown Builder",
  }));
}

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  const supabase = createServerClient();
  if (!supabase) {
    return mockAgents.find((a) => a.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from("agents")
    .select("*, builders!builder_id(name)")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return mockAgents.find((a) => a.slug === slug) || null;
  }

  return toAgent({
    ...data,
    builder_name: (data as any).profiles?.full_name || "Unknown Builder",
  });
}

export async function getAgentsByBuilder(builderId: string): Promise<Agent[]> {
  const supabase = createServerClient();
  if (!supabase) return mockAgents.filter((a) => a.builderId === builderId);

  const { data, error } = await supabase
    .from("agents")
    .select("*, builders!builder_id(name)")
    .eq("builder_id", builderId)
    .eq("listed", true)
    .order("hire_count", { ascending: false });

  if (error || !data || data.length === 0) {
    return mockAgents.filter((a) => a.builderId === builderId);
  }

  return data.map((row: any) => toAgent({
    ...row,
    builder_name: row.builders?.name || "Unknown Builder",
  }));
}

export async function getBuilderById(id: string): Promise<Builder | null> {
  const supabase = createServerClient();
  if (!supabase) return mockBuilders.find((b) => b.id === id) || null;

  const { data: builder, error } = await supabase
    .from("builders")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !builder) {
    return mockBuilders.find((b) => b.id === id) || null;
  }

  const { data: agentData } = await supabase
    .from("agents")
    .select("verification_tier")
    .eq("builder_id", id)
    .eq("listed", true);

  const agentCount = agentData?.length || 0;
  const goldCount = agentData?.filter((a: any) => a.verification_tier === "gold").length || 0;

  return toBuilder(builder as DbBuilder, agentCount, goldCount);
}

export async function createHireRequest(params: {
  agentSlug: string;
  email: string;
  useCase: string;
  budgetRange?: string;
}): Promise<{ id: string; status: string } | null> {
  const supabase = createServerClient();
  if (!supabase) return null;

  // Look up agent by slug to get the UUID
  const { data: agent } = await supabase
    .from("agents")
    .select("id")
    .eq("slug", params.agentSlug)
    .single();

  if (!agent) return null;

  const { data, error } = await supabase
    .from("hire_requests")
    .insert({
      agent_id: agent.id,
      email: params.email,
      use_case: params.useCase,
      budget_range: params.budgetRange || "Not specified",
    })
    .select("id, status")
    .single();

  if (error || !data) return null;
  return { id: data.id, status: data.status };
}

export interface HireRequestRow {
  id: string;
  agentName: string;
  agentSlug: string;
  useCase: string;
  budgetRange: string;
  status: string;
  createdAt: string;
}

export async function getHireRequestsByEmail(email: string): Promise<HireRequestRow[]> {
  const supabase = createServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("hire_requests")
    .select("id, use_case, budget_range, status, created_at, agents!agent_id(name, slug)")
    .eq("email", email)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((r: any) => ({
    id: r.id,
    agentName: r.agents?.name || "Unknown",
    agentSlug: r.agents?.slug || "",
    useCase: r.use_case || "",
    budgetRange: r.budget_range || "",
    status: r.status || "pending",
    createdAt: r.created_at?.split("T")[0] || "",
  }));
}

export async function getCategories(): Promise<string[]> {
  const supabase = createServerClient();
  if (!supabase) return mockCategories;

  const { data, error } = await supabase
    .from("agents")
    .select("category")
    .eq("listed", true);

  if (error || !data || data.length === 0) return mockCategories;

  const cats = [...new Set(data.map((d: any) => d.category))].sort();
  return cats.length > 0 ? cats : mockCategories;
}

export async function getFrameworks(): Promise<string[]> {
  const supabase = createServerClient();
  if (!supabase) return mockFrameworks;

  const { data, error } = await supabase
    .from("agents")
    .select("framework")
    .eq("listed", true);

  if (error || !data || data.length === 0) return mockFrameworks;

  const fws = [...new Set(data.map((d: any) => d.framework))].sort();
  return fws.length > 0 ? fws : mockFrameworks;
}
