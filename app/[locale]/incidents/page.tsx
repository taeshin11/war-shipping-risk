import { setRequestLocale } from 'next-intl/server'
import incidents from '@/public/data/incidents.json'
import IncidentRow from '@/components/IncidentRow'

export const metadata = {
  title: 'All Maritime Incidents | War Shipping Risk',
}

export default async function IncidentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const sorted = [...incidents].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">All Maritime Incidents</h1>
      <p className="text-gray-500 mb-6">{sorted.length} recorded incidents. Sorted by date.</p>
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
            {sorted.map(i => <IncidentRow key={i.id} incident={i} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}
