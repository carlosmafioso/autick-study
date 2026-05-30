"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';
import CircularProgress from '../../../components/ui/CircularProgress';
import { useToast } from '../../../components/ToastProvider';

export default function AnaliseDePerformance() {
  const { user } = useAuth();
  const { showToast } = useToast();
  
  const [metrics, setMetrics] = useState([]);
  const [classesStats, setClassesStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMetrics();
    }
  }, [user]);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      // Fetch user metrics joined with classes
      const { data, error } = await supabase
        .from('student_daily_metrics')
        .select(`
          date,
          study_time_seconds,
          quizzes_attempted,
          quizzes_correct,
          pdfs_read,
          ai_consultations,
          difficulties,
          class_id,
          classes ( name )
        `)
        .eq('student_id', user.id)
        .order('date', { ascending: true });

      if (error) throw error;

      setMetrics(data || []);

      // Aggregate per class
      const classAggr = {};
      data?.forEach(row => {
        if (!row.class_id) return;
        const cName = row.classes?.name || 'Geral';
        if (!classAggr[row.class_id]) {
          classAggr[row.class_id] = {
            id: row.class_id,
            name: cName,
            time: 0,
            attempted: 0,
            correct: 0,
            difficulties: []
          };
        }
        classAggr[row.class_id].time += row.study_time_seconds;
        classAggr[row.class_id].attempted += row.quizzes_attempted;
        classAggr[row.class_id].correct += row.quizzes_correct;
        if (row.difficulties && Array.isArray(row.difficulties)) {
          classAggr[row.class_id].difficulties.push(...row.difficulties);
        }
      });

      setClassesStats(classAggr);
    } catch (err) {
      console.error(err);
      showToast('Erro ao carregar métricas de desempenho.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Calculate aggregations
  const totalAttempted = metrics.reduce((acc, curr) => acc + curr.quizzes_attempted, 0);
  const totalCorrect = metrics.reduce((acc, curr) => acc + curr.quizzes_correct, 0);
  const masteryPercentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  
  const totalStudyTime = metrics.reduce((acc, curr) => acc + curr.study_time_seconds, 0);
  const studyHours = Math.floor(totalStudyTime / 3600);
  
  const totalPdfs = metrics.reduce((acc, curr) => acc + curr.pdfs_read, 0);
  const totalAi = metrics.reduce((acc, curr) => acc + curr.ai_consultations, 0);

  // Determine weakest class
  const classArray = Object.values(classesStats);
  let weakestClass = null;
  let lowestScore = 100;
  
  classArray.forEach(c => {
    if (c.attempted >= 5) { // Only count if there's enough data
      const score = Math.round((c.correct / c.attempted) * 100);
      if (score < lowestScore) {
        lowestScore = score;
        weakestClass = c;
      }
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-5 stagger-children max-w-[1400px] mx-auto">
      {/* Mastery Circular Chart - Compact */}
      <div className="col-span-12 lg:col-span-4 bg-white rounded-xl p-4 md:p-6 flex flex-col items-center justify-center relative overflow-hidden card-hover shadow-premium">
        <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full animate-breathe"></div>
        <h3 className="w-full text-left text-gradient-primary font-headline text-base font-bold mb-4">Domínio Geral (Quizzes)</h3>
        <div className="relative w-36 h-36 flex items-center justify-center">
          <CircularProgress 
            percentage={masteryPercentage} 
            size={144} 
            strokeWidth={8} 
            colorClass={masteryPercentage > 60 ? "text-emerald-500" : masteryPercentage > 40 ? "text-orange-500" : "text-red-500"} 
            dropShadow={`drop-shadow(0 2px 4px ${masteryPercentage > 60 ? 'rgba(16,185,129,0.3)' : 'rgba(255,109,0,0.3)'})`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-gradient-primary">{masteryPercentage}%</span>
              <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-0.5">Acertos</span>
            </div>
          </CircularProgress>
        </div>
        <p className="mt-4 text-[13px] text-on-surface-variant text-center leading-sm">
          {totalAttempted === 0 ? "Sem dados suficientes." : `Você acertou ${totalCorrect} de ${totalAttempted} questões.`}
        </p>
      </div>

      {/* Basic Metrics - Replaces Graph for real DB metrics */}
      <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-premium flex flex-col justify-between card-hover">
          <div className="flex justify-between items-start mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">timer</span></div>
          </div>
          <div>
            <h4 className="text-2xl font-black text-gradient-primary">{studyHours}h</h4>
            <p className="text-[11px] font-bold text-on-surface-variant mt-1 uppercase tracking-wider">Tempo de Uso</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-5 shadow-premium flex flex-col justify-between card-hover">
          <div className="flex justify-between items-start mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">task_alt</span></div>
          </div>
          <div>
            <h4 className="text-2xl font-black text-gradient-primary">{totalAttempted}</h4>
            <p className="text-[11px] font-bold text-on-surface-variant mt-1 uppercase tracking-wider">Quizzes Feitos</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-premium flex flex-col justify-between card-hover">
          <div className="flex justify-between items-start mb-2">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>picture_as_pdf</span></div>
          </div>
          <div>
            <h4 className="text-2xl font-black text-gradient-primary">{totalPdfs}</h4>
            <p className="text-[11px] font-bold text-on-surface-variant mt-1 uppercase tracking-wider">PDFs Lidos</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-premium flex flex-col justify-between card-hover">
          <div className="flex justify-between items-start mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">smart_toy</span></div>
          </div>
          <div>
            <h4 className="text-2xl font-black text-gradient-primary">{totalAi}</h4>
            <p className="text-[11px] font-bold text-on-surface-variant mt-1 uppercase tracking-wider">Consultas IA</p>
          </div>
        </div>
      </div>

      {/* Left Column (Insight) */}
      <div className="col-span-12 lg:col-span-4 space-y-5">
        <div className="rounded-xl p-6 text-white relative overflow-hidden group kinetic-gradient shadow-glow-blue card-hover">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
          <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-orange-500/10 rounded-full group-hover:scale-150 transition-transform duration-700 animate-breathe"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <span className="material-symbols-outlined text-orange-300 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              </div>
              <h3 className="font-headline text-base font-bold">Insight da IA</h3>
            </div>
            <p className="text-blue-100/90 leading-snug mb-5 font-medium text-[13px]">
              {weakestClass 
                ? `Você está tendo mais dificuldade em "${weakestClass.name}" (Taxa de acerto de ${lowestScore}%). Recomendamos revisar os PDFs desta disciplina antes de tentar novos quizzes.` 
                : totalAttempted === 0 
                  ? "Resolva alguns quizzes para que eu possa identificar onde você precisa de mais foco e te dar recomendações personalizadas."
                  : "Você está indo super bem nas disciplinas avaliadas! Continue explorando os quizzes para manter a consistência."}
            </p>
            {weakestClass && (
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all text-white text-[11px] font-bold py-2.5 px-4 rounded-lg border border-white/15 hover:border-white/30 hover:scale-105 active:scale-95 w-full">
                Revisar Materiais de {weakestClass.name} →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Subject Cards Section - Dynamic */}
      <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-4 md:p-6 shadow-premium">
        <h3 className="text-gradient-primary text-base font-bold mb-6">Desempenho por Disciplina</h3>
        <div className="space-y-4">
          {classArray.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant text-[13px]">
              Você ainda não gerou métricas por turma. Assista a aulas e faça quizzes para popular os dados.
            </div>
          ) : (
            classArray.map((item) => {
              const perc = item.attempted > 0 ? Math.round((item.correct / item.attempted) * 100) : 0;
              const isWeak = perc < 50;
              return (
                <div key={item.id} className="flex flex-col sm:grid sm:grid-cols-12 items-start sm:items-center gap-1.5 sm:gap-3 p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
                  <div className="w-full sm:col-span-4 flex justify-between sm:block">
                    <span className="text-[12px] font-bold text-on-surface-variant truncate tracking-wide">{item.name}</span>
                    <span className={`sm:hidden text-[13px] font-black tracking-tighter ${isWeak ? 'text-orange-600' : 'text-primary-container'}`}>{perc}%</span>
                  </div>
                  <div className="w-full sm:col-span-7 h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className={`h-full ${isWeak ? 'bg-orange-500' : 'kinetic-gradient'} rounded-full transition-all duration-1000`} style={{ width: `${perc}%` }}></div>
                  </div>
                  <span className={`hidden sm:block col-span-1 text-[13px] font-black tracking-tighter ${isWeak ? 'text-orange-600' : 'text-primary-container'}`}>{perc}%</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

