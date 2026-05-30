"use client";
import React from 'react';
import CalendarDashboard from '../../../components/shared/CalendarDashboard';
import { mockEvents, mockTasks } from '../../../data/mockData';

export default function ProfessorCalendario() {
  return (
    <CalendarDashboard 
      role="professor" 
      events={mockEvents.professor} 
      tasks={mockTasks.professor} 
      title="Maio 2026" 
    />
  );
}
