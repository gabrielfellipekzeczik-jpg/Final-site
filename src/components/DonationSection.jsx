import React, { useState } from 'react';
import { Calendar, Users, Check, Star, Heart, Smartphone } from 'lucide-react';
import Butterfly from './Butterfly';
import PixModal from './PixModal';

const presetValues = [25, 50, 100, 200];

const monthlyBenefits = [
  'Apoio contínuo aos projetos da associação',
  'Newsletter exclusiva com bastidores',
  'Certificado de apoiador mensal',
  'Acesso prioritário aos eventos',
];

const singleBenefits = [
  'Apoio imediato aos projetos',
  'Relatório de impacto da sua doação',
  'Certificado de doação',
  'Transparência total na aplicação',
];

const volunteerBenefits = [
  'Participação ativa nos projetos',
  'Treinamento especializado',
  'Certificado de voluntariado',
  'Faça parte de uma rede de mulheres',
];

export default function DonationSection({ settings }) {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [modal, setModal] = useState(null); // { title, description, code } or null

  const pixKey = settings?.pix_key;
  const pixCodes = {
    30: settings?.pix_monthly_30,
    25: settings?.pix_25,
    50: settings?.pix_50,
    100: settings?.pix_100,
    200: settings?.pix_200,
    free: settings?.pix_free,
  };

  const openPix = (code, title, description) => {
    if (!code) {
      alert('O código PIX para esta opção ainda não foi configurado. Entre em contato com a administração.');
      return;
    }
    setModal({ title, description, code });
  };

  const handleMonthly = () => {
    openPix(pixCodes[30], 'Apoiador Mensal — R$ 30/mês', 'Sua contribuição recorrente mantém nossos projetos ativos.');
  };

  const handleSingle = () => {
    openPix(pixCodes[selectedAmount], `Doação Única — R$ ${selectedAmount}`, 'Apoio imediato aos projetos da associação.');
  };

  const handleFree = () => {
    openPix(pixCodes.free, 'Doação de Valor Livre', 'Escolha o valor que desejar no app do seu banco.');
  };

  const scrollToContact = () => {
    const el = document.querySelector('#contato');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="doacao" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8E4ED]/40 to-transparent" />
      <Butterfly className="absolute top-12 right-[5%] w-28 h-28 butterfly-float" opacity={0.07} />
      <Butterfly className="absolute bottom-12 left-[4%] w-24 h-24 butterfly-float" opacity={0.06} />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-magenta text-sm font-semibold tracking-[0.3em] uppercase mb-3">Faça parte</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-purple font-heading">
            Faça parte dessa <span className="font-display italic font-medium text-brand-magenta">transformação</span>
          </h2>
          <p className="mt-4 text-brand-purple/60 max-w-2xl mx-auto text-lg">
            Sua contribuição é fundamental para mantermos nossos projetos e ampliarmos nosso impacto na vida de milhares
            de mulheres.
          </p>
          <div className="inline-flex items-center gap-2 mt-5 bg-brand-purple/5 border border-[#A3196E]/15 rounded-full px-4 py-2">
            <Smartphone size={16} className="text-brand-magenta" />
            <span className="text-sm text-brand-purple/70">Pagamento via PIX — rápido e seguro</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {/* Apoiador Mensal */}
          <div className="relative glass-card rounded-3xl p-8 flex flex-col hover:shadow-2xl hover:shadow-[#A3196E]/10 transition-all duration-500">
            <Butterfly className="absolute top-4 right-4 w-16 h-16" opacity={0.08} />
            <div className="w-14 h-14 rounded-2xl bg-[#4A152B]/10 flex items-center justify-center mb-6">
              <Calendar className="text-brand-purple" size={26} />
            </div>
            <h3 className="text-2xl font-bold text-brand-purple mb-2 font-heading">Apoiador Mensal</h3>
            <p className="text-sm text-muted-foreground mb-4">Apoio contínuo e recorrente</p>
            <div className="mb-6">
              <span className="text-sm text-brand-purple/60">a partir de</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-brand-purple">R$ 30</span>
                <span className="text-sm text-brand-purple/60">/mês</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {monthlyBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-brand-purple/75">
                  <Check size={16} className="text-brand-magenta flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleMonthly}
              className="w-full bg-white border-2 border-brand-purple text-brand-purple font-bold py-3.5 rounded-full hover:bg-brand-purple hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Smartphone size={18} />
              Doar via PIX
            </button>
          </div>

          {/* Doação Única — Mais Popular */}
          <div className="relative rounded-3xl p-8 flex flex-col bg-brand-gradient text-white shadow-2xl shadow-[#A3196E]/30 md:-translate-y-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-brand-magenta text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap">
              <Star size={12} fill="currentColor" /> MAIS POPULAR
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 mt-2">
              <Heart className="text-white" size={26} fill="currentColor" />
            </div>
            <h3 className="text-2xl font-bold mb-2 font-heading">Doação Única</h3>
            <p className="text-sm text-white/70 mb-4">Escolha o valor da sua contribuição</p>
            <div className="mb-6">
              <span className="text-sm text-white/70">a partir de</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">R$ {selectedAmount}</span>
                <span className="text-sm text-white/70">ou mais</span>
              </div>
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-4 gap-2 mb-2">
                {presetValues.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedAmount(v)}
                    className={`py-2 rounded-lg text-sm font-bold transition-all ${
                      selectedAmount === v
                        ? 'bg-white text-brand-purple'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    R$ {v}
                  </button>
                ))}
              </div>
              <button
                onClick={handleFree}
                className="w-full py-2 rounded-lg text-sm font-bold bg-white/15 text-white hover:bg-white/25 transition-all"
              >
                Valor Livre
              </button>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {singleBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                  <Check size={16} className="text-white flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleSingle}
              className="w-full bg-white text-brand-purple font-bold py-3.5 rounded-full hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Smartphone size={18} />
              Doar R$ {selectedAmount} via PIX
            </button>
          </div>

          {/* Seja Voluntária */}
          <div className="relative glass-card rounded-3xl p-8 flex flex-col hover:shadow-2xl hover:shadow-[#A3196E]/10 transition-all duration-500">
            <div className="w-14 h-14 rounded-2xl bg-[#A3196E]/10 flex items-center justify-center mb-6">
              <Users className="text-brand-magenta" size={26} />
            </div>
            <h3 className="text-2xl font-bold text-brand-purple mb-2 font-heading">Seja Voluntária(o)</h3>
            <p className="text-sm text-muted-foreground mb-4">Doe seu tempo e conhecimento</p>
            <div className="mb-6">
              <span className="text-sm text-brand-purple/60">sua contribuição</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-brand-purple italic font-display">Tempo</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {volunteerBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-brand-purple/75">
                  <Check size={16} className="text-brand-magenta flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={scrollToContact}
              className="w-full bg-white border-2 border-brand-magenta text-brand-magenta font-bold py-3.5 rounded-full hover:bg-brand-magenta hover:text-white transition-all duration-300"
            >
              Quero Participar
            </button>
          </div>
        </div>
      </div>

      <PixModal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal?.title}
        description={modal?.description}
        pixCode={modal?.code}
        pixKey={pixKey}
      />
    </section>
  );
}