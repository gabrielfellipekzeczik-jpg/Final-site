import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, Save } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

const sections = [
  {
    title: 'Identidade Visual',
    fields: [{ name: 'logo_url', label: 'Logo do site', type: 'image' }],
  },
  {
    title: 'Redes Sociais',
    fields: [
      { name: 'instagram_url', label: 'Instagram', type: 'text', placeholder: 'https://instagram.com/...' },
      { name: 'facebook_url', label: 'Facebook', type: 'text', placeholder: 'https://facebook.com/...' },
      { name: 'youtube_url', label: 'YouTube', type: 'text', placeholder: 'https://youtube.com/...' },
      { name: 'tiktok_url', label: 'TikTok', type: 'text', placeholder: 'https://tiktok.com/...' },
    ],
  },
  {
    title: 'Contato',
    fields: [
      { name: 'contact_email', label: 'E-mail', type: 'text' },
      { name: 'contact_phone', label: 'Telefone', type: 'text' },
      { name: 'contact_address', label: 'Endereço', type: 'text' },
    ],
  },
  {
    title: 'Nossa História',
    fields: [
      { name: 'about_title', label: 'Título da seção', type: 'text' },
      { name: 'about_text_1', label: 'Parágrafo 1', type: 'textarea' },
      { name: 'about_text_2', label: 'Parágrafo 2', type: 'textarea' },
      { name: 'about_text_3', label: 'Parágrafo 3', type: 'textarea' },
      { name: 'about_image', label: 'Imagem', type: 'image' },
      { name: 'about_quote', label: 'Citação (destaque borboleta)', type: 'textarea' },
    ],
  },
  {
    title: 'Missão, Visão & Propósito',
    fields: [
      { name: 'mission_text', label: 'Missão', type: 'textarea' },
      { name: 'vision_text', label: 'Visão', type: 'textarea' },
      { name: 'purpose_text', label: 'Propósito Social', type: 'textarea' },
    ],
  },
  {
    title: 'Fundadora',
    fields: [
      { name: 'founder_name', label: 'Nome', type: 'text' },
      { name: 'founder_bio_1', label: 'Biografia — Parágrafo 1', type: 'textarea' },
      { name: 'founder_bio_2', label: 'Biografia — Parágrafo 2', type: 'textarea' },
      { name: 'founder_quote', label: 'Citação', type: 'textarea' },
      { name: 'founder_image', label: 'Foto', type: 'image' },
    ],
  },
  {
    title: 'Pagamento',
    fields: [
      { name: 'payment_link', label: 'Link de Pagamento (doações)', type: 'text', placeholder: 'https://... (deixe vazio para usar Stripe)' },
    ],
  },
  {
    title: 'PIX — Doações',
    fields: [
      { name: 'pix_key', label: 'Chave PIX (exibida no modal)', type: 'text', placeholder: 'contato@transformadas.org' },
      { name: 'pix_monthly_30', label: 'PIX Copia e Cola — Apoiador Mensal R$ 30/mês', type: 'textarea' },
      { name: 'pix_25', label: 'PIX Copia e Cola — R$ 25', type: 'textarea' },
      { name: 'pix_50', label: 'PIX Copia e Cola — R$ 50', type: 'textarea' },
      { name: 'pix_100', label: 'PIX Copia e Cola — R$ 100', type: 'textarea' },
      { name: 'pix_200', label: 'PIX Copia e Cola — R$ 200', type: 'textarea' },
      { name: 'pix_free', label: 'PIX Copia e Cola — Valor Livre', type: 'textarea' },
    ],
  },
  {
    title: 'Rodapé',
    fields: [
      { name: 'footer_text', label: 'Texto de descrição do rodapé', type: 'textarea' },
    ],
  },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.from('site_settings').select('*').limit(1);
        if (error) throw error;
        setSettings(data?.[0] || {});
      } catch (e) {
        setSettings({});
      }
      setLoading(false);
    })();
  }, []);

  const update = (field, value) => setSettings({ ...settings, [field]: value });

  const handleSave = async () => {
    setSaving(true);
    try {
      if (settings.id) {
        const { error } = await supabase.from('site_settings').update(settings).eq('id', settings.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('site_settings').insert(settings).select().single();
        if (error) throw error;
        setSettings(data);
      }
      alert('✓ Alterações publicadas! O site já está atualizado.');
    } catch (e) {
      alert('Erro ao salvar: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-brand-magenta" size={32} /></div>;
  }

  return (
    <div className="p-6 sm:p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-brand-purple mb-6">Configurações do Site</h1>
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-2xl shadow-sm p-6 border border-[#A3196E]/05">
            <h2 className="font-bold text-brand-purple mb-4">{section.title}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div key={field.name} className={field.type === 'textarea' || field.type === 'image' ? 'sm:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-brand-purple mb-1.5">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea value={settings[field.name] || ''} onChange={(e) => update(field.name, e.target.value)} placeholder={field.placeholder} rows={3} className="w-full border border-[#A3196E]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-magenta" />
                  ) : field.type === 'image' ? (
                    <ImageUpload value={settings[field.name]} onChange={(v) => update(field.name, v)} />
                  ) : (
                    <input type="text" value={settings[field.name] || ''} onChange={(e) => update(field.name, e.target.value)} placeholder={field.placeholder} className="w-full border border-[#A3196E]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-magenta" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSave} disabled={saving} className="mt-6 flex items-center gap-2 bg-brand-gradient text-white px-8 py-3 rounded-lg text-sm font-semibold disabled:opacity-60">
        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Salvar e Publicar
      </button>
    </div>
  );
}