"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard/builder";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  async function handleOAuth(provider: "google" | "github") {
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirect)}`,
      },
    });
    if (authError) setError(authError.message);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-ink mb-2">Welcome Back</h1>
          <p className="text-ink/60">Sign in to your Agora account</p>
        </div>

        <div className="bg-white border border-limestone/30 rounded-xl p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-limestone/50 focus:outline-none focus:border-aegean focus:ring-1 focus:ring-aegean"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-limestone/50 focus:outline-none focus:border-aegean focus:ring-1 focus:ring-aegean"
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-aegean text-white py-3 rounded-lg font-medium hover:bg-aegean/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 border-t border-limestone/30" />
            <span className="text-sm text-ink/40">or continue with</span>
            <div className="flex-1 border-t border-limestone/30" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleOAuth("google")}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-limestone/30 rounded-lg text-sm text-ink hover:bg-limestone/10 transition-colors"
            >
              Google
            </button>
            <button
              onClick={() => handleOAuth("github")}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-limestone/30 rounded-lg text-sm text-ink hover:bg-limestone/10 transition-colors"
            >
              GitHub
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-ink/50 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-aegean hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
