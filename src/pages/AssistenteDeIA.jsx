import React from 'react';

export default function AssistenteDeIA() {
  return (
    <div className="flex flex-col h-[calc(100vh-70px)] -mx-4 md:-mx-5 -mb-6">
      {/* Chat Container */}
      <section className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6 max-w-4xl mx-auto w-full hide-scrollbar">
        {/* AI Welcome Message */}
        <div className="flex gap-3 items-start animate-fade-in-up">
          <div className="w-10 h-10 rounded-xl kinetic-gradient flex items-center justify-center shrink-0 shadow-glow-blue">
            <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
          </div>
          <div className="flex flex-col gap-2.5 max-w-[85%]">
            <div className="bg-white p-4 rounded-xl rounded-tl-sm shadow-premium border border-outline-variant/10">
              <p className="text-on-surface leading-snug text-[13px]">
                Olá, Gabriel! Estou pronto para ajudar com seus estudos. Hoje temos os módulos de <strong className="text-primary-container">Sistemas Operacionais</strong> e <strong className="text-primary-container">Computação na Nuvem</strong> em pauta. Como posso te auxiliar agora?
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button className="px-3 py-1.5 rounded-lg bg-blue-50/50 border border-blue-100 text-[11px] font-semibold text-primary-container hover:bg-blue-100 transition-all hover:scale-[1.02] active:scale-[0.98]">✨ Resumir última aula</button>
              <button className="px-3 py-1.5 rounded-lg bg-blue-50/50 border border-blue-100 text-[11px] font-semibold text-primary-container hover:bg-blue-100 transition-all hover:scale-[1.02] active:scale-[0.98]">🧠 Gerar Quiz rápido</button>
              <button className="px-3 py-1.5 rounded-lg bg-orange-50/50 border border-orange-100 text-[11px] font-semibold text-orange-700 hover:bg-orange-100 transition-all hover:scale-[1.02] active:scale-[0.98]">📝 Criar Flashcards</button>
            </div>
          </div>
        </div>

        {/* User Message */}
        <div className="flex gap-3 items-start flex-row-reverse animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="w-10 h-10 rounded-xl bg-blue-100 overflow-hidden shrink-0 shadow-sm border border-outline-variant/10">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcl9nwC5RZHQLDHqPbW9uz0IoOF4Fo2cbsLBRdwDWJbvsJ2U1H6wJx0smGzq9YZh2GyCfHR54BubyO_MoFKxkBcKDjsd9g2H3wTxsCZwUr9w1lQ2QISlfS2UAxO7y6pt30dasCHM_N80-eKE0Z7oxG-Qhyc2swLoI-FHTEQDT6DfF8Ho5pTc524buHVEnB7s4VxvozjcuxW2Qc--OpQ9cGlCmlo9MqHxvCJyT83n31uhncNLFB1tH4XAacGYdLbfGcPTnA_GuT_gc" alt="User" />
          </div>
          <div className="flex flex-col gap-1.5 max-w-[85%] items-end">
            <div className="kinetic-gradient text-white p-4 rounded-xl rounded-tr-sm shadow-glow-blue">
              <p className="leading-snug text-[13px]">
                Pode me dar um resumo sobre Deadlocks e como evitá-los? Foca especialmente em Condições de Corrida.
              </p>
            </div>
            <span className="text-[9px] text-on-surface-variant font-medium flex items-center gap-1 opacity-80">
              <span className="material-symbols-outlined text-emerald-500 text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
              Lido • 14:32
            </span>
          </div>
        </div>

        {/* AI Response */}
        <div className="flex gap-3 items-start animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="w-10 h-10 rounded-xl kinetic-gradient flex items-center justify-center shrink-0 shadow-glow-blue">
            <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
          </div>
          <div className="flex flex-col gap-3 max-w-[85%]">
            <div className="bg-white p-5 rounded-xl rounded-tl-sm shadow-premium border border-outline-variant/10 space-y-4">
              <h3 className="font-bold text-gradient-primary flex items-center gap-1.5 text-[14px]">
                <span className="material-symbols-outlined text-orange-500 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                Deadlocks e Condições de Corrida
              </h3>
              <p className="text-on-surface leading-snug text-[13px]">
                Com certeza! A essência do problema são processos concorrentes disputando recursos e o conceito de <strong className="text-primary-container">Race Condition</strong>.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 bg-gradient-to-r from-orange-50/50 to-transparent p-3 rounded-lg border-l-[3px] border-orange-500">
                  <span className="material-symbols-outlined text-orange-600 shrink-0 text-[14px] mt-0.5">arrow_forward</span>
                  <p className="text-[12px] text-on-surface leading-snug">Um <strong>Deadlock</strong> requer as condições: exclusão mútua, posse-espera, não-preempção e espera circular.</p>
                </div>
                <div className="flex items-start gap-2 bg-gradient-to-r from-blue-50/50 to-transparent p-3 rounded-lg border-l-[3px] border-primary-container">
                  <span className="material-symbols-outlined text-primary-container shrink-0 text-[14px] mt-0.5">arrow_forward</span>
                  <p className="text-[12px] text-on-surface leading-snug">Para solucionar você pode quebrar uma das 4 condições usando mecanismos como o <strong>Algoritmo do Banqueiro</strong>.</p>
                </div>
                <div className="flex items-start gap-2 bg-gradient-to-r from-blue-50/50 to-transparent p-3 rounded-lg border-l-[3px] border-primary-container">
                  <span className="material-symbols-outlined text-primary-container shrink-0 text-[14px] mt-0.5">arrow_forward</span>
                  <p className="text-[12px] text-on-surface leading-snug">As corridas são solucionadas via travas (Locks, <strong>Mutexes</strong> e Semáforos) nas Regiões Críticas.</p>
                </div>
              </div>
            </div>

            {/* Progress Highlight - Compact */}
            <div className="bg-gradient-to-r from-blue-50/80 to-orange-50/80 p-4 rounded-xl border border-blue-100/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-blue-100" cx="20" cy="20" fill="transparent" r="16" stroke="currentColor" strokeWidth="3"></circle>
                    <circle className="text-orange-500" cx="20" cy="20" fill="transparent" r="16" stroke="currentColor" strokeDasharray="100.5" strokeDashoffset="25.1" strokeLinecap="round" strokeWidth="3" style={{ filter: 'drop-shadow(0 1px 2px rgba(255,109,0,0.2))' }}></circle>
                  </svg>
                  <span className="absolute text-[10px] font-black text-gradient-primary">75%</span>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-primary-container leading-tight">Progresso do Módulo</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Visão geral do trópico concluída.</p>
                </div>
              </div>
              <button className="w-full sm:w-auto bg-white text-orange-600 text-[11px] font-bold px-4 py-2 rounded-lg border border-orange-200 hover:bg-orange-50 hover:shadow-sm transition-all active:scale-[0.98]">
                Detalhes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Input Area - Compact */}
      <footer className="p-4 bg-white/80 backdrop-blur-xl border-t border-white/50 shadow-[0_-4px_24px_rgba(0,0,0,0.02)] z-10 relative">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              <button className="p-2.5 text-on-surface-variant hover:text-primary-container hover:bg-blue-50 rounded-lg transition-all active:scale-95">
                <span className="material-symbols-outlined text-[18px]">attach_file</span>
              </button>
              <button className="p-2.5 text-on-surface-variant hover:text-primary-container hover:bg-blue-50 rounded-lg transition-all active:scale-95">
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </button>
            </div>
            <div className="flex-1 relative">
              <textarea className="w-full bg-surface-container-low rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary-container/30 focus:bg-white text-on-surface placeholder:text-outline-variant/70 resize-none h-11 text-[13px] min-h-[44px] max-h-24 border border-transparent focus:border-primary-container/20 outline-none transition-all leading-relaxed" placeholder="Pergunte qualquer coisa sobre sua matéria..."></textarea>
            </div>
            <div className="flex gap-1.5">
              <button className="bg-orange-50 text-orange-600 p-2.5 rounded-xl hover:bg-orange-100 transition-all active:scale-95" title="Resumir">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>summarize</span>
              </button>
              <button className="action-gradient text-white p-3 rounded-xl shadow-glow-orange hover:scale-105 active:scale-[0.95] transition-all flex items-center justify-center" title="Enviar">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
            </div>
          </div>
          <p className="text-center text-[9px] text-on-surface-variant mt-3 opacity-60">
            O assistente pode cometer erros. Verifique informações com seu material didático.
          </p>
        </div>
      </footer>
    </div>
  );
}
