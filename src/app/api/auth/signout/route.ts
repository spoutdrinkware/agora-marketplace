import { NextResponse } from "next/server";

export async function POST() {
  // When Supabase is connected, this will call auth.signOut()
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
}
