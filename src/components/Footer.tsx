import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-parchment/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-aegean rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-display text-xl font-bold text-parchment">Agora</span>
            </div>
            <p className="text-sm text-parchment/60">
              The verified marketplace for AI agents and skills. Trust at scale.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-parchment mb-3 text-sm uppercase tracking-wider">Marketplace</h3>
            <ul className="space-y-2">
              <li><Link href="/agents" className="text-sm hover:text-terracotta transition-colors">Browse Agents</Link></li>
              <li><Link href="/verification" className="text-sm hover:text-terracotta transition-colors">Verification</Link></li>
              <li><Link href="/api-docs" className="text-sm hover:text-terracotta transition-colors">API Reference</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-parchment mb-3 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              <li><span className="text-sm text-parchment/40">About (coming soon)</span></li>
              <li><span className="text-sm text-parchment/40">Blog (coming soon)</span></li>
              <li><span className="text-sm text-parchment/40">Careers (coming soon)</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-parchment mb-3 text-sm uppercase tracking-wider">Builders</h3>
            <ul className="space-y-2">
              <li><Link href="/register" className="text-sm hover:text-terracotta transition-colors">Start Building</Link></li>
              <li><Link href="/verification" className="text-sm hover:text-terracotta transition-colors">Get Verified</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-parchment/10 mt-8 pt-8 text-center text-sm text-parchment/40">
          &copy; {new Date().getFullYear()} Agora Marketplace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
