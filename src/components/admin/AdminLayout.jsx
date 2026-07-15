import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Settings, GalleryHorizontalEnd, GraduationCap, Images, MessageSquareQuote, LogOut, ExternalLink, CheckCircle, X } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Configurações', path: '/admin/settings', icon: Settings },
  { label: 'Carrossel', path: '/admin/carousel', icon: GalleryHorizontalEnd },
  { label: 'Cursos', path: '/admin/courses', icon: GraduationCap },
  { label: 'Galeria', path: '/admin/gallery', icon: Images },
  { label: 'Depoimentos', path: '/admin/testimonials', icon: MessageSquareQuote },
];

export default function AdminLayout() {
  const [showPublishModal, setShowPublishModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('tpt_admin_session');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-[#FFF5F8] flex">
      <aside className="w-60 bg-brand-purple text-white flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="p-5 border-b border-white/10">
          <p className="font-bold text-base">Painel Admin</p>
          <p className="text-xs text-white/50">Transformadas</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
          >
            <ExternalLink size={18} />
            Ver Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium text-left"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-60 overflow-auto min-h-screen">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#A3196E]/10 px-6 py-3 flex items-center justify-end gap-3">
          <button
            onClick={() => setShowPublishModal(true)}
            className="flex items-center gap-2 bg-brand-gradient text-white px-5 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-[#A3196E]/20 transition-all"
          >
            <CheckCircle size={16} /> Publicar
          </button>
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-brand-purple px-5 py-2 rounded-lg text-sm font-semibold border border-[#A3196E]/20 hover:bg-[#FFF5F8] transition-all"
          >
            <ExternalLink size={16} /> Ver Site
          </a>
        </header>

        <Outlet />
      </main>

      {showPublishModal && (
        <div
          className="fixed inset-0 z-[100] bg-[#4A152B]/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPublishModal(false)}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowPublishModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-brand-purple"
            >
              <X size={22} />
            </button>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-purple text-center mb-2">Alterações Publicadas!</h3>
            <p className="text-muted-foreground text-center text-sm leading-relaxed mb-6">
              Todas as suas alterações foram publicadas no site. O site público já está atualizado em tempo real com as mudanças salvas no painel.
            </p>
            <div className="flex gap-3">
              <a
                href="/"
                target="_blank"
                className="flex-1 flex items-center justify-center gap-2 bg-brand-gradient text-white py-2.5 rounded-lg text-sm font-semibold"
              >
                <ExternalLink size={16} /> Ver Site
              </a>
              <button
                onClick={() => setShowPublishModal(false)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-brand-purple border border-[#A3196E]/20 hover:bg-[#FFF5F8]"
              >
                Continuar Editando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}