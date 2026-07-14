import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, GalleryHorizontalEnd, GraduationCap, Images, ExternalLink } from 'lucide-react';

const cards = [
  { title: 'Configurações', desc: 'Logo, redes sociais, contatos, textos, link de pagamento', path: '/admin/settings', icon: Settings },
  { title: 'Carrossel', desc: 'Anúncios e eventos do topo do site', path: '/admin/carousel', icon: GalleryHorizontalEnd },
  { title: 'Cursos', desc: 'Cursos profissionalizantes e links', path: '/admin/courses', icon: GraduationCap },
  { title: 'Galeria', desc: 'Fotos e vídeos da galeria', path: '/admin/gallery', icon: Images },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-brand-purple mb-2">Painel Administrativo</h1>
      <p className="text-muted-foreground mb-8">Gerencie todo o conteúdo do site. As alterações aparecem imediatamente no site público.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link key={card.path} to={card.path} className="bg-white rounded-2xl shadow-sm p-6 border border-[#A3196E]/05 hover:shadow-lg hover:border-[#A3196E]/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#A3196E]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <card.icon className="text-brand-magenta" size={24} />
            </div>
            <h2 className="font-bold text-brand-purple text-lg mb-1">{card.title}</h2>
            <p className="text-sm text-muted-foreground">{card.desc}</p>
          </Link>
        ))}
      </div>
      <Link to="/" className="mt-6 inline-flex items-center gap-2 text-brand-magenta text-sm font-medium hover:underline">
        <ExternalLink size={16} /> Ver site público
      </Link>
    </div>
  );
}