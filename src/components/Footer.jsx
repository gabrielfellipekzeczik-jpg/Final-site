import React from 'react';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, Heart, Lock, MessageCircle } from 'lucide-react';
import Butterfly from './Butterfly';

export default function Footer({ settings }) {
  // Lógica para gerar o link do WhatsApp
  const getWhatsAppUrl = () => {
    if (settings?.whatsapp_url) return settings.whatsapp_url;
    if (settings?.contact_phone) {
      const cleanPhone = settings.contact_phone.replace(/\D/g, ''); // Remove parênteses, traços e espaços
      return `https://wa.me/55${cleanPhone}`;
    }
    return null;
  };

  const socials = [
    { url: getWhatsAppUrl(), Icon: MessageCircle },
    { url: settings?.instagram_url, Icon: Instagram },
    { url: settings?.facebook_url, Icon: Facebook },
    { url: settings?.youtube_url, Icon: Youtube },
  ].filter((s) => s.url);

  return (
    <footer id="contato" className="relative bg-brand-purple text-white overflow-hidden">
      <Butterfly className="absolute top-10 right-[6%] w-32 h-32 butterfly-float" opacity={0.08} />
      <Butterfly className="absolute bottom-10 left-[4%] w-20 h-20 butterfly-float" opacity={0.06} />

      {/* Removemos o ID 'ingressos' antigo daqui para evitar conflitos de âncoras na navegação */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="mb-5">
              {settings?.logo_url ? (
                <img src={settings.logo_url} alt="Transformadas para Transformar" className="h-14 w-auto bg-white rounded-lg p-1.5" />
              ) : (
                <div className="flex items-center gap-3">
                  <Butterfly className="w-10 h-10" opacity={1} />
                  <div>
                    <p className="text-lg font-bold">Transformadas</p>
                    <p className="text-sm italic font-display text-[#F0DDE5]">para Transformar</p>
                  </div>
                </div>
              )}
            </div>
            <p className="text-white/70 leading-relaxed max-w-md">
              {settings?.footer_text || 'Associação de mulheres que crescem, estudam, trabalham e nunca perdem a identidade. Da sala de casa ao Paraná — uma jornada de fé e transformação.'}
            </p>
            {socials.length > 0 && (
              <div className="flex gap-3 mt-6">
                {socials.map(({ url, Icon }, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#A3196E] flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="font-bold text-[#F0DDE5] mb-4 text-sm tracking-wider uppercase">Contato</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              {settings?.contact_email && (
                <li className="flex items-start gap-2">
                  <Mail size={16} className="mt-0.5 flex-shrink-0 text-[#F0DDE5]" />
                  <a href={`mailto:${settings.contact_email}`} className="hover:text-white transition-colors">{settings.contact_email}</a>
                </li>
              )}
              {settings?.contact_phone && (
                <li className="flex items-start gap-2">
                  <Phone size={16} className="mt-0.5 flex-shrink-0 text-[#F0DDE5]" />
                  <a href={`tel:${settings.contact_phone}`} className="hover:text-white transition-colors">{settings.contact_phone}</a>
                </li>
              )}
              {settings?.contact_address && (
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[#F0DDE5]" />
                  <span>{settings.contact_address}</span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#F0DDE5] mb-4 text-sm tracking-wider uppercase">Navegação</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              {[
                { label: 'Início', href: '#inicio' },
                { label: 'Nossa História', href: '#historia' },
                { label: 'Missão & Valores', href: '#missao' },
                { label: 'Galeria', href: '#galeria' },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => { const el = document.querySelector(link.href); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a href="/admin" className="flex items-center gap-1.5 hover:text-white transition-colors text-white/40 text-xs pt-2">
                  <Lock size={12} /> Admin
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Transformadas para Transformar. Todos os direitos reservados.
          </p>
          <p className="text-white/50 text-sm flex items-center gap-1.5">
            Feito com <Heart size={14} className="text-[#A3196E]" fill="currentColor" /> e fé.
          </p>
        </div>
      </div>
    </footer>
  );
}