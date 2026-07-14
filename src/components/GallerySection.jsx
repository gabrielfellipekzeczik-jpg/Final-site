import React, { useState, useMemo } from 'react';
import { Play, X, ChevronDown } from 'lucide-react';
import Butterfly from './Butterfly';

export default function GallerySection({ items = [] }) {
  const [lightbox, setLightbox] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [showMore, setShowMore] = useState(false);

  // Primeiro, filtrar por tipo (Tudo/Fotos/Vídeos)
  const filteredByType = useMemo(() => {
    if (activeTab === 'videos') {
      return items.filter((i) => i.is_video);
    } else if (activeTab === 'photos') {
      return items.filter((i) => !i.is_video);
    }
    return items;
  }, [items, activeTab]);

  // Depois, aplicar o limite de 6 itens (ou todos se "Ver mais" foi clicado)
  const displayItems = showMore ? filteredByType : filteredByType.slice(0, 6);

  // Extrair categorias únicas dos itens filtrados
  const categories = useMemo(() => {
    return [...new Set(displayItems.map((i) => i.category).filter(Boolean))];
  }, [displayItems]);

  if (filteredByType.length === 0) {
    return null;
  }

  // Verificar se há mais itens para mostrar
  const hasMoreItems = filteredByType.length > 6;

  return (
    <section id="galeria" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <Butterfly className="absolute top-20 right-[4%] w-24 h-24 butterfly-float" opacity={0.06} />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-brand-magenta text-sm font-semibold tracking-[0.3em] uppercase mb-3">Galeria</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-purple font-heading">
            Fotos <span className="font-display italic font-medium text-brand-magenta">&</span> Vídeos
          </h2>
          <p className="mt-4 text-brand-purple/60 max-w-2xl mx-auto text-lg">
            Momentos de fé, acolhimento e transformação que marcam a nossa jornada.
          </p>
        </div>

        {/* Abas de filtro */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {[
            { key: 'all', label: 'Tudo' },
            { key: 'photos', label: 'Fotos' },
            { key: 'videos', label: 'Vídeos' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setShowMore(false); // Resetar "Ver mais" ao trocar de aba
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-brand-gradient text-white shadow-lg shadow-[#A3196E]/20'
                  : 'bg-white/60 text-brand-purple hover:bg-white/90 border border-[#A3196E]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filtro por categoria */}
        {categories.length > 0 && (
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#A3196E]/10 text-brand-purple hover:bg-[#A3196E]/20 transition-all"
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {displayItems.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">Nenhum item nesta categoria.</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {displayItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightbox(item)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#A3196E]/15 transition-all duration-500 ${
                    idx === 0 ? 'col-span-2 row-span-2 md:col-span-2' : ''
                  }`}
                  style={{
                    aspectRatio: idx === 0 ? '2 / 2' : '1 / 1',
                  }}
                >
                  {/* Container com posicionamento absoluto para garantir preenchimento */}
                  <div className="absolute inset-0 w-full h-full">
                    {item.is_video ? (
                      <video
                        src={item.image_url}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                  </div>

                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A152B]/80 via-transparent to-transparent opacity-80" />

                  {/* Ícone de play para vídeos */}
                  {item.is_video && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="text-brand-magenta ml-1" size={24} fill="currentColor" />
                      </div>
                    </div>
                  )}

                  {/* Informações do item */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    {item.category && (
                      <span className="inline-block text-xs font-semibold text-white/90 bg-[#A3196E]/80 rounded-full px-3 py-1 mb-2">
                        {item.category}
                      </span>
                    )}
                    <p className="text-white font-semibold text-sm sm:text-base line-clamp-2">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão "Ver mais" */}
            {hasMoreItems && !showMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setShowMore(true)}
                  className="flex items-center gap-2 bg-brand-gradient text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-[#A3196E]/30 transition-all duration-300"
                >
                  <span>Ver mais</span>
                  <ChevronDown size={20} />
                </button>
              </div>
            )}

            {/* Botão "Ver menos" */}
            {showMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setShowMore(false)}
                  className="flex items-center gap-2 bg-white/60 text-brand-purple px-8 py-3 rounded-full font-semibold border border-[#A3196E]/20 hover:bg-white/90 transition-all duration-300"
                >
                  <span>Ver menos</span>
                  <ChevronDown size={20} className="rotate-180" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-[#4A152B]/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-white/80 hover:text-white" onClick={() => setLightbox(null)}>
            <X size={32} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {lightbox.is_video ? (
              <video
                src={lightbox.image_url}
                controls
                className="w-full rounded-2xl shadow-2xl max-h-[70vh] object-contain"
              />
            ) : (
              <img
                src={lightbox.image_url}
                alt={lightbox.title}
                className="w-full rounded-2xl shadow-2xl max-h-[70vh] object-contain"
              />
            )}
            <div className="text-center mt-4">
              <p className="text-white/90 font-semibold text-lg">{lightbox.title}</p>
              {lightbox.category && <p className="text-white/60 text-sm">{lightbox.category}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
