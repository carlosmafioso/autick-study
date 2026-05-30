"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext();

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg backdrop-blur-md border ${
                toast.type === 'info'
                  ? 'bg-blue-600/90 border-blue-500/50 text-white'
                  : toast.type === 'error'
                  ? 'bg-red-600/90 border-red-500/50 text-white'
                  : 'bg-slate-800/90 border-slate-700/50 text-white'
              }`}
            >
              <span className="material-symbols-outlined text-xl">
                {toast.type === 'info' ? 'info' : toast.type === 'error' ? 'error' : 'notifications'}
              </span>
              <p className="text-sm font-semibold">{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
