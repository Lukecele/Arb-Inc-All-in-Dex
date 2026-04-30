import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arbitrage-inc.exchange'

  // Elenco delle tue pagine attuali
  const routes = [
    '',           // Home
    '/swap-all',
    '/zap',
    '/bridge',
    '/rewards',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes]
}
