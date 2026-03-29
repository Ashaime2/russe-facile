import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (name: string, email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapSupabaseUser = (user: SupabaseUser | null): User | null => {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.name || user.email?.split('@')[0] || 'Apprenant(e)',
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync Cloud -> Local en tâche de fond (non-bloquant)
  const syncCloudData = async (userId: string) => {
    try {
      // On récupère les données dans le Cloud
      const { data, error } = await supabase.from('profiles').select('progress_data, flashcards_data').eq('id', userId).single();
      
      if (data) {
        // On fusionne/met à jour le localStorage local pour que le reste de l'app en profite
        if (data.progress_data && Object.keys(data.progress_data).length > 0) {
          localStorage.setItem('russe-facile-progress', JSON.stringify(data.progress_data));
        }
        if (data.flashcards_data && data.flashcards_data.length > 0) {
          localStorage.setItem('russe-facile-my-flashcards', JSON.stringify(data.flashcards_data));
        }
      }
    } catch (err) {
      console.warn("Sync en arrière-plan indisponible", err);
    }
  };

  useEffect(() => {
    // 1. Initialisation rapide
    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const nextUser = mapSupabaseUser(session?.user ?? null);
        setUser(nextUser);
        
        if (session?.user) {
          // Sync silencieuse
          syncCloudData(session.user.id);
        }
      } catch (e: any) {
        console.error("Session init error:", e.message);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    // 2. Écouteur de changements (Connexion/Déconnexion)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const nextUser = mapSupabaseUser(session?.user ?? null);
      setUser(nextUser);
      
      if (event === 'SIGNED_IN' && session?.user) {
        syncCloudData(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    
    if (error) throw new Error(error.message === 'Invalid login credentials' ? "Email ou mot de passe incorrect" : error.message);
    
    // Le onAuthStateChange s'occupera du setUser et du sync
    toast.success("Heureux de vous revoir !");
  };

  const signUp = async (name: string, email: string, pass: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: { data: { name } }
    });

    if (error) throw new Error(error.message.includes('already registered') ? "Un compte existe déjà" : error.message);

    if (data.session) {
      toast.success("Compte créé avec succès !");
    } else {
      toast.success("Vérifiez vos emails pour confirmer votre compte.");
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast.success("Déconnexion réussie");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
