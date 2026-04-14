import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import VisitorCounter from "@/components/VisitorCounter";
import AdHeader from "@/components/ads/AdHeader";
import AdMobileSticky from "@/components/ads/AdMobileSticky";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "War Shipping Risk — Maritime Conflict Risk Dashboard",
  description: "Track maritime conflict zones, sea route risks, and shipping incidents worldwide.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50">
        <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inset-0 rounded-full bg-sky-500 opacity-75"></span>
                <span className="relative rounded-full h-2.5 w-2.5 bg-sky-500"></span>
              </span>
              <Link href="/" className="text-lg font-bold tracking-tight">War Shipping Risk</Link>
            </div>
            <nav className="flex gap-6 text-sm">
              <Link href="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
              <Link href="/routes" className="text-slate-300 hover:text-white transition-colors">Routes</Link>
              <Link href="/incidents" className="text-slate-300 hover:text-white transition-colors">Incidents</Link>
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
            </nav>
          </div>
          <AdHeader />
        </header>
        <main className="flex-1 w-full">{children}</main>
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <p className="text-sm">© 2025 War Shipping Risk. All rights reserved.</p>
            <VisitorCounter />
          </div>
        </footer>
        <AdMobileSticky />
      </body>
    </html>
  );
}
