import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Upload, Loader2, X } from 'lucide-react';

const BUCKET_NAME = 'site-images';

export default function ImageUpload({ value, onChange, label, multiple = false }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    setUploading(true);
    try {
      const newUrls = [];
      
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, file, { cacheControl: '3600', upsert: false });
          
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
        newUrls.push(data.publicUrl);
      }

      if (multiple) {
        // Se for múltiplo, concatena com os valores que já existem
        const currentValues = Array.isArray(value) ? value : (value ? [value] : []);
        onChange([...currentValues, ...newUrls]);
      } else {
        // Se for único, substitui o valor
        onChange(newUrls[0]);
      }
    } catch (err) {
      alert('Erro ao enviar arquivo(s): ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (urlToRemove) => {
    if (multiple) {
      onChange(value.filter((url) => url !== urlToRemove));
    } else {
      onChange('');
    }
  };

  // Garante que o valor a ser renderizado seja sempre um array para facilitar o map
  const displayValues = Array.isArray(value) ? value : (value ? [value] : []);

  return (
    <div>
      {displayValues.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-3">
          {displayValues.map((url, index) => {
            const isVideo = url.match(/\.(mp4|webm|ogg|mov)$/i);
            return (
              <div key={index} className="relative inline-block">
                {isVideo ? (
                  <video src={url} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-[#A3196E]/15" />
                ) : (
                  <img src={url} alt="preview" className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-[#A3196E]/15" />
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(url)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
      
      <label className="flex items-center gap-2 cursor-pointer bg-white border-2 border-[#A3196E]/20 rounded-lg px-4 py-2 text-sm font-medium text-brand-purple hover:bg-[#FFF5F8] w-fit">
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
        {uploading ? 'Enviando...' : (multiple ? 'Adicionar mídias' : 'Enviar mídia')}
        <input 
          type="file" 
          accept="image/*,video/*" 
          multiple={multiple}
          className="hidden" 
          onChange={handleFile} 
          disabled={uploading} 
        />
      </label>
    </div>
  );
}