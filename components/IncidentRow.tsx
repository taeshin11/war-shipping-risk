interface Incident {
  id: string
  date: string
  vessel_name: string
  vessel_type: string
  flag: string
  attack_type: string
  damage: string
  crew_outcome: string
  attacker: string
  conflict: string
  description: string
  source: string
  source_url: string
}

const typeIcon: Record<string, string> = {
  container: '📦',
  tanker: '🛢️',
  bulk: '⚓',
  naval: '⚔️',
  patrol: '🚢',
}
const damageBadge: Record<string, string> = {
  none: 'bg-green-100 text-green-700',
  damaged: 'bg-yellow-100 text-yellow-700',
  sunk: 'bg-red-100 text-red-700',
  seized: 'bg-purple-100 text-purple-700',
}

export default function IncidentRow({ incident }: { incident: Incident }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-2 px-3 text-xs text-gray-500 whitespace-nowrap">{incident.date}</td>
      <td className="py-2 px-3">
        <div className="flex items-center gap-1">
          <span>{typeIcon[incident.vessel_type] || '🚢'}</span>
          <div>
            <div className="text-sm font-medium text-gray-800">{incident.vessel_name}</div>
            <div className="text-xs text-gray-400">{incident.flag}</div>
          </div>
        </div>
      </td>
      <td className="py-2 px-3">
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{incident.attack_type}</span>
      </td>
      <td className="py-2 px-3">
        <span className={`text-xs px-2 py-0.5 rounded font-medium ${damageBadge[incident.damage] || 'bg-gray-100 text-gray-600'}`}>
          {incident.damage}
        </span>
      </td>
      <td className="py-2 px-3 text-xs text-gray-600 max-w-xs">
        <p className="line-clamp-1">{incident.description}</p>
        <a href={incident.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{incident.source}</a>
      </td>
    </tr>
  )
}
