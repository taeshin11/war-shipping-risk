'use client'
import dynamic from 'next/dynamic'

interface Route {
  id: string
  name: string
  slug: string
  risk_level: string
  risk_score: number
  lat: number
  lng: number
  vessels_attacked: number
  conflict: string
}

const ShippingMap = dynamic(() => import('./ShippingMap'), { ssr: false, loading: () => <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-lg text-gray-400">Loading map...</div> })

export default function ShippingMapWrapper({ routes }: { routes: Route[] }) {
  return <ShippingMap routes={routes} />
}
