import AdminCrudPage from '@/components/admin/AdminCrudPage';

export default function AdminCarousel() {
  return (
    <AdminCrudPage
      tableName="carousel_slides"
      title="Carrossel do Início"
      description="Imagens exibidas no topo do site. Cada uma pode levar a um link ao ser clicada."
      itemLabel="slide"
      fields={[
        { name: 'image_url', label: 'Imagem', type: 'image' },
        { name: 'cta_link', label: 'Link (opcional — pra onde vai ao clicar na imagem)', type: 'text', placeholder: 'https://... ou #secao' },
        { name: 'order', label: 'Ordem de exibição', type: 'number' },
        { name: 'active', label: 'Ativo (exibir no site)', type: 'boolean' },
      ]}
    />
  );
}
