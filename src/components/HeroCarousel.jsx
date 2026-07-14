import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroCarousel({ slides = [] }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  const handleClick = (target) => {
    if (!target) return;
    if (target.startsWith('#')) {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(target, '_blank');
    }
  };

  if (slides.length === 0) return null;

  return (
    <section id="inicio" className="relative h-[420px] sm:h-[560px] w-full overflow-hidden">
      {slides.map((slide, idx) => {
        const isActive = idx === current;
        const clickable = !!slide.cta_link;
        return (
          <div
            key={slide.id || idx}
            role={clickable ? 'button' : undefined}
            tabIndex={clickable ? 0 : undefined}
            onClick={clickable ? () => handleClick(slide.cta_link) : undefined}
            onKeyDown={clickable ? (e) => { if (e.key === 'Enter') handleClick(slide.cta_link); } : undefined}
            className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${clickable ? 'cursor-pointer' : ''}`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image_url})` }}
            />
          </div>
        );
      })}

      {slides.length > 1 && (
        <>
          <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === current ? 'w-10 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Ir para o slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={prev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all"
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </section>
  );
}
