import Link from "next/link";
import { createAuthClient } from "@/lib/supabase/server";
import SignOutButton from "./SignOutButton";

export default async function Header() {
  const supabase = await createAuthClient();
  const { data: { user } } = supabase
    ? await supabase.auth.getUser()
    : { data: { user: null } };

  return (
    <header className="border-b border-limestone/20 bg-parchment/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-aegean rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-display text-xl font-bold text-ink">Agora</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/agents" className="text-sm text-ink/70 hover:text-aegean transition-colors">
              Browse Agents
            </Link>
            <Link href="/verification" className="text-sm text-ink/70 hover:text-aegean transition-colors">
              Verification
            </Link>
            <Link href="/api-docs" className="text-sm text-ink/70 hover:text-aegean transition-colors">
              API
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/dashboard/builder"
                  className="text-sm text-ink/70 hover:text-aegean transition-colors"
                >
                  Dashboard
                </Link>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-ink/70 hover:text-aegean transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="text-sm bg-aegean text-white px-4 py-2 rounded-lg hover:bg-aegean/90 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
