import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'How to Use & FAQ',
  description: 'How to use War Shipping Risk. FAQ about data, methodology, and features.',
  keywords: 'war shipping risk, maritime security, naval threats, shipping lane disruption, sea conflict, piracy, FAQ, guide',
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const faqs = [
    { q: 'What is War Shipping Risk and who is it for?', a: 'War Shipping Risk is a free, publicly accessible platform that provides real-time maritime security risks, shipping lane threats, and naval incident tracking in conflict-affected waters. Designed for journalists, researchers, policy analysts, students, and NGO workers. No registration or payment required.' },
    { q: 'Where does data come from?', a: 'Data is sourced from ACLED, SIPRI, Uppsala Conflict Data Program, UN agencies, official government sources, and verified OSINT. Primary sources are cited where available.' },
    { q: 'How often is data updated?', a: 'Breaking events are updated within 24-48 hours. Statistical summaries are reviewed weekly or monthly. Each section shows its last-updated timestamp.' },
    { q: 'Is this platform free?', a: 'Entirely free with no registration required. Sustained through advertising. No paywalls or premium tiers.' },
    { q: 'Can I cite this data in my research?', a: 'Yes, with attribution to the platform and original primary source. For bulk data access or partnerships, contact us at contact@war-shipping-risk.vercel.app.' }
  ]
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href={`/${locale}`} className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span>How to Use &amp; FAQ</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">How to Use War Shipping Risk</h1>
        <p className="text-xl text-slate-600 mb-10">Get the most from our conflict intelligence platform.</p>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Getting Started in 3 Steps</h2>
          <div className="grid gap-4">
            {[
              { step: '1', title: 'Explore the Dashboard', desc: 'Start on the homepage for a high-level overview. Key metrics, recent events, and visualizations update regularly.' },
              { step: '2', title: 'Filter & Drill Down', desc: 'Use filter controls to narrow by region, date, type, or severity. Click any event or data point for detailed information.' },
              { step: '3', title: 'Track Changes Over Time', desc: 'Use timeline and historical views to understand trends. Bookmark pages to stay current.' }
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl border border-slate-100 p-5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shrink-0">{step}</div>
                <div><h3 className="font-semibold text-slate-800 mb-1">{title}</h3><p className="text-slate-600 text-sm">{desc}</p></div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3 className="font-semibold text-slate-800 mb-3">{q}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
