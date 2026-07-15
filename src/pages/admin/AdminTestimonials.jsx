import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Plus, Pencil, Trash2, X, Loader2, Save, User } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('testimonials').select('*').order('order', { ascending: true }).limit(100);
      if (error) throw error;
      setItems(data || []);
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
    setForm({ order: items.length, photo_url: '' });
    setEditing('new');
  };

  const startEdit = (item) => {
    setForm({ ...item });
    setEditing(item.id);
  };

  const cancel = () => {
    setEditing(null);
    setForm({});
  };

  const handleSave = async () => {
    if (!form.name || !form.quote) {
      alert('Preencha ao menos o nome e o depoimento.');
      return;
    }
    setSaving(true);
    try {
      const saveData = {
        name: form.name,
        role: form.role || '',
        quote: form.quote,
        photo_url: form.photo_url || '',
        order: form.order ?? 0,
      };

      if (editing === 'new') {
        const { error } = await supabase.from('testimonials').insert(saveData);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('testimonials').update(saveData).eq('id', editing);
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
    if (!confirm('Excluir este depoimento?')) return;
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      await load();
    } catch (e) {
      alert('Erro ao excluir: ' + e.message);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-purple">Depoimentos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie os depoimentos exibidos no site, logo abaixo da seção de doação/parceria.
          </p>
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
            <h2 className="font-bold text-brand-purple">{editing === 'new' ? 'Novo depoimento' : 'Editar depoimento'}</h2>
            <button onClick={cancel}>
              <X size={20} className="text-muted-foreground hover:text-brand-purple" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-purple mb-1.5">Nome do depoente</label>
              <input
                type="text"
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Maria da Silva"
                className="w-full border border-[#A3196E]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-magenta"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-purple mb-1.5">Cargo / Instituição</label>
              <input
                type="text"
                value={form.role || ''}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Ex: Voluntária, Parceira, Aluna do curso..."
                className="w-full border border-[#A3196E]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-magenta"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-brand-purple mb-1.5">Depoimento</label>
              <textarea
                value={form.quote || ''}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                placeholder="Texto do depoimento..."
                rows={4}
                className="w-full border border-[#A3196E]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-magenta"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-brand-purple mb-1.5">Foto (opcional, formato circular)</label>
              <ImageUpload value={form.photo_url} onChange={(v) => setForm({ ...form, photo_url: v })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-purple mb-1.5">Ordem de exibição</label>
              <input
                type="number"
                value={form.order ?? 0}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
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
        <div className="text-center py-12 text-muted-foreground">Nenhum depoimento cadastrado. Clique em "Adicionar".</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 border border-[#A3196E]/05">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-[#FFF5F8] flex items-center justify-center flex-shrink-0 border border-[#A3196E]/10">
                {item.photo_url ? (
                  <img src={item.photo_url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={22} className="text-brand-magenta/50" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-brand-purple truncate">{item.name || 'Sem nome'}</p>
                <p className="text-sm text-muted-foreground truncate">{item.role}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{item.quote}</p>
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
