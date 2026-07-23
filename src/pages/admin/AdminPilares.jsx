import AdminCrudPage from '@/components/admin/AdminCrudPage';

export default function AdminPilares() {
  return (
    <AdminCrudPage
      tableName="biblical_pillars"
      title="Pilares Bíblicos"
      description="Os três pilares exibidos na seção de fundamentos bíblicos do site."
      itemLabel="pilar"
      fields={[
        { name: 'emoji', label: 'Emoji', type: 'text', placeholder: '🦋' },
        { name: 'title', label: 'Título do Pilar', type: 'text', placeholder: 'ex: Transformação' },
        { name: 'verse_ref', label: 'Referência Bíblica', type: 'text', placeholder: 'ex: Romanos 12:2' },
        { name: 'verse_text', label: 'Texto do Versículo', type: 'textarea' },
        { name: 'body_label', label: 'Rótulo do Corpo', type: 'text', placeholder: 'ex: Nossa essência' },
        { name: 'body_text', label: 'Texto do Corpo', type: 'textarea' },
        { name: 'order', label: 'Ordem de exibição', type: 'number' },
        { name: 'active', label: 'Visível no site', type: 'boolean' },
      ]}
    />
  );
}
