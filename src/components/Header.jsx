import React from 'react';

export default function Header({ title = "Análise de Performance", onMenuClick }) {
  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-14rem)] h-14 flex justify-between items-center px-4 md:px-6 z-40 bg-white/70 backdrop-blur-xl border-b border-white/50">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-1.5 -ml-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        <h1 className="text-gradient-primary text-lg font-extrabold tracking-tight truncate max-w-[200px] sm:max-w-none">{title}</h1>
      </div>
      <div className="flex items-center gap-1.5">
        <button className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all">
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 ring-2 ring-white"></span>
        </button>
        <button className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all">
          <span className="material-symbols-outlined text-xl">settings</span>
        </button>
        <div className="ml-1.5 w-px h-6 bg-outline-variant/30"></div>
        <div className="ml-1.5 w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary-container/20 ring-offset-1 ring-offset-white/70 cursor-pointer hover:ring-primary-container/50 transition-all">
          <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-MmgNSQayP04gxtr2yRRvqbWWqbT3OQ6Y7zcIBgcD7S86HBt1t5_WZFhRZdOir79VVQnTtlW_YZSS_lXN-N8MvEipMWY6cnjngp7dLKIRYYieNYgzS5iFYJGqvGRDSewe3KxP7l40G865MgocnCpG97kKO1aO7I7jmX2-a_FpI7RNHrwiL28wKizht4hUVtlDoF3u-LKWtWgsaP-ZyCk0vB1kZav_XC3xJjrXwp1IyIxFv2FOcxW1fZttIjdWrqclpvRQlN7Nw00" />
        </div>
      </div>
    </header>
  );
}
