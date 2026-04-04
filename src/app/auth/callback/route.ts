import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/";

  if (code) {
    // When Supabase is connected, exchange code for session here
  }

  return NextResponse.redirect(new URL(next, request.url));
}
