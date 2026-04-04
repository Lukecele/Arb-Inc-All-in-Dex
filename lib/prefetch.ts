'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

// Prefetch links on hover for faster navigation
export function usePrefetch() {
  const router = useRouter()

  const prefetchPage = useCallback((href: string) => {
    router.prefetch(href)
  }, [router])

  return { prefetchPage }
}

// Common pages to prefetch on layout load
export const commonPagesToPrefetch = [
  '/swap',
  '/zap',
  '/bridge',
  '/limit-orders',
  '/about',
]
