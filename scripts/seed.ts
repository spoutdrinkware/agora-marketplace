/**
 * Seed script for Agora Marketplace
 * Populates the builders and agents tables via Supabase client
 *
 * Usage: npx tsx scripts/seed.ts
 */

import { createClient } from "@supabase/supabase-js";
import { agents, builders } from "../src/data/agents";
import * as fs from "fs";
import * as path from "path";

const envPath = path.join(__dirname, "..", ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const env: Record<string, string> = {};
for (const line of envContent.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
}

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const builderIdMap = new Map<string, string>();

async function seedBuilders() {
  console.log("Seeding builders...");

  for (const builder of builders) {
    const email = `${builder.name.toLowerCase().replace(/\s+/g, ".")}@agora-demo.com`;

    // Check if builder already exists
    const { data: existing } = await supabase
      .from("builders")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      builderIdMap.set(builder.id, existing.id);
      console.log(`  "${builder.name}" exists (${existing.id})`);
      continue;
    }

    const { data, error } = await supabase
      .from("builders")
      .insert({
        name: builder.name,
        bio: builder.bio,
        email,
      })
      .select("id")
      .single();

    if (error) {
      console.error(`  Failed "${builder.name}": ${error.message}`);
    } else {
      builderIdMap.set(builder.id, data.id);
      console.log(`  Created "${builder.name}" (${data.id})`);
    }
  }
}

async function seedAgents() {
  console.log("\nSeeding agents...");

  for (const agent of agents) {
    const builderId = builderIdMap.get(agent.builderId);
    if (!builderId) {
      console.error(`  No builder for ${agent.builderId}, skipping "${agent.name}"`);
      continue;
    }

    const agentData = {
      slug: agent.slug,
      name: agent.name,
      description: agent.description,
      category: agent.category,
      framework: agent.framework,
      verification_tier: agent.verificationTier,
      capabilities: agent.capabilities,
      pricing: agent.pricing,
      builder_id: builderId,
      rating: agent.rating,
      hire_count: agent.hireCount,
      listed: agent.listed,
    };

    const { data: existing } = await supabase
      .from("agents")
      .select("id")
      .eq("slug", agent.slug)
      .maybeSingle();

    if (existing) {
      await supabase.from("agents").update(agentData).eq("id", existing.id);
      console.log(`  Updated "${agent.name}"`);
    } else {
      const { error } = await supabase.from("agents").insert(agentData);
      if (error) {
        console.error(`  Failed "${agent.name}": ${error.message}`);
      } else {
        console.log(`  Inserted "${agent.name}"`);
      }
    }
  }
}

async function main() {
  console.log("Agora Marketplace Seed Script");
  console.log(`URL: ${SUPABASE_URL}\n`);

  await seedBuilders();
  await seedAgents();

  const { count: builderCount } = await supabase.from("builders").select("*", { count: "exact", head: true });
  const { count: agentCount } = await supabase.from("agents").select("*", { count: "exact", head: true });
  console.log(`\nDone! Builders: ${builderCount}, Agents: ${agentCount}`);
}

main().catch(console.error);
