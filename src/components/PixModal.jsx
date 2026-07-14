import React, { useState } from 'react';
import { X, Copy, Check, Smartphone, Wallet } from 'lucide-react';

export default function PixModal({ open, onClose, title, description, pixCode, pixKey }) {
  const [copied, setCopied] = useState(false);
  const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

  if (!open) return null;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = pixCode;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const openBankApp = async () => {
    // Copia o código primeiro, sempre — é o que realmente funciona em todo banco.
    try {
      await navigator.clipboard.writeText(pixCode);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = pixCode;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    if (isAndroid) {
      // No Android, alguns bancos registram um "intent" pra Pix — vale tentar,
      // e se não tiver nenhum app registrado o Android normalmente ignora
      // silenciosamente (sem travar a página, diferente do iPhone).
      const encoded = encodeURIComponent(pixCode);
      window.location.href = `intent://#Intent;scheme=pix;action=android.intent.action.VIEW;S.br_code=${encoded};end`;
    }
    // No iPhone e no computador não existe um "endereço" universal de Pix
    // que o navegador saiba abrir — cada banco tem o seu próprio app sem
    // um link padrão. Por isso, aqui só copiamos o código e orientamos a
    // pessoa a colar no app do banco dela.

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-purple/40 hover:text-brand-purple transition-colors"
        >
          <X size={22} />
        </button>

        <div className="text-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-brand-gradient mx-auto flex items-center justify-center mb-3">
            <Wallet className="text-white" size={26} />
          </div>
          <h3 className="text-xl font-bold text-brand-purple font-heading">{title}</h3>
          {description && <p className="text-sm text-brand-purple/60 mt-1">{description}</p>}
        </div>

        {pixKey && (
          <div className="mb-4 text-center">
            <p className="text-xs text-brand-purple/50 uppercase tracking-wider mb-1">Chave PIX</p>
            <p className="text-sm font-medium text-brand-purple">{pixKey}</p>
          </div>
        )}

        <div className="mb-5">
          <p className="text-xs text-brand-purple/50 uppercase tracking-wider mb-2">Código Copia e Cola</p>
          <div className="bg-brand-purple/5 border border-[#A3196E]/15 rounded-xl p-3 max-h-28 overflow-y-auto">
            <p className="text-xs text-brand-purple/70 break-all font-mono leading-relaxed">{pixCode}</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={openBankApp}
            className="w-full bg-brand-gradient text-white font-bold py-3.5 rounded-full hover:shadow-lg hover:shadow-[#A3196E]/30 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Smartphone size={18} />
            {isAndroid ? 'Abrir app do banco' : 'Copiar código e ir pro banco'}
          </button>
          <button
            onClick={copyCode}
            className={`w-full font-bold py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
              copied
                ? 'border-green-500 text-green-600 bg-green-50'
                : 'border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white'
            }`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Código copiado!' : 'Copiar código'}
          </button>
        </div>

        <p className="text-xs text-brand-purple/40 text-center mt-4 leading-relaxed">
          {isAndroid
            ? 'Toque em "Abrir app do banco" para tentar abrir seu aplicativo automaticamente, ou copie o código e cole no app do seu banco.'
            : 'O código já é copiado automaticamente — abra o app do seu banco, escolha "Pix Copia e Cola" e cole o código.'}
        </p>
      </div>
    </div>
  );
}