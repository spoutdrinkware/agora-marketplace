"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Register() {
  const router = useRouter();
  const [role, setRole] = useState<"builder" | "business">("builder");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  async function handleOAuth(provider: "google" | "github") {
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/${role}`,
      },
    });
    if (authError) setError(authError.message);
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-4">&#9993;</div>
          <h1 className="font-display text-3xl font-bold text-ink mb-3">Check Your Email</h1>
          <p className="text-ink/60 mb-6">
            We sent a confirmation link to <strong>{email}</strong>.
            Click the link to activate your account.
          </p>
          <Link
            href="/login"
            className="text-aegean hover:underline text-sm"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-ink mb-2">Create Account</h1>
          <p className="text-ink/60">Join Agora as a builder or business</p>
        </div>

        <div className="bg-white border border-limestone/30 rounded-xl p-8">
          <div className="grid grid-cols-2 gap-2 p-1 bg-limestone/20 rounded-lg mb-6">
            <button
              onClick={() => setRole("builder")}
              className={`py-2.5 rounded-md text-sm font-medium transition-colors ${
                role === "builder" ? "bg-white text-aegean shadow-sm" : "text-ink/50"
              }`}
            >
              I Build Agents
            </button>
            <button
              onClick={() => setRole("business")}
              className={`py-2.5 rounded-md text-sm font-medium transition-colors ${
                role === "business" ? "bg-white text-aegean shadow-sm" : "text-ink/50"
              }`}
            >
              I Hire Agents
            </button>
          </div>

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
                placeholder="At least 8 characters"
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
              {loading ? "Creating account..." : `Create ${role === "builder" ? "Builder" : "Business"} Account`}
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
          Already have an account?{" "}
          <Link href="/login" className="text-aegean hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
