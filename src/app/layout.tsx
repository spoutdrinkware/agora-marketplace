import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Agora - Verified AI Agent Marketplace",
    template: "%s | Agora",
  },
  description:
    "The world's first verified, cross-platform marketplace for AI agents and skills. Hire trusted agents like employees.",
  openGraph: {
    title: "Agora - Verified AI Agent Marketplace",
    description:
      "Browse 24+ verified AI agents across 14 categories. The trust layer the AI industry is missing.",
    siteName: "Agora",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agora - Verified AI Agent Marketplace",
    description:
      "Browse 24+ verified AI agents across 14 categories. The trust layer the AI industry is missing.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
