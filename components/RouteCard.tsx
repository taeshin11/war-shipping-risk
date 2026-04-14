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

const riskStyles: Record<string, string> = {
  critical: 'bg-red-50 border-red-200',
  high: 'bg-orange-50 border-orange-200',
  elevated: 'bg-yellow-50 border-yellow-200',
  open: 'bg-green-50 border-green-200',
}
const riskBadge: Record<string, string> = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  elevated: 'bg-yellow-100 text-yellow-700',
  open: 'bg-green-100 text-green-700',
}

export default function RouteCard({ route }: { route: Route }) {
  return (
    <div className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${riskStyles[route.risk_level] || 'bg-gray-50 border-gray-200'}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-gray-900">{route.name}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase whitespace-nowrap ${riskBadge[route.risk_level]}`}>
          {route.risk_level}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className="text-lg font-bold text-gray-800">{route.risk_score}/10</div>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div className="bg-red-500 h-2 rounded-full" style={{ width: `${route.risk_score * 10}%` }} />
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{route.description}</p>
      <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mb-3">
        <div className="text-center"><div className="font-bold text-gray-800 text-sm">{route.vessels_attacked}</div><div>Attacked</div></div>
        <div className="text-center"><div className="font-bold text-gray-800 text-sm">{route.daily_ships_affected}</div><div>Ships/day</div></div>
        <div className="text-center"><div className="font-bold text-gray-800 text-sm">+{route.freight_impact_pct}%</div><div>Freight</div></div>
      </div>
      <Link href={`/routes/${route.slug}`} className="text-xs text-blue-600 hover:underline">View details →</Link>
    </div>
  )
}
