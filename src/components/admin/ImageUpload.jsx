import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Upload, Loader2, X } from 'lucide-react';

const BUCKET_NAME = 'site-images';

export default function ImageUpload({ value, onChange, label }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, { cacheControl: '3600', upsert: false });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
      onChange(data.publicUrl);
    } catch (err) {
      alert('Erro ao enviar imagem: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {value && (
        <div className="relative mb-2 inline-block">
          <img src={value} alt="preview" className="w-32 h-32 object-cover rounded-lg border border-[#A3196E]/15" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X size={14} />
          </button>
        </div>
      )}
      <label className="flex items-center gap-2 cursor-pointer bg-white border-2 border-[#A3196E]/20 rounded-lg px-4 py-2 text-sm font-medium text-brand-purple hover:bg-[#FFF5F8] w-fit">
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
        {uploading ? 'Enviando...' : 'Enviar imagem'}
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ou cole uma URL de imagem"
        className="mt-2 w-full border border-[#A3196E]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-magenta"
      />
    </div>
  );
}
