import React from 'react';
import Butterfly from './Butterfly';

export default function FounderSection({ settings }) {
  const s = settings || {};
  const nameParts = (s.founder_name || 'Benedita Lima').split(' ');
  const firstName = nameParts[0];
  const restName = nameParts.slice(1).join(' ');

  return (
    <section id="fundadora" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <Butterfly className="absolute top-10 right-[5%] w-24 h-24 butterfly-float" opacity={0.07} />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-brand-magenta text-sm font-semibold tracking-[0.3em] uppercase mb-3">Liderança</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-purple font-heading">
            <span className="font-display italic font-medium text-brand-magenta">{firstName}</span> {restName}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 order-2 md:order-1">
            {s.founder_bio_1 && <p className="text-brand-purple/80 leading-relaxed text-lg">{s.founder_bio_1}</p>}
            {s.founder_bio_2 && <p className="text-brand-purple/80 leading-relaxed text-lg">{s.founder_bio_2}</p>}
            {s.founder_quote && (
              <div className="glass-card rounded-2xl p-6 border-l-4 border-brand-magenta">
                <p className="text-brand-purple/80 leading-relaxed italic font-display text-lg">
                  "{s.founder_quote}"
                </p>
              </div>
            )}
          </div>

          <div className="relative order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-96 rounded-3xl overflow-hidden shadow-2xl shadow-[#4A152B]/20">
                <img
                  src={s.founder_image}
                  alt={s.founder_name || 'Benedita Lima'}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-[#A3196E]/10">
                <p className="font-bold text-brand-purple text-sm">{s.founder_name || 'Benedita Lima'}</p>
                <p className="text-xs text-brand-magenta italic">Fundadora</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}