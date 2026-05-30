"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function ProfessorDashboard() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({
    turmas: 0,
    alunos: 0,
    ultimoMaterial: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchDashboardData() {
      try {
        // 1. Get classes count
        const { data: classes, error: classesError } = await supabase
          .from('classes')
          .select('id')
          .eq('professor_id', user.id);
        
        if (classesError) throw classesError;
        
        const classIds = classes.map(c => c.id);

        // 2. Get total students enrolled in these classes
        let totalAlunos = 0;
        if (classIds.length > 0) {
          const { count: enrollmentsCount, error: enrollError } = await supabase
            .from('enrollments')
            .select('*', { count: 'exact', head: true })
            .in('class_id', classIds);
          if (enrollError) throw enrollError;
          totalAlunos = enrollmentsCount || 0;
        }

        // 3. Get latest material
        let ultimoMaterial = null;
        if (classIds.length > 0) {
           const { data: latestDoc, error: docError } = await supabase
            .from('documents')
            .select('title, created_at, classes(name)')
            .in('class_id', classIds)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
           
           if (latestDoc) ultimoMaterial = latestDoc;
        }

        setStats({
          turmas: classes.length,
          alunos: totalAlunos,
          ultimoMaterial
        });

      } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div></div>;
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full stagger-children">
      {/* Hero Section: Último Upload de Material */}
      <section className="relative overflow-hidden rounded-xl kinetic-gradient p-5 md:p-8 text-white flex flex-col md:flex-row justify-between items-center gap-5 md:gap-6 shadow-glow-blue">
        <div className="z-10 space-y-4 max-w-lg w-full">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-md text-[10px] font-bold tracking-widest uppercase border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
            Material Recente
          </span>
          <h3 className="text-2xl font-extrabold leading-tight">
            {stats.ultimoMaterial ? stats.ultimoMaterial.title : 'Nenhum material publicado'}
          </h3>
          <p className="text-blue-100/80 font-medium text-[13px] leading-relaxed">
            {stats.ultimoMaterial 
              ? `Último material de estudo adicionado recentemente para a turma ${stats.ultimoMaterial.classes?.name}.` 
              : 'Comece partilhando materiais para os seus alunos.'}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
            <button 
              onClick={() => router.push('/professor/materiais')}
              className="action-gradient text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-glow-orange active:scale-95 flex-1"
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
              Ver Materiais
            </button>
            <button 
              onClick={() => router.push('/professor/materiais')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/15 hover:border-white/30 px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex-1 text-center justify-center"
            >
              Adicionar Novo
            </button>
          </div>
        </div>
        <div className="relative w-full md:w-[35%] aspect-video rounded-xl overflow-hidden shadow-xl z-10 group">
          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" alt="Class session" />
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
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Ativos</span>
          </div>
          <div>
            <h4 className="text-2xl font-black text-gradient-primary">{stats.turmas}</h4>
            <p className="text-on-surface-variant text-[11px] font-semibold mt-0.5">Turmas Lecionadas</p>
          </div>
        </div>
        
        {/* Stat Card 2 */}
        <div className="bg-white p-5 rounded-xl flex flex-col justify-between card-interactive shadow-premium">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_ind</span>
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-black text-gradient-accent">{stats.alunos}</h4>
            <p className="text-on-surface-variant text-[11px] font-semibold mt-0.5">Alunos Totais</p>
          </div>
        </div>
        
        {/* Stat Card 3 - Progress */}
        <div className="md:col-span-2 bg-white p-5 rounded-xl relative overflow-hidden group card-hover shadow-premium">
          <div className="flex justify-between items-center relative z-10">
            <div>
              <h4 className="text-base font-bold text-gradient-primary">Taxa de Entrega</h4>
              <p className="text-on-surface-variant text-[11px] mt-0.5">Média global de entregas nos trabalhos práticos.</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-gradient-accent">--%</span>
            </div>
          </div>
          <div className="mt-4 h-2 bg-surface-container-high rounded-full overflow-hidden relative z-10">
            <div className="h-full bg-slate-300 rounded-full transition-all duration-1000" style={{ width: '0%' }}></div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/3 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
        </div>
      </section>
    </div>
  );
}

