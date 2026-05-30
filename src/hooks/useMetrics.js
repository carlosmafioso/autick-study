"use client";
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function useMetrics() {
  const { user } = useAuth();
  const [activeClassId, setActiveClassId] = useState(null);

  // Background timer for study time
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      // Only track if the document is visible
      if (document.visibilityState === 'visible') {
        incrementMetric('study_time_seconds', 60, activeClassId);
      }
    }, 60000); // Every 60 seconds

    return () => clearInterval(interval);
  }, [user, activeClassId]);

  const incrementMetric = async (metricName, value = 1, classId = null) => {
    if (!user) return;
    try {
      await supabase.rpc('increment_student_metric', {
        p_student_id: user.id,
        p_class_id: classId,
        p_metric_name: metricName,
        p_increment_value: value
      });
    } catch (err) {
      console.error('Erro ao registar métrica:', err);
    }
  };

  const trackPdfRead = useCallback((classId) => {
    incrementMetric('pdfs_read', 1, classId);
  }, [user]);

  const trackAiConsultation = useCallback((classId) => {
    incrementMetric('ai_consultations', 1, classId);
  }, [user]);

  const trackQuiz = useCallback((classId, attempted, correct) => {
    incrementMetric('quizzes_attempted', attempted, classId);
    incrementMetric('quizzes_correct', correct, classId);
  }, [user]);

  return {
    setActiveClassId,
    trackPdfRead,
    trackAiConsultation,
    trackQuiz
  };
}
