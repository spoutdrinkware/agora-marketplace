"use client";

import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [role, setRole] = useState<"builder" | "business">("builder");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-ink mb-2">Create Account</h1>
          <p className="text-ink/60">Join Agora as a builder or business</p>
        </div>

        <div className="bg-white border border-limestone/30 rounded-xl p-8">
          {/* Role selector */}
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

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Email</label>
              <input
                type="email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-limestone/50 focus:outline-none focus:border-aegean focus:ring-1 focus:ring-aegean"
                placeholder="At least 8 characters"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-aegean text-white py-3 rounded-lg font-medium hover:bg-aegean/90 transition-colors"
            >
              Create {role === "builder" ? "Builder" : "Business"} Account
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
          Already have an account?{" "}
          <Link href="/login" className="text-aegean hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
