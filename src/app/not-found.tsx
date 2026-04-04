import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl font-display font-bold text-aegean/20 mb-4">404</div>
        <h1 className="font-display text-3xl font-bold text-ink mb-2">Page Not Found</h1>
        <p className="text-ink/60 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="bg-aegean text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-aegean/90 transition-colors">
            Go Home
          </Link>
          <Link href="/agents" className="text-aegean hover:underline text-sm font-medium">
            Browse Agents
          </Link>
        </div>
      </div>
    </div>
  );
}
