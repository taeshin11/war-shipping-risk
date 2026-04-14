import routes from '@/public/data/routes.json'
import incidents from '@/public/data/incidents.json'
import RouteCard from '@/components/RouteCard'
import IncidentRow from '@/components/IncidentRow'
import ShippingMapWrapper from '@/components/ShippingMapWrapper'

export default function Home() {
  const sorted = [...routes].sort((a, b) => b.risk_score - a.risk_score)
  const recent = [...incidents].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Maritime Conflict Risk Dashboard</h1>
      <p className="text-gray-500 mb-6">Live tracking of sea routes affected by armed conflict and maritime attacks.</p>

      <div className="mb-8 rounded-lg overflow-hidden border border-gray-200">
        <ShippingMapWrapper routes={routes} />
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Route Risk Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {sorted.map(r => <RouteCard key={r.id} route={r} />)}
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Incidents</h2>
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
            {recent.map(i => <IncidentRow key={i.id} incident={i} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}
