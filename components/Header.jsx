'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'

const navItems = ['Préstamos', 'Contactanos']
const mobileNavItems = ['Préstamos', 'FAQ', 'Contactanos']

let scrollPosition = 0

export default function Header() {
  const [active, setActive] = useState()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const menuButtonRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: '10px top',
        toggleActions: 'play none none reverse',
        onEnter: () => updateNavbar(true),
        onLeaveBack: () => updateNavbar(false)
      }
    })

    function updateNavbar(scrolled) {
      if (scrolled) {
        gsap.to(headerRef.current, {

          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          duration: 0.3
        })
      } else {
        gsap.to(headerRef.current, {
          backdropFilter: 'blur(20px)',
          boxShadow: 'none',
          duration: 0.3,
          ease: 'elastic.out(8, 2)'
        })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  useEffect(() => {
    const [topBar, middleBar, bottomBar] = menuButtonRef.current.children

    if (isMenuOpen) {
      scrollPosition = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPosition}px`
      document.body.style.overflow = 'hidden'
      document.body.style.width = '100%'

      gsap.to(topBar, { rotation: 45, y: 10, duration: 0.3 })
      gsap.to(middleBar, { opacity: 0, duration: 0.3 })
      gsap.to(bottomBar, { rotation: -45, y: -8, duration: 0.3 })

      setShouldRenderMenu(true)
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.overflow = 'auto'
      document.body.style.width = ''
      window.scrollTo(0, scrollPosition)

      gsap.to(topBar, { rotation: 0, y: 0, duration: 0.3 })
      gsap.to(middleBar, { opacity: 1, duration: 0.3 })
      gsap.to(bottomBar, { rotation: 0, y: 0, duration: 0.3 })

      if (mobileMenuRef.current) {
        gsap.to(mobileMenuRef.current, {
          x: 320,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            setShouldRenderMenu(false)
          }
        })
      }
    }

    return () => {
      document.body.style.overflow = 'auto'
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (shouldRenderMenu && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { x: 320, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [shouldRenderMenu])

  return (
    <>
      <style jsx>{`
        :root {
          --brand-color: #0389f7;
          --strong-blue: #0046ae;
          --gold-yellow: #ffdc00;
          --accent-purple: #bf48e1;
          --dark-color: #111827;
          --light-gray: #F9FAFB;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid transparent;
        }
        .glow-text {
          text-shadow: 0 0 10px rgba(3, 137, 247, 0.7), 0 0 20px rgba(191, 72, 225, 0.4);
        }
      `}</style>

      <header
        ref={headerRef}
        className="w-full px-6 py-1  fixed top-0 left-0 right-0 z-50"
        style={{ backdropFilter: 'blur(20px)', backgroundColor: '#ffffff59' }}
      >
        <div className="max-w-[95%] mx-auto flex justify-between items-center gap-4 md:gap-16">
          {/* Logo */}
          <div className="flex items-center flex-row flex-shrink-0 min-w-0">
            <Link href="/" className="text-3xl font-bold text-[#088bf3] tracking-wider glow-text flex items-center gap-2 flex-row min-w-0">
              <Image src="/logo.png" alt="Logo" width={60} height={60} className="md:w-20 md:h-20 flex-shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs md:text-lg font-bold text-black tracking-wider whitespace-nowrap overflow-hidden md:hidden">DESARROLLO CREDITICIO</span>
                <span className="text-xs text-gray-500 tracking-wider md:hidden">PERSONAL Y EMPRESARIAL</span>
                <span className="text-xs md:text-lg font-bold text-black tracking-wider whitespace-nowrap overflow-hidden hidden md:block">DESARROLLO CREDITICIO PERSONAL Y EMPRESARIAL</span>
                <span className="text-xs text-gray-500 tracking-wider block">componentes vifer</span>
              </div>
            </Link>
          </div>

          {/* Navegación principal para pantallas grandes */}
          <nav className="hidden md:flex items-center space-x-6 glass-effect px-6 py-3 rounded-full flex-shrink-0">
            {navItems.map(item => (
              <Link
                key={item}
                href={item === 'Préstamos' ? '#' : item === 'Contactanos' ? '#contact-form' : '/'}
                className="text-black hover:text-gray-500 transition-colors font-medium whitespace-nowrap"
                onClick={(e) => {
                  setActive(item)
                  if (item === 'Préstamos') {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
              >
                {item}
              </Link>
            ))}
          </nav>



          {/* Menú Hamburguesa para dispositivos móviles */}
          <button
            className="md:hidden flex flex-col justify-between w-6 h-5 z-50 relative flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ref={menuButtonRef}
          >
            <span className="block h-0.5 origin-center bg-black" />
            <span className="block h-0.5 origin-center bg-black" />
            <span className="block h-0.5 origin-center bg-black" />
          </button>

          {/* Menú lateral móvil */}
          {shouldRenderMenu && (
            <div
              ref={mobileMenuRef}
              className="md:hidden fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl z-50 transform translate-x-full"
              style={{ 
                backdropFilter: 'blur(20px)',
                background: "white"
              }}
            >
              <div className="flex flex-col h-full">
                {/* Header del menú */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                   
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">DESARROLLO CREDITICIO</h3>
                      <p className="text-sm text-gray-600">Personal y Empresarial</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navegación */}
                <div className="flex-1 p-6">
                  <nav className="space-y-4">
                    {mobileNavItems.map((item, index) => (
                      <Link
                        key={item}
                        href={
                          item === 'Préstamos' ? '#' : 
                          item === 'Créditos' ? '#credit-cards' :
                          item === 'FAQ' ? '#faq-section' :
                          item === 'Contactanos' ? '#contact-form' : '/'
                        }
                        className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-[#0045ac] hover:bg-blue-50 rounded-lg transition-all duration-200"
                        onClick={(e) => {
                          setActive(item)
                          setIsMenuOpen(false)
                          if (item === 'Préstamos') {
                            e.preventDefault()
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }
                        }}
                      >
                        {item}
                      </Link>
                    ))}
                  </nav>

                  {/* Botón CTA */}
                  <div className="mt-8">
                    <Link
                      href="#contact-form"
                      className="block w-full bg-[#0045ac] text-white py-4 px-6 rounded-lg text-center font-semibold hover:bg-[#003a8c] transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Solicitar Préstamo
                    </Link>
                  </div>
                </div>

                {/* Footer con información de contacto */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="space-y-4">
                    {/* Teléfonos */}
                    <div className="space-y-2">
                      <a href="tel:+525593146504" className="flex items-center space-x-3 text-gray-700 hover:text-[#0045ac] transition-colors">
                        <span className="text-lg">📞</span>
                        <span className="text-sm">+52 (55) 93-14-65-04</span>
                      </a>
                      <a href="https://wa.me/5586098771" className="flex items-center space-x-3 text-gray-700 hover:text-[#0045ac] transition-colors">
                        <span className="text-lg">💬</span>
                        <span className="text-sm">+52 (55) 86-09-87-71</span>
                      </a>
                    </div>

                    {/* Dirección */}
                    <div className="flex items-start space-x-3 text-gray-700">
                      <span className="text-lg">📍</span>
                      <span className="text-sm">Calz. Gral. Mariano Escobedo 476, Chapultepec Morales, Anzures, Miguel Hidalgo, CP. 11590</span>
                    </div>

                   
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
