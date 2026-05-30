"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../components/ToastProvider';

export default function ProfessorConteudo() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);

  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) fetchMateriais();
  }, [user]);

  const fetchMateriais = async () => {
    try {
      const { data, error } = await supabase
        .from('global_materials')
        .select('*')
        .eq('professor_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMateriais(data);
    } catch (err) {
      console.error(err);
      showToast('Erro ao carregar materiais', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      showToast('Por favor, faça upload apenas de ficheiros PDF.', 'error');
      return;
    }

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    try {
      // 1. Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('materials')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Insert into database
      const { error: dbError } = await supabase.from('global_materials').insert({
        professor_id: user.id,
        title: file.name,
        file_path: filePath,
        size: file.size
      });

      if (dbError) throw dbError;

      showToast('Material publicado com sucesso!', 'success');
      fetchMateriais();
    } catch (err) {
      console.error(err);
      showToast('Erro ao fazer upload do material.', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id, filePath) => {
    if (!window.confirm('Tem a certeza que deseja eliminar este material?')) return;

    try {
      // 1. Delete from DB
      const { error: dbError } = await supabase.from('global_materials').delete().eq('id', id);
      if (dbError) throw dbError;

      // 2. Delete from Storage
      const { error: storageError } = await supabase.storage.from('materials').remove([filePath]);
      if (storageError) console.error('Erro ao remover do storage:', storageError);

      showToast('Material removido.', 'success');
      setMateriais(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
      showToast('Erro ao remover material.', 'error');
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full stagger-children">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-5 md:p-6 rounded-xl shadow-premium border border-outline-variant/5 gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-gradient-primary tracking-tight">Material de Aula</h1>
          <p className="text-on-surface-variant mt-0.5 text-[13px] font-medium">Faça upload de PDFs para partilhar com os alunos.</p>
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="action-gradient hover:brightness-110 text-white font-bold py-2 px-4 rounded-lg shadow-glow-orange active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 text-[13px] w-full sm:w-auto disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-lg">upload_file</span>
          {uploading ? 'A enviar...' : 'Novo Material'}
        </button>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="application/pdf" 
        className="hidden" 
      />

      {/* Upload Dropzone */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="bg-white rounded-xl shadow-premium border border-outline-variant/20 p-6 sm:p-8 text-center border-dashed card-interactive hover:border-orange-500/40 transition-all cursor-pointer"
      >
        <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-orange-100">
          <span className="material-symbols-outlined text-[28px] text-orange-500">cloud_upload</span>
        </div>
        <h3 className="text-base font-bold text-gradient-primary mb-1.5">Clique ou arraste ficheiros PDF aqui</h3>
        <p className="text-on-surface-variant mb-6 max-w-md mx-auto text-[12px] font-medium leading-relaxed">
          Suporta apenas PDF no momento. Os materiais ficarão disponíveis para ser associados às suas turmas.
        </p>
        <button className="bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-bold py-2 px-6 rounded-lg border border-outline-variant/30 transition-all shadow-sm text-[13px] pointer-events-none">
          {uploading ? 'A carregar...' : 'Procurar no Computador'}
        </button>
      </div>

      {/* Uploads Recentes */}
      <div className="bg-white p-5 md:p-6 rounded-xl shadow-premium border border-outline-variant/5 stagger-children">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-5 action-gradient rounded-full shadow-sm"></span>
          <h2 className="text-[15px] font-bold text-gradient-primary">Meus Materiais</h2>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="w-6 h-6 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"></div>
          </div>
        ) : materiais.length === 0 ? (
          <div className="text-center py-8 opacity-60">
            <p className="text-[13px] font-bold">Nenhum material encontrado.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {materiais.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/10 hover:bg-surface-container-low/50 hover:border-primary-container/20 transition-all group cursor-pointer">
                <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors shrink-0 bg-red-50 text-red-600 group-hover:bg-red-100">
                    <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-primary-container text-[13px] truncate">{item.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-medium text-on-surface-variant truncate">PDF</span>
                      <span className="text-on-surface-variant/30">•</span>
                      <span className="text-[11px] font-medium text-on-surface-variant shrink-0">{formatBytes(item.size)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 shrink-0 pl-2">
                  <span className="text-[10px] font-semibold text-on-surface-variant hidden sm:block mr-2">
                    {new Date(item.created_at).toLocaleDateString('pt-PT')}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(item.id, item.file_path); }}
                    className="p-1.5 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-100 shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

