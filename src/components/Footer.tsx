import { Link } from "react-router-dom";
import logoCentrale from "@/assets/logo_centrale.png";

/**
 * Pied de page simple et sobre
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Cours", path: "/courses" },
    { label: "Alphabet", path: "/alphabet" },
    { label: "Culture", path: "/culture" },
    { label: "Mon Espace", path: "/dashboard" },
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Contenu principal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo et description */}
          <div className="flex items-center gap-4">
            <img
              src={logoCentrale}
              alt="École Centrale de Lille"
              className="w-12 h-12 object-contain"
            />
            <div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Défi G1‑G2
              </span>
              <p className="text-sm text-muted-foreground">
                Apprenez le russe simplement
              </p>
            </div>
          </div>

          {/* Liens rapides */}
          <nav className="flex flex-wrap justify-center gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Séparateur décoratif */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-muted-foreground">
              🇷🇺
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Défi G1‑G2 · Un projet étudiant — Hugo Delplanque
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;