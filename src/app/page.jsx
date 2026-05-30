"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function RoleSelection() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle ambient decoration */}
      <div className="absolute top-[-30%] left-[-15%] w-[50%] h-[50%] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-30%] right-[-15%] w-[40%] h-[40%] bg-orange-400/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-sm z-10">
        {/* Header - compact */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl action-gradient shadow-md mb-5">
            <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-1.5">
            Autick<span className="text-blue-600">Study</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">Selecione o seu perfil para continuar</p>
        </div>

        {/* Cards - thin & compact */}
        <div className="space-y-3">
          <button 
            onClick={() => router.push('/login/estudante')}
            className="w-full group flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200/80 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 text-left active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>face</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[15px] font-bold text-slate-800 leading-tight">Sou Estudante</h2>
              <p className="text-slate-400 text-[12px] font-medium mt-0.5 leading-snug">Painel de estudos, IA e biblioteca</p>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-lg group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all">chevron_right</span>
          </button>

          <button 
            onClick={() => router.push('/login/professor')}
            className="w-full group flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200/80 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 text-left active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[15px] font-bold text-slate-800 leading-tight">Sou Professor</h2>
              <p className="text-slate-400 text-[12px] font-medium mt-0.5 leading-snug">Turmas, conteúdos e desempenho</p>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-lg group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all">chevron_right</span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-slate-400 mt-8 font-medium">
          © 2026 AutickStudy. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}

