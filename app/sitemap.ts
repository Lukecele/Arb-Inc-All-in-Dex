import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arbitrage-inc.exchange'

  // Elenco completo delle 7 pagine
  const routes = [
    '',               // Home
    '/swap-all',
    '/zap',
    '/bridge',
    '/limit-orders',  // Aggiunto Limit Orders
    '/rewards',
    '/contact',       // Aggiunto Contact
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes]
}
