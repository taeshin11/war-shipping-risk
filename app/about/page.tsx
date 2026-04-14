export const metadata = {
  title: 'About | War Shipping Risk',
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">About War Shipping Risk</h1>
      <p className="text-gray-600 mb-4">
        War Shipping Risk tracks the impact of armed conflicts on global maritime trade routes.
        We monitor vessel incidents, freight cost impacts, and risk assessments for key shipping chokepoints.
      </p>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Data Sources</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
        <li>UK Maritime Trade Operations (UKMTO)</li>
        <li>EU Naval Force (EU NavFor)</li>
        <li>Lloyd's List Intelligence</li>
        <li>IMO Incident Reports</li>
        <li>Dryad Global Maritime Intelligence</li>
        <li>Reuters, AP, AFP wire services</li>
      </ul>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Risk Levels</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li><strong>Critical</strong> (9-10): Active attacks, major diversions</li>
        <li><strong>High</strong> (7-8): Frequent incidents, significant risk</li>
        <li><strong>Elevated</strong> (5-6): Potential threat, heightened vigilance</li>
        <li><strong>Open</strong> (0-4): Normal operations, minimal risk</li>
      </ul>
    </div>
  )
}
