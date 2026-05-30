"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../components/ToastProvider';

export default function MinhasTurmas() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [turmasList, setTurmasList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expandedTurma, setExpandedTurma] = useState(null);
  const [joinCode, setJoinCode] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [importedPdfs, setImportedPdfs] = useState({});

  useEffect(() => {
    if (user) fetchTurmas();
  }, [user]);

  const fetchTurmas = async () => {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          class_id,
          classes (
            id, name, access_code, created_at, status,
            profiles:professor_id (name, avatar_url),
            enrollments (count),
            documents (title, file_path, created_at),
            class_announcements (message, created_at)
          )
        `)
        .eq('student_id', user.id);

      if (error) throw error;

      const formatted = data
        .filter(e => e.classes && e.classes.status === 'active')
        .map(e => {
          const t = e.classes;
          const announcements = t.class_announcements || [];
          const recentAviso = announcements.length > 0 
            ? announcements.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))[0]
            : null;

          return {
            id: t.id,
            nome: t.name,
            name: t.name,
            code: t.access_code,
            professor: t.profiles?.name || 'Professor',
            professorAvatar: t.profiles?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=prof',
            students: t.enrollments[0]?.count || 0,
            materials: t.documents?.length || 0,
            lastUpdate: new Date(t.created_at).toLocaleDateString('pt-PT'),
            gradient: 'action-gradient',
            icon: 'school',
            announcements: announcements.length,
            recentAnnouncement: recentAviso,
            pdfs: (t.documents || []).map(doc => ({
              name: doc.title,
              date: new Date(doc.created_at).toLocaleDateString('pt-PT'),
              size: formatBytes(doc.size || 0),
              pages: '?',
              path: doc.file_path
            }))
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

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleJoinTurma = async () => {
    if (!joinCode.trim()) return;

    try {
      // 1. Find class by code
      const { data: classData, error: classError } = await supabase
        .from('classes')
        .select('id')
        .eq('access_code', joinCode.trim().toUpperCase())
        .eq('status', 'active')
        .single();

      if (classError || !classData) {
        showToast('Código inválido ou turma inativa.', 'error');
        return;
      }

      // 2. Insert enrollment
      const { error: enrollError } = await supabase.from('enrollments').insert({
        class_id: classData.id,
        student_id: user.id
      });

      if (enrollError) {
        if (enrollError.code === '23505') {
          showToast('Você já está inscrito nesta turma.', 'info');
        } else {
          throw enrollError;
        }
      } else {
        showToast('Inscrito na turma com sucesso!', 'success');
        setJoinCode('');
        setShowJoinModal(false);
        fetchTurmas();
      }
    } catch (err) {
      console.error(err);
      showToast('Erro ao entrar na turma.', 'error');
    }
  };

  const handleLeaveTurma = async (id) => {
    if(window.confirm('Tem a certeza que deseja sair desta turma? Todos os materiais associados também desaparecerão.')){
      try {
        const { error } = await supabase
          .from('enrollments')
          .delete()
          .eq('class_id', id)
          .eq('student_id', user.id);

        if (error) throw error;
        
        setTurmasList(prev => prev.filter(t => t.id !== id));
        setExpandedTurma(null);
        showToast('Saiu da turma.', 'success');
      } catch (err) {
        console.error(err);
        showToast('Erro ao sair da turma.', 'error');
      }
    }
  };

  const handleImport = (e, pdfName) => {
    e.stopPropagation();
    setImportedPdfs(prev => ({ ...prev, [pdfName]: true }));
    showToast('Funcionalidade de importação para biblioteca pessoal em desenvolvimento.', 'info');
  };

  const handleTurmaClick = (turma) => {
    setExpandedTurma(expandedTurma?.id === turma.id ? null : turma);
  };

  return (
    <div className="space-y-6 stagger-children max-w-[1400px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-5 md:p-6 rounded-xl shadow-premium border border-outline-variant/5">
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-extrabold text-gradient-primary">Minhas Turmas</h3>
          <p className="text-on-surface-variant text-[13px] mt-0.5">Aceda aos materiais partilhados pelos professores.</p>
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
            <span className="material-symbols-outlined text-lg">group_add</span>
            <span className="text-[13px]">Entrar numa Turma</span>
          </button>
        </div>
      </div>

      {/* Join Modal (inline) */}
      {showJoinModal && (
        <div className="bg-white rounded-xl p-5 shadow-premium-lg border border-outline-variant/10 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg action-gradient flex items-center justify-center shadow-glow-orange">
              <span className="material-symbols-outlined text-white text-lg">vpn_key</span>
            </div>
            <div>
              <h4 className="font-bold text-primary-container text-[14px]">Entrar numa Turma</h4>
              <p className="text-[11px] text-on-surface-variant">Insira o código fornecido pelo seu professor</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Ex: SO-2024-A"
              className="flex-1 px-4 py-2.5 rounded-lg border border-outline-variant/30 text-[13px] text-on-surface bg-surface-container-low placeholder:text-outline-variant/50 focus:ring-1 focus:ring-primary-container/30 focus:border-primary-container/20 outline-none transition-all font-mono tracking-wider w-full"
            />
            <div className="flex gap-2.5">
              <button 
                onClick={handleJoinTurma}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg action-gradient text-white font-bold shadow-glow-orange hover:brightness-110 active:scale-[0.98] transition-all text-[13px]"
              >
                Entrar
              </button>
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-outline-variant/30 text-on-surface-variant font-bold hover:bg-surface-container-low transition-all text-[13px]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 stagger-children">
        {[
          { icon: 'school', label: 'Turmas Ativas', value: turmasList.length.toString(), badge: 'Semestre', badgeColor: 'text-primary-container bg-blue-50', iconBg: 'bg-blue-50', iconColor: 'text-primary-container' },
          { icon: 'description', label: 'Total de PDFs', value: turmasList.reduce((a, t) => a + t.materials, 0).toString(), badge: 'Materiais', badgeColor: 'text-orange-600 bg-orange-50', iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
          { icon: 'group', label: 'Professores', value: turmasList.length.toString(), badge: 'Ativos', badgeColor: 'text-emerald-600 bg-emerald-50', iconBg: 'bg-blue-50', iconColor: 'text-primary-container' },
          { icon: 'notifications_active', label: 'Novos Avisos', value: turmasList.reduce((a, t) => a + t.announcements, 0).toString(), badge: 'Pendentes', badgeColor: 'text-orange-600 bg-orange-50', iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
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
          Turmas Inscritas
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
                  {/* Professor */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-primary-container/10 ring-offset-1 ring-offset-white shrink-0">
                      <img src={turma.professorAvatar} alt={turma.professor} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[12px] font-semibold text-primary-container truncate">{turma.professor}</span>
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
                      <span className="font-bold">Último material:</span> {turma.lastUpdate}
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant/40 group-hover:text-primary-container group-hover:translate-x-0.5 transition-all">arrow_forward</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Join Card */}
            <div
              onClick={() => setShowJoinModal(true)}
              className="border-2 border-dashed border-outline-variant/40 rounded-xl flex flex-col items-center justify-center p-8 text-on-surface-variant hover:bg-orange-50/50 hover:border-orange-300 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-low group-hover:bg-orange-100 flex items-center justify-center mb-3 transition-all">
                <span className="material-symbols-outlined text-[24px] group-hover:text-orange-600 transition-colors">group_add</span>
              </div>
              <p className="font-bold text-[13px]">Entrar numa Turma</p>
              <p className="text-[10px] opacity-60 mt-1 text-center">Insira o código fornecido<br/>pelo professor</p>
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
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-white/20">
                          <img src={expandedTurma.professorAvatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-white/80 text-[11px] font-semibold">{expandedTurma.professor}</span>
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
                    onClick={() => handleLeaveTurma(expandedTurma.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/40 backdrop-blur-sm rounded-lg text-red-50 text-[11px] font-bold border border-red-500/30 transition-all active:scale-95"
                    title="Sair da Turma"
                  >
                    <span className="material-symbols-outlined text-[14px]">logout</span>
                    <span className="hidden sm:inline">Sair</span>
                  </button>
                </div>
              </div>
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/5 rounded-full blur-[40px]"></div>
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-orange-500/10 rounded-full blur-[30px] animate-breathe"></div>
            </div>

            {/* Announcements */}
            {expandedTurma.recentAnnouncement && (
              <div className="bg-gradient-to-r from-orange-50/80 to-transparent p-4 rounded-xl border border-orange-100/50 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-orange-600 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-[13px] font-bold text-orange-800">Aviso do Professor</h4>
                  <p className="text-[12px] text-on-surface leading-snug mt-1">
                    {expandedTurma.recentAnnouncement.message}
                  </p>
                  <span className="text-[9px] text-on-surface-variant font-semibold mt-2 block">
                    Publicado em {new Date(expandedTurma.recentAnnouncement.created_at).toLocaleDateString('pt-PT')}
                  </span>
                </div>
              </div>
            )}

            {/* Materials List */}
            <div className="bg-white rounded-xl shadow-premium overflow-hidden">
              <div className="p-4 md:p-5 border-b border-outline-variant/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary-container text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>folder_open</span>
                  <h4 className="font-bold text-primary-container text-[14px]">Materiais Disponíveis</h4>
                  <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-md">{expandedTurma.pdfs.length} PDFs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary-container transition-all">
                    <span className="material-symbols-outlined text-[18px]">sort</span>
                  </button>
                  <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary-container transition-all">
                    <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  </button>
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
                      <button 
                        onClick={(e) => handleImport(e, pdf.name)}
                        className={`p-2 rounded-lg transition-all active:scale-95 ${importedPdfs[pdf.name] ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-blue-50 text-on-surface-variant hover:text-primary-container'}`} 
                        title={importedPdfs[pdf.name] ? 'Importado para Biblioteca' : 'Adicionar à Biblioteca'}
                      >
                        <span className="material-symbols-outlined text-[18px]" style={importedPdfs[pdf.name] ? { fontVariationSettings: "'FILL' 1" } : {}}>
                          {importedPdfs[pdf.name] ? 'check_circle' : 'library_add'}
                        </span>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-orange-50 text-on-surface-variant hover:text-orange-600 transition-all active:scale-95" title="Gerar Quiz">
                        <span className="material-symbols-outlined text-[18px]">quiz</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                onClick={() => {
                  const allPdfs = {};
                  expandedTurma.pdfs.forEach(p => allPdfs[p.name] = true);
                  setImportedPdfs(prev => ({ ...prev, ...allPdfs }));
                }}
                className="bg-white p-4 rounded-xl shadow-premium card-interactive group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">library_add</span>
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-primary-container text-[13px]">Exportar Todos</h5>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">Enviar tudo para a Biblioteca</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-premium card-interactive group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-primary-container text-[13px]">Gerar Quiz da Turma</h5>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">Quiz com todos os materiais</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-premium card-interactive group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-primary-container text-[13px]">Perguntar ao Assistente</h5>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">Sobre esta disciplina</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

