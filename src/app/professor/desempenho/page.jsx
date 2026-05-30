"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';
import CircularProgress from '../../../components/ui/CircularProgress';
import { useToast } from '../../../components/ToastProvider';

export default function ProfessorDesempenho() {
  const { user } = useAuth();
  const { showToast } = useToast();
  
  const [metrics, setMetrics] = useState([]);
  const [classesStats, setClassesStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('Todas as Turmas');
  const [classOptions, setClassOptions] = useState([]);

  useEffect(() => {
    if (user) {
      fetchMetrics();
    }
  }, [user]);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      // RLS automatically filters to only show metrics for classes owned by this professor
      const { data, error } = await supabase
        .from('student_daily_metrics')
        .select(`
          date,
          study_time_seconds,
          quizzes_attempted,
          quizzes_correct,
          pdfs_read,
          ai_consultations,
          class_id,
          classes ( name )
        `);

      if (error) throw error;

      setMetrics(data || []);

      // Aggregate per class
      const classAggr = {};
      data?.forEach(row => {
        if (!row.class_id || !row.classes) return;
        const cName = row.classes.name;
        if (!classAggr[row.class_id]) {
          classAggr[row.class_id] = {
            id: row.class_id,
            name: cName,
            time: 0,
            attempted: 0,
            correct: 0,
            pdfs: 0,
            ai: 0,
            students: new Set() // Note: to accurately count unique students, we would need student_id in the query, but we omitted it.
          };
        }
        classAggr[row.class_id].time += row.study_time_seconds;
        classAggr[row.class_id].attempted += row.quizzes_attempted;
        classAggr[row.class_id].correct += row.quizzes_correct;
        classAggr[row.class_id].pdfs += row.pdfs_read;
        classAggr[row.class_id].ai += row.ai_consultations;
      });

      setClassesStats(classAggr);
      setClassOptions(Object.values(classAggr).map(c => c.name));
    } catch (err) {
      console.error(err);
      showToast('Erro ao carregar métricas das turmas.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const classArray = Object.values(classesStats).filter(c => 
    selectedFilter === 'Todas as Turmas' || c.name === selectedFilter
  );

  const totalAttempted = classArray.reduce((acc, curr) => acc + curr.attempted, 0);
  const totalCorrect = classArray.reduce((acc, curr) => acc + curr.correct, 0);
  const masteryPercentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  
  const totalStudyTime = classArray.reduce((acc, curr) => acc + curr.time, 0);
  const studyHours = Math.floor(totalStudyTime / 3600);
  
  const totalPdfs = classArray.reduce((acc, curr) => acc + curr.pdfs, 0);
  const totalAi = classArray.reduce((acc, curr) => acc + curr.ai, 0);

  // Determine weakest class for insight
  const allClassArray = Object.values(classesStats);
  let weakestClass = null;
  let lowestScore = 100;
  
  allClassArray.forEach(c => {
    if (c.attempted >= 5) {
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
    <div className="space-y-6 max-w-[1400px] mx-auto w-full stagger-children">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gradient-primary tracking-tight">Análise de Desempenho</h1>
          <p className="text-on-surface-variant mt-1 text-sm md:text-base font-medium">Visualize as métricas e o progresso geral das suas turmas.</p>
        </div>
        <select 
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="bg-surface-container-low border border-outline-variant/20 text-on-surface rounded-xl px-4 py-2 font-bold focus:outline-none focus:border-primary/50 transition-colors shadow-sm text-sm"
        >
          <option>Todas as Turmas</option>
          {classOptions.map(name => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-12 gap-5 stagger-children">
        {/* Mastery Circular Chart - Compact */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl p-4 md:p-6 flex flex-col items-center justify-center relative overflow-hidden card-hover shadow-premium">
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full animate-breathe"></div>
          <h3 className="w-full text-left text-gradient-primary font-headline text-base font-bold mb-4">Desempenho Médio (Quizzes)</h3>
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
            {totalAttempted > 0 ? `Seus alunos acertaram ${totalCorrect} de ${totalAttempted} questões.` : "Aguardando submissões dos alunos."}
          </p>
        </div>

        {/* Basic Metrics - Replaces Graph */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-premium flex flex-col justify-between card-hover">
            <div className="flex justify-between items-start mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">timer</span></div>
            </div>
            <div>
              <h4 className="text-2xl font-black text-gradient-primary">{studyHours}h</h4>
              <p className="text-[11px] font-bold text-on-surface-variant mt-1 uppercase tracking-wider">Tempo de Estudo</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-premium flex flex-col justify-between card-hover">
            <div className="flex justify-between items-start mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">task_alt</span></div>
            </div>
            <div>
              <h4 className="text-2xl font-black text-gradient-primary">{totalAttempted}</h4>
              <p className="text-[11px] font-bold text-on-surface-variant mt-1 uppercase tracking-wider">Quizzes Respondidos</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-premium flex flex-col justify-between card-hover">
            <div className="flex justify-between items-start mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>picture_as_pdf</span></div>
            </div>
            <div>
              <h4 className="text-2xl font-black text-gradient-primary">{totalPdfs}</h4>
              <p className="text-[11px] font-bold text-on-surface-variant mt-1 uppercase tracking-wider">PDFs Abertos</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-premium flex flex-col justify-between card-hover">
            <div className="flex justify-between items-start mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">smart_toy</span></div>
            </div>
            <div>
              <h4 className="text-2xl font-black text-gradient-primary">{totalAi}</h4>
              <p className="text-[11px] font-bold text-on-surface-variant mt-1 uppercase tracking-wider">Dúvidas com IA</p>
            </div>
          </div>
        </div>

        {/* Column Left (Insight) */}
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
                  ? `A turma "${weakestClass.name}" tem apresentado maiores dificuldades nos quizzes (Média: ${lowestScore}%). Sugiro partilhar novos materiais formativos ou focar o início da próxima aula numa revisão destes conceitos.`
                  : totalAttempted === 0 
                    ? "As suas turmas ainda não têm dados suficientes de Quizzes para gerar insights."
                    : "As suas turmas estão com um aproveitamento excelente e consistente em todas as disciplinas analisadas."}
              </p>
              {weakestClass && (
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all text-white text-[11px] font-bold py-2.5 px-4 rounded-lg border border-white/15 hover:border-white/30 hover:scale-105 active:scale-95 w-full">
                  Ver Turma {weakestClass.name} →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Subject Cards Section - Dynamic */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-4 md:p-6 shadow-premium">
          <h3 className="text-gradient-primary text-base font-bold mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 action-gradient rounded-full shadow-sm"></span>
            Comparativo de Turmas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {classArray.length === 0 ? (
              <div className="col-span-full text-center py-8 text-on-surface-variant text-[13px]">
                Ainda não há métricas suficientes para exibir o comparativo. Os dados aparecerão assim que os alunos interagirem com as turmas.
              </div>
            ) : (
              classArray.map(c => {
                const perc = c.attempted > 0 ? Math.round((c.correct / c.attempted) * 100) : 0;
                const statusColor = perc >= 70 ? 'text-emerald-700 bg-emerald-50' : perc >= 50 ? 'text-orange-700 bg-orange-50' : 'text-red-700 bg-red-50';
                const statusText = perc >= 70 ? 'Bom Desempenho' : perc >= 50 ? 'Atenção' : 'Critico';
                const barGradient = perc >= 70 ? 'kinetic-gradient' : perc >= 50 ? 'action-gradient' : 'bg-red-500';

                return (
                  <div key={c.id} className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/10 card-interactive group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300">
                        <span className="material-symbols-outlined text-[20px]">school</span>
                      </div>
                      <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider ${statusColor}`}>{statusText}</span>
                    </div>
                    <h4 className="font-bold text-primary-container mb-1 text-[14px] truncate">{c.name}</h4>
                    <p className="text-[11px] text-on-surface-variant mb-4">{c.attempted} Quizzes respondidos</p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-end">
                        <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Média de Acertos</span>
                        <span className="text-[13px] font-black text-gradient-primary">{perc}%</span>
                      </div>
                      <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className={`h-full ${barGradient} rounded-full`} style={{ width: `${perc}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
