import React from 'react';

export default function AnaliseDePerformance() {
  return (
    <div className="grid grid-cols-12 gap-5 stagger-children max-w-[1400px] mx-auto">
      {/* Mastery Circular Chart - Compact */}
      <div className="col-span-12 lg:col-span-4 bg-white rounded-xl p-4 md:p-6 flex flex-col items-center justify-center relative overflow-hidden card-hover shadow-premium">
        <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full animate-breathe"></div>
        <h3 className="w-full text-left text-gradient-primary font-headline text-base font-bold mb-4">Domínio Geral</h3>
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle className="text-surface-container-highest" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeWidth="8" />
            <circle className="text-orange-500" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeDasharray="377" strokeDashoffset="94" strokeLinecap="round" strokeWidth="8" style={{ filter: 'drop-shadow(0 2px 4px rgba(255,109,0,0.3))' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-gradient-primary">75%</span>
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-0.5">Mastery</span>
          </div>
        </div>
        <p className="mt-4 text-[13px] text-on-surface-variant text-center leading-sm">Você está <span className="font-bold text-orange-600">12% acima</span> da média.</p>
      </div>

      {/* Focus Resistance Line Chart - Compact */}
      <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-4 md:p-6 shadow-premium card-hover">
        <div className="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
          <h3 className="text-gradient-primary text-base font-bold">Resistência ao Foco</h3>
          <div className="flex gap-3">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-on-surface-variant"><span className="w-2.5 h-2.5 rounded-full action-gradient shadow-sm"></span> Foco</span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-on-surface-variant"><span className="w-2.5 h-2.5 rounded-full kinetic-gradient shadow-sm"></span> Produtividade</span>
          </div>
        </div>
        <div className="h-48 w-full relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200" preserveAspectRatio="none">
            {/* Subtle grid */}
            <line stroke="#e7e8e9" strokeWidth="1" strokeDasharray="4,4" x1="0" x2="800" y1="0" y2="0" />
            <line stroke="#e7e8e9" strokeWidth="1" strokeDasharray="4,4" x1="0" x2="800" y1="50" y2="50" />
            <line stroke="#e7e8e9" strokeWidth="1" strokeDasharray="4,4" x1="0" x2="800" y1="100" y2="100" />
            <line stroke="#e7e8e9" strokeWidth="1" strokeDasharray="4,4" x1="0" x2="800" y1="150" y2="150" />
            <line stroke="#e7e8e9" strokeWidth="1" x1="0" x2="800" y1="200" y2="200" />
            {/* Area fills */}
            <path d="M0,150 Q100,120 200,160 T400,100 T600,130 T800,80 L800,200 L0,200Z" fill="url(#blueGrad)" opacity="0.08" />
            <path d="M0,180 Q100,140 200,150 T400,90 T600,110 T800,60 L800,200 L0,200Z" fill="url(#orangeGrad)" opacity="0.08" />
            {/* Lines */}
            <path d="M0,150 Q100,120 200,160 T400,100 T600,130 T800,80" fill="none" stroke="#0d47a1" strokeLinecap="round" strokeWidth="3" />
            <path d="M0,180 Q100,140 200,150 T400,90 T600,110 T800,60" fill="none" stroke="#FF6D00" strokeLinecap="round" strokeWidth="3" strokeDasharray="8,5" />
            {/* Points with glow */}
            <circle cx="400" cy="100" fill="#0d47a1" r="5" style={{ filter: 'drop-shadow(0 2px 4px rgba(13,71,161,0.3))' }} />
            <circle cx="800" cy="60" fill="#FF6D00" r="5" style={{ filter: 'drop-shadow(0 2px 4px rgba(255,109,0,0.3))' }} />
            <defs>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d47a1" />
                <stop offset="100%" stopColor="#0d47a1" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6D00" />
                <stop offset="100%" stopColor="#FF6D00" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex justify-between mt-3 text-[9px] font-bold text-on-surface-variant tracking-widest uppercase">
            <span>Dia 01</span>
            <span>Dia 07</span>
            <span>Dia 14</span>
            <span>Dia 21</span>
            <span>Dia 30</span>
          </div>
        </div>
      </div>

      {/* Column Left (Combined Insight + Strengths) */}
      <div className="col-span-12 lg:col-span-4 space-y-5">
        {/* AI Insight Card - Compact */}
        <div className="rounded-xl p-6 text-white relative overflow-hidden group kinetic-gradient shadow-glow-blue card-hover">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
          <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-orange-500/10 rounded-full group-hover:scale-150 transition-transform duration-700 animate-breathe"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <span className="material-symbols-outlined text-orange-300 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              </div>
              <h3 className="font-headline text-base font-bold">Insight da IA</h3>
            </div>
            <p className="text-blue-100/90 leading-snug mb-5 font-medium text-[13px]">
              Platô em "Banco de Dados". Alterne estudos de Segurança com Redes de Computadores usando <span className="text-white underline decoration-orange-400 decoration-2 underline-offset-2 font-bold">Prática Ativa</span>.
            </p>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all text-white text-[11px] font-bold py-2.5 px-4 rounded-lg border border-white/15 hover:border-white/30 hover:scale-105 active:scale-95 w-full">
              Aplicar ao Cronograma →
            </button>
          </div>
        </div>
      </div>

      {/* Strengths and Weaknesses - Compact */}
      <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-4 md:p-6 shadow-premium card-hover">
        <h3 className="text-gradient-primary text-base font-bold mb-6">Distribuição de Forças</h3>
        <div className="space-y-4">
          {[
            { label: 'Retenção Longo Prazo', value: 88, color: 'kinetic-gradient' },
            { label: 'Velocidade', value: 62, color: 'kinetic-gradient' },
            { label: 'Aplicação', value: 45, color: 'action-gradient' },
            { label: 'Foco Sustentado', value: 79, color: 'kinetic-gradient' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col sm:grid sm:grid-cols-12 items-start sm:items-center gap-1.5 sm:gap-3">
              <div className="w-full sm:col-span-4 flex justify-between sm:block">
                <span className="text-[11px] font-bold text-on-surface-variant truncate uppercase tracking-widest">{item.label}</span>
                <span className={`sm:hidden text-[13px] font-black tracking-tighter ${item.value < 50 ? 'text-orange-600' : 'text-primary-container'}`}>{item.value}%</span>
              </div>
              <div className="w-full sm:col-span-7 h-2 bg-surface-container-high rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.value}%` }}></div>
              </div>
              <span className={`hidden sm:block col-span-1 text-[13px] font-black tracking-tighter ${item.value < 50 ? 'text-orange-600' : 'text-primary-container'}`}>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Cards Section - Compact */}
      <div className="col-span-12 mt-1">
        <h3 className="text-gradient-primary text-lg font-extrabold mb-5 flex items-center gap-2">
          <span className="w-1.5 h-6 action-gradient rounded-full shadow-sm"></span>
          Progresso por Disciplina
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 stagger-children">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-5 shadow-premium card-interactive group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <span className="text-[9px] font-extrabold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Avançado</span>
            </div>
            <h4 className="font-bold text-primary-container mb-1 text-[14px]">Engenharia de Software</h4>
            <p className="text-[11px] text-on-surface-variant mb-4">Revisão: <span className="font-semibold text-primary-container">Hoje</span></p>
            <div className="space-y-1.5">
              <div className="flex justify-between items-end">
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Total</span>
                <span className="text-[13px] font-black text-gradient-primary">92%</span>
              </div>
              <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full kinetic-gradient rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-xl p-5 shadow-premium card-interactive group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-700 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-[20px]">database</span>
              </div>
              <span className="text-[9px] font-extrabold text-primary-container bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Intermediário</span>
            </div>
            <h4 className="font-bold text-primary-container mb-1 text-[14px]">Banco de Dados</h4>
            <p className="text-[11px] text-on-surface-variant mb-4">Revisão: <span className="font-semibold text-primary-container">Ontem</span></p>
            <div className="space-y-1.5">
              <div className="flex justify-between items-end">
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Total</span>
                <span className="text-[13px] font-black text-gradient-accent">58%</span>
              </div>
              <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full action-gradient rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-xl p-5 shadow-premium card-interactive group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-[20px]">biotech</span>
              </div>
              <span className="text-[9px] font-extrabold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Avançado</span>
            </div>
            <h4 className="font-bold text-primary-container mb-1 text-[14px]">Redes de Computadores</h4>
            <p className="text-[11px] text-on-surface-variant mb-4">Revisão: <span className="font-semibold text-primary-container">Ontem</span></p>
            <div className="space-y-1.5">
              <div className="flex justify-between items-end">
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Total</span>
                <span className="text-[13px] font-black text-gradient-primary">84%</span>
              </div>
              <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full kinetic-gradient rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
