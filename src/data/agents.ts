export interface Agent {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  framework: string;
  verificationTier: "gold" | "silver" | "bronze" | "unverified";
  capabilities: string[];
  pricing: string;
  builderId: string;
  builderName: string;
  rating: number;
  hireCount: number;
  listed: boolean;
  createdAt: string;
}

export interface Builder {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  agentCount: number;
  goldCount: number;
  joinedAt: string;
}

export interface HireRequest {
  id: string;
  agentSlug: string;
  agentName: string;
  email: string;
  useCase: string;
  budgetRange: string;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
}

export const agents: Agent[] = [
  { id: "1", slug: "data-analyst-pro", name: "DataAnalyst Pro", description: "Enterprise-grade data analysis agent. Connects to SQL databases, spreadsheets, and APIs to deliver automated reports with natural language insights.", category: "Data & Analytics", framework: "LangChain", verificationTier: "gold", capabilities: ["SQL querying", "Data visualization", "Report generation", "Natural language insights"], pricing: "$99/mo", builderId: "b1", builderName: "Analytics Corp", rating: 4.9, hireCount: 342, listed: true, createdAt: "2026-01-15" },
  { id: "2", slug: "code-reviewer", name: "CodeReviewer", description: "Automated code review agent that catches bugs, security vulnerabilities, and style issues before they reach production.", category: "Developer Tools", framework: "CrewAI", verificationTier: "gold", capabilities: ["Static analysis", "Security scanning", "Style enforcement", "PR comments"], pricing: "$49/mo", builderId: "b2", builderName: "DevTools Inc", rating: 4.8, hireCount: 567, listed: true, createdAt: "2026-01-20" },
  { id: "3", slug: "customer-support-ai", name: "SupportAgent", description: "Multi-channel customer support agent that handles tickets, live chat, and email with human-like conversation quality.", category: "Customer Service", framework: "AutoGPT", verificationTier: "silver", capabilities: ["Ticket management", "Live chat", "Email responses", "Sentiment analysis"], pricing: "$149/mo", builderId: "b3", builderName: "ServiceFirst AI", rating: 4.7, hireCount: 289, listed: true, createdAt: "2026-02-01" },
  { id: "4", slug: "content-writer", name: "ContentCraft", description: "SEO-optimized content creation agent. Writes blog posts, product descriptions, and social media copy tailored to your brand voice.", category: "Content & Marketing", framework: "LangChain", verificationTier: "gold", capabilities: ["Blog writing", "SEO optimization", "Social media copy", "Brand voice matching"], pricing: "$79/mo", builderId: "b4", builderName: "WordSmith AI", rating: 4.6, hireCount: 445, listed: true, createdAt: "2026-02-10" },
  { id: "5", slug: "sales-prospector", name: "ProspectAI", description: "B2B sales prospecting agent that identifies leads, enriches contact data, and drafts personalized outreach sequences.", category: "Sales & CRM", framework: "CrewAI", verificationTier: "silver", capabilities: ["Lead identification", "Data enrichment", "Email sequences", "CRM integration"], pricing: "$199/mo", builderId: "b5", builderName: "SalesForge", rating: 4.5, hireCount: 178, listed: true, createdAt: "2026-02-15" },
  { id: "6", slug: "legal-doc-reviewer", name: "LegalLens", description: "Contract review agent that flags risky clauses, suggests alternatives, and compares against your standard terms.", category: "Legal & Compliance", framework: "LangChain", verificationTier: "gold", capabilities: ["Contract analysis", "Risk flagging", "Clause comparison", "Compliance checking"], pricing: "$299/mo", builderId: "b6", builderName: "LegalTech AI", rating: 4.8, hireCount: 134, listed: true, createdAt: "2026-02-20" },
  { id: "7", slug: "devops-monitor", name: "OpsWatch", description: "Infrastructure monitoring agent that detects anomalies, auto-scales resources, and generates incident reports.", category: "DevOps & Infrastructure", framework: "AutoGPT", verificationTier: "silver", capabilities: ["Anomaly detection", "Auto-scaling", "Incident reports", "Alert routing"], pricing: "$129/mo", builderId: "b2", builderName: "DevTools Inc", rating: 4.4, hireCount: 223, listed: true, createdAt: "2026-03-01" },
  { id: "8", slug: "hr-screener", name: "TalentScreen", description: "Resume screening agent that evaluates candidates against job requirements and produces structured assessments.", category: "HR & Recruitment", framework: "LangChain", verificationTier: "bronze", capabilities: ["Resume parsing", "Skill matching", "Assessment scoring", "Bias detection"], pricing: "$89/mo", builderId: "b7", builderName: "PeopleAI", rating: 4.3, hireCount: 156, listed: true, createdAt: "2026-03-05" },
  { id: "9", slug: "financial-analyst", name: "FinanceBot", description: "Financial analysis agent that processes statements, builds models, and generates investor-ready reports.", category: "Finance & Accounting", framework: "CrewAI", verificationTier: "gold", capabilities: ["Financial modeling", "Statement analysis", "Report generation", "Forecasting"], pricing: "$249/mo", builderId: "b8", builderName: "FinAI Labs", rating: 4.7, hireCount: 198, listed: true, createdAt: "2026-03-10" },
  { id: "10", slug: "social-media-manager", name: "SocialPilot", description: "Social media management agent that schedules posts, analyzes engagement, and suggests content strategies.", category: "Content & Marketing", framework: "AutoGPT", verificationTier: "silver", capabilities: ["Post scheduling", "Engagement analytics", "Content suggestions", "Trend monitoring"], pricing: "$69/mo", builderId: "b4", builderName: "WordSmith AI", rating: 4.5, hireCount: 312, listed: true, createdAt: "2026-03-12" },
  { id: "11", slug: "qa-tester", name: "TestRunner", description: "Automated QA testing agent that writes and runs test suites, reports bugs, and validates fixes.", category: "Developer Tools", framework: "CrewAI", verificationTier: "bronze", capabilities: ["Test generation", "Bug reporting", "Regression testing", "Coverage analysis"], pricing: "$59/mo", builderId: "b2", builderName: "DevTools Inc", rating: 4.2, hireCount: 201, listed: true, createdAt: "2026-03-15" },
  { id: "12", slug: "research-assistant", name: "ResearchAI", description: "Academic and market research agent that synthesizes papers, extracts insights, and builds literature reviews.", category: "Research & Education", framework: "LangChain", verificationTier: "gold", capabilities: ["Paper synthesis", "Citation management", "Literature reviews", "Market analysis"], pricing: "$119/mo", builderId: "b1", builderName: "Analytics Corp", rating: 4.6, hireCount: 267, listed: true, createdAt: "2026-03-18" },
  { id: "13", slug: "email-assistant", name: "InboxZero", description: "Email management agent that triages, drafts replies, and manages follow-ups based on your communication style.", category: "Productivity", framework: "AutoGPT", verificationTier: "silver", capabilities: ["Email triage", "Reply drafting", "Follow-up tracking", "Calendar integration"], pricing: "$39/mo", builderId: "b3", builderName: "ServiceFirst AI", rating: 4.4, hireCount: 389, listed: true, createdAt: "2026-03-20" },
  { id: "14", slug: "security-auditor", name: "SecAudit", description: "Security audit agent that scans codebases, infrastructure, and dependencies for vulnerabilities and compliance gaps.", category: "Security", framework: "LangChain", verificationTier: "gold", capabilities: ["Vulnerability scanning", "Compliance auditing", "Dependency analysis", "Penetration testing"], pricing: "$349/mo", builderId: "b6", builderName: "LegalTech AI", rating: 4.9, hireCount: 145, listed: true, createdAt: "2026-03-22" },
  { id: "15", slug: "design-assistant", name: "DesignMate", description: "UI/UX design assistant that generates mockups, suggests improvements, and maintains design system consistency.", category: "Design", framework: "CrewAI", verificationTier: "bronze", capabilities: ["Mockup generation", "Design review", "System consistency", "Accessibility checks"], pricing: "$89/mo", builderId: "b7", builderName: "PeopleAI", rating: 4.1, hireCount: 98, listed: true, createdAt: "2026-03-25" },
  { id: "16", slug: "translation-agent", name: "LinguaAI", description: "Multi-language translation agent supporting 40+ languages with context-aware translations and localization.", category: "Content & Marketing", framework: "LangChain", verificationTier: "silver", capabilities: ["Multi-language translation", "Localization", "Context preservation", "Glossary management"], pricing: "$59/mo", builderId: "b4", builderName: "WordSmith AI", rating: 4.5, hireCount: 234, listed: true, createdAt: "2026-03-26" },
  { id: "17", slug: "inventory-manager", name: "StockAI", description: "Inventory management agent that tracks stock levels, predicts demand, and automates reorder points.", category: "Operations", framework: "AutoGPT", verificationTier: "bronze", capabilities: ["Stock tracking", "Demand forecasting", "Reorder automation", "Supplier management"], pricing: "$109/mo", builderId: "b5", builderName: "SalesForge", rating: 4.3, hireCount: 87, listed: true, createdAt: "2026-03-27" },
  { id: "18", slug: "meeting-assistant", name: "MeetBot", description: "Meeting assistant that takes notes, extracts action items, and distributes summaries to attendees.", category: "Productivity", framework: "CrewAI", verificationTier: "silver", capabilities: ["Note taking", "Action item extraction", "Summary generation", "Calendar sync"], pricing: "$29/mo", builderId: "b3", builderName: "ServiceFirst AI", rating: 4.6, hireCount: 456, listed: true, createdAt: "2026-03-28" },
  { id: "19", slug: "doc-generator", name: "DocForge", description: "Technical documentation agent that auto-generates API docs, user guides, and changelogs from code.", category: "Developer Tools", framework: "LangChain", verificationTier: "gold", capabilities: ["API documentation", "User guides", "Changelog generation", "Code comments"], pricing: "$69/mo", builderId: "b2", builderName: "DevTools Inc", rating: 4.7, hireCount: 178, listed: true, createdAt: "2026-03-29" },
  { id: "20", slug: "compliance-checker", name: "CompliBot", description: "Regulatory compliance agent that monitors policy changes, audits processes, and generates compliance reports.", category: "Legal & Compliance", framework: "AutoGPT", verificationTier: "silver", capabilities: ["Policy monitoring", "Process auditing", "Report generation", "Gap analysis"], pricing: "$199/mo", builderId: "b6", builderName: "LegalTech AI", rating: 4.4, hireCount: 112, listed: true, createdAt: "2026-03-30" },
  { id: "21", slug: "onboarding-agent", name: "OnboardAI", description: "Employee onboarding agent that guides new hires through setup, training materials, and team introductions.", category: "HR & Recruitment", framework: "CrewAI", verificationTier: "bronze", capabilities: ["Setup guidance", "Training delivery", "Team introductions", "Progress tracking"], pricing: "$49/mo", builderId: "b7", builderName: "PeopleAI", rating: 4.2, hireCount: 134, listed: true, createdAt: "2026-03-31" },
  { id: "22", slug: "data-pipeline", name: "PipelineAI", description: "Data pipeline agent that orchestrates ETL workflows, monitors data quality, and handles schema migrations.", category: "Data & Analytics", framework: "LangChain", verificationTier: "gold", capabilities: ["ETL orchestration", "Data quality monitoring", "Schema migrations", "Pipeline alerts"], pricing: "$179/mo", builderId: "b1", builderName: "Analytics Corp", rating: 4.8, hireCount: 156, listed: true, createdAt: "2026-04-01" },
  { id: "23", slug: "chatbot-builder", name: "BotForge", description: "Chatbot creation agent that designs conversational flows, trains on your docs, and deploys to any channel.", category: "Customer Service", framework: "AutoGPT", verificationTier: "silver", capabilities: ["Flow design", "Knowledge base training", "Multi-channel deploy", "Analytics dashboard"], pricing: "$139/mo", builderId: "b8", builderName: "FinAI Labs", rating: 4.5, hireCount: 189, listed: true, createdAt: "2026-04-02" },
  { id: "24", slug: "project-manager", name: "PMAgent", description: "Project management agent that tracks milestones, assigns tasks, and generates status reports for stakeholders.", category: "Productivity", framework: "CrewAI", verificationTier: "gold", capabilities: ["Milestone tracking", "Task assignment", "Status reports", "Risk assessment"], pricing: "$99/mo", builderId: "b5", builderName: "SalesForge", rating: 4.7, hireCount: 234, listed: true, createdAt: "2026-04-03" },
];

