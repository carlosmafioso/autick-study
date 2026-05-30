"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { useMetrics } from '../../hooks/useMetrics';

const getTitleFromPath = (path) => {
  if (path === '/estudante' || path === '/') return 'Painel de Controle';
  if (path.includes('/desempenho')) return 'Análise de Performance';
  if (path.includes('/calendario')) return 'Calendário e Planeamento';
  if (path.includes('/materiais')) return 'Biblioteca de Conteúdos';
  if (path.includes('/assistente')) return 'Assistente Virtual de IA';
  if (path.includes('/quiz')) return 'Quiz Inteligente';
  if (path.includes('/turmas')) return 'Minhas Turmas';
  return 'Autick Study';
};

export default function Layout({ children }) {
  const pathname = usePathname() || '';
  const title = getTitleFromPath(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Initializes background time tracking
  useMetrics();

  return (
    <div className="min-h-screen bg-background">
      {/* Overlay do Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      
      <Header title={title} onMenuClick={() => setIsMobileMenuOpen(true)} />
      
      <main className="md:ml-56 pt-16 pb-6 px-3 sm:px-4 md:px-5" key={pathname}>
        {children}
      </main>
    </div>
  );
}

