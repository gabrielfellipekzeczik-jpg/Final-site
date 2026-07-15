import React, { useRef, useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';
import Butterfly from './Butterfly';

// Estrutura padrão de um depoimento — preencha/edite pelo painel admin
// (Configurações > Depoimentos) ou substitua este array de exemplo.
// { id, name, role, photo_url, quote }
export const DEFAULT_TESTIMONIALS = [
  {
    id: 'sample-1',
    name: 'Maria da Silva',
    role: 'Participante do curso de Corte e Costura',
    photo_url: '',
    quote:
      'A associação transformou minha relação comigo mesma. Hoje tenho minha própria renda e recuperei minha autoestima.',
  },
  {
    id: 'sample-2',
    name: 'Ana Souza',
    role: 'Voluntária e apoiadora mensal',
    photo_url: '',
    quote:
      'Ver de perto o cuidado com cada mulher acolhida me fez querer fazer parte dessa rede de transformação todos os dias.',
  },
  {
    id: 'sample-3',
    name: 'Juliana Ferreira',
    role: 'Ex-aluna de Empreendedorismo',
    photo_url: '',
    quote:
      'Cheguei sem esperança e saí com um propósito, um ofício e uma família que escolhi. Sou eternamente grata.',
  },
];

function TestimonialCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card rounded-3xl p-8 flex flex-col h-full min-w-0">
      <Quote size={28} className="text-brand-magenta/25 mb-4 flex-shrink-0" />

      <p
        className={`text-brand-purple/80 leading-relaxed flex-1 ${
          expanded ? '' : 'line-clamp-3'
        }`}
      >
        {item.quote}
      </p>

      {item.quote && item.quote.length > 140 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-xs font-semibold text-brand-magenta mt-2 self-start hover:underline"
        >
          {expanded ? 'Ler menos' : 'Ler mais'}
        </button>
      )}

      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[#A3196E]/10">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-mauve flex items-center justify-center flex-shrink-0 border border-[#A3196E]/15">
          {item.photo_url ? (
            <img src={item.photo_url} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <User size={20} className="text-brand-magenta/50" />
          )}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-brand-purple text-sm truncate">{item.name}</p>
          {item.role && <p className="text-xs text-brand-purple/60 truncate">{item.role}</p>}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ items }) {
  const testimonials = items && items.length > 0 ? items : DEFAULT_TESTIMONIALS;
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, testimonials.length - 1));
    const card = track.children[clamped];
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    }
    setActiveIndex(clamped);
  };

  const handlePrev = () => scrollToIndex(activeIndex - 1);
  const handleNext = () => scrollToIndex(activeIndex + 1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.children);
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section id="depoimentos" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8E4ED]/30 to-transparent" />
      <Butterfly className="absolute top-14 left-[4%] w-20 h-20 butterfly-float" opacity={0.06} />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-brand-magenta text-sm font-semibold tracking-[0.3em] uppercase mb-3">Histórias reais</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-purple font-heading">
            Vidas <span className="font-display italic font-medium text-brand-magenta">transformadas</span>
          </h2>
          <p className="mt-4 text-brand-purple/60 max-w-2xl mx-auto text-lg">
            O que dizem as mulheres, voluntárias e parceiras que fazem parte dessa jornada.
          </p>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="snap-start shrink-0 basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]"
              >
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>

          {testimonials.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Depoimento anterior"
                className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Próximo depoimento"
                className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Ir para depoimento ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === i ? 'w-6 bg-brand-magenta' : 'w-2 bg-brand-magenta/25'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
