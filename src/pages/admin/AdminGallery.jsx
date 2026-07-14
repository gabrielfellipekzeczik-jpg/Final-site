import AdminCrudPage from '@/components/admin/AdminCrudPage';

export default function AdminGallery() {
  return (
    <AdminCrudPage
      tableName="gallery_items"
      title="Galeria de Fotos"
      description="Fotos e vídeos exibidos na galeria do site."
      itemLabel="item"
      fields={[
        { name: 'title', label: 'Título', type: 'text' },
        { name: 'image_url', label: 'Imagem', type: 'image' },
        { name: 'category', label: 'Categoria', type: 'text', placeholder: 'Eventos, Servir, Comunidade...' },
        { name: 'is_video', label: 'É vídeo?', type: 'boolean' },
        { name: 'order', label: 'Ordem de exibição', type: 'number' },
      ]}
    />
  );
}