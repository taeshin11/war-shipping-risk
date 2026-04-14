import Link from 'next/link'

interface Route {
  id: string
  name: string
  slug: string
  risk_level: string
  risk_score: number
  description: string
  daily_ships_affected: number
  freight_impact_pct: number
  vessels_attacked: number
  conflict: string
}

const riskRing: Record<string, string> = {
  critical: 'bg-red-500/10 text-red-600 ring-red-500/20',
  high: 'bg-orange-500/10 text-orange-600 ring-orange-500/20',
  elevated: 'bg-amber-500/10 text-amber-600 ring-amber-500/20',
  open: 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20',
}
const riskBar: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  elevated: 'bg-amber-500',
  open: 'bg-emerald-500',
}

export default function RouteCard({ route }: { route: Route }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 group">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-semibold text-slate-900">{route.name}</h3>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset uppercase whitespace-nowrap ${riskRing[route.risk_level] || 'bg-slate-500/10 text-slate-600 ring-slate-500/20'}`}>
          {route.risk_level}
        </span>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-lg font-bold text-slate-800">{route.risk_score}/10</div>
        <div className="flex-1 bg-slate-100 rounded-full h-2">
          <div className={`h-2 rounded-full transition-all ${riskBar[route.risk_level] || 'bg-slate-400'}`} style={{ width: `${route.risk_score * 10}%` }} />
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{route.description}</p>
      <div className="grid grid-cols-3 gap-2 text-xs mb-4">
        <div className="text-center bg-slate-50 rounded-xl p-2">
          <div className="font-bold text-slate-800 text-sm">{route.vessels_attacked}</div>
          <div className="text-slate-400 mt-0.5">Attacked</div>
        </div>
        <div className="text-center bg-slate-50 rounded-xl p-2">
          <div className="font-bold text-slate-800 text-sm">{route.daily_ships_affected}</div>
          <div className="text-slate-400 mt-0.5">Ships/day</div>
        </div>
        <div className="text-center bg-slate-50 rounded-xl p-2">
          <div className="font-bold text-slate-800 text-sm">+{route.freight_impact_pct}%</div>
          <div className="text-slate-400 mt-0.5">Freight</div>
        </div>
      </div>
      <Link href={`/routes/${route.slug}`} className="text-xs text-sky-600 hover:text-sky-700 font-semibold transition-colors">View details →</Link>
    </div>
  )
}
