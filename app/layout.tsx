import './globals.css'
import StyledComponentsRegistry from '../lib/registry'

export const metadata = {
  title: 'Swap Widget',
  description: 'KyberSwap Widget',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
