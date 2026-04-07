import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const getTitleFromPath = (path) => {
  switch (path) {
    case '/': return 'Painel de Controle';
    case '/analise': return 'Análise de Performance';
    case '/calendario': return 'Calendário e Planeamento';
    case '/biblioteca': return 'Biblioteca de Conteúdos';
    case '/assistente': return 'Assistente Virtual de IA';
    default: return 'Autick Study';
  }
};

export default function Layout() {
  const location = useLocation();
  const title = getTitleFromPath(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Overlay do Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <Header title={title} onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="md:ml-56 pt-[72px] pb-6 px-4 md:px-5 min-h-screen" key={location.pathname}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
