"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function PainelDeControle() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [activeModal, setActiveModal] = useState(null);
  const [materiais, setMateriais] = useState([]);
  const [ultimoMaterial, setUltimoMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pomodoro state
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Notas state
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch user's enrollments with classes and documents
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          classes (
            name,
            documents (
              title,
              created_at
            )
          )
        `)
        .eq('student_id', user.id);

      if (error) throw error;

      let allDocs = [];
      data.forEach(enrollment => {
        if (enrollment.classes && enrollment.classes.documents) {
          enrollment.classes.documents.forEach(doc => {
            allDocs.push({
              ...doc,
              className: enrollment.classes.name
            });
          });
        }
      });

      allDocs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      setMateriais(allDocs.slice(0, 4)); // Top 4 for list
      setUltimoMaterial(allDocs.length > 0 ? allDocs[0] : null);

    } catch (err) {
      console.error('Erro ao buscar dados do dashboard do estudante:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full stagger-children">
      {/* Hero Section: Retomar Leitura do Último PDF */}
      <section className="relative overflow-hidden rounded-xl kinetic-gradient p-5 md:p-8 text-white flex flex-col md:flex-row justify-between items-center gap-5 md:gap-6 shadow-glow-blue">
        <div className="z-10 space-y-4 max-w-lg w-full">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-md text-[10px] font-bold tracking-widest uppercase border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
            Último Material Partilhado
          </span>
          <h3 className="text-2xl font-extrabold leading-tight">
            {ultimoMaterial ? ultimoMaterial.title : 'Nenhum material disponível'}
          </h3>
          <p className="text-blue-100/80 font-medium text-[13px] leading-relaxed">
            {ultimoMaterial 
              ? `Material adicionado recentemente na turma ${ultimoMaterial.className}.` 
              : 'Junte-se a uma turma para ter acesso aos materiais de estudo.'}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
            <button 
              onClick={() => router.push('/estudante/materiais')}
              className="action-gradient text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-glow-orange active:scale-95 flex-1"
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
              Ver Biblioteca
            </button>
            <button 
              onClick={() => router.push('/estudante/turmas')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/15 hover:border-white/30 px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex-1 text-center justify-center"
            >
              Minhas Turmas
            </button>
          </div>
        </div>
        <div className="relative w-full md:w-[35%] aspect-video rounded-xl overflow-hidden shadow-xl z-10 group">
          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfMCTY-xWao40TGjR5mT_mu-KljjGICIOtrjmECqiJWXBxg9zjUV0k5yNzQ0steDv15nfFGckTIgp1VWGw1kYM5cKUSrR51mWxlVLxcDu-C3O8lE3CWBZWHeyyfofQ6kGF08WQZv_04YWqor9W6OlMJkUw82TAIMApecKm2aYLBRh-lAloCf63Gnb1sFZV725yIJHm9pEomWQ3LNDEZZmi29-wKcgbdqpu3zOTItK1rvFNZXUC3-doOBf-4kXNHBYsGtDzXREaVZY" alt="Último PDF lido" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-white text-2xl">description</span>
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
            <h4 className="text-2xl font-black text-gradient-primary">--h</h4>
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
            <h4 className="text-2xl font-black text-gradient-accent">--</h4>
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
              <h3 className="text-lg font-bold text-gradient-primary">Materiais Recentes</h3>
              <button 
                onClick={() => router.push('/estudante/materiais')}
                className="text-[11px] font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Ver todos →
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="w-6 h-6 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"></div>
              </div>
            ) : materiais.length === 0 ? (
              <div className="bg-white p-6 rounded-xl border border-outline-variant/10 shadow-premium text-center">
                <p className="text-on-surface-variant text-[13px] font-medium">Não há materiais disponíveis no momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {materiais.map((mat, i) => (
                  <div key={i} className="bg-white border border-outline-variant/10 p-4 rounded-xl shadow-premium card-interactive group cursor-pointer">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300 shrink-0">
                        <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-primary-container truncate text-[13px]">{mat.title}</h5>
                        <p className="text-[10px] text-on-surface-variant mb-2 mt-0.5 truncate">{mat.className}</p>
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">Novo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
            <h4 className="text-[11px] font-bold text-gradient-primary uppercase tracking-widest mb-4">Atalhos Rápidos</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'pomodoro', icon: 'timer', label: 'Pomodoro' },
                { id: 'notas', icon: 'stylus_note', label: 'Notas Rápidas' },
              ].map((tool) => (
                <button 
                  key={tool.id} 
                  onClick={() => setActiveModal(tool.id)}
                  className="flex flex-col items-center justify-center p-4 bg-surface-container-low rounded-xl hover:bg-orange-50 hover:shadow-md transition-all gap-2 group active:scale-[0.98] border border-transparent hover:border-orange-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-[20px] text-orange-600">{tool.icon}</span>
                  </div>
                  <span className="text-[11px] font-bold text-on-surface-variant group-hover:text-orange-700">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MODALS ═══ */}
      {/* Pomodoro Modal */}
      {activeModal === 'pomodoro' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl relative overflow-hidden animate-fade-in-up">
            <div className="absolute top-0 left-0 w-full h-2 kinetic-gradient"></div>
            
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500 text-2xl">timer</span>
                <h3 className="font-bold text-primary-container text-lg">Pomodoro</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-lg transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col items-center justify-center mb-8 relative">
              {/* Circular Progress Mock */}
              <div className="w-48 h-48 rounded-full border-8 border-surface-container-high flex items-center justify-center relative shadow-inner">
                 <div className="absolute inset-0 rounded-full border-8 border-orange-500 border-l-transparent border-b-transparent rotate-45 opacity-80"></div>
                 <div className="text-center">
                    <span className="text-5xl font-black text-gradient-primary tabular-nums tracking-tighter">
                      {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                    <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mt-2">Foco</p>
                 </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setIsRunning(!isRunning)}
                className="w-14 h-14 rounded-full action-gradient text-white flex items-center justify-center shadow-glow-orange hover:scale-105 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isRunning ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <button 
                onClick={() => { setIsRunning(false); setTimeLeft(25 * 60); }}
                className="w-14 h-14 rounded-full bg-surface-container-low text-primary-container flex items-center justify-center hover:bg-blue-50 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-2xl">stop</span>
              </button>
            </div>
            
            <div className="mt-8 flex justify-center gap-2">
              <button className="px-4 py-1.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-200">Pomodoro</button>
              <button className="px-4 py-1.5 rounded-full text-[10px] font-bold text-on-surface-variant hover:bg-surface-container-low">Pausa Curta</button>
            </div>
          </div>
        </div>
      )}

      {/* Notas Modal */}
      {activeModal === 'notas' && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 w-full max-w-lg shadow-2xl flex flex-col h-[90vh] sm:h-[600px] animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg action-gradient flex items-center justify-center shadow-glow-orange">
                  <span className="material-symbols-outlined text-white text-lg">stylus_note</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary-container text-[16px]">Nova Nota Rápida</h4>
                  <p className="text-[11px] text-on-surface-variant">Capture os seus pensamentos.</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="Título da nota" 
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="w-full text-xl font-bold text-primary-container placeholder:text-outline-variant/60 border-none outline-none focus:ring-0 px-2 py-3"
              />
              {/* Rich Text Toolbar Mock */}
              <div className="flex gap-1 border-b border-t border-outline-variant/20 py-2 px-2 bg-surface-container-low/50 rounded-lg">
                {['format_bold', 'format_italic', 'format_underlined', 'format_list_bulleted', 'format_list_numbered'].map(icon => (
                  <button key={icon} className="p-1.5 rounded hover:bg-white text-on-surface-variant hover:text-primary transition-colors">
                     <span className="material-symbols-outlined text-[18px]">{icon}</span>
                  </button>
                ))}
              </div>
              <textarea 
                placeholder="Comece a escrever..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full flex-1 resize-none border-none outline-none focus:ring-0 px-2 py-4 text-[14px] text-on-surface leading-relaxed placeholder:text-outline-variant/50"
              ></textarea>
            </div>

            <div className="mt-4 flex justify-between gap-3 pt-4 border-t border-outline-variant/10">
              <button 
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-lg border border-outline-variant/30 text-primary-container font-bold hover:bg-blue-50 transition-all text-[12px] sm:text-[13px]"
                title="Descarregar Nota em PDF"
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">download</span>
                <span className="hidden sm:inline">Exportar PDF</span>
              </button>
              <div className="flex gap-2 sm:gap-3">
                <button onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-lg text-on-surface-variant font-bold hover:bg-surface-container-low transition-all text-[12px] sm:text-[13px]">
                  Descartar
                </button>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="px-5 sm:px-6 py-2.5 rounded-lg action-gradient text-white font-bold shadow-glow-orange hover:scale-[1.02] active:scale-95 transition-all text-[12px] sm:text-[13px]"
                >
                  Salvar Nota
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

