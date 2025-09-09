'use client'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function ScrollWrapper({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
      duration: 1.2,
      smoothTouch: false, // Deshabilitamos en móvil para mejor rendimiento
      infinite: false,
      normalizeWheel: true,
      wheelMultiplier: 1,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Manejar enlaces anchor
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (target) {
        e.preventDefault()
        const id = target.getAttribute('href').substring(1)
        const element = document.getElementById(id)
        if (element) {
          lenis.scrollTo(element, {
            offset: -100, // Offset para el header fijo
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          })
        }
      }
    }

    // Agregar event listener para enlaces anchor
    document.addEventListener('click', handleAnchorClick)

    return () => {
      lenis.destroy()
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return <>{children}</>
}
