import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Plus, Pencil, Trash2, X, Loader2, Save } from 'lucide-react';
import ImageUpload from './ImageUpload';

function Field({ field, value, onChange }) {
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
    case 'image':
      // Sempre assume multiple para a galeria, ou respeita a propriedade caso ela exista no field
      const isMultiple = field.multiple !== undefined ? field.multiple : true;
      return <ImageUpload value={value} onChange={onChange} multiple={isMultiple} />;
    case 'select':
      // Transforma o Select em um Combobox (datalist)
      // Isso permite selecionar categorias existentes ou digitar livremente uma nova
      const listId = `list-${field.name}`;
      return (
        <div>
          <input 
            list={listId} 
            value={value || ''} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder="Selecione ou digite uma nova categoria..." 
            className={cls} 
          />
          <datalist id={listId}>
            {field.options && field.options.map((opt) => <option key={opt} value={opt} />)}
          </datalist>
        </div>
      );
    default:
      return <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} className={cls} />;
  }
}

export default function AdminCrudPage({ tableName, title, description, fields, itemLabel = 'item' }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from(tableName).select('*').order('order', { ascending: true }).limit(100);
      if (error) throw error;
      setItems(data || []);
    } catch (e) {
      console.error(e);
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [tableName]);

  const startAdd = () => { setForm({ order: items.length, active: true }); setEditing('new'); };
  const startEdit = (item) => { setForm({ ...item }); setEditing(item.id); };
  const cancel = () => { setEditing(null); setForm({}); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const imageField = fields.find((f) => f.type === 'image');
      const mediaValue = imageField ? form[imageField.name] : null;

      // Salvamento em Lote Inteligente: se estamos adicionando itens novos e recebemos uma lista de imagens
      if (editing === 'new' && Array.isArray(mediaValue) && mediaValue.length > 0) {
        // Gera um registro para cada imagem selecionada, mantendo o mesmo título, categoria e dados preenchidos
        const rowsToInsert = mediaValue.map((url, idx) => {
          const newRow = { ...form };
          newRow[imageField.name] = url;
          // Ajusta a ordem para que fiquem sequenciais
          if (typeof newRow.order === 'number') {
            newRow.order = newRow.order + idx;
          }
          return newRow;
        });

        const { error } = await supabase.from(tableName).insert(rowsToInsert);
        if (error) throw error;
      } else {
        // Fluxo padrão para atualizações ou campos de mídia única
        const formToSave = { ...form };
        
        // Se for edição e o valor for um array, salva apenas o primeiro item para não corromper o banco
        if (Array.isArray(mediaValue)) {
          formToSave[imageField.name] = mediaValue[0] || '';
        }

        if (editing === 'new') {
          const { error } = await supabase.from(tableName).insert(formToSave);
          if (error) throw error;
        } else {
          const { error } = await supabase.from(tableName).update(formToSave).eq('id', editing);
          if (error) throw error;
        }
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
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (error) throw error;
      await load();
    } catch (e) {
      alert('Erro ao excluir: ' + e.message);
    }
  };

  const imageField = fields.find((f) => f.type === 'image');
  const titleField = fields.find((f) => f.type !== 'boolean' && f.type !== 'image') || fields[0];

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-purple">{title}</h1>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
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
            <h2 className="font-bold text-brand-purple">{editing === 'new' ? `Novo ${itemLabel}` : `Editar ${itemLabel}`}</h2>
            <button onClick={cancel}><X size={20} className="text-muted-foreground hover:text-brand-purple" /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className={field.type === 'textarea' || field.type === 'image' ? 'sm:col-span-2' : ''}>
                {field.type !== 'boolean' && (
                  <label className="block text-sm font-medium text-brand-purple mb-1.5">{field.label}</label>
                )}
                <Field field={field} value={form[field.name]} onChange={(v) => setForm({ ...form, [field.name]: v })} />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-brand-gradient text-white px-6 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60">
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Salvar e Publicar
            </button>
            <button onClick={cancel} className="px-6 py-2.5 rounded-lg text-sm font-semibold text-brand-purple border border-[#A3196E]/20 hover:bg-[#FFF5F8]">Cancelar</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-brand-magenta" size={32} /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">Nenhum item cadastrado. Clique em "Adicionar".</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const mediaValue = imageField ? item[imageField.name] : null;
            const firstMedia = Array.isArray(mediaValue) ? mediaValue[0] : mediaValue;
            const isVideo = typeof firstMedia === 'string' && firstMedia.match(/\.(mp4|webm|ogg|mov)$/i);

            return (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 border border-[#A3196E]/05">
                {firstMedia ? (
                  isVideo ? (
                    <video src={firstMedia} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" muted />
                  ) : (
                    <img src={firstMedia} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                  )
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-[#FFF5F8] flex items-center justify-center flex-shrink-0 text-brand-magenta font-bold">
                    {(item[titleField.name] || '?').charAt(0).toUpperCase()}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-brand-purple truncate">{item[titleField.name] || 'Sem título'}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {fields.filter((f) => f !== titleField && f !== imageField && f.type !== 'boolean').slice(0, 2).map((f) => {
                      const val = item[f.name];
                      return Array.isArray(val) ? `${val.length} mídias` : val;
                    }).filter(Boolean).join(' • ')}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => startEdit(item)} className="p-2 rounded-lg hover:bg-[#FFF5F8] text-brand-purple"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={16} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}