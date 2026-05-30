"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import ProfessorSidebar from '../../components/ProfessorSidebar';
import Header from '../../components/Header';

const getTitleFromPath = (path) => {
  if (path === '/professor') return 'Painel do Professor';
  if (path.includes('/turmas')) return 'Minhas Turmas';
  if (path.includes('/materiais')) return 'Material de Aula';
  if (path.includes('/assistente')) return 'Assistente de IA';
  if (path.includes('/desempenho')) return 'Análise de Desempenho';
  if (path.includes('/calendario')) return 'Calendário e Planeamento';
  return 'Painel do Professor';
};

export default function ProfessorLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname() || '';
  const title = getTitleFromPath(pathname);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <ProfessorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Header title={title} onMenuClick={() => setIsSidebarOpen(true)} isProfessor={true} />
      
      <main className="md:ml-56 pt-16 pb-6 px-4 md:px-6" key={pathname}>
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
