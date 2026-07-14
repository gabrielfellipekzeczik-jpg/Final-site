import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import Butterfly from '@/components/Butterfly';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (username === 'Transformadas' && password === '123456789') {
        localStorage.setItem('tpt_admin_session', 'true');
        navigate('/admin');
      } else {
        setError('Usuário ou senha incorretos.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-brand-gradient-soft flex items-center justify-center p-4 relative overflow-hidden">
      <Butterfly className="absolute top-10 right-[8%] w-28 h-28 butterfly-float" opacity={0.08} />
      <Butterfly className="absolute bottom-10 left-[6%] w-24 h-24 butterfly-float" opacity={0.06} />

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#4A152B]/15 p-8 sm:p-10 border border-white/60">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-gradient mb-4">
              <Lock className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-brand-purple font-heading">Painel Administrativo</h1>
            <p className="text-sm text-muted-foreground mt-1">Transformadas para Transformar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-purple mb-1.5">Usuário</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite seu usuário"
                  className="w-full border border-[#A3196E]/15 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-magenta bg-white/70"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-purple mb-1.5">Senha</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full border border-[#A3196E]/15 rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-brand-magenta bg-white/70"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-brand-purple">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-2.5 border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gradient text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-[#A3196E]/30 transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <a href="/" className="block text-center text-sm text-muted-foreground hover:text-brand-magenta mt-6">
            ← Voltar para o site
          </a>
        </div>
      </div>
    </div>
  );
}