"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../components/ToastProvider';

export default function BibliotecaDeConteudo() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [foldersList, setFoldersList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeFolder, setActiveFolder] = useState(null);
  const [viewingPdf, setViewingPdf] = useState(null);

  useEffect(() => {
    if (user) fetchBiblioteca();
  }, [user]);

  const fetchBiblioteca = async () => {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          classes (
            id, name,
            documents (id, title, file_path, created_at)
          )
        `)
        .eq('student_id', user.id);

      if (error) throw error;

      const formattedFolders = data
        .filter(e => e.classes)
        .map(e => {
          const t = e.classes;
          return {
            id: t.id,
            name: t.name,
            icon: 'folder',
            color: 'bg-blue-50 text-primary-container hover:bg-primary-container hover:text-white',
            materials: (t.documents || []).map(doc => ({
              id: doc.id,
              name: doc.title,
              type: 'PDF',
              size: formatBytes(doc.size || 0),
              added: new Date(doc.created_at).toLocaleDateString('pt-PT'),
              path: doc.file_path,
              cover: 'https://images.unsplash.com/photo-1544716278-e513176f20b5?q=80&w=1973&auto=format&fit=crop'
            }))
          };
        });

      setFoldersList(formattedFolders);
    } catch (err) {
      console.error(err);
      showToast('Erro ao carregar a biblioteca.', 'error');
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

  const handleDeleteFolder = (e, id) => {
    e.stopPropagation();
    showToast('Pastas são geradas automaticamente das turmas e não podem ser apagadas manualmente.', 'info');
  };

  // View: PDF Viewer
  if (viewingPdf) {
    return (
      <div className="flex flex-col h-[calc(100vh-100px)] animate-fade-in-up">
        {/* Viewer Header */}
        <div className="bg-white rounded-t-xl p-4 border-b border-outline-variant/20 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setViewingPdf(null)}
              className="p-2 rounded-lg hover:bg-surface-container-low text-on-surface-variant transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-red-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>picture_as_pdf</span>
              </div>
              <div>
                <h4 className="font-bold text-primary-container text-[13px] sm:text-[14px] leading-tight truncate max-w-[120px] sm:max-w-xs">{viewingPdf.name}</h4>
                <p className="text-[10px] sm:text-[11px] text-on-surface-variant mt-0.5 truncate max-w-[120px] sm:max-w-xs">{viewingPdf.size} • {activeFolder?.name}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/30 hover:bg-blue-50 hover:text-primary-container transition-all text-[11px] font-bold text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">edit_note</span>
              <span className="hidden sm:inline">Anotar</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/30 hover:bg-orange-50 hover:text-orange-600 transition-all text-[11px] font-bold text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">quiz</span>
              <span className="hidden sm:inline">Gerar Quiz</span>
            </button>
          </div>
        </div>

        {/* Fake PDF Viewer Body */}
        <div className="flex-1 bg-surface-container-high rounded-b-xl overflow-hidden relative shadow-inner">
          <div className="absolute inset-0 flex flex-col items-center p-4 sm:p-8 overflow-y-auto hide-scrollbar gap-4 sm:gap-6">
            {/* PDF Page 1 Simulation */}
            <div className="w-full max-w-3xl bg-white shadow-lg aspect-[1/1.4] relative p-6 sm:p-12">
              <div className="absolute top-0 left-0 w-full h-2 kinetic-gradient opacity-80"></div>
              <h1 className="text-xl sm:text-3xl font-bold text-slate-800 mb-4 sm:mb-8 border-b-2 border-slate-200 pb-2 sm:pb-4">
                Capítulo: Introdução
              </h1>
              <div className="space-y-4">
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-11/12"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-10/12"></div>
                <br/>
                <div className="h-48 bg-slate-50 border border-slate-200 rounded flex items-center justify-center text-slate-400">
                  [Gráfico Explicativo]
                </div>
                <br/>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-9/12"></div>
              </div>
            </div>
            
            {/* PDF Page 2 Simulation */}
            <div className="w-full max-w-3xl bg-white shadow-lg aspect-[1/1.4] relative p-6 sm:p-12">
              <div className="space-y-4 mt-4 sm:mt-8">
                 <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-11/12"></div>
                 <div className="h-4 bg-slate-100 rounded w-8/12"></div>
              </div>
            </div>
          </div>
          
          {/* Floating Toolbar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full shadow-lg border border-outline-variant/20 flex items-center gap-2 sm:gap-4 w-[90%] sm:w-auto justify-between sm:justify-center">
            <button className="text-on-surface-variant hover:text-primary-container p-1"><span className="material-symbols-outlined text-[20px] sm:text-[24px]">zoom_out</span></button>
            <span className="text-[11px] sm:text-[12px] font-bold">100%</span>
            <button className="text-on-surface-variant hover:text-primary-container p-1"><span className="material-symbols-outlined text-[20px] sm:text-[24px]">zoom_in</span></button>
            <div className="w-px h-4 bg-outline-variant/40 mx-1 sm:mx-0"></div>
            <button className="text-on-surface-variant hover:text-primary-container p-1"><span className="material-symbols-outlined text-[20px] sm:text-[24px]">navigate_before</span></button>
            <span className="text-[11px] sm:text-[12px] font-bold">1 / 14</span>
            <button className="text-on-surface-variant hover:text-primary-container p-1"><span className="material-symbols-outlined text-[20px] sm:text-[24px]">navigate_next</span></button>
          </div>
        </div>
      </div>
    );
  }

  // View: Folder Contents
  if (activeFolder) {
    return (
      <div className="space-y-6 stagger-children max-w-[1400px] mx-auto w-full animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveFolder(null)}
            className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-on-surface-variant hover:text-primary-container hover:bg-blue-50 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="material-symbols-outlined text-[18px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Pasta da Turma</span>
            </div>
            <h3 className="text-2xl font-extrabold text-gradient-primary leading-tight">{activeFolder.name}</h3>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {activeFolder.materials.length === 0 ? (
             <div className="col-span-full py-12 flex flex-col items-center justify-center text-center opacity-60">
                <span className="material-symbols-outlined text-4xl mb-3">folder_open</span>
                <p className="font-bold">Pasta vazia</p>
                <p className="text-[12px]">Nenhum material importado desta turma ainda.</p>
             </div>
          ) : (
            activeFolder.materials.map((mat) => (
              <div 
                key={mat.id} 
                onClick={() => setViewingPdf(mat)}
                className="bg-white rounded-xl shadow-premium card-interactive group overflow-hidden flex flex-col"
              >
                {/* PDF Cover simulation */}
                <div className="aspect-video relative overflow-hidden bg-surface-container-low border-b border-outline-variant/10">
                  <img src={mat.cover} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-red-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>picture_as_pdf</span>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-[13px] text-primary-container leading-snug line-clamp-2 group-hover:text-primary transition-colors">{mat.name}</h4>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-outline-variant/10">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{mat.size}</span>
                    <span className="text-[10px] text-on-surface-variant">{mat.added}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // View: Root (Folders)
  return (
    <div className="space-y-6 stagger-children max-w-[1400px] mx-auto w-full animate-fade-in-up">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-gradient-primary">Biblioteca</h3>
          <p className="text-on-surface-variant text-[13px] mt-0.5">Os seus materiais são organizados automaticamente por turma.</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 rounded-xl border border-blue-100/50 flex items-start gap-3 shadow-sm">
        <span className="material-symbols-outlined text-primary-container shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
        <div>
          <p className="text-[12px] text-primary-container font-semibold leading-snug">Integração Automática</p>
          <p className="text-[11px] text-on-surface-variant mt-0.5">
            Pastas são criadas automaticamente quando se inscreve numa turma. Para adicionar PDFs à sua biblioteca, importe-os diretamente na aba <strong className="text-primary-container">Turmas</strong>.
          </p>
        </div>
      </div>

      {/* Folders Grid */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
        </div>
      ) : foldersList.length === 0 ? (
        <div className="text-center py-12 opacity-60">
          <p className="font-bold text-[14px]">Nenhuma turma encontrada</p>
          <p className="text-[12px]">Inscreva-se em turmas para ver os materiais aqui.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {foldersList.map((folder) => (
            <div 
              key={folder.id} 
              onClick={() => setActiveFolder(folder)}
              className="bg-white p-5 rounded-xl flex flex-col gap-4 shadow-premium card-interactive group border border-transparent hover:border-primary-container/10 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${folder.color}`}>
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
                </div>
                <button 
                  onClick={(e) => handleDeleteFolder(e, folder.id)}
                  className="p-1.5 rounded-lg text-on-surface-variant opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-500"
                  title="Apagar Pasta"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-primary-container truncate">{folder.name}</h4>
                <p className="text-[12px] text-on-surface-variant mt-1">{folder.materials.length} {folder.materials.length === 1 ? 'material' : 'materiais'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

