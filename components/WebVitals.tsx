'use client'

import { useEffect } from 'react'
import { reportWebVitals } from '@/lib/web-vitals'

export default function WebVitals() {
  useEffect(() => {
    // Report web vitals on mount
    reportWebVitals((metrics) => {
      // Log to console in production for debugging
      if (process.env.NODE_ENV === 'production') {
        console.log('[Web Vitals]', metrics)
      }
    })
  }, [])

  return null
}
