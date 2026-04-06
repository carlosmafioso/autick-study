import React from 'react';

export default function CalendarioEPlaneamento() {
  return (
    <>
      <div className="grid grid-cols-12 gap-5 stagger-children max-w-[1400px] mx-auto w-full">
        {/* Interactive Calendar View - Compact */}
        <section className="col-span-12 lg:col-span-8 bg-white rounded-xl p-3 md:p-5 shadow-premium card-hover">
          <div className="flex items-center justify-between mb-4 md:mb-5 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-extrabold text-gradient-primary">Outubro 2023</h2>
              <div className="flex bg-surface-container-low p-1 rounded-lg gap-0.5">
                <button className="p-1 hover:bg-white rounded-md transition-all active:scale-90">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_left</span>
                </button>
                <button className="p-1 hover:bg-white rounded-md transition-all active:scale-90">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="flex gap-1 bg-surface-container-low p-1 rounded-lg">
              <button className="px-3 py-1.5 bg-white text-primary-container font-semibold text-[12px] rounded-md shadow-sm">Mês</button>
              <button className="px-3 py-1.5 text-on-surface-variant font-medium text-[12px] rounded-md hover:bg-white transition-all">Semana</button>
              <button className="px-3 py-1.5 text-on-surface-variant font-medium text-[12px] rounded-md hover:bg-white transition-all">Dia</button>
            </div>
          </div>

          <div className="overflow-x-auto -mx-1 px-1 hide-scrollbar">
          <div className="grid grid-cols-7 gap-px bg-surface-variant/50 rounded-xl overflow-hidden border border-outline-variant/20 min-w-[460px]">
            {/* Days Header */}
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="bg-surface-container-low py-2 text-center text-[9px] font-bold text-outline uppercase tracking-[0.1em]">{day}</div>
            ))}
            
            {/* Week 1 (Previous month) */}
            {[24, 25, 26, 27, 28, 29, 30].map(day => (
              <div key={`p-${day}`} className="bg-white h-16 md:h-20 p-1.5 md:p-2 text-[11px] md:text-[12px] text-on-surface-variant/30 font-medium">{day}</div>
            ))}
            
            {/* Week 2 */}
            <div className="bg-white h-16 md:h-20 p-1.5 md:p-2 text-[11px] md:text-[12px] text-on-surface-variant font-medium hover:bg-blue-50/30 transition-colors">1</div>
            <div className="bg-white h-16 md:h-20 p-1.5 md:p-2 text-[11px] md:text-[12px] text-on-surface-variant font-medium hover:bg-blue-50/30 transition-colors">2</div>
            <div className="bg-white h-16 md:h-20 p-1.5 md:p-2 text-[11px] md:text-[12px] text-on-surface-variant font-medium hover:bg-blue-50/30 transition-colors">3</div>
            <div className="bg-white h-16 md:h-20 p-1.5 text-[11px] md:text-[12px] text-on-surface-variant font-medium hover:bg-blue-50/30 transition-colors flex flex-col gap-0.5 md:gap-1">
              <span className="px-0.5">4</span>
              <div className="p-1 max-w-[calc(100%-4px)] bg-orange-50 border-l-[2px] border-orange-500 rounded-r-md truncate">
                <span className="text-[8px] md:text-[9px] font-bold text-orange-700 leading-none">Sprint 1</span>
              </div>
            </div>
            <div className="bg-white h-16 md:h-20 p-1.5 md:p-2 text-[11px] md:text-[12px] text-on-surface-variant font-medium hover:bg-blue-50/30 transition-colors">5</div>
            <div className="bg-white h-16 md:h-20 p-1.5 md:p-2 text-[11px] md:text-[12px] text-on-surface-variant font-medium hover:bg-blue-50/30 transition-colors">6</div>
            <div className="bg-white h-16 md:h-20 p-1.5 md:p-2 text-[11px] md:text-[12px] text-on-surface-variant font-medium hover:bg-blue-50/30 transition-colors">7</div>
            
            {/* Week 3 */}
            <div className="bg-white h-16 md:h-20 p-1.5 md:p-2 text-[11px] md:text-[12px] text-on-surface-variant font-medium hover:bg-blue-50/30 transition-colors">8</div>
            <div className="bg-white h-16 md:h-20 p-1.5 md:p-2 text-[11px] md:text-[12px] text-on-surface-variant font-medium hover:bg-blue-50/30 transition-colors">9</div>
            <div className="bg-white h-16 md:h-20 p-1.5 md:p-2 text-[11px] md:text-[12px] text-on-surface-variant font-medium hover:bg-blue-50/30 transition-colors">10</div>
            <div className="bg-blue-50/50 h-16 md:h-20 p-1 md:p-1.5 border border-primary-container/20 text-[11px] md:text-[12px] text-primary-container font-bold hover:bg-blue-50 transition-colors flex flex-col gap-0.5 md:gap-1">
              <span className="px-0.5">11</span>
              <div className="p-0.5 md:p-1 max-w-[calc(100%-4px)] bg-blue-100/50 border-l-[2px] border-primary-container rounded-r-md truncate">
                <span className="text-[8px] md:text-[9px] font-bold text-primary leading-none">Cálculo Limites</span>
              </div>
              <div className="p-0.5 md:p-1 max-w-[calc(100%-4px)] bg-blue-100/50 border-l-[2px] border-secondary rounded-r-md truncate">
                <span className="text-[8px] md:text-[9px] font-bold text-primary leading-none">Programação I</span>
              </div>
            </div>
            <div className="bg-white h-16 md:h-20 p-1.5 md:p-2 text-[11px] md:text-[12px] text-on-surface-variant font-medium hover:bg-blue-50/30 transition-colors">12</div>
            <div className="bg-white h-16 md:h-20 p-1 md:p-1.5 text-[11px] md:text-[12px] text-on-surface-variant font-medium hover:bg-blue-50/30 transition-colors flex flex-col gap-0.5 md:gap-1">
              <span className="px-0.5">13</span>
              <div className="p-0.5 md:p-1 max-w-[calc(100%-4px)] bg-orange-50 border-l-[2px] border-orange-500 rounded-r-md truncate">
                <span className="text-[8px] md:text-[9px] font-bold text-orange-700 leading-none">PROVA</span>
              </div>
            </div>
            <div className="bg-white h-16 md:h-20 p-1.5 md:p-2 text-[11px] md:text-[12px] text-on-surface-variant font-medium hover:bg-blue-50/30 transition-colors">14</div>

            {/* Week 4 */}
            {[15, 16, 17, 18, 19, 20, 21].map(day => (
              <div key={`d-${day}`} className="bg-white h-16 md:h-20 p-1.5 md:p-2 text-[11px] md:text-[12px] text-on-surface-variant font-medium hover:bg-blue-50/30 transition-colors">{day}</div>
            ))}
          </div>
          </div>
        </section>

        {/* Side Panel (Agenda & Tasks) - Compact */}
        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-5 stagger-children">
          {/* Agenda de Hoje */}
          <div className="bg-white rounded-xl p-5 shadow-premium card-hover">
            <h3 className="font-extrabold text-gradient-primary text-base mb-4">Agenda de Hoje</h3>
            <div className="space-y-3">
              {[
                { time: '09:00', title: 'Matemática Discreta', location: 'Lab 3 • 2h', color: 'border-primary-container', bg: 'bg-blue-50' },
                { time: '14:30', title: 'Proj. Inteligência Art.', location: 'Meet • 45min', color: 'border-orange-500', bg: 'bg-orange-50' },
                { time: '16:00', title: 'Aulas de C/C++', location: 'Sala 4 • 1h 30m', color: 'border-secondary', bg: 'bg-blue-50' },
              ].map((event) => (
                <div key={event.title} className="flex gap-3 group cursor-pointer items-start">
                  <div className="w-10 text-right pt-2">
                    <span className="text-[10px] font-bold text-outline">{event.time}</span>
                  </div>
                  <div className={`flex-1 p-3 ${event.bg} rounded-lg border-l-[3px] ${event.color} group-hover:shadow-sm transition-all`}>
                    <p className="text-[13px] font-bold text-primary-container leading-tight">{event.title}</p>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lista de Tarefas - Compact */}
          <div className="bg-white rounded-xl p-5 shadow-premium card-hover">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-gradient-primary text-base">Tarefas</h3>
              <button className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-all active:scale-90">
                <span className="material-symbols-outlined text-[18px]">add_task</span>
              </button>
            </div>
            <div className="space-y-1.5">
              {[
                { text: 'Revisar Cap 3 (Grafos)', checked: true },
                { text: 'Enviar commit do projeto', checked: false },
                { text: 'Exercícios de Assembly', checked: false },
                { text: 'Configurar Docker', checked: false },
              ].map((task) => (
                <label key={task.text} className="flex items-center gap-3 group cursor-pointer p-2 hover:bg-surface-container-low rounded-lg transition-all">
                  <input defaultChecked={task.checked} className="w-4 h-4 rounded border-2 border-outline-variant text-primary-container focus:ring-primary-container/20 transition-all cursor-pointer" type="checkbox" />
                  <span className={`text-[13px] font-medium transition-colors ${task.checked ? 'text-outline line-through' : 'text-on-surface group-hover:text-primary-container'}`}>{task.text}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Produtividade Widget - Compact */}
          <div className="mt-auto kinetic-gradient rounded-xl p-5 text-white shadow-glow-blue relative overflow-hidden group card-hover">
            <div className="relative z-10">
              <h4 className="text-[9px] font-bold opacity-70 uppercase tracking-[0.1em] mb-1">Produtividade Semanal</h4>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-3xl font-extrabold leading-none">84%</span>
                <span className="text-[10px] font-semibold bg-white/15 px-2 py-0.5 rounded-full backdrop-blur-sm">+12%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-orange-400 to-orange-300 w-[84%] rounded-full shadow-sm"></div>
              </div>
              <p className="text-[9px] text-white/50 font-medium">Meta: 25h foco total.</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full blur-lg group-hover:scale-[2] transition-transform duration-700"></div>
          </div>
        </aside>
      </div>

      {/* Floating Action Button - Compact */}
      <div className="fixed bottom-6 right-6 z-30">
        <button className="w-12 h-12 action-gradient text-white rounded-xl shadow-glow-orange flex items-center justify-center hover:scale-110 active:scale-90 transition-all animate-pulse-glow">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>edit_calendar</span>
        </button>
      </div>
    </>
  );
}
