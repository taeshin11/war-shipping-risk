import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://war-shipping-risk.vercel.app', lastModified: new Date() },
    { url: 'https://war-shipping-risk.vercel.app/routes', lastModified: new Date() },
    { url: 'https://war-shipping-risk.vercel.app/incidents', lastModified: new Date() },
    { url: 'https://war-shipping-risk.vercel.app/about', lastModified: new Date() },
  ]
}
