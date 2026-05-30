"use client";
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { icon: 'dashboard', label: 'Painel Geral', path: '/professor' },
  { icon: 'groups', label: 'Turmas', path: '/professor/turmas' },
  { icon: 'folder_open', label: 'Materiais', path: '/professor/materiais' },
  { icon: 'smart_toy', label: 'Assistente IA', path: '/professor/assistente' },
  { icon: 'analytics', label: 'Desempenho', path: '/professor/desempenho' },
  { icon: 'calendar_today', label: 'Calendário', path: '/professor/calendario' }
];

export default function ProfessorSidebar({ isOpen, setIsOpen }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNovaTurma = () => {
    if (setIsOpen) setIsOpen(false);
    router.push('/professor/turmas');
  };

  return (
    <aside className={`h-screen w-56 fixed left-0 top-0 flex flex-col py-5 z-50 glass-dark transform transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0 shadow-2xl ring-1 ring-white/10' : '-translate-x-full'}`}>
      <div className="px-4 mb-6 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-glow-orange animate-pulse-glow">
          <span className="material-symbols-outlined text-white text-base" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
        </div>
        <div>
          <span className="text-base font-extrabold text-white tracking-tight">Autick</span>
          <span className="text-base font-light text-blue-200 ml-0.5">Study</span>
        </div>
      </div>
      <nav className="flex-1 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = item.path === '/professor' ? pathname === item.path : pathname?.startsWith(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`sidebar-link px-3 py-2 flex items-center gap-2.5 rounded-lg transition-all duration-200 text-[13px] ${
                isActive 
                  ? 'active bg-white/12 text-white' 
                  : 'text-blue-200/60 hover:text-white hover:bg-white/6'
              }`}
              onClick={() => setIsOpen && setIsOpen(false)}
            >
              <span 
                className={`material-symbols-outlined text-lg transition-colors ${isActive ? 'text-orange-400' : ''}`}
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}
              >
                {item.icon}
              </span>
              <span className="font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mx-3 my-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="px-3">
        <button 
          onClick={handleNovaTurma}
          className="w-full action-gradient text-white font-bold py-2.5 rounded-xl shadow-glow-orange hover:brightness-110 active:scale-[0.97] transition-all flex items-center justify-center gap-2 text-sm group"
        >
          <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:rotate-90">add</span>
          Nova Turma
        </button>
      </div>
    </aside>
  );
}

