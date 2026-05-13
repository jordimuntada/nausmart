import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nausmart',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  )
}
