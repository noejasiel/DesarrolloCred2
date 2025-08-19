// app/layout.js
import ScrollWrapper from '../components/ScrollWrapper'
import '../styles/globals.css'
import Header from '../components/Header'
import Features from './sections/Features'

export const metadata = {
  title: 'Landing Empresarial',
  description: 'Una landing minimalista y moderna',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-body" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
        <ScrollWrapper>
          {children}
         {/*  <Features /> */}
        </ScrollWrapper>
      </body>
    </html>
  )
}
