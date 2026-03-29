import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Languages, Globe, User, Home, Menu, X, Moon, Sun } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useTheme } from "next-themes";
import logoCentrale from "@/assets/logo_centrale.png";

/**
 * Barre de navigation moderne avec :
 * - Menu hamburger mobile animé
 * - Effet de transparence/flou au scroll
 * - Indicateur de progression global
 */
const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { progress } = useProgress();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  // Calculer la progression globale
  const totalModules = Object.keys(progress.modules).length;
  const completedModules = Object.values(progress.modules).filter(
    (m) => m.lessonsProgress.every((l) => l.completed)
  ).length;
  const globalProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  // Effet de scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "Accueil", icon: Home },
    { path: "/courses", label: "Cours", icon: BookOpen },
    { path: "/alphabet", label: "Alphabet", icon: Languages },
    { path: "/vocabulary", label: "Vocabulaire", icon: BookOpen },
    { path: "/my-flashcards", label: "Mes Flashcards", icon: BookOpen },
    { path: "/culture", label: "Culture", icon: Globe },
    { path: "/dashboard", label: "Mon Espace", icon: User },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-card/95 backdrop-blur-xl shadow-lg border-b border-border"
          : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={logoCentrale}
                alt="École Centrale de Lille"
                className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
              />
              {/* Badge de progression */}
              {globalProgress > 0 && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background">
                  {globalProgress}%
                </div>
              )}
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Défi G1‑G2
            </span>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link key={path} to={path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={`gap-2 transition-all ${isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-primary/5"
                      }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                    {label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Boutons droite */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Basculer le thème sombre"
                className="w-9 h-9 p-0"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
            )}

            <Link to="/courses" className="hidden sm:block">
              <Button
                variant="hero"
                size="sm"
                className="relative overflow-hidden group"
              >
                <span className="relative z-10">Commencer</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>

            {/* Bouton menu mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Barre de progression globale */}
        {globalProgress > 0 && (
          <div className="h-0.5 bg-muted">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${globalProgress}%` }}
            />
          </div>
        )}
      </nav>

      {/* Menu mobile overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`absolute top-16 left-0 right-0 bg-card border-b border-border shadow-xl transition-transform duration-300 ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <div className="container mx-auto px-4 py-6 space-y-2">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link key={path} to={path}>
                  <div
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all ${isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                      }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                    <span className="font-medium">{label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                </Link>
              );
            })}

            {/* CTA mobile */}
            <div className="pt-4 border-t border-border mt-4">
              <Link to="/courses">
                <Button variant="hero" className="w-full" size="lg">
                  Commencer l'apprentissage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;