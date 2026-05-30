"use client";
import { ToastProvider } from '../components/ToastProvider';
import { AuthProvider } from '../context/AuthContext';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
}
