'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'

const navItems = ['Préstamos', 'Soluciones', 'Para Empresas', 'Recursos']

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
          y: -50,
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
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
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
        style={{  backdropFilter: 'blur(20px)', backgroundColor: '#ffffff59' }}
      >
        <div className="max-w-[90%] mx-auto flex justify-start items-center gap-40">
          {/* Logo */}
          <div className="flex items-center flex-row">
            <Link href="/" className="text-3xl font-bold text-[#088bf3] tracking-wider glow-text flex items-center gap-2 flex-row">
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
            <span className="text-lg font-bold text-[#088bf3] tracking-wider  flex items-center gap-2 flex-row"> DESARROLLO CREDITICIO EMPRESARIAL</span>
            </Link>
          </div>

          {/* Navegación principal para pantallas grandes */}
          <nav className="hidden md:flex items-center space-x-8 glass-effect px-6 py-3 rounded-full">
            {navItems.map(item => (
              <Link
                key={item}
                href={item === 'Préstamos' ? '/' : item === 'Soluciones' ? '/about' : item === 'Para Empresas' ? '/about' : '/contact'}
                className="text-black hover:text-gray-500 transition-colors font-medium"
                onClick={() => setActive(item)}
              >
                {item}
              </Link>
            ))}
          </nav>

         

          {/* Menú Hamburguesa para dispositivos móviles */}
          <button 
            className="md:hidden flex flex-col justify-between w-6 h-5 z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ref={menuButtonRef}
          >
            <span className="block h-0.5 origin-center bg-white" />
            <span className="block h-0.5 origin-center bg-white" />
            <span className="block h-0.5 origin-center bg-white" />
          </button>

          {/* Menú móvil */}
          {shouldRenderMenu && (
            <div
              ref={mobileMenuRef}
              className="md:hidden fixed top-20 left-0 h-screen w-full shadow-lg p-4 z-50"
              style={{  backdropFilter: 'blur(20px)' }}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-6">
                {navItems.map(item => (
                  <Link
                    key={item}
                    href={item === 'Préstamos' ? '/' : item === 'Soluciones' ? '/about' : item === 'Para Empresas' ? '/about' : '/contact'}
                    className="block py-3 px-6 text-lg text-white hover:text-[var(--gold-yellow)] transition-colors"
                    onClick={() => {
                      setActive(item)
                      setIsMenuOpen(false)
                    }}
                  >
                    {item}
                  </Link>
                ))}
                <div className="mt-8 space-y-4">
                  <Link 
                    href="/contact" 
                    className="block py-3 px-6 text-lg text-white hover:text-[var(--gold-yellow)] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    href="/contact"
                    className="block py-3 px-6 text-lg text-center rounded-full font-semibold bg-[var(--brand-color)] text-white hover:bg-[var(--strong-blue)] transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Solicitar Préstamo
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