export const builders: Builder[] = [
  { id: "b1", name: "Analytics Corp", bio: "Enterprise data solutions. Building AI agents that transform raw data into actionable intelligence.", avatar: "/avatars/b1.png", agentCount: 3, goldCount: 2, joinedAt: "2026-01-10" },
  { id: "b2", name: "DevTools Inc", bio: "Developer productivity tools. Our agents automate the tedious parts of software engineering.", avatar: "/avatars/b2.png", agentCount: 4, goldCount: 2, joinedAt: "2026-01-12" },
  { id: "b3", name: "ServiceFirst AI", bio: "Customer experience automation. We build agents that deliver human-quality service at scale.", avatar: "/avatars/b3.png", agentCount: 3, goldCount: 0, joinedAt: "2026-01-15" },
  { id: "b4", name: "WordSmith AI", bio: "Content creation and marketing automation. Our agents write, translate, and optimize content.", avatar: "/avatars/b4.png", agentCount: 3, goldCount: 1, joinedAt: "2026-01-20" },
  { id: "b5", name: "SalesForge", bio: "Revenue acceleration through AI. Agents that prospect, manage, and close.", avatar: "/avatars/b5.png", agentCount: 3, goldCount: 1, joinedAt: "2026-02-01" },
  { id: "b6", name: "LegalTech AI", bio: "Legal and compliance automation. Reducing risk and cost with verified AI agents.", avatar: "/avatars/b6.png", agentCount: 3, goldCount: 2, joinedAt: "2026-02-05" },
  { id: "b7", name: "PeopleAI", bio: "HR technology solutions. Agents that help you hire, onboard, and develop talent.", avatar: "/avatars/b7.png", agentCount: 3, goldCount: 0, joinedAt: "2026-02-10" },
  { id: "b8", name: "FinAI Labs", bio: "Financial technology agents. From analysis to chatbots, we build for regulated industries.", avatar: "/avatars/b8.png", agentCount: 2, goldCount: 1, joinedAt: "2026-02-15" },
];

export const categories = [
  "Data & Analytics",
  "Developer Tools",
  "Customer Service",
  "Content & Marketing",
  "Sales & CRM",
  "Legal & Compliance",
  "DevOps & Infrastructure",
  "HR & Recruitment",
  "Finance & Accounting",
  "Security",
  "Design",
  "Research & Education",
  "Productivity",
  "Operations",
];

export const frameworks = ["LangChain", "CrewAI", "AutoGPT"];

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function getBuilderById(id: string): Builder | undefined {
  return builders.find((b) => b.id === id);
}

export function getAgentsByBuilder(builderId: string): Agent[] {
  return agents.filter((a) => a.builderId === builderId);
}

export function searchAgents(query: string, category?: string, framework?: string): Agent[] {
  let results = agents.filter((a) => a.listed);
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
