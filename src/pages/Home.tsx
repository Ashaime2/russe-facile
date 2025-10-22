import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Languages, Globe, Award, Mic, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-bg.jpg";
import alphabetIcon from "@/assets/alphabet-icon.jpg";
import courseIcon from "@/assets/course-icon.jpg";
import cultureIcon from "@/assets/culture-icon.jpg";

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Leçons progressives",
      description: "Progressez à votre rythme avec des leçons structurées du niveau débutant à avancé"
    },
    {
      icon: Languages,
      title: "Alphabet cyrillique",
      description: "Maîtrisez l'alphabet russe avec des exercices interactifs et audio natifs"
    },
    {
      icon: Mic,
      title: "Prononciation native",
      description: "Écoutez et répétez avec des locuteurs natifs pour perfectionner votre accent"
    },
    {
      icon: Globe,
      title: "Immersion culturelle",
      description: "Découvrez la culture, les traditions et l'histoire russes"
    },
    {
      icon: Award,
      title: "Système de progression",
      description: "Suivez vos progrès avec badges, niveaux et statistiques détaillées"
    },
    {
      icon: Star,
      title: "Exercices gamifiés",
      description: "Apprenez en vous amusant avec des jeux et défis quotidiens"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-winter">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Apprenez le russe{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                pas à pas
              </span>
              ,<br />
              simplement et avec plaisir
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une méthode progressive et immersive pour maîtriser le russe, 
              de l'alphabet cyrillique aux conversations du quotidien
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/courses">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  Commencer gratuitement
                </Button>
              </Link>
              <Link to="/alphabet">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Essayer une leçon
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span>Gratuit pour commencer</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span>Aucune carte requise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Une méthode complète et efficace</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tous les outils dont vous avez besoin pour apprendre le russe avec confiance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-glow transition-all duration-300 animate-slide-up border-border"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Par où commencer ?</h2>
            <p className="text-xl text-muted-foreground">
              Choisissez votre parcours d'apprentissage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link to="/courses">
              <Card className="p-8 text-center hover:shadow-glow transition-all duration-300 cursor-pointer group border-border">
                <img 
                  src={courseIcon} 
                  alt="Cours"
                  className="w-24 h-24 mx-auto mb-6 rounded-full object-cover group-hover:scale-110 transition-transform"
                />
                <h3 className="text-2xl font-bold mb-3">Cours complets</h3>
                <p className="text-muted-foreground mb-6">
                  Parcours structuré du niveau débutant à avancé
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Découvrir
                </Button>
              </Card>
            </Link>

            <Link to="/alphabet">
              <Card className="p-8 text-center hover:shadow-glow transition-all duration-300 cursor-pointer group border-border">
                <img 
                  src={alphabetIcon} 
                  alt="Alphabet"
                  className="w-24 h-24 mx-auto mb-6 rounded-full object-cover group-hover:scale-110 transition-transform"
                />
                <h3 className="text-2xl font-bold mb-3">Alphabet cyrillique</h3>
                <p className="text-muted-foreground mb-6">
                  Apprenez à lire et écrire en russe dès maintenant
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Commencer
                </Button>
              </Card>
            </Link>

            <Link to="/culture">
              <Card className="p-8 text-center hover:shadow-glow transition-all duration-300 cursor-pointer group border-border">
                <img 
                  src={cultureIcon} 
                  alt="Culture"
                  className="w-24 h-24 mx-auto mb-6 rounded-full object-cover group-hover:scale-110 transition-transform"
                />
                <h3 className="text-2xl font-bold mb-3">Culture russe</h3>
                <p className="text-muted-foreground mb-6">
                  Immergez-vous dans la richesse culturelle russe
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Explorer
                </Button>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden p-12 md:p-16 text-center bg-gradient-hero border-0">
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
                Prêt à commencer votre voyage linguistique ?
              </h2>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Rejoignez des milliers d'apprenants et découvrez la beauté de la langue russe
              </p>
              <Link to="/dashboard">
                <Button variant="accent" size="lg" className="text-lg px-12 py-6 mt-4">
                  Commencer maintenant
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
