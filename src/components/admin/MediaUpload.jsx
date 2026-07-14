import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Upload, Loader2, X, Play } from 'lucide-react';

const BUCKET_NAME = 'site-images';

export default function MediaUpload({ value, onChange, label }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls = [];

      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, file, { cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
        uploadedUrls.push({
          url: data.publicUrl,
          isVideo: file.type.startsWith('video/'),
        });
      }

      const currentItems = Array.isArray(value) ? value : [];
      onChange([...currentItems, ...uploadedUrls]);
    } catch (err) {
      alert('Erro ao enviar mídia: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index) => {
    const updated = Array.isArray(value) ? value.filter((_, i) => i !== index) : [];
    onChange(updated);
  };

  const items = Array.isArray(value) ? value : [];

  return (
    <div>
      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {items.map((item, idx) => (
            <div key={idx} className="relative group">
              {item.isVideo ? (
                <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-all">
                    <Play size={24} className="text-white" fill="white" />
                  </div>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt="preview"
                  className="w-full aspect-square object-cover rounded-lg border border-[#A3196E]/15"
                />
              )}
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="flex items-center gap-2 cursor-pointer bg-white border-2 border-[#A3196E]/20 rounded-lg px-4 py-2 text-sm font-medium text-brand-purple hover:bg-[#FFF5F8] w-fit">
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
        {uploading ? 'Enviando...' : 'Enviar imagens/vídeos'}
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={handleFile}
          disabled={uploading}
        />
      </label>
    </div>
  );
}
