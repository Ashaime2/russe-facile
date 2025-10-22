import { Link } from "react-router-dom";
import { Mail, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">РУ</span>
              </div>
              <span className="text-lg font-bold">RussoAcadémie</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Apprenez le russe pas à pas, simplement et avec plaisir.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Apprendre</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/courses" className="hover:text-primary transition-colors">Cours</Link></li>
              <li><Link to="/alphabet" className="hover:text-primary transition-colors">Alphabet</Link></li>
              <li><Link to="/culture" className="hover:text-primary transition-colors">Culture</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">À propos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">Notre mission</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">L'équipe</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Nous suivre</h3>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:contact@russoacademie.fr" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 RussoAcadémie. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
