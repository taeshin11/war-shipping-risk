import routes from '@/public/data/routes.json'
import incidents from '@/public/data/incidents.json'
import IncidentRow from '@/components/IncidentRow'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return routes.map(r => ({ slug: r.slug }))
}

const riskBadge: Record<string, string> = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  elevated: 'bg-yellow-100 text-yellow-700',
  open: 'bg-green-100 text-green-700',
}

export default async function RouteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const route = routes.find(r => r.slug === slug)
  if (!route) notFound()

  const routeIncidents = incidents.filter(i => i.route_id === route.id).sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="max-w-4xl">
      <Link href="/routes" className="text-sm text-blue-600 hover:underline mb-4 block">← Back to routes</Link>
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-2xl font-bold text-gray-900">{route.name}</h1>
        <span className={`text-sm px-3 py-1 rounded-full font-bold uppercase ${riskBadge[route.risk_level]}`}>{route.risk_level}</span>
      </div>
      <p className="text-gray-500 mb-6">Conflict: {route.conflict} | Affected since: {route.affected_since}</p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-gray-900">{route.risk_score}/10</div>
          <div className="text-xs text-gray-500 mt-1">Risk Score</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-gray-900">{route.vessels_attacked}</div>
          <div className="text-xs text-gray-500 mt-1">Vessels Attacked</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-gray-900">+{route.freight_impact_pct}%</div>
          <div className="text-xs text-gray-500 mt-1">Freight Impact</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-2">Overview</h2>
        <p className="text-gray-600">{route.description}</p>
        <div className="mt-3 text-xs text-gray-400">
          Source: <a href={route.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{route.source}</a>
        </div>
      </div>

      {routeIncidents.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Incidents ({routeIncidents.length})</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Date</th>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Vessel</th>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Attack</th>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Damage</th>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Details</th>
                </tr>
              </thead>
              <tbody>
                {routeIncidents.map(i => <IncidentRow key={i.id} incident={i} />)}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
