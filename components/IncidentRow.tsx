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
  none: 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20',
  damaged: 'bg-amber-500/10 text-amber-600 ring-amber-500/20',
  sunk: 'bg-red-500/10 text-red-600 ring-red-500/20',
  seized: 'bg-purple-500/10 text-purple-600 ring-purple-500/20',
}

export default function IncidentRow({ incident }: { incident: Incident }) {
  return (
    <tr className="border-b border-slate-50 hover:bg-sky-50/50 transition-colors">
      <td className="py-3 px-4 text-xs text-slate-400 whitespace-nowrap font-medium">{incident.date}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <span className="text-base">{typeIcon[incident.vessel_type] || '🚢'}</span>
          <div>
            <div className="text-sm font-semibold text-slate-800">{incident.vessel_name}</div>
            <div className="text-xs text-slate-400">{incident.flag}</div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200">{incident.attack_type}</span>
      </td>
      <td className="py-3 px-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset ${damageBadge[incident.damage] || 'bg-slate-500/10 text-slate-600 ring-slate-500/20'}`}>
          {incident.damage}
        </span>
      </td>
      <td className="py-3 px-4 text-xs text-slate-600 max-w-xs">
        <p className="line-clamp-1 mb-0.5">{incident.description}</p>
        <a href={incident.source_url} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-600 font-medium transition-colors">{incident.source}</a>
      </td>
    </tr>
  )
}
