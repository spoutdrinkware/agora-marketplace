"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setInfo("Authentication is coming soon. Check back shortly!");
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
            {info && (
              <p className="text-aegean text-sm bg-aegean/5 border border-aegean/20 rounded-lg px-3 py-2">{info}</p>
            )}
            <button
              type="submit"
              className="w-full bg-aegean text-white py-3 rounded-lg font-medium hover:bg-aegean/90 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 border-t border-limestone/30" />
            <span className="text-sm text-ink/40">or continue with</span>
            <div className="flex-1 border-t border-limestone/30" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-limestone/30 rounded-lg text-sm text-ink hover:bg-limestone/10 transition-colors">
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-limestone/30 rounded-lg text-sm text-ink hover:bg-limestone/10 transition-colors">
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
