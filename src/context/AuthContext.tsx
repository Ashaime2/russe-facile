import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

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
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Clés pour notre fausse base de données locale
const USERS_KEY = "russe-facile-users-db";
const SESSION_KEY = "russe-facile-session";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const sessionData = localStorage.getItem(SESSION_KEY);
      if (sessionData) {
        setUser(JSON.parse(sessionData));
      }
    } catch (e) {
      console.error("Erreur de session:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Simulation d'une latence réseau pour le réalisme
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const signIn = async (email: string, pass: string) => {
    await delay(800);
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === pass);
    
    if (!foundUser) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const sessionUser = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    toast.success(`Heureux de vous revoir !`);
    
    // Redimensionnement/Redirection fluide
    window.location.href = '/dashboard';
  };

  const signUp = async (name: string, email: string, pass: string) => {
    await delay(1000);
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    
    if (users.find((u: any) => u.email === email)) {
      throw new Error("Un compte existe déjà avec cette adresse email");
    }

    const newUser = { id: Date.now().toString(), name, email, password: pass };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    toast.success("Votre compte a été créé avec succès.");
    
    window.location.href = '/dashboard';
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    toast.success("Vous êtes maintenant déconnecté");
    window.location.href = '/';
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
