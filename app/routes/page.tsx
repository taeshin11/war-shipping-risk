'use client'
import { useState } from 'react'
import routesData from '@/public/data/routes.json'
import RouteCard from '@/components/RouteCard'

type SortKey = 'risk_score' | 'vessels_attacked' | 'freight_impact_pct'

export default function RoutesPage() {
  const [sort, setSort] = useState<SortKey>('risk_score')
  const sorted = [...routesData].sort((a, b) => (b[sort] as number) - (a[sort] as number))

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">All Sea Routes</h1>
      <p className="text-gray-500 mb-4">Sortable risk assessment for conflict-affected maritime routes.</p>
      <div className="flex gap-3 mb-6">
        <span className="text-sm text-gray-600">Sort by:</span>
        {(['risk_score', 'vessels_attacked', 'freight_impact_pct'] as SortKey[]).map(k => (
          <button key={k} onClick={() => setSort(k)}
            className={`text-sm px-3 py-1 rounded border ${sort === k ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
            {k === 'risk_score' ? 'Risk Score' : k === 'vessels_attacked' ? 'Vessels Attacked' : 'Freight Impact'}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map(r => <RouteCard key={r.id} route={r} />)}
      </div>
    </div>
  )
}
