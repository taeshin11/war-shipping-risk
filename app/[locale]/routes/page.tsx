import { setRequestLocale } from 'next-intl/server'
import RoutesClient from './RoutesClient'

export const metadata = {
  title: 'All Sea Routes | War Shipping Risk',
}

export default async function RoutesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RoutesClient />
}
