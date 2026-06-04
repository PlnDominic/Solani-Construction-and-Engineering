import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'leaflet/dist/leaflet.css'
import PageLoader from '@/components/PageLoader'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://solaniconstruction.com'),
  title: {
    default: 'Solani Construction Limited',
    template: '%s | Solani Construction Limited',
  },
  description: 'Premier construction specialists delivering resilient infrastructure across Ghana.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Solani Construction Limited',
    description: 'Premier construction and engineering specialists delivering resilient infrastructure across Ghana.',
    url: 'https://solaniconstruction.com',
    siteName: 'Solani Construction Limited',
    images: [
      {
        url: 'https://solaniconstruction.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'Solani Construction and Engineering Services Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solani Construction Limited',
    description: 'Premier construction and engineering specialists delivering resilient infrastructure across Ghana.',
    images: ['https://solaniconstruction.com/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/logo.png" sizes="any" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Solani Construction Limited',
              url: 'https://solaniconstruction.com',
              logo: 'https://solaniconstruction.com/logo.png',
              description: 'Premier construction and engineering specialists delivering resilient infrastructure across Ghana.',
              sameAs: [
                'https://facebook.com/solaniconstruction',
                'https://twitter.com/solaniconstruction',
                'https://linkedin.com/company/solani-construction',
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'GH',
                addressRegion: 'Ghana',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                availableLanguage: 'English',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <PageLoader />
        {children}
      </body>
    </html>
  )
}
