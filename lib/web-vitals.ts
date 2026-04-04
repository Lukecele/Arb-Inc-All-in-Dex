'use client'

import { onCLS, onINP, onLCP, onFCP, onTTFB, Metric } from 'web-vitals'

interface WebVitalsMetrics {
  cls: number
  inp: number
  lcp: number
  fcp: number
  ttfb: number
}

// Function to send metrics to analytics
function sendToAnalytics({ name, delta, id, rating }: Metric) {
  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      non_interaction: true,
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}:`, {
      value: name === 'CLS' ? delta.toFixed(4) : `${Math.round(delta)}ms`,
      id,
      rating,
    })
  }
}

// Report all metrics
export function reportWebVitals(onPerfEntry?: (metrics: WebVitalsMetrics) => void) {
  const metrics: WebVitalsMetrics = {
    cls: 0,
    inp: 0,
    lcp: 0,
    fcp: 0,
    ttfb: 0,
  }

  // Cumulative Layout Shift
  onCLS((metric) => {
    metrics.cls = metric.value
    sendToAnalytics(metric)
  })

  // Interaction to Next Paint (replaced FID)
  onINP((metric) => {
    metrics.inp = metric.value
    sendToAnalytics(metric)
  })

  // Largest Contentful Paint
  onLCP((metric) => {
    metrics.lcp = metric.value
    sendToAnalytics(metric)
  })

  // First Contentful Paint
  onFCP((metric) => {
    metrics.fcp = metric.value
    sendToAnalytics(metric)
  })

  // Time to First Byte
  onTTFB((metric) => {
    metrics.ttfb = metric.value
    sendToAnalytics(metric)
  })

  // Call callback with all metrics when available
  if (onPerfEntry) {
    const checkMetrics = setInterval(() => {
      if (metrics.cls > 0 && metrics.inp > 0 && metrics.lcp > 0) {
        clearInterval(checkMetrics)
        onPerfEntry(metrics)
      }
    }, 100)
  }
}
