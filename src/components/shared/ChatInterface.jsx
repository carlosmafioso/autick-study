import React from 'react';
import CircularProgress from '../ui/CircularProgress';

export default function ChatInterface({ role, data }) {
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
                {data.welcome}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {data.suggestions.map((suggestion, idx) => (
                <button key={idx} className={`px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  suggestion.color === 'blue' 
                    ? 'bg-blue-50/50 border-blue-100 text-primary-container hover:bg-blue-100'
                    : 'bg-orange-50/50 border-orange-100 text-orange-700 hover:bg-orange-100'
                }`}>
                  {suggestion.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        {data.messages.map((msg, idx) => {
          if (msg.role === 'user') {
            return (
              <div key={idx} className="flex gap-3 items-start flex-row-reverse animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="w-10 h-10 rounded-xl bg-blue-100 overflow-hidden shrink-0 shadow-sm border border-outline-variant/10">
                  <img className="w-full h-full object-cover" src={msg.avatar} alt="User" />
                </div>
                <div className="flex flex-col gap-1.5 max-w-[85%] items-end">
                  <div className="kinetic-gradient text-white p-4 rounded-xl rounded-tr-sm shadow-glow-blue">
                    <p className="leading-snug text-[13px]">
                      {msg.content}
                    </p>
                  </div>
                  <span className="text-[9px] text-on-surface-variant font-medium flex items-center gap-1 opacity-80">
                    <span className="material-symbols-outlined text-emerald-500 text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
                    Lido • {msg.time}
                  </span>
                </div>
              </div>
            );
          } else {
            return (
              <div key={idx} className="flex gap-3 items-start animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="w-10 h-10 rounded-xl kinetic-gradient flex items-center justify-center shrink-0 shadow-glow-blue">
                  <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                <div className="flex flex-col gap-3 max-w-[85%]">
                  <div className="bg-white p-5 rounded-xl rounded-tl-sm shadow-premium border border-outline-variant/10 space-y-4 relative group">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-gradient-primary flex items-center gap-1.5 text-[14px]">
                        <span className="material-symbols-outlined text-orange-500 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                        {msg.title}
                      </h3>
                      <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-outline-variant/30 text-primary-container hover:bg-blue-50 transition-all active:scale-95 text-[10px] font-bold opacity-100 sm:opacity-0 sm:group-hover:opacity-100 shrink-0" title="Descarregar">
                        <span className="material-symbols-outlined text-[14px]">download</span>
                        <span className="hidden sm:inline">Exportar PDF</span>
                      </button>
                    </div>
                    <p className="text-on-surface leading-snug text-[13px]">
                      {msg.content}
                    </p>
                    <div className="space-y-2">
                      {msg.points.map((point, pIdx) => (
                        <div key={pIdx} className={`flex items-start gap-2 bg-gradient-to-r ${point.type === 'warning' ? 'from-orange-50/50 border-orange-500' : 'from-blue-50/50 border-primary-container'} to-transparent p-3 rounded-lg border-l-[3px]`}>
                          {point.text.startsWith('Q') ? (
                            <span className={`font-bold shrink-0 text-[12px] ${point.type === 'warning' ? 'text-orange-600' : 'text-primary-container'}`}>{point.text.split('.')[0]}.</span>
                          ) : (
                            <span className={`material-symbols-outlined shrink-0 text-[14px] mt-0.5 ${point.type === 'warning' ? 'text-orange-600' : 'text-primary-container'}`}>arrow_forward</span>
                          )}
                          <p className="text-[12px] text-on-surface leading-snug">{point.text.startsWith('Q') ? point.text.substring(point.text.indexOf('.') + 1).trim() : point.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {msg.progress && (
                    <div className="bg-gradient-to-r from-blue-50/80 to-orange-50/80 p-4 rounded-xl border border-blue-100/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <CircularProgress percentage={msg.progress.percentage} size={40} strokeWidth={3} colorClass="text-orange-500" trackColorClass="text-blue-100" dropShadow="drop-shadow(0 1px 2px rgba(255,109,0,0.2))">
                          <span className="text-[10px] font-black text-gradient-primary">{msg.progress.percentage}%</span>
                        </CircularProgress>
                        <div>
                          <p className="text-[12px] font-bold text-primary-container leading-tight">{msg.progress.title}</p>
                          <p className="text-[10px] text-on-surface-variant mt-0.5">{msg.progress.subtitle}</p>
                        </div>
                      </div>
                      <button className="w-full sm:w-auto bg-white text-orange-600 text-[11px] font-bold px-4 py-2 rounded-lg border border-orange-200 hover:bg-orange-50 hover:shadow-sm transition-all active:scale-[0.98]">
                        Detalhes
                      </button>
                    </div>
                  )}

                  {msg.action && (
                    <div className="bg-gradient-to-r from-blue-50/80 to-orange-50/80 p-4 rounded-xl border border-blue-100/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-orange-500 text-3xl">task</span>
                        </div>
                        <div>
                          <p className="text-[12px] font-bold text-primary-container leading-tight">{msg.action.title}</p>
                          <p className="text-[10px] text-on-surface-variant mt-0.5">{msg.action.subtitle}</p>
                        </div>
                      </div>
                      <button className="w-full sm:w-auto bg-white text-orange-600 text-[11px] font-bold px-4 py-2 rounded-lg border border-orange-200 hover:bg-orange-50 hover:shadow-sm transition-all active:scale-[0.98]">
                        Publicar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          }
        })}
      </section>

      {/* Chat Input Area */}
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
              <textarea 
                className="w-full bg-surface-container-low rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary-container/30 focus:bg-white text-on-surface placeholder:text-outline-variant/70 resize-none h-11 text-[13px] min-h-[44px] max-h-24 border border-transparent focus:border-primary-container/20 outline-none transition-all leading-relaxed" 
                placeholder={role === 'student' ? "Pergunte qualquer coisa sobre sua matéria..." : "Peça para resumir matéria, gerar perguntas, organizar plano..."}
              ></textarea>
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
            {role === 'student' 
              ? "O assistente pode cometer erros. Verifique informações com seu material didático."
              : "A IA pode cometer erros de interpretação didática. Sempre reveja o material antes de partilhar com os alunos."
            }
          </p>
        </div>
      </footer>
    </div>
  );
}
