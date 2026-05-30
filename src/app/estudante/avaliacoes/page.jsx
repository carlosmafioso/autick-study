"use client";
import React, { useState } from 'react';
import { mockTurmas, mockQuizzes as quizzes, mockActiveQuiz as activeQuizData } from '../../../data/mockData';

export default function QuizInteligente() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showQuizActive, setShowQuizActive] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState('');
  const [selectedPdf, setSelectedPdf] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);

  const filters = [
    { label: 'Todos', count: quizzes.length },
    { label: 'Em Progresso', count: quizzes.filter(q => q.progress > 0 && !q.completed).length },
    { label: 'Concluídos', count: quizzes.filter(q => q.completed).length },
    { label: 'Novos', count: quizzes.filter(q => q.progress === 0).length },
  ];

  const filteredQuizzes = quizzes.filter(q => {
    if (activeFilter === 'Em Progresso') return q.progress > 0 && !q.completed;
    if (activeFilter === 'Concluídos') return q.completed;
    if (activeFilter === 'Novos') return q.progress === 0;
    return true;
  });

  const handleOptionClick = (optionId) => {
    if (showResult) return;
    setSelectedOption(optionId);
    setTimeout(() => setShowResult(true), 300);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
  };

  return (
    <div className="space-y-6 stagger-children max-w-[1400px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-gradient-primary">Quiz Inteligente</h3>
          <p className="text-on-surface-variant text-[13px] mt-0.5">Quizzes gerados por IA a partir dos seus materiais PDF.</p>
        </div>
        <div className="flex gap-2 sm:gap-2.5">
          <button className="flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg border border-outline-variant/30 text-primary-container font-bold hover:bg-blue-50 hover:border-primary-container/20 transition-all active:scale-[0.98] text-[12px] md:text-[13px]">
            <span className="material-symbols-outlined text-lg">history</span>
            <span className="text-[13px]">Histórico</span>
          </button>
          <button
            onClick={() => setShowConfigModal(true)}
            className="flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg action-gradient text-white font-bold shadow-glow-orange hover:scale-[1.02] active:scale-[0.98] transition-all text-[12px] md:text-[13px]"
          >
            <span className="material-symbols-outlined text-lg">tune</span>
            <span className="text-[13px]">Criar Quiz</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
        {filters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            className={`px-4 py-1.5 rounded-full font-semibold whitespace-nowrap text-[12px] transition-all active:scale-[0.98] ${
              activeFilter === filter.label
                ? 'action-gradient text-white shadow-sm'
                : 'bg-white text-primary-container hover:bg-blue-50 border border-outline-variant/20 hover:border-primary-container/20'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Config Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-5 sm:p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg action-gradient flex items-center justify-center shadow-glow-orange">
                  <span className="material-symbols-outlined text-white text-lg">tune</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary-container text-[16px]">Configurar Quiz</h4>
                  <p className="text-[11px] text-on-surface-variant">Escolha o material base</p>
                </div>
              </div>
              <button onClick={() => setShowConfigModal(false)} className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-1.5">Turma</label>
                <select 
                  className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/30 text-[13px] text-on-surface bg-surface-container-low focus:ring-1 focus:ring-primary-container/30 outline-none transition-all"
                  value={selectedTurma}
                  onChange={(e) => { setSelectedTurma(e.target.value); setSelectedPdf(''); }}
                >
                  <option value="">Selecione uma turma...</option>
                  {mockTurmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-1.5">Material (PDF)</label>
                <select 
                  className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/30 text-[13px] text-on-surface bg-surface-container-low focus:ring-1 focus:ring-primary-container/30 outline-none transition-all disabled:opacity-50"
                  value={selectedPdf}
                  onChange={(e) => setSelectedPdf(e.target.value)}
                  disabled={!selectedTurma}
                >
                  <option value="">Selecione um PDF...</option>
                  {selectedTurma && mockTurmas.find(t => t.id === selectedTurma)?.pdfs.map(pdf => (
                    <option key={pdf} value={pdf}>{pdf}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-1.5">Nº de Questões: {numQuestions}</label>
                <input 
                  type="range" 
                  min="5" max="30" step="5"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(e.target.value)}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-[10px] text-on-surface-variant mt-1 font-semibold">
                  <span>5</span>
                  <span>30</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => setShowConfigModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-outline-variant/30 text-on-surface-variant font-bold hover:bg-surface-container-low transition-all text-[13px]"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  setShowConfigModal(false);
                  setShowQuizActive(true);
                }}
                disabled={!selectedTurma || !selectedPdf}
                className="flex-1 px-4 py-2.5 rounded-lg action-gradient text-white font-bold shadow-glow-orange hover:brightness-110 active:scale-[0.98] transition-all text-[13px] disabled:opacity-50 disabled:grayscale"
              >
                Gerar Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {!showQuizActive ? (
        <>
          {/* AI Suggestion Hero */}
          <section className="relative overflow-hidden rounded-xl kinetic-gradient p-5 md:p-6 text-white flex flex-col md:flex-row justify-between items-center gap-5 shadow-glow-blue group">
            <div className="z-10 space-y-3 max-w-lg w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <span className="material-symbols-outlined text-orange-300 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                <div>
                  <h4 className="text-base font-bold">Sugestão do Assistente</h4>
                  <p className="text-[10px] text-blue-200/80 font-medium">Baseado nos seus materiais recentes</p>
                </div>
              </div>
              <p className="text-blue-100/90 font-medium text-[13px] leading-relaxed">
                Identifiquei que você fez upload de <strong className="text-white">«SO_Cap5_Deadlocks.pdf»</strong> há 2 horas.
                Gerei um quiz de <strong className="text-orange-300">10 questões</strong> focado nos conceitos-chave deste material.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 pt-1">
                <button
                  onClick={() => setShowQuizActive(true)}
                  className="action-gradient text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-glow-orange active:scale-95 flex-1"
                >
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  Iniciar Quiz
                </button>
                <button 
                  onClick={() => setShowConfigModal(true)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/15 hover:border-white/30 px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex-1 text-center justify-center"
                >
                  Personalizar
                </button>
              </div>
            </div>
            <div className="z-10 hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-4xl text-white/80" style={{ fontVariationSettings: "'FILL' 1" }}>quiz</span>
                  <span className="text-[10px] font-bold text-blue-200/80 uppercase tracking-widest">10 Questões</span>
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full action-gradient flex items-center justify-center shadow-glow-orange animate-pulse-glow">
                  <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] animate-breathe"></div>
            <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-white/5 rounded-full blur-[60px]"></div>
          </section>

          {/* Quiz Stats Row */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 stagger-children">
            {[
              { icon: 'emoji_events', label: 'Quizzes Feitos', value: '23', badge: '+3 esta semana', badgeColor: 'text-emerald-600 bg-emerald-50', iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
              { icon: 'target', label: 'Média Geral', value: '78%', badge: 'Bom', badgeColor: 'text-primary-container bg-blue-50', iconBg: 'bg-blue-50', iconColor: 'text-primary-container' },
              { icon: 'local_fire_department', label: 'Sequência', value: '5', badge: 'Dias', badgeColor: 'text-orange-600 bg-orange-50', iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
              { icon: 'school', label: 'PDFs Analisados', value: '12', badge: 'Materiais', badgeColor: 'text-primary-container bg-blue-50', iconBg: 'bg-blue-50', iconColor: 'text-primary-container' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-4 rounded-xl flex flex-col justify-between card-interactive shadow-premium">
                <div className="flex justify-between items-start mb-2.5">
                  <div className={`p-2 ${stat.iconBg} rounded-lg ${stat.iconColor}`}>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                  </div>
                  <span className={`text-[9px] font-bold ${stat.badgeColor} px-2 py-0.5 rounded-md`}>{stat.badge}</span>
                </div>
                <div>
                  <h4 className="text-xl font-black text-gradient-primary">{stat.value}</h4>
                  <p className="text-on-surface-variant text-[10px] font-semibold mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Quiz Cards Grid */}
          <div>
            <h3 className="text-lg font-bold text-gradient-primary mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 action-gradient rounded-full shadow-sm"></span>
              Quizzes Disponíveis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
              {filteredQuizzes.map((quiz) => (
                <div key={quiz.id} className="bg-white rounded-xl shadow-premium card-interactive group overflow-hidden">
                  {/* Card Header Stripe */}
                  <div className={`h-1.5 w-full ${quiz.completed ? 'kinetic-gradient' : quiz.progress > 0 ? 'action-gradient' : 'bg-surface-container-high'}`}></div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300">
                        <span className="material-symbols-outlined text-[20px]">{quiz.icon}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-extrabold ${quiz.difficultyColor} px-2.5 py-1 rounded-md uppercase tracking-wider`}>{quiz.difficulty}</span>
                      </div>
                    </div>

                    <h4 className="font-bold text-primary-container text-[14px] mb-0.5 leading-tight">{quiz.title}</h4>
                    <p className="text-[11px] text-on-surface-variant mb-1">{quiz.subject}</p>

                    {/* Source PDF */}
                    <div className="flex items-center gap-1.5 mb-3 mt-2">
                      <span className="material-symbols-outlined text-orange-500 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                      <span className="text-[10px] text-on-surface-variant truncate font-medium">{quiz.source}</span>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center gap-1 text-[10px] text-on-surface-variant font-semibold">
                        <span className="material-symbols-outlined text-[14px]">help_outline</span>
                        {quiz.questions} questões
                      </span>
                      {quiz.bestScore !== null && (
                        <span className={`flex items-center gap-1 text-[10px] font-bold ${quiz.bestScore >= 80 ? 'text-emerald-600' : 'text-orange-600'}`}>
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          Melhor: {quiz.bestScore}%
                        </span>
                      )}
                    </div>

                    {/* Progress */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Progresso</span>
                        <span className={`text-[11px] font-black ${quiz.completed ? 'text-emerald-600' : 'text-gradient-primary'}`}>
                          {quiz.completed ? '✓ Concluído' : `${quiz.progress}%`}
                        </span>
                      </div>
                      <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${quiz.completed ? 'bg-emerald-500' : quiz.progress > 0 ? 'action-gradient' : ''}`}
                          style={{ width: `${quiz.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action */}
                    <button
                      onClick={() => setShowQuizActive(true)}
                      className={`w-full mt-3 py-2 rounded-lg text-[11px] font-bold transition-all active:scale-[0.98] ${
                        quiz.completed
                          ? 'border border-primary/15 text-primary hover:bg-primary/5'
                          : quiz.progress > 0
                          ? 'action-gradient text-white shadow-sm hover:brightness-110'
                          : 'border border-outline-variant/30 text-primary-container hover:bg-blue-50 hover:border-primary-container/20'
                      }`}
                    >
                      {quiz.completed ? 'Refazer Quiz' : quiz.progress > 0 ? 'Continuar' : 'Iniciar'}
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Quiz Placeholder */}
              <div 
                onClick={() => setShowConfigModal(true)}
                className="border-2 border-dashed border-outline-variant/40 rounded-xl flex flex-col items-center justify-center p-8 text-on-surface-variant hover:bg-orange-50/50 hover:border-orange-300 transition-all cursor-pointer group active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-container-low group-hover:bg-orange-100 flex items-center justify-center mb-3 transition-all">
                  <span className="material-symbols-outlined text-[24px] group-hover:text-orange-600 transition-colors">auto_awesome</span>
                </div>
                <p className="font-bold text-[13px]">Gerar Novo Quiz</p>
                <p className="text-[10px] opacity-60 mt-1 text-center">Selecione um PDF da sua<br/>biblioteca para gerar</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ═══ ACTIVE QUIZ VIEW ═══ */
        <div className="max-w-3xl mx-auto space-y-5 animate-fade-in-up">
          {/* Quiz Header */}
          <div className="bg-white rounded-xl p-4 md:p-5 shadow-premium flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg kinetic-gradient flex items-center justify-center shadow-glow-blue shrink-0">
                <span className="material-symbols-outlined text-white text-lg">quiz</span>
              </div>
              <div>
                <h4 className="font-bold text-primary-container text-[14px]">{activeQuizData.title}</h4>
                <p className="text-[11px] text-on-surface-variant">Pergunta {activeQuizData.currentQuestion} de {activeQuizData.totalQuestions}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-between sm:justify-end w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-outline-variant/10">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-lg">
                <span className="material-symbols-outlined text-orange-600 text-[16px]">timer</span>
                <span className="text-[13px] font-black text-orange-600 tabular-nums">{activeQuizData.timeRemaining}</span>
              </div>
              <button
                onClick={() => { setShowQuizActive(false); setSelectedOption(null); setShowResult(false); }}
                className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-error transition-all"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full action-gradient rounded-full transition-all duration-700"
              style={{ width: `${(activeQuizData.currentQuestion / activeQuizData.totalQuestions) * 100}%` }}
            ></div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl p-5 md:p-7 shadow-premium-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg action-gradient text-white text-[11px] font-black shadow-sm">{activeQuizData.currentQuestion}</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Múltipla Escolha</span>
            </div>
            <h3 className="text-[15px] md:text-[16px] font-bold text-on-surface leading-snug mb-6">
              {activeQuizData.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {activeQuizData.options.map((option) => {
                const isSelected = selectedOption === option.id;
                const isCorrect = option.correct;
                let optionStyle = 'bg-surface-container-low border-transparent hover:bg-blue-50 hover:border-primary-container/20';

                if (showResult && isSelected && isCorrect) {
                  optionStyle = 'bg-emerald-50 border-emerald-400 ring-1 ring-emerald-200';
                } else if (showResult && isSelected && !isCorrect) {
                  optionStyle = 'bg-red-50 border-red-400 ring-1 ring-red-200';
                } else if (showResult && isCorrect) {
                  optionStyle = 'bg-emerald-50/50 border-emerald-300/50';
                } else if (isSelected) {
                  optionStyle = 'bg-blue-50 border-primary-container/40 ring-1 ring-primary-container/20';
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 text-left active:scale-[0.995] group ${optionStyle}`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-black shrink-0 transition-all duration-300 ${
                      showResult && isSelected && isCorrect
                        ? 'bg-emerald-500 text-white'
                        : showResult && isSelected && !isCorrect
                        ? 'bg-red-500 text-white'
                        : showResult && isCorrect
                        ? 'bg-emerald-100 text-emerald-700'
                        : isSelected
                        ? 'kinetic-gradient text-white shadow-glow-blue'
                        : 'bg-white text-primary-container border border-outline-variant/20 group-hover:border-primary-container/30'
                    }`}>
                      {showResult && isSelected && isCorrect ? (
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                      ) : showResult && isSelected && !isCorrect ? (
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>close</span>
                      ) : (
                        option.id
                      )}
                    </span>
                    <span className={`text-[13px] font-semibold leading-snug transition-colors ${
                      showResult && isCorrect ? 'text-emerald-700' : showResult && isSelected && !isCorrect ? 'text-red-700' : 'text-on-surface'
                    }`}>
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {showResult && (
              <div className={`mt-5 p-4 rounded-xl border-l-[3px] animate-fade-in-up ${
                activeQuizData.options.find(o => o.id === selectedOption)?.correct
                  ? 'bg-gradient-to-r from-emerald-50/80 to-transparent border-emerald-500'
                  : 'bg-gradient-to-r from-red-50/80 to-transparent border-red-500'
              }`}>
                <div className="flex items-start gap-2">
                  <span className={`material-symbols-outlined text-[16px] mt-0.5 shrink-0 ${
                    activeQuizData.options.find(o => o.id === selectedOption)?.correct ? 'text-emerald-600' : 'text-red-600'
                  }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {activeQuizData.options.find(o => o.id === selectedOption)?.correct ? 'check_circle' : 'cancel'}
                  </span>
                  <div>
                    <p className={`text-[13px] font-bold ${
                      activeQuizData.options.find(o => o.id === selectedOption)?.correct ? 'text-emerald-700' : 'text-red-700'
                    }`}>
                      {activeQuizData.options.find(o => o.id === selectedOption)?.correct ? 'Correcto!' : 'Resposta Incorreta'}
                    </p>
                    <p className="text-[12px] text-on-surface mt-1 leading-snug">
                      {activeQuizData.options.find(o => o.id === selectedOption)?.correct
                        ? 'A preempção (capacidade de forçar liberação de recurso) é justamente o oposto — ela PREVINE deadlocks.'
                        : 'A resposta correta é B) Preempção. As 4 condições de Coffman são: exclusão mútua, posse-espera, NÃO-preempção e espera circular.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-outline-variant/30 text-primary-container font-bold hover:bg-blue-50 transition-all active:scale-[0.98] text-[12px]">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Anterior
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: activeQuizData.totalQuestions }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i + 1 === activeQuizData.currentQuestion
                      ? 'w-5 action-gradient shadow-sm'
                      : i + 1 < activeQuizData.currentQuestion
                      ? 'bg-primary-container/40'
                      : 'bg-surface-container-high'
                  }`}
                ></div>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg action-gradient text-white font-bold shadow-glow-orange hover:brightness-110 active:scale-[0.98] transition-all text-[12px]"
            >
              Próxima
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Results Preview Card */}
          <div className="bg-white rounded-xl p-5 md:p-6 shadow-premium card-hover">
            <h4 className="text-[11px] font-bold text-gradient-primary uppercase tracking-widest mb-4">Desempenho Atual</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Corretas', value: '3', total: '/4', color: 'text-emerald-600' },
                { label: 'Incorretas', value: '1', total: '/4', color: 'text-red-500' },
                { label: 'Precisão', value: '75', total: '%', color: 'text-gradient-primary' },
                { label: 'Tempo Médio', value: '45', total: 's', color: 'text-orange-600' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className={`text-xl font-black ${stat.color}`}>{stat.value}</span>
                    <span className="text-[11px] font-bold text-on-surface-variant">{stat.total}</span>
                  </div>
                  <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

