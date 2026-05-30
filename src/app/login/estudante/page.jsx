"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '../../../components/ToastProvider';
import { useAuth } from '../../../context/AuthContext';

export default function LoginEstudante() {
  const router = useRouter();
  const { showToast } = useToast();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn(email, password);
      router.push('/estudante');
    } catch (error) {
      showToast('Erro ao fazer login. Verifique suas credenciais.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle ambient decoration */}
      <div className="absolute top-[-30%] right-[-15%] w-[50%] h-[50%] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-30%] left-[-15%] w-[40%] h-[40%] bg-orange-400/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-sm relative z-10">
        <button 
          onClick={() => router.push('/')}
          className="mb-6 flex items-center gap-1.5 text-slate-400 hover:text-slate-700 transition-colors text-[13px] font-semibold active:scale-95"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Voltar
        </button>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xl shadow-blue-900/5">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-4 shadow-sm border border-blue-100/50">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>face</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-800 mb-1 tracking-tight">Login Estudante</h1>
            <p className="text-slate-500 text-[12px] font-medium leading-snug">Acesse a sua área pessoal de estudos</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Email</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-blue-500 transition-colors">mail</span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 outline-none transition-all text-[14px] text-slate-800 placeholder-slate-400"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[12px] font-bold text-slate-700">Senha</label>
                <button 
                  type="button"
                  onClick={() => showToast('Funcionalidade de recuperação de senha em breve.', 'info')}
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Esqueceu?
                </button>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-blue-500 transition-colors">lock</span>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 outline-none transition-all text-[14px] text-slate-800 placeholder-slate-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full action-gradient hover:brightness-110 text-white text-[14px] font-bold py-2.5 rounded-lg shadow-glow-orange active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
              {!isLoading && <span className="material-symbols-outlined text-lg">login</span>}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-[12px] text-slate-500 font-medium">
              Não tem uma conta?{' '}
              <Link 
                href="/cadastro/estudante"
                className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


