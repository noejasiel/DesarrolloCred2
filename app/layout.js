// app/layout.js
import ScrollWrapper from '../components/ScrollWrapper'
import '../styles/globals.css'
import Header from '../components/Header'
import Features from './sections/Features'
import Script from 'next/script'

export const metadata = {
  title: 'DESARROLLO CREDITICIO PERSONAL Y EMPRESARIAL | Componentes Vifer',
  description: 'Especialistas en asesoría crediticia personal y empresarial. Te ayudamos a obtener créditos personales, empresariales, hipotecarios y agrícolas con las mejores condiciones del mercado. Contacto: +52 (55) 93-14-65-04',
  keywords: 'créditos personales, créditos empresariales, créditos hipotecarios, créditos agrícolas, asesoría crediticia, financiamiento, préstamos, Componentes Vifer, desarrollo crediticio',
  authors: [{ name: 'Componentes Vifer' }],
  creator: 'Componentes Vifer',
  publisher: 'Componentes Vifer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://desarrollocrediticiopersonalyempresarial.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DESARROLLO CREDITICIO PERSONAL Y EMPRESARIAL',
    description: 'Especialistas en asesoría crediticia personal y empresarial. Te ayudamos a obtener créditos con las mejores condiciones del mercado.',
    url: 'https://desarrollocrediticiopersonalyempresarial.com',
    siteName: 'Desarrollo Crediticio Personal y Empresarial',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Desarrollo Crediticio Personal y Empresarial - Componentes Vifer',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DESARROLLO CREDITICIO PERSONAL Y EMPRESARIAL',
    description: 'Especialistas en asesoría crediticia personal y empresarial. Te ayudamos a obtener créditos con las mejores condiciones del mercado.',
    images: ['/logo.png'],
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
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'finance',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light',
  themeColor: '#0045ac',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: [
      '/favicon.ico',
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/logo.png', type: 'image/png', sizes: '192x192' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/logo.png', sizes: '180x180' }
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/logo.png',
      },
      {
        rel: 'mask-icon',
        url: '/logo.png',
        color: '#0045ac'
      }
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-body" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17545432662"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-17545432662');`}
        </Script>
        <ScrollWrapper>
          {children}
         {/*  <Features /> */}
        </ScrollWrapper>
      </body>
    </html>
  )
}
