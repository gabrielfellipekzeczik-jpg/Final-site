import React from 'react';
import { MapPin, Heart } from 'lucide-react';
import Butterfly from './Butterfly';

export default function AboutSection({ settings }) {
  const s = settings || {};
  const titleWords = (s.about_title || 'Da sala de casa ao Paraná').split(' ');
  const titleMain = titleWords.slice(0, -1).join(' ');
  const titleAccent = titleWords[titleWords.length - 1];

  return (
    <section id="historia" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <Butterfly className="absolute top-10 right-[5%] w-28 h-28 butterfly-float" opacity={0.08} />
      <Butterfly className="absolute bottom-10 left-[3%] w-20 h-20 butterfly-float" opacity={0.06} />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-magenta text-sm font-semibold tracking-[0.3em] uppercase mb-3">Nossa História</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-purple font-heading leading-tight">
            {titleMain} <br />
            <span className="font-display italic font-medium text-brand-magenta">{titleAccent}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#4A152B]/20">
              <img
                src={s.about_image}
                alt="Nossa história"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A152B]/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-3 border border-[#A3196E]/10">
              <div className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center">
                <Heart className="text-white" size={22} fill="white" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-brand-purple">7 anos</p>
                <p className="text-xs text-muted-foreground">de transformação</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {s.about_text_1 && <p className="text-brand-purple/80 leading-relaxed text-lg">{s.about_text_1}</p>}
            {s.about_text_2 && <p className="text-brand-purple/80 leading-relaxed text-lg">{s.about_text_2}</p>}
            {s.about_text_3 && <p className="text-brand-purple/80 leading-relaxed text-lg">{s.about_text_3}</p>}

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#A3196E]/10 flex items-center justify-center">
                <MapPin className="text-brand-magenta" size={20} />
              </div>
              <p className="text-brand-purple/80 leading-relaxed text-lg">
                <strong className="text-brand-purple">Crescer, estudar, trabalhar e nunca perder a identidade.</strong>{' '}
                Esse é o convite que ecoa em cada encontro, em cada testemunho, em cada vida restaurada.
              </p>
            </div>

            {s.about_quote && (
              <div className="glass-card rounded-2xl p-6 border-l-4 border-brand-magenta">
                <div className="flex items-center gap-3 mb-3">
                  <Butterfly className="w-8 h-8" opacity={0.9} />
                  <p className="font-bold text-brand-purple">O sinal da borboleta</p>
                </div>
                <p className="text-brand-purple/70 leading-relaxed italic font-display text-lg">
                  "{s.about_quote}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}