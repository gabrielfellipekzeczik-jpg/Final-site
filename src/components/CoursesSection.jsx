import React from 'react';
import { Scissors, ChefHat, Music, Heart, Brush, Dumbbell, BookOpen, Sparkles, ExternalLink } from 'lucide-react';
import Butterfly from './Butterfly';

const ICON_MAP = { Scissors, ChefHat, Music, Heart, Brush, Dumbbell, BookOpen, Sparkles };

export default function CoursesSection({ courses = [] }) {
  return (
    <section id="cursos" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8E4ED]/40 to-transparent" />
      <Butterfly className="absolute top-12 left-[5%] w-24 h-24 butterfly-float" opacity={0.07} />
      <Butterfly className="absolute bottom-12 right-[4%] w-20 h-20 butterfly-float" opacity={0.06} />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-brand-magenta text-sm font-semibold tracking-[0.3em] uppercase mb-3">Capacitação</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-purple font-heading">
            Cursos <span className="font-display italic font-medium text-brand-magenta">Profissionalizantes</span>
          </h2>
          <p className="mt-4 text-brand-purple/60 max-w-2xl mx-auto text-lg">
            Capacitamos mulheres com habilidades práticas para conquistar sua independência financeira e dignidade.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courses.map((course, i) => {
            const Icon = ICON_MAP[course.icon] || Sparkles;
            const content = (
              <>
                <div className="w-12 h-12 rounded-full bg-[#A3196E]/10 flex items-center justify-center">
                  <Icon size={22} className="text-brand-magenta" />
                </div>
                <p className="text-brand-purple font-semibold text-sm leading-tight">{course.name}</p>
                {course.description && <p className="text-xs text-brand-purple/60">{course.description}</p>}
                {course.link && <ExternalLink size={14} className="text-brand-magenta mt-1" />}
              </>
            );
            const cardClass = "glass-card rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:shadow-xl hover:shadow-[#A3196E]/10 transition-all duration-300 hover:-translate-y-1 border border-[#A3196E]/08";
            return course.link ? (
              <a key={i} href={course.link} target="_blank" rel="noopener noreferrer" className={cardClass}>
                {content}
              </a>
            ) : (
              <div key={i} className={cardClass}>
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center glass-card rounded-3xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-brand-purple mb-3 font-heading">Meta de Impacto</h3>
          <p className="text-brand-purple/70 text-lg leading-relaxed">
            Nosso objetivo é alcançar <strong className="text-brand-magenta">centenas de mulheres</strong> ao longo do ano através de encontros, conferências e ações de fortalecimento social.
          </p>
        </div>
      </div>
    </section>
  );
}