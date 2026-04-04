const tierConfig = {
  gold: { label: "Gold Verified", bg: "bg-olive/10", text: "text-olive", border: "border-olive/30", icon: "★" },
  silver: { label: "Silver Verified", bg: "bg-aegean/10", text: "text-aegean", border: "border-aegean/30", icon: "◆" },
  bronze: { label: "Bronze Verified", bg: "bg-terracotta/10", text: "text-terracotta", border: "border-terracotta/30", icon: "●" },
  unverified: { label: "Unverified", bg: "bg-ink/5", text: "text-ink/50", border: "border-ink/10", icon: "○" },
};

export default function VerificationBadge({ tier, size = "sm" }: { tier: keyof typeof tierConfig; size?: "sm" | "md" }) {
  const config = tierConfig[tier];
  const sizeClasses = size === "md" ? "px-3 py-1.5 text-sm" : "px-2 py-0.5 text-xs";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${config.bg} ${config.text} ${config.border} ${sizeClasses}`}>
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}
