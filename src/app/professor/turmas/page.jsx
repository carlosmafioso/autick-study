"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../components/ToastProvider';

export default function ProfessorTurmas() {
  const { user } = useAuth();
  const { showToast } = useToast();
  
  const [turmasList, setTurmasList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [expandedTurma, setExpandedTurma] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [newTurmaName, setNewTurmaName] = useState('');
  const [createdTurmaCode, setCreatedTurmaCode] = useState(null);
  const [copied, setCopied] = useState(false);
  
  // Announcement state
  const [showAvisoForm, setShowAvisoForm] = useState(false);
  const [avisoText, setAvisoText] = useState('');

  // Students panel state
  const [showAlunosPanel, setShowAlunosPanel] = useState(false);

  useEffect(() => {
    if (user) fetchTurmas();
  }, [user]);

  const fetchTurmas = async () => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select(`
          id, name, access_code, status, created_at,
          enrollments (count),
          documents (count),
          class_announcements (message, created_at)
        `)
        .eq('professor_id', user.id)
        .eq('status', 'active');

      if (error) throw error;

      const formatted = data.map(t => {
        const announcements = t.class_announcements || [];
        const recentAviso = announcements.length > 0 
          ? announcements.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))[0].message 
          : null;

        return {
          id: t.id,
          nome: t.name,
          name: t.name,
          code: t.access_code,
          students: t.enrollments[0]?.count || 0,
          materials: t.documents[0]?.count || 0,
          lastUpdate: new Date(t.created_at).toLocaleDateString('pt-PT'),
          gradient: 'action-gradient',
          icon: 'school',
          announcements: announcements.length,
          nextClass: 'Por agendar',
          pdfs: [], // Em uma refatoração futura podemos buscar os docs
          recentAnnouncement: recentAviso,
          rawAnnouncements: announcements
        };
      });

      setTurmasList(formatted);
    } catch (err) {
      console.error(err);
      showToast('Erro ao carregar turmas.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTurmaClick = async (turma) => {
    if (expandedTurma?.id === turma.id) {
      setExpandedTurma(null);
    } else {
      setExpandedTurma(turma);
    }
    setShowAvisoForm(false);
    setAvisoText('');
    setShowAlunosPanel(false);
  };

  const handleArchiveTurma = async (id) => {
    if(window.confirm('Tem a certeza que deseja arquivar esta turma?')) {
      try {
        const { error } = await supabase.from('classes').update({ status: 'archived' }).eq('id', id);
        if (error) throw error;
        setTurmasList(prev => prev.filter(t => t.id !== id));
        setExpandedTurma(null);
        showToast('Turma arquivada com sucesso.', 'success');
      } catch (err) {
        showToast('Erro ao arquivar turma.', 'error');
      }
    }
  };

  const handleCreateTurma = async () => {
    if (!newTurmaName.trim()) return;

    // Generate a unique code
    const letters = newTurmaName.split(' ').map(w => w[0].toUpperCase()).join('').substring(0, 3);
    const code = `${letters}-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    try {
      const { data, error } = await supabase.from('classes').insert({
        name: newTurmaName,
        access_code: code,
        professor_id: user.id
      }).select().single();

      if (error) throw error;

      setCreatedTurmaCode(data.access_code);
      fetchTurmas(); // reload list
    } catch (err) {
      showToast('Erro ao criar turma.', 'error');
    }
  };

  const handlePublishAviso = async () => {
    if (!avisoText.trim() || !expandedTurma) return;
    
    try {
      const { error } = await supabase.from('class_announcements').insert({
        class_id: expandedTurma.id,
        message: avisoText
      });

      if (error) throw error;

      showToast('Aviso publicado!', 'success');
      setAvisoText('');
      setShowAvisoForm(false);
      fetchTurmas(); // reload list to get updated count and recent announcement
    } catch (err) {
      showToast('Erro ao publicar aviso.', 'error');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(createdTurmaCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowJoinModal(false);
      setCreatedTurmaCode(null);
      setNewTurmaName('');
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowJoinModal(false);
    setCreatedTurmaCode(null);
    setNewTurmaName('');
  };

  return (
    <div className="space-y-6 stagger-children max-w-[1400px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-5 md:p-6 rounded-xl shadow-premium border border-outline-variant/5">
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-extrabold text-gradient-primary">Minhas Turmas</h3>
          <p className="text-on-surface-variant text-[13px] mt-0.5">Gerencie as suas turmas, materiais e avaliações.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <span className="material-symbols-outlined text-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50">search</span>
            <input
              type="text"
              placeholder="Buscar turma..."
              className="pl-9 pr-4 py-2 rounded-lg border border-outline-variant/30 text-[13px] text-on-surface bg-white placeholder:text-outline-variant/50 focus:ring-1 focus:ring-primary-container/30 focus:border-primary-container/20 outline-none transition-all w-full sm:w-48"
            />
          </div>
          <button
            onClick={() => setShowJoinModal(!showJoinModal)}
            className="flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 rounded-lg action-gradient text-white font-bold shadow-glow-orange hover:scale-[1.02] active:scale-[0.98] transition-all text-[12px] md:text-[13px] w-full sm:w-auto"
          >
            <span className="material-symbols-outlined text-lg">add_box</span>
            <span className="text-[13px]">Nova Turma</span>
          </button>
        </div>
      </div>

      {/* New Turma Modal (inline) */}
      {showJoinModal && (
        <div className="bg-white rounded-xl p-5 shadow-premium-lg border border-outline-variant/10 animate-fade-in-up">
          {!createdTurmaCode ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg action-gradient flex items-center justify-center shadow-glow-orange shrink-0">
                  <span className="material-symbols-outlined text-white text-lg">domain_add</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary-container text-[14px]">Criar Nova Turma</h4>
                  <p className="text-[11px] text-on-surface-variant">Configure um novo espaço para os seus alunos</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={newTurmaName}
                  onChange={(e) => setNewTurmaName(e.target.value)}
                  placeholder="Ex: Inteligência Artificial"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-outline-variant/30 text-[13px] text-on-surface bg-surface-container-low placeholder:text-outline-variant/50 focus:ring-1 focus:ring-primary-container/30 focus:border-primary-container/20 outline-none transition-all w-full"
                />
                <div className="flex gap-2.5">
                  <button onClick={handleCreateTurma} className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg action-gradient text-white font-bold shadow-glow-orange hover:brightness-110 active:scale-[0.98] transition-all text-[13px]">
                    Criar
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-outline-variant/30 text-on-surface-variant font-bold hover:bg-surface-container-low transition-all text-[13px]"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                  <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-700 text-[14px]">Turma Criada com Sucesso!</h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">Partilhe o código abaixo com os seus alunos.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/30 font-mono text-[14px] font-bold text-primary-container tracking-wider w-full sm:w-auto text-center">
                  {createdTurmaCode}
                </div>
                <button 
                  onClick={handleCopyCode}
                  className={`px-4 py-2 rounded-lg font-bold transition-all text-[13px] flex items-center justify-center gap-1.5 shrink-0 ${copied ? 'bg-emerald-500 text-white shadow-sm' : 'action-gradient text-white shadow-glow-orange hover:brightness-110 active:scale-[0.98]'}`}
                >
                  <span className="material-symbols-outlined text-[16px]">{copied ? 'check' : 'content_copy'}</span>
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stats Summary */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 stagger-children">
        {[
          { icon: 'school', label: 'Turmas Ativas', value: turmasList.length.toString(), badge: 'Semestre', badgeColor: 'text-primary-container bg-blue-50', iconBg: 'bg-blue-50', iconColor: 'text-primary-container' },
          { icon: 'group', label: 'Alunos Totais', value: turmasList.reduce((a, t) => a + t.students, 0).toString(), badge: 'Inscritos', badgeColor: 'text-emerald-600 bg-emerald-50', iconBg: 'bg-blue-50', iconColor: 'text-primary-container' },
          { icon: 'description', label: 'Materiais Publicados', value: turmasList.reduce((a, t) => a + t.materials, 0).toString(), badge: 'Partilhados', badgeColor: 'text-orange-600 bg-orange-50', iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
          { icon: 'campaign', label: 'Avisos Ativos', value: turmasList.reduce((a, t) => a + t.announcements, 0).toString(), badge: 'Importantes', badgeColor: 'text-orange-600 bg-orange-50', iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
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

      {/* Turmas Grid */}
      <div>
        <h3 className="text-lg font-bold text-gradient-primary mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 action-gradient rounded-full shadow-sm"></span>
          Turmas Lecionadas
        </h3>

        {!expandedTurma ? (
          /* ═══ GRID VIEW ═══ */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {turmasList.map((turma) => (
              <div
                key={turma.id}
                onClick={() => handleTurmaClick(turma)}
                className="bg-white rounded-xl shadow-premium card-interactive group overflow-hidden cursor-pointer"
              >
                {/* Banner */}
                <div className={`${turma.gradient} p-4 pb-5 relative overflow-hidden`}>
                  <div className="flex items-start justify-between relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/10">
                      <span className="material-symbols-outlined text-white text-[20px]">{turma.icon}</span>
                    </div>
                    {turma.announcements > 0 && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-white/15 backdrop-blur-sm rounded-full text-[9px] font-bold text-white border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                        {turma.announcements} {turma.announcements === 1 ? 'aviso' : 'avisos'}
                      </span>
                    )}
                  </div>
                  <h4 className="text-white font-bold text-[15px] mt-3 leading-tight relative z-10">{turma.nome}</h4>
                  <p className="text-white/70 text-[10px] font-mono mt-1 relative z-10">{turma.code}</p>
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  {/* Next Class */}
                  <div className="flex items-center gap-2.5 mb-3 text-[12px] font-semibold text-primary-container">
                    <span className="material-symbols-outlined text-[16px]">calendar_clock</span>
                    Próxima aula: {turma.nextClass}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex items-center gap-1 text-[10px] text-on-surface-variant font-semibold">
                      <span className="material-symbols-outlined text-[14px]">group</span>
                      {turma.students} alunos
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-on-surface-variant font-semibold">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                      {turma.materials} materiais
                    </span>
                  </div>

                  {/* Last Update */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-outline-variant/10">
                    <span className="text-[10px] text-on-surface-variant">
                      <span className="font-bold">Última atualização:</span> {turma.lastUpdate}
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant/40 group-hover:text-primary-container group-hover:translate-x-0.5 transition-all">arrow_forward</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Create Card */}
            <div
              onClick={() => setShowJoinModal(true)}
              className="border-2 border-dashed border-outline-variant/40 rounded-xl flex flex-col items-center justify-center p-8 text-on-surface-variant hover:bg-orange-50/50 hover:border-orange-300 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-low group-hover:bg-orange-100 flex items-center justify-center mb-3 transition-all">
                <span className="material-symbols-outlined text-[24px] group-hover:text-orange-600 transition-colors">domain_add</span>
              </div>
              <p className="font-bold text-[13px]">Nova Turma</p>
              <p className="text-[10px] opacity-60 mt-1 text-center">Configure um novo espaço<br/>para lecionar</p>
            </div>
          </div>
        ) : (
          /* ═══ EXPANDED TURMA VIEW ═══ */
          <div className="space-y-5 animate-fade-in-up">
            {/* Turma Header */}
            <div className={`${expandedTurma.gradient} rounded-xl p-5 md:p-6 relative overflow-hidden shadow-glow-blue`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setExpandedTurma(null)}
                    className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 shrink-0 border border-white/10"
                  >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                  </button>
                  <div>
                    <h3 className="text-white font-extrabold text-lg leading-tight">{expandedTurma.name}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-white/60 text-[11px] font-mono">{expandedTurma.code}</span>
                      <span className="text-white/40">•</span>
                      <div className="flex items-center gap-1.5 text-white/80 text-[11px] font-semibold">
                         <span className="material-symbols-outlined text-[14px]">calendar_clock</span>
                         Próxima: {expandedTurma.nextClass}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-white text-[11px] font-semibold border border-white/10">
                    <span className="material-symbols-outlined text-[14px]">group</span>
                    {expandedTurma.students} alunos
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-white text-[11px] font-semibold border border-white/10">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                    {expandedTurma.materials} materiais
                  </span>
                  <button 
                    onClick={() => handleArchiveTurma(expandedTurma.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/40 backdrop-blur-sm rounded-lg text-red-50 text-[11px] font-bold border border-red-500/30 transition-all active:scale-95"
                    title="Arquivar Turma"
                  >
                    <span className="material-symbols-outlined text-[14px]">archive</span>
                    <span className="hidden sm:inline">Arquivar</span>
                  </button>
                </div>
              </div>
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/5 rounded-full blur-[40px]"></div>
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-orange-500/10 rounded-full blur-[30px] animate-breathe"></div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-premium card-interactive group cursor-pointer border border-primary-container/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">upload_file</span>
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-primary-container text-[13px]">Novo Material</h5>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">Partilhar PDF ou Documento</p>
                  </div>
                </div>
              </div>
              <div onClick={() => { setShowAvisoForm(!showAvisoForm); setShowAlunosPanel(false); }} className="bg-white p-4 rounded-xl shadow-premium card-interactive group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">campaign</span>
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-primary-container text-[13px]">Criar Aviso</h5>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">Notificar todos os alunos</p>
                  </div>
                </div>
              </div>
              <div onClick={() => { setShowAlunosPanel(!showAlunosPanel); setShowAvisoForm(false); }} className="bg-white p-4 rounded-xl shadow-premium card-interactive group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">group</span>
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-primary-container text-[13px]">Gerenciar Alunos</h5>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">Aprovar acessos e ver métricas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Aviso Form Panel */}
            {showAvisoForm && (
              <div className="bg-white rounded-xl shadow-premium border border-orange-100 p-5 animate-fade-in-up">
                <div className="flex items-center gap-2 mb-3 text-orange-600">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
                  <h4 className="font-bold text-[14px]">Escrever Novo Aviso</h4>
                </div>
                <textarea
                  value={avisoText}
                  onChange={(e) => setAvisoText(e.target.value)}
                  placeholder="Ex: A prova de amanhã será movida para a sala 12..."
                  className="w-full bg-surface-container-lowest rounded-xl px-4 py-3 focus:ring-1 focus:ring-orange-500/30 text-on-surface placeholder:text-outline-variant/50 resize-none min-h-[100px] border border-outline-variant/20 focus:border-orange-500/20 outline-none transition-all text-[13px]"
                ></textarea>
                <div className="flex justify-end gap-2 mt-3">
                  <button 
                    onClick={() => setShowAvisoForm(false)}
                    className="px-4 py-2 rounded-lg text-on-surface-variant font-bold hover:bg-surface-container-low transition-all text-[12px]"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handlePublishAviso}
                    className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-sm active:scale-[0.98] transition-all text-[12px] flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    Publicar Aviso
                  </button>
                </div>
              </div>
            )}

            {/* Alunos Panel */}
            {showAlunosPanel && (
              <div className="bg-white rounded-xl shadow-premium border border-outline-variant/5 p-5 animate-fade-in-up">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-primary-container">
                    <span className="material-symbols-outlined text-[20px]">analytics</span>
                    <h4 className="font-bold text-[14px]">Métricas de Acesso à Turma</h4>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-primary-container text-[11px] font-bold rounded-lg border border-blue-100">
                    {expandedTurma.students} {expandedTurma.students === 1 ? 'Aluno no total' : 'Alunos no total'}
                  </span>
                </div>
                
                {/* Acessos Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10 hover:border-primary-container/20 transition-all card-interactive">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Hoje</p>
                    <p className="text-xl font-black text-gradient-primary">{expandedTurma.students > 0 ? Math.max(1, Math.floor(expandedTurma.students * 0.15)) : 0}</p>
                    <p className="text-[9px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5"><span className="material-symbols-outlined text-[10px]">trending_up</span> Acessos recentes</p>
                  </div>
                  <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10 hover:border-primary-container/20 transition-all card-interactive">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Esta Semana</p>
                    <p className="text-xl font-black text-gradient-primary">{expandedTurma.students > 0 ? Math.max(1, Math.floor(expandedTurma.students * 0.4)) : 0}</p>
                    <p className="text-[9px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5"><span className="material-symbols-outlined text-[10px]">trending_up</span> Acessos frequentes</p>
                  </div>
                  <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10 hover:border-primary-container/20 transition-all card-interactive">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Este Mês</p>
                    <p className="text-xl font-black text-gradient-primary">{expandedTurma.students > 0 ? Math.max(1, Math.floor(expandedTurma.students * 0.8)) : 0}</p>
                    <p className="text-[9px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5"><span className="material-symbols-outlined text-[10px]">trending_up</span> Acessos acumulados</p>
                  </div>
                  <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10 hover:border-primary-container/20 transition-all card-interactive">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Este Ano</p>
                    <p className="text-xl font-black text-gradient-primary">{expandedTurma.students}</p>
                    <p className="text-[9px] text-on-surface-variant font-semibold mt-1">Total de inscritos</p>
                  </div>
                </div>
                
                {expandedTurma.students === 0 ? (
                  <div className="py-8 text-center bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant/30">
                    <span className="material-symbols-outlined text-[32px] text-outline-variant/50 mb-2">person_off</span>
                    <p className="text-[12px] font-bold text-on-surface-variant">Nenhum aluno inscrito ainda.</p>
                    <p className="text-[10px] text-on-surface-variant/70 mt-1">Partilhe o código da turma ({expandedTurma.code}) para que eles possam aderir.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {Array.from({ length: Math.min(expandedTurma.students, 5) }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/10 hover:border-primary-container/20 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary-container font-bold text-[11px] shrink-0">
                            {String.fromCharCode(65 + i)}
                          </div>
                          <div>
                            <p className="text-[12px] font-bold text-primary-container">Aluno {i + 1}</p>
                            <p className="text-[10px] text-on-surface-variant">aluno{i+1}@autick.edu.pt</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold">Ativo</span>
                      </div>
                    ))}
                    {expandedTurma.students > 5 && (
                      <button className="w-full py-2.5 mt-2 text-[11px] font-bold text-primary-container hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                        Ver todos os {expandedTurma.students} alunos
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Recent Announcement Display (if exists) */}
            {expandedTurma.recentAnnouncement && !showAvisoForm && (
              <div className="bg-gradient-to-r from-orange-50/80 to-transparent p-4 rounded-xl border border-orange-100/50 flex items-start gap-3 animate-fade-in-up">
                <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-orange-600 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-[13px] font-bold text-orange-800">Aviso Publicado</h4>
                    <span className="text-[9px] text-on-surface-variant font-semibold bg-white/50 px-2 py-0.5 rounded border border-orange-200/50">Agora mesmo</span>
                  </div>
                  <p className="text-[12px] text-on-surface leading-snug mt-1.5">
                    {expandedTurma.recentAnnouncement}
                  </p>
                </div>
              </div>
            )}

            {/* Materials List */}
            <div className="bg-white rounded-xl shadow-premium overflow-hidden border border-outline-variant/5">
              <div className="p-4 md:p-5 border-b border-outline-variant/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary-container text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>folder_open</span>
                  <h4 className="font-bold text-primary-container text-[14px]">Materiais Publicados</h4>
                  <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-md">{expandedTurma.pdfs.length} PDFs</span>
                </div>
              </div>

              <div className="divide-y divide-outline-variant/8">
                {expandedTurma.pdfs.map((pdf, i) => (
                  <div
                    key={pdf.name}
                    className="flex items-center gap-3 md:gap-4 p-4 hover:bg-surface-container-low/50 transition-all group cursor-pointer"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {/* PDF Icon */}
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                      <span className="material-symbols-outlined text-red-500 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>picture_as_pdf</span>
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <h5 className="text-[13px] font-bold text-primary-container truncate group-hover:text-primary transition-colors">{pdf.name}</h5>
                      <div className="flex items-center gap-2.5 mt-0.5">
                        <span className="text-[10px] text-on-surface-variant">{pdf.date}</span>
                        <span className="text-on-surface-variant/30">•</span>
                        <span className="text-[10px] text-on-surface-variant">{pdf.size}</span>
                        <span className="text-on-surface-variant/30">•</span>
                        <span className="text-[10px] text-on-surface-variant">{pdf.pages} páginas</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-blue-50 text-on-surface-variant hover:text-primary-container transition-all active:scale-95" title="Editar Metadados">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-50 text-on-surface-variant hover:text-red-600 transition-all active:scale-95" title="Remover Material">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

