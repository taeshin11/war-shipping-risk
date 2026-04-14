'use client'
import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

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

const riskColors: Record<string, string> = {
  critical: '#dc2626',
  high: '#ea580c',
  elevated: '#ca8a04',
  open: '#16a34a',
}

export default function ShippingMap({ routes }: { routes: Route[] }) {
  useEffect(() => {
    // Fix leaflet icon issue
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet')
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    })
  }, [])

  return (
    <MapContainer center={[20, 50]} zoom={3} style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {routes.map(route => (
        <CircleMarker
          key={route.id}
          center={[route.lat, route.lng]}
          radius={Math.max(route.risk_score * 3, 8)}
          pathOptions={{
            color: riskColors[route.risk_level] || '#6b7280',
            fillColor: riskColors[route.risk_level] || '#6b7280',
            fillOpacity: 0.4,
            weight: 2,
          }}
        >
          <Popup>
            <div className="text-sm">
              <strong>{route.name}</strong><br />
              Risk: {route.risk_level.toUpperCase()} ({route.risk_score}/10)<br />
              Conflict: {route.conflict}<br />
              Vessels attacked: {route.vessels_attacked}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
