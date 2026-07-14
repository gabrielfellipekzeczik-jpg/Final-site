import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Plus, Pencil, Trash2, X, Loader2, Save } from 'lucide-react';
import MediaUpload from '@/components/admin/MediaUpload';

function Field({ field, value, onChange, options }) {
  const cls = 'w-full border border-[#A3196E]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-magenta';
  switch (field.type) {
    case 'textarea':
      return <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} rows={3} className={cls} />;
    case 'number':
      return <input type="number" value={value ?? 0} onChange={(e) => onChange(Number(e.target.value))} className={cls} />;
    case 'boolean':
      return (
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={value || false} onChange={(e) => onChange(e.target.checked)} className="w-5 h-5 rounded accent-[#A3196E]" />
          <span className="text-sm text-brand-purple">Sim</span>
        </label>
      );
    case 'media':
      return <MediaUpload value={value} onChange={onChange} />;
    case 'select':
      return (
        <select value={value || ''} onChange={(e) => onChange(e.target.value)} className={cls}>
          <option value="">Selecione ou digite uma categoria...</option>
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    default:
      return <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} className={cls} />;
  }
}

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});
  const [newCategory, setNewCategory] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('gallery_items').select('*').order('order', { ascending: true }).limit(100);
      if (error) throw error;
      setItems(data || []);

      // Extrair categorias únicas
      const uniqueCategories = [...new Set((data || []).map((item) => item.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (e) {
      console.error(e);
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const startAdd = () => {
    setForm({ order: items.length, active: true, media: [] });
    setEditing('new');
  };

  const startEdit = (item) => {
    setForm({
      ...item,
      media: item.media || (item.image_url ? [{ url: item.image_url, isVideo: item.is_video }] : []),
    });
    setEditing(item.id);
  };

  const cancel = () => {
    setEditing(null);
    setForm({});
    setNewCategory('');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Se houver mídia, usar a primeira como image_url e is_video
      const media = form.media || [];
      const saveData = {
        ...form,
        image_url: media.length > 0 ? media[0].url : form.image_url,
        is_video: media.length > 0 ? media[0].isVideo : form.is_video,
      };

      // Adicionar nova categoria se fornecida
      if (newCategory && !categories.includes(newCategory)) {
        setCategories([...categories, newCategory]);
        saveData.category = newCategory;
        setNewCategory('');
      }

      if (editing === 'new') {
        const { error } = await supabase.from('gallery_items').insert(saveData);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('gallery_items').update(saveData).eq('id', editing);
        if (error) throw error;
      }
      cancel();
      await load();
    } catch (e) {
      alert('Erro ao salvar: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Excluir este item?')) return;
    try {
      const { error } = await supabase.from('gallery_items').delete().eq('id', id);
      if (error) throw error;
      await load();
    } catch (e) {
      alert('Erro ao excluir: ' + e.message);
    }
  };

  const fields = [
    { name: 'title', label: 'Título', type: 'text' },
    { name: 'media', label: 'Imagens e Vídeos', type: 'media' },
    { name: 'category', label: 'Categoria', type: 'select' },
    { name: 'order', label: 'Ordem de exibição', type: 'number' },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-purple">Galeria de Fotos e Vídeos</h1>
          <p className="text-sm text-muted-foreground mt-1">Gerencie imagens e vídeos exibidos na galeria do site.</p>
        </div>
        {editing === null && (
          <button onClick={startAdd} className="flex items-center gap-2 bg-brand-gradient text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
            <Plus size={18} /> Adicionar
          </button>
        )}
      </div>

      {editing !== null && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-[#A3196E]/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-brand-purple">{editing === 'new' ? 'Novo item' : 'Editar item'}</h2>
            <button onClick={cancel}>
              <X size={20} className="text-muted-foreground hover:text-brand-purple" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className={field.type === 'textarea' || field.type === 'media' ? 'sm:col-span-2' : ''}>
                {field.type !== 'boolean' && (
                  <label className="block text-sm font-medium text-brand-purple mb-1.5">{field.label}</label>
                )}
                <Field
                  field={field}
                  value={form[field.name]}
                  onChange={(v) => setForm({ ...form, [field.name]: v })}
                  options={field.name === 'category' ? categories : []}
                />
              </div>
            ))}

            {/* Campo para adicionar nova categoria */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-brand-purple mb-1.5">Adicionar nova categoria (opcional)</label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Digite uma nova categoria..."
                className="w-full border border-[#A3196E]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-magenta"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-brand-gradient text-white px-6 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60">
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Salvar e Publicar
            </button>
            <button onClick={cancel} className="px-6 py-2.5 rounded-lg text-sm font-semibold text-brand-purple border border-[#A3196E]/20 hover:bg-[#FFF5F8]">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-brand-magenta" size={32} />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">Nenhum item cadastrado. Clique em "Adicionar".</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 border border-[#A3196E]/05">
              {item.image_url ? (
                <div className="relative w-14 h-14 flex-shrink-0">
                  <img src={item.image_url} alt="" className="w-full h-full rounded-lg object-cover" />
                  {item.is_video && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
                        <div className="w-0 h-0 border-l-3 border-l-brand-magenta border-t-2 border-t-transparent border-b-2 border-b-transparent ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-14 h-14 rounded-lg bg-[#FFF5F8] flex items-center justify-center flex-shrink-0 text-brand-magenta font-bold">
                  {(item.title || '?').charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-brand-purple truncate">{item.title || 'Sem título'}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {[item.category, item.is_video ? 'Vídeo' : 'Foto'].filter(Boolean).join(' • ')}
                </p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => startEdit(item)} className="p-2 rounded-lg hover:bg-[#FFF5F8] text-brand-purple">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
