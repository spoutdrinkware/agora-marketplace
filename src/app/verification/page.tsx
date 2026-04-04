import Link from "next/link";

const tiers = [
  {
    name: "Bronze",
    icon: "●",
    color: "terracotta",
    timeline: "< 24 hours",
    description: "Automated scanning catches common issues before they reach the marketplace.",
    checks: [
      "Static code analysis for security vulnerabilities",
      "Dependency scanning for known CVEs",
      "License compatibility verification",
      "Basic functionality smoke tests",
      "Malware and obfuscation detection",
    ],
    requirements: ["Valid source code or package", "Declared capabilities manifest", "No known vulnerabilities"],
  },
  {
    name: "Silver",
    icon: "◆",
    color: "aegean",
    timeline: "2-3 days",
    description: "Identity verification ensures there's a real, accountable builder behind every agent.",
    checks: [
      "Builder identity verification (KYC)",
      "Organization validation (if applicable)",
      "Code provenance and signing verification",
      "API endpoint security audit",
      "Data handling and privacy review",
    ],
    requirements: ["Bronze verification passed", "Government-issued ID or business registration", "Signed builder agreement"],
  },
  {
    name: "Gold",
    icon: "★",
    color: "olive",
    timeline: "5-7 days",
    description: "Sandboxed behavioral testing validates that agents do what they claim — and nothing else.",
    checks: [
      "Isolated sandbox execution testing",
      "Behavioral analysis against declared capabilities",
      "Red-team adversarial testing",
      "Performance and reliability benchmarks",
      "Data exfiltration and prompt injection testing",
    ],
    requirements: ["Silver verification passed", "Test suite provided", "Sandbox-compatible architecture"],
  },
];

const matrix = [
  { check: "Static Analysis", bronze: true, silver: true, gold: true },
  { check: "Dependency Scanning", bronze: true, silver: true, gold: true },
  { check: "Identity Verification", bronze: false, silver: true, gold: true },
  { check: "Code Signing", bronze: false, silver: true, gold: true },
  { check: "Sandbox Testing", bronze: false, silver: false, gold: true },
  { check: "Red-Team Testing", bronze: false, silver: false, gold: true },
  { check: "Behavioral Analysis", bronze: false, silver: false, gold: true },
];

export default function Verification() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-parchment to-limestone/30 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mb-4">
            Three Tiers of Trust
          </h1>
          <p className="text-lg text-ink/60 max-w-2xl mx-auto">
            Every agent on Agora passes through our verification pipeline. No exceptions.
            Our three-tier system gives buyers confidence and gives builders credibility.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div key={tier.name} className="bg-white border border-limestone/30 rounded-xl overflow-hidden">
              <div className={`p-6 ${tier.color === "terracotta" ? "bg-terracotta/5" : tier.color === "aegean" ? "bg-aegean/5" : "bg-olive/5"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-2xl ${tier.color === "terracotta" ? "text-terracotta" : tier.color === "aegean" ? "text-aegean" : "text-olive"}`}>
                    {tier.icon}
                  </span>
                  <h2 className="font-display text-2xl font-bold">{tier.name}</h2>
                </div>
                <p className="text-sm text-ink/60 mb-2">{tier.description}</p>
                <span className="text-xs text-ink/40">Timeline: {tier.timeline}</span>
              </div>
              <div className="p-6">
                <h3 className="text-sm font-semibold text-ink mb-3">What We Check</h3>
                <ul className="space-y-2 mb-6">
                  {tier.checks.map((check) => (
                    <li key={check} className="flex items-start gap-2 text-sm text-ink/70">
                      <span className="text-aegean mt-0.5">&#10003;</span>
                      {check}
                    </li>
                  ))}
                </ul>
                <h3 className="text-sm font-semibold text-ink mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {tier.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2 text-sm text-ink/70">
                      <span className="text-ink/30 mt-0.5">&#8226;</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Look For matrix */}
      <section className="py-16 bg-limestone/20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-ink text-center mb-8">What We Look For</h2>
          <div className="bg-white rounded-xl border border-limestone/30 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-limestone/20">
                  <th className="text-left p-4 text-sm font-semibold text-ink">Check</th>
                  <th className="p-4 text-sm font-semibold text-terracotta text-center">Bronze</th>
                  <th className="p-4 text-sm font-semibold text-aegean text-center">Silver</th>
                  <th className="p-4 text-sm font-semibold text-olive text-center">Gold</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((row) => (
                  <tr key={row.check} className="border-b border-limestone/10 last:border-0">
                    <td className="p-4 text-sm text-ink/70">{row.check}</td>
                    <td className="p-4 text-center">{row.bronze ? "&#10003;" : "—"}</td>
                    <td className="p-4 text-center">{row.silver ? "&#10003;" : "—"}</td>
                    <td className="p-4 text-center">{row.gold ? "&#10003;" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="font-display text-3xl font-bold text-ink text-center mb-8">Our Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Free", desc: "Verification is free for all builders. Trust should not be a paywall." },
            { title: "Mandatory", desc: "Every agent must pass at least Bronze. No unverified listings." },
            { title: "Portable", desc: "Your verification travels with you. One badge, recognized everywhere." },
          ].map((p) => (
            <div key={p.title} className="text-center p-6 bg-white border border-limestone/30 rounded-xl">
              <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-ink/60">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-aegean text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to Get Verified?</h2>
          <p className="text-white/80 mb-8">Submit your agent and start the verification process today.</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register" className="bg-white text-aegean px-8 py-3 rounded-lg font-medium hover:bg-parchment transition-colors">
              Start Building
            </Link>
            <Link href="/agents" className="border-2 border-white/50 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
              Browse Agents
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
