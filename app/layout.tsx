import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Verifica Monetag */}
        <meta name="monetag" content="34275828e267717f003219fdbfcb9234" />
        {/* Monetag MultiTag */}
        <script src="https://quge5.com/88/tag.min.js" data-zone="228968" async data-cfasync="false"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
