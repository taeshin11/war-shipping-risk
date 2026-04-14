import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about War Shipping Risk — our mission, methodology, and commitment to transparent conflict intelligence.',
  keywords: 'war shipping risk, maritime security, naval threats, shipping lane disruption, sea conflict, piracy, about us',
}

export default function AboutPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span>About Us</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">About War Shipping Risk</h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">Real-time maritime security risks, shipping lane threats, and naval incident tracking in conflict-affected waters</p>
        <div className="space-y-8">
          <section className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed mb-4">War Shipping Risk was built on the conviction that access to timely, accurate conflict intelligence should not be limited to governments, think tanks, or expensive subscription services. We believe that journalists, researchers, policy analysts, students, and engaged citizens deserve access to quality information to understand the world&apos;s most pressing security challenges.</p>
            <p className="text-slate-600 leading-relaxed">In a world where armed conflicts shape economies, displace populations, and determine the course of history, we are committed to making conflict data accessible, transparent, and useful for everyone.</p>
          </section>
          <section className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">What We Cover</h2>
            <p className="text-slate-600 leading-relaxed mb-4">War Shipping Risk provides real-time maritime security risks, shipping lane threats, and naval incident tracking in conflict-affected waters. Our platform aggregates, verifies, and presents data in a format designed for clarity and usability.</p>
            <p className="text-slate-600 leading-relaxed">We cover active conflicts across multiple regions, providing visualizations, timelines, and analysis that contextualizes raw data within broader geopolitical realities.</p>
          </section>
          <section className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Data Sources &amp; Methodology</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Our data is compiled from: official government reports, United Nations agencies (OCHA, UNHCR, WFP), academic conflict databases (ACLED, SIPRI, Uppsala Conflict Data Program), verified open-source intelligence, and internationally recognized news organizations.</p>
            <p className="text-slate-600 leading-relaxed">We prioritize source transparency and cross-reference multiple sources. Where sources disagree, we present the range of estimates rather than a single contested figure.</p>
          </section>
          <section className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Why This Matters</h2>
            <p className="text-slate-600 leading-relaxed">Conflict data is inherently sensitive. We strive to present information in a factual, non-partisan manner to support informed discussion, humanitarian response, and evidence-based policy. The data we track represents real human lives, and that responsibility guides everything we do.</p>
          </section>
          <section className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Contact Us</h2>
            <p className="text-slate-600">For inquiries, corrections, or partnerships: <strong>contact@war-shipping-risk.vercel.app</strong></p>
          </section>
        </div>
      </div>
    </main>
  )
}
