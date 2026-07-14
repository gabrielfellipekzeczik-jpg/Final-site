import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';

export default function Navbar({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Início', href: '#inicio' },
    { label: 'História', href: '#historia' },
    { label: 'Missão', href: '#missao' },
    { label: 'Cursos', href: '#cursos' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Doação', href: '#doacao' },
  ];

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const logo = settings?.logo_url;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/85 backdrop-blur-md shadow-lg shadow-[#A3196E]/5 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <button onClick={() => handleNav('#inicio')} className="flex items-center gap-2.5 group">
          {logo ? (
            <img
              src={logo}
              alt="Transformadas para Transformar"
              className={`h-9 sm:h-11 w-auto max-w-[160px] sm:max-w-[200px] object-contain ${scrolled ? '' : 'bg-white/90 rounded-lg px-2 py-1 shadow-sm'}`}
            />
          ) : (
            <div className="text-left leading-tight">
              <span className={`block text-sm font-bold ${scrolled ? 'text-brand-purple' : 'text-white'}`}>Transformadas</span>
              <span className="block text-xs italic font-display text-brand-magenta">para Transformar</span>
            </div>
          )}
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={`text-sm font-medium transition-colors hover:text-brand-magenta ${scrolled ? 'text-brand-purple' : 'text-white'}`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#ingressos')}
            className="bg-brand-gradient text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-[#A3196E]/30 transition-all duration-300 hover:scale-105"
          >
            Ingressos
          </button>
          <a
            href="/admin/login"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-brand-magenta ${scrolled ? 'text-brand-purple/60' : 'text-white/70'}`}
          >
            <Lock size={15} /> Admin
          </a>
        </div>

        <button
          className={`md:hidden ${scrolled ? 'text-brand-purple' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md mt-3 mx-4 rounded-2xl shadow-xl p-5 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-left text-brand-purple font-medium py-1"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#ingressos')}
            className="bg-brand-gradient text-white text-sm font-semibold px-6 py-3 rounded-full mt-2"
          >
            Ingressos
          </button>
          <a
            href="/admin/login"
            className="flex items-center gap-1.5 text-brand-purple/60 font-medium py-1"
          >
            <Lock size={15} /> Admin
          </a>
        </div>
      )}
    </nav>
  );
}