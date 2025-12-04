import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solaniconstruction.com'
const siteName = 'Solani Construction Limited'
const defaultDescription = 'Premier construction specialists delivering resilient infrastructure across Ghana.'

interface MetadataParams {
  title?: string
  description?: string
  keywords?: string[]
  path?: string
  image?: string
  ogType?: 'website' | 'article' | 'profile'
}

export function generateMetadata({
  title,
  description = defaultDescription,
  keywords = [],
  path = '',
  image = '/logo.png',
  ogType = 'website',
}: MetadataParams): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const url = path ? `${baseUrl}${path}` : baseUrl

  return {
    title: fullTitle,
    description,
    keywords: ['construction', 'Ghana', 'infrastructure', ...keywords],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url,
      siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `${baseUrl}${image}`],
      creator: '@solaniconstruction',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateStructuredData(
  type: 'Organization' | 'LocalBusiness' | 'Service' | 'BreadcrumbList',
  data: Record<string, unknown>
) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  })
}

// Common structured data templates
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  description: defaultDescription,
  sameAs: [
    'https://facebook.com/solaniconstruction',
    'https://twitter.com/solaniconstruction',
    'https://linkedin.com/company/solani-construction',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'GH',
    addressRegion: 'Ghana',
    addressLocality: 'Bibiani',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    availableLanguage: 'English',
  },
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteName,
  image: `${baseUrl}/logo.png`,
  description: defaultDescription,
  url: baseUrl,
  telephone: '+233-XXX-XXX-XXXX', // Update with actual phone
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Your Address', // Update
    addressLocality: 'Bibiani',
    postalCode: '00000', // Update
    addressCountry: 'GH',
  },
  priceRange: '$',
  sameAs: [
    'https://facebook.com/solaniconstruction',
    'https://twitter.com/solaniconstruction',
  ],
}