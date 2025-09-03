"use client";
import React from 'react';
import Link from 'next/link';
import { brand } from '../../app/config/brand'

const Navbar = () => {
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
          --glow-start: var(--brand-color);
          --glow-end: var(--accent-purple);
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid black;
        }
        .glow-text {
          text-shadow: 0 0 10px rgba(3, 137, 247, 0.7), 0 0 20px rgba(191, 72, 225, 0.4);
        }
      `}</style>
      
      <header className="absolute top-0 left-0 right-0 z-30 py-6 px-4 sm:px-6 lg:px-8 border-b border-black">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-3xl font-bold text-black tracking-wider glow-text">
              CREDI<span className="">MAX</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 glass-effect px-6 py-3 rounded-full text-black" >
            <Link href="/" className="text-black hover:text-black transition-colors font-medium">
              Préstamos
            </Link>
            <Link href="/" className="text-black hover:text-black transition-colors font-medium">
              Contactanos 
            </Link>
           
          </nav>
          
          <div className="flex items-center space-x-4">
              <Link href="/contact" className="text-black hover:text-black transition-colors font-medium">
              Iniciar Sesión
            </Link>
            <Link 
              href="/contact" 
              className="bg-[var(--brand-color)] text-white px-6 py-2 rounded-full font-semibold hover:bg-[var(--strong-blue)] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Solicitar Préstamo
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
