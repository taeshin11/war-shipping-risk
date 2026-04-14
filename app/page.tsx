import routes from '@/public/data/routes.json'
import incidents from '@/public/data/incidents.json'
import RouteCard from '@/components/RouteCard'
import IncidentRow from '@/components/IncidentRow'
import ShippingMapWrapper from '@/components/ShippingMapWrapper'

export default function Home() {
  const sorted = [...routes].sort((a, b) => b.risk_score - a.risk_score)
  const recent = [...incidents].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8)

  const criticalCount = routes.filter(r => r.risk_level === 'critical').length
  const highCount = routes.filter(r => r.risk_level === 'high').length
  const totalAttacked = routes.reduce((s, r) => s + r.vessels_attacked, 0)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-sky-500 text-xs font-bold uppercase tracking-widest mb-3">LIVE INTELLIGENCE</p>
          <h1 className="text-4xl font-extrabold mb-4">Maritime Conflict Risk Dashboard</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Live tracking of sea routes affected by armed conflict and maritime attacks worldwide.</p>
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <div className="text-2xl font-bold text-red-400">{criticalCount}</div>
              <div className="text-xs text-slate-400 mt-1">Critical Routes</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <div className="text-2xl font-bold text-orange-400">{highCount}</div>
              <div className="text-xs text-slate-400 mt-1">High Risk Routes</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <div className="text-2xl font-bold text-sky-400">{incidents.length}</div>
              <div className="text-xs text-slate-400 mt-1">Total Incidents</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <div className="text-2xl font-bold text-sky-400">{totalAttacked}</div>
              <div className="text-xs text-slate-400 mt-1">Vessels Attacked</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
          <ShippingMapWrapper routes={routes} />
        </div>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Route Risk Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map(r => <RouteCard key={r.id} route={r} />)}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Incidents</h2>
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Vessel</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Attack</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Damage</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(i => <IncidentRow key={i.id} incident={i} />)}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
