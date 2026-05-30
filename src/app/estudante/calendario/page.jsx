"use client";
import React from 'react';
import CalendarDashboard from '../../../components/shared/CalendarDashboard';
import { mockEvents, mockTasks } from '../../../data/mockData';

export default function CalendarioEPlaneamento() {
  return (
    <CalendarDashboard 
      role="student" 
      events={mockEvents.student} 
      tasks={mockTasks.student} 
      title="Outubro 2023" 
    />
  );
}
