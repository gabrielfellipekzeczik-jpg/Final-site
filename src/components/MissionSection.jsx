import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';
import Butterfly from './Butterfly';

const values = [
  'Acolhimento', 'Amor ao próximo', 'Dignidade', 'Fortalecimento familiar',
  'Desenvolvimento pessoal', 'Fé', 'Esperança', 'Transformação',
];

export default function MissionSection({ settings }) {
  const s = settings || {};
  const pillars = [
    { icon: Target, title: 'Missão', text: s.mission_text, color: '#4A152B' },
    { icon: Eye, title: 'Visão', text: s.vision_text, color: '#A3196E' },
    { icon: Heart, title: 'Propósito Social', text: s.purpose_text, color: '#7A1E4A' },
  ];

  return (
    <section id="missao" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8E4ED]/40 to-transparent" />
      <Butterfly className="absolute top-16 left-[8%] w-28 h-28 butterfly-float" opacity={0.06} />
      <Butterfly className="absolute bottom-16 right-[6%] w-20 h-20 butterfly-float" opacity={0.08} />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-magenta text-sm font-semibold tracking-[0.3em] uppercase mb-3">Quem Somos</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-purple font-heading">
            Missão, Visão <span className="font-display italic font-medium text-brand-magenta">&</span> Propósito
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="group glass-card rounded-3xl p-8 hover:shadow-2xl hover:shadow-[#A3196E]/10 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110" style={{ backgroundColor: `${p.color}15` }}>
                  <Icon size={30} style={{ color: p.color }} />
                </div>
                <h3 className="text-2xl font-bold text-brand-purple mb-4 font-heading">{p.title}</h3>
                <p className="text-brand-purple/70 leading-relaxed">{p.text}</p>
                <div className="mt-6 h-1 w-12 rounded-full bg-brand-gradient transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-3xl font-extrabold text-brand-purple font-heading mb-2">
            Nossos <span className="font-display italic font-medium text-brand-magenta">Valores</span>
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {values.map((v, i) => (
            <div key={i} className="glass-card rounded-2xl px-4 py-3 text-center border border-[#A3196E]/10">
              <Butterfly className="w-6 h-6 mx-auto mb-1" opacity={0.6} />
              <p className="text-brand-purple font-semibold text-sm">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-full px-8 py-4 border border-[#A3196E]/10">
            <Butterfly className="w-7 h-7" opacity={0.9} />
            <p className="text-brand-purple font-display italic text-xl">
              "A mesma transformação que oferecemos a cada mulher que cruza nosso caminho."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}