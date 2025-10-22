import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Languages, Globe, User, Home } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Accueil", icon: Home },
    { path: "/courses", label: "Cours", icon: BookOpen },
    { path: "/alphabet", label: "Alphabet", icon: Languages },
    { path: "/culture", label: "Culture", icon: Globe },
    { path: "/dashboard", label: "Mon Espace", icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">РУ</span>
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            RussoAcadémie
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link key={path} to={path}>
              <Button
                variant={location.pathname === path ? "secondary" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            </Link>
          ))}
        </div>

        <Link to="/dashboard">
          <Button variant="hero" size="sm">
            Commencer
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
