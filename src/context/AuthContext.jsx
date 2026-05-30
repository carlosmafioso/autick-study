"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    async function getSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user && mounted) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else if (mounted) {
          setUser(null);
          setProfile(null);
        }
      } catch (err) {
        console.error("Error getting session:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
        // If not on login/landing/cadastro, redirect
        if (pathname && !pathname.startsWith('/login') && !pathname.startsWith('/cadastro') && pathname !== '/') {
          router.push('/');
        }
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [pathname, router]);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signUp = async (email, password, metadata) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
