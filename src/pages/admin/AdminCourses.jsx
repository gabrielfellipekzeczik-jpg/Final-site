import AdminCrudPage from '@/components/admin/AdminCrudPage';

const ICON_OPTIONS = ['Scissors', 'ChefHat', 'Music', 'Heart', 'Brush', 'Dumbbell', 'BookOpen', 'Sparkles'];

export default function AdminCourses() {
  return (
    <AdminCrudPage
      tableName="courses"
      title="Cursos Profissionalizantes"
      description="Cursos exibidos na seção de capacitação do site."
      itemLabel="curso"
      fields={[
        { name: 'name', label: 'Nome do Curso', type: 'text' },
        { name: 'icon', label: 'Ícone', type: 'select', options: ICON_OPTIONS },
        { name: 'link', label: 'Link de inscrição (opcional)', type: 'text', placeholder: 'https://...' },
        { name: 'description', label: 'Descrição (opcional)', type: 'textarea' },
        { name: 'order', label: 'Ordem de exibição', type: 'number' },
      ]}
    />
  );
}