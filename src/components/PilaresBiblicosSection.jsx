import React from 'react';
import Butterfly from './Butterfly';

const EMOJI_MAP = {
  'Transformação': '🦋',
  'Perseverança': '🌱',
  'Esperança': '🌸',
};

const COLOR_MAP = ['#4A152B', '#A3196E', '#7A1E4A'];

const DEFAULT_PILLARS = [
  {
    id: 1,
    emoji: '🦋',
    title: 'Transformação',
    verse_ref: 'Romanos 12:2',
    verse_text:
      '"E não vos conformeis com este século, mas transformai-vos pela renovação da vossa mente, para que experimenteis qual seja a boa, agradável e perfeita vontade de Deus."',
    body_label: 'Nossa essência',
    body_text:
      'Cremos que toda transformação verdadeira começa pela renovação da mente. Esse é o fundamento da nossa missão: restaurar vidas, fortalecer famílias e despertar o propósito de cada pessoa.',
    order: 0,
    active: true,
  },
  {
    id: 2,
    emoji: '🌱',
    title: 'Perseverança',
    verse_ref: '1 Coríntios 15:58',
    verse_text:
      '"Portanto, meus amados irmãos, sede firmes e constantes, sempre abundantes na obra do Senhor, sabendo que, no Senhor, o vosso trabalho não é vão."',
    body_label: 'Nosso compromisso',
    body_text:
      'Servimos com firmeza, constância e excelência, acreditando que cada vida alcançada representa um propósito cumprido diante de Deus.',
    order: 1,
    active: true,
  },
  {
    id: 3,
    emoji: '🌸',
    title: 'Esperança',
    verse_ref: 'Jeremias 29:11',
    verse_text:
      '"Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar um futuro e uma esperança."',
    body_label: 'Nossa promessa',
    body_text:
      'Caminhamos firmados na certeza de que Deus tem um futuro de esperança para cada mulher, cada família e cada pessoa que fizer parte desta missão.',
    order: 2,
    active: true,
  },
];

const DEFAULT_DECLARATION = {
  title: 'NOSSA DECLARAÇÃO DE PROPÓSITO',
  text: 'A Associação Mulheres Transformadas para Transformar é fundamentada na transformação da mente (Romanos 12:2), fortalecida pela perseverança na obra do Senhor (1 Coríntios 15:58) e firmada na promessa de Deus de um futuro e uma esperança (Jeremias 29:11).',
  tagline: 'Transformamos vidas. Restauramos histórias. Despertamos propósitos. 🦋',
};

export default function PilaresBiblicosSection({ pillars, settings }) {
  const items =
    pillars && pillars.length > 0
      ? pillars.filter((p) => p.active !== false)
      : DEFAULT_PILLARS;

  const s = settings || {};
  const declaration = {
    title: s.pillars_declaration_title || DEFAULT_DECLARATION.title,
    text: s.pillars_declaration_text || DEFAULT_DECLARATION.text,
    tagline: s.pillars_declaration_tagline || DEFAULT_DECLARATION.tagline,
  };

  return (
    <section id="pilares" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F0DDE5]/50 to-transparent pointer-events-none" />

      {/* Decorative butterflies */}
      <Butterfly className="absolute top-12 right-[5%] w-32 h-32 butterfly-float" opacity={0.06} />
      <Butterfly className="absolute bottom-20 left-[4%] w-24 h-24 butterfly-float" opacity={0.07} style={{ animationDelay: '2s' }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-brand-magenta text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Fundamentos
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-purple font-heading">
            Pilares{' '}
            <span className="font-display italic font-medium text-brand-magenta">
              Bíblicos
            </span>
          </h2>
          <p className="mt-4 text-brand-purple/60 max-w-xl mx-auto text-base leading-relaxed">
            Os alicerces da Palavra que sustentam cada passo desta missão.
          </p>
        </div>

        {/* Pillar cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {items.map((pillar, idx) => {
            const accentColor = COLOR_MAP[idx % COLOR_MAP.length];
            return (
              <div
                key={pillar.id ?? idx}
                className="group glass-card rounded-3xl p-8 flex flex-col hover:shadow-2xl hover:shadow-[#A3196E]/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Emoji icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-3xl transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${accentColor}18` }}
                >
                  {pillar.emoji || '✝️'}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-brand-purple mb-2 font-heading">
                  {pillar.title}
                </h3>

                {/* Verse reference */}
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-3"
                  style={{ color: accentColor }}
                >
                  {pillar.verse_ref}
                </p>

                {/* Verse text */}
                <blockquote className="font-display italic text-brand-purple/75 text-base leading-relaxed mb-5 border-l-2 pl-4" style={{ borderColor: `${accentColor}60` }}>
                  {pillar.verse_text}
                </blockquote>

                {/* Body */}
                {pillar.body_label && (
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-magenta mb-1">
                    {pillar.body_label}:
                  </p>
                )}
                <p className="text-brand-purple/70 text-sm leading-relaxed flex-1">
                  {pillar.body_text}
                </p>

                {/* Bottom accent bar */}
                <div
                  className="mt-6 h-1 w-12 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{ background: `linear-gradient(90deg, ${accentColor}, #A3196E)` }}
                />
              </div>
            );
          })}
        </div>

        {/* Declaration box */}
        <div className="glass-card rounded-3xl p-10 text-center border border-[#A3196E]/15 shadow-lg">
          <Butterfly className="w-8 h-8 mx-auto mb-4" opacity={0.85} />
          <h3 className="text-brand-magenta text-xs font-bold tracking-[0.35em] uppercase mb-5">
            {declaration.title}
          </h3>
          <p className="text-brand-purple/80 leading-relaxed max-w-3xl mx-auto text-base md:text-lg mb-6">
            {declaration.text}
          </p>
          <p className="font-display italic text-brand-purple text-xl md:text-2xl font-semibold">
            {declaration.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
