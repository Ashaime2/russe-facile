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

  // Hydratation des données Cloud vers LocalStorage
  const hydrateFromCloud = async (userId: string) => {
    try {
      const { data, error } = await supabase.from('profiles').select('progress_data, flashcards_data').eq('id', userId).single();
      if (data) {
        if (data.progress_data && Object.keys(data.progress_data).length > 0) {
          localStorage.setItem('russe-facile-progress', JSON.stringify(data.progress_data));
        }
        if (data.flashcards_data && data.flashcards_data.length > 0) {
          localStorage.setItem('russe-facile-my-flashcards', JSON.stringify(data.flashcards_data));
        }
      }
    } catch (err) {
      console.error("Erreur d'hydratation", err);
    }
  };

  // Initialisation et vérification de la session
  useEffect(() => {
    const initSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
          await hydrateFromCloud(session.user.id);
        }
        setUser(mapSupabaseUser(session?.user ?? null));
      } catch (e: any) {
        console.error("Erreur de session:", e.message);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    // Écoute des changements de session (ex: connexion depuis un autre onglet)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user && _event === 'SIGNED_IN') {
           await hydrateFromCloud(session.user.id);
        }
        setUser(mapSupabaseUser(session?.user ?? null));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw new Error("Email ou mot de passe incorrect");
      }
      throw new Error(error.message);
    }
    
    const mappedUser = mapSupabaseUser(data.user);
    await hydrateFromCloud(data.user.id);
    setUser(mappedUser);
    toast.success(`Heureux de vous revoir !`);
    
    // Hard redirect pour réinitialiser complètement l'application et les hooks locaux
    window.location.href = '/dashboard';
  };

  const signUp = async (name: string, email: string, pass: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          name: name,
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        throw new Error("Un compte existe déjà avec cette adresse email");
      }
      throw new Error(error.message);
    }

    if (data.session) {
      await hydrateFromCloud(data.user!.id);
      setUser(mapSupabaseUser(data.user));
      toast.success("Votre compte a été créé avec succès.");
      window.location.href = '/dashboard';
    } else {
      // Cas où email confirmation API est activée sur Supabase
      toast.success("Inscription réussie ! Regardez votre boîte mail (Spam inclus) pour confirmer.");
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erreur lors de la déconnexion");
      console.error(error);
    } else {
      setUser(null);
      toast.success("Vous êtes maintenant déconnecté");
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
