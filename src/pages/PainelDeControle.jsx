import React from 'react';

export default function PainelDeControle() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full stagger-children">
      {/* Hero Section: Retomar Sessão */}
      <section className="relative overflow-hidden rounded-xl kinetic-gradient p-5 md:p-8 text-white flex flex-col md:flex-row justify-between items-center gap-5 md:gap-6 shadow-glow-blue">
        <div className="z-10 space-y-4 max-w-lg w-full">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-md text-[10px] font-bold tracking-widest uppercase border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
            Em andamento
          </span>
          <h3 className="text-2xl font-extrabold leading-tight">Algoritmos e Estruturas de Dados</h3>
          <p className="text-blue-100/80 font-medium text-[13px] leading-relaxed">Você parou no minuto 12:45 do vídeo "Árvores Binárias de Busca".</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
            <button className="action-gradient text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-glow-orange active:scale-95 flex-1">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              Retomar
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/15 hover:border-white/30 px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex-1 text-center justify-center">
              Revisar Notas
            </button>
          </div>
        </div>
        <div className="relative w-full md:w-[35%] aspect-video rounded-xl overflow-hidden shadow-xl z-10 group">
          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfMCTY-xWao40TGjR5mT_mu-KljjGICIOtrjmECqiJWXBxg9zjUV0k5yNzQ0steDv15nfFGckTIgp1VWGw1kYM5cKUSrR51mWxlVLxcDu-C3O8lE3CWBZWHeyyfofQ6kGF08WQZv_04YWqor9W6OlMJkUw82TAIMApecKm2aYLBRh-lAloCf63Gnb1sFZV725yIJHm9pEomWQ3LNDEZZmi29-wKcgbdqpu3zOTItK1rvFNZXUC3-doOBf-4kXNHBYsGtDzXREaVZY" alt="Study session" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-white text-2xl">play_circle</span>
            </div>
          </div>
        </div>
        {/* Background Decoration */}
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] animate-breathe"></div>
      </section>

      {/* Stats Bento Grid - Compact */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-5 stagger-children">
        {/* Stat Card 1 */}
        <div className="bg-white p-5 rounded-xl flex flex-col justify-between card-interactive shadow-premium">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-blue-50 rounded-lg text-primary-container">
              <span className="material-symbols-outlined text-[20px]">schedule</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+12%</span>
          </div>
          <div>
            <h4 className="text-2xl font-black text-gradient-primary">34h</h4>
            <p className="text-on-surface-variant text-[11px] font-semibold mt-0.5">Horas de Estudo</p>
          </div>
        </div>
        {/* Stat Card 2 */}
        <div className="bg-white p-5 rounded-xl flex flex-col justify-between card-interactive shadow-premium">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">Recorde</span>
          </div>
          <div>
            <h4 className="text-2xl font-black text-gradient-accent">12</h4>
            <p className="text-on-surface-variant text-[11px] font-semibold mt-0.5">Dias de Sequência</p>
          </div>
        </div>
        {/* Stat Card 3 - Progress */}
        <div className="md:col-span-2 bg-white p-5 rounded-xl relative overflow-hidden group card-hover shadow-premium">
          <div className="flex justify-between items-center relative z-10">
            <div>
              <h4 className="text-base font-bold text-gradient-primary">Progresso Semanal</h4>
              <p className="text-on-surface-variant text-[11px] mt-0.5">85% da meta concluída.</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-gradient-accent">85%</span>
            </div>
          </div>
          <div className="mt-4 h-2 bg-surface-container-high rounded-full overflow-hidden relative z-10">
            <div className="h-full action-gradient rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
          </div>
          <div className="mt-3 flex justify-between text-[9px] font-bold text-on-surface-variant uppercase tracking-widest relative z-10">
            <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span className="text-orange-600">Sex</span><span>Sab</span><span>Dom</span>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/3 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column Left */}
        <div className="lg:col-span-2 space-y-6 stagger-children">
          <div>
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-lg font-bold text-gradient-primary">Continuar Estudando</h3>
              <a className="text-[11px] font-bold text-orange-600 hover:text-orange-700 transition-colors" href="#">Ver tudo →</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Material Card 1 */}
              <div className="bg-white border border-outline-variant/10 p-4 rounded-xl shadow-premium card-interactive group">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">menu_book</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-primary-container truncate text-[13px]">Arquitetura de Computadores</h5>
                    <p className="text-[10px] text-on-surface-variant mb-2 mt-0.5 truncate">Capítulo 5: Pipelining</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-[9px] font-bold text-on-surface-variant">45%</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Material Card 2 */}
              <div className="bg-white border border-outline-variant/10 p-4 rounded-xl shadow-premium card-interactive group">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">science</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-primary-container truncate text-[13px]">Sistemas Operacionais</h5>
                    <p className="text-[10px] text-on-surface-variant mb-2 mt-0.5 truncate">Escalonamento de Processos</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: '72%' }}></div>
                      </div>
                      <span className="text-[9px] font-bold text-on-surface-variant">72%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Chart - Compact */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-premium card-hover">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gradient-primary">Atividade</h3>
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full action-gradient shadow-sm"></span>
                  <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Foco</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full kinetic-gradient shadow-sm"></span>
                  <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Leitura</span>
                </div>
              </div>
            </div>
            <div className="h-32 flex items-end justify-between gap-2 px-1">
              {[
                { blue: 'h-8', orange: 'h-16' },
                { blue: 'h-12', orange: 'h-10' },
                { blue: 'h-5', orange: 'h-24' },
                { blue: 'h-16', orange: 'h-8' },
                { blue: 'h-10', orange: 'h-20' },
                { blue: 'h-6', orange: 'h-14' },
                { blue: 'h-20', orange: 'h-6' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col gap-0.5 items-center group">
                  <div className={`w-full max-w-[20px] bg-blue-100 group-hover:bg-blue-200 rounded-t-sm ${bar.blue} transition-all duration-300`}></div>
                  <div className={`w-full max-w-[20px] action-gradient rounded-t-sm ${bar.orange} opacity-80 group-hover:opacity-100 transition-all duration-300`}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-[9px] font-bold text-on-surface-variant uppercase tracking-widest px-1">
              <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span><span>Dom</span>
            </div>
          </div>
        </div>

        {/* Column Right - Compact */}
        <div className="space-y-5 stagger-children">
          {/* AI Assistant Card - Compact */}
          <div className="kinetic-gradient text-white p-5 rounded-xl shadow-glow-blue relative overflow-hidden card-hover group">
            <h4 className="text-base font-bold mb-1.5 relative z-10">Assistente Autick</h4>
            <p className="text-[12px] text-blue-100/90 mb-4 relative z-10 leading-snug">Sua revisão de Flashcards está pronta. Começar agora?</p>
            <button className="w-full py-2.5 bg-white text-primary rounded-lg text-[13px] font-bold hover:bg-blue-50 transition-all relative z-10 shadow-sm active:scale-[0.98]">
              Iniciar Revisão
            </button>
            <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-6xl text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-500">smart_toy</span>
          </div>

          {/* Deadlines - Compact */}
          <div className="bg-white p-5 rounded-xl shadow-premium card-hover">
            <h4 className="text-[11px] font-bold text-gradient-primary uppercase tracking-widest mb-4">Próximos Prazos</h4>
            <div className="space-y-3">
              {[
                { title: 'Teste de Algoritmos', date: 'Amanhã, 14h', color: 'bg-orange-500' },
                { title: 'Entrega Projeto SO', date: 'Sex, 20 Out', color: 'bg-secondary' },
                { title: 'Apresentação IA', date: 'Seg, 23 Out', color: 'bg-secondary' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-2.5 group cursor-pointer">
                  <div className={`w-2 h-2 rounded-full ${item.color} mt-1.5 group-hover:scale-125 transition-transform`}></div>
                  <div>
                    <p className="text-[13px] font-bold text-primary-container group-hover:text-primary transition-colors leading-tight">{item.title}</p>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-primary/15 text-primary rounded-lg text-[11px] font-bold hover:bg-primary/5 transition-all">
              Ver Calendário
            </button>
          </div>

          {/* Quick Tools - Compact */}
          <div className="bg-white p-5 rounded-xl shadow-premium card-hover">
            <h4 className="text-[11px] font-bold text-gradient-primary uppercase tracking-widest mb-4">Atalhos</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: 'timer', label: 'Pomodoro' },
                { icon: 'stylus_note', label: 'Notas' },
                { icon: 'cards', label: 'Flashcards' },
                { icon: 'mic', label: 'Gravar' },
              ].map((tool) => (
                <button key={tool.label} className="flex flex-col items-center justify-center p-3 bg-surface-container-low rounded-lg hover:bg-orange-50 hover:shadow-md transition-all gap-1 group active:scale-[0.98]">
                  <span className="material-symbols-outlined text-[18px] text-orange-600 group-hover:scale-110 transition-transform">{tool.icon}</span>
                  <span className="text-[10px] font-bold text-on-surface-variant group-hover:text-orange-700">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
