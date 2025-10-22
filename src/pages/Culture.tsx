import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Coffee, Music, Landmark } from "lucide-react";

const Culture = () => {
  const articles = [
    {
      icon: Coffee,
      category: "Cuisine",
      title: "Le thé russe et ses traditions",
      excerpt: "Découvrez l'importance du thé dans la culture russe, du samovar traditionnel aux accompagnements sucrés.",
      readTime: "5 min"
    },
    {
      icon: Music,
      category: "Arts",
      title: "La musique classique russe",
      excerpt: "De Tchaïkovski à Rachmaninov, plongez dans l'univers de la grande musique classique russe.",
      readTime: "7 min"
    },
    {
      icon: Landmark,
      category: "Histoire",
      title: "Saint-Pétersbourg : la Venise du Nord",
      excerpt: "Explorez l'histoire fascinante de cette ville impériale, ses palais et ses canaux.",
      readTime: "10 min"
    },
    {
      icon: Book,
      category: "Littérature",
      title: "Les grands auteurs russes",
      excerpt: "Dostoïevski, Tolstoï, Tchekhov : découvrez les maîtres de la littérature mondiale.",
      readTime: "8 min"
    }
  ];

  const expressions = [
    {
      russian: "Ни пуха ни пера!",
      pronunciation: "Ni pukha ni pera",
      meaning: "Littéralement : 'Ni duvet ni plume !' (équivalent de 'Bonne chance !' ou 'Merde !')",
      usage: "Dit avant un examen ou une épreuve importante"
    },
    {
      russian: "Душа нараспашку",
      pronunciation: "Dusha naraspashku",
      meaning: "Littéralement : 'Âme grande ouverte'",
      usage: "Décrit quelqu'un d'ouvert et sincère"
    },
    {
      russian: "Бабушкины сказки",
      pronunciation: "Babushkiny skazki",
      meaning: "Littéralement : 'Contes de grand-mère'",
      usage: "Des histoires sans fondement, des racontars"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-winter">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h1 className="text-5xl font-bold">Culture & Voyages</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez la richesse de la culture russe à travers ses traditions, son art et son histoire
            </p>
          </div>

          {/* Featured Articles */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Articles culturels</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <Card 
                  key={index}
                  className="p-6 hover:shadow-glow transition-all duration-300 cursor-pointer group border-border animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <article.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-primary font-semibold mb-2">{article.category}</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                      <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{article.readTime} de lecture</span>
                        <Button variant="ghost" size="sm">
                          Lire →
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Expressions Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Expressions idiomatiques</h2>
            <p className="text-muted-foreground mb-8">
              Apprenez ces expressions colorées pour parler comme un vrai Russe
            </p>
            <div className="space-y-4">
              {expressions.map((expr, index) => (
                <Card 
                  key={index}
                  className="p-6 border-border animate-slide-up hover:shadow-soft transition-all"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-primary mb-2">{expr.russian}</div>
                      <div className="text-sm text-muted-foreground italic">{expr.pronunciation}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-1">Signification</div>
                      <div>{expr.meaning}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-1">Utilisation</div>
                      <div className="text-muted-foreground">{expr.usage}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Travel Guide */}
          <Card className="p-8 bg-gradient-hero text-primary-foreground border-0">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Landmark className="w-16 h-16 mx-auto opacity-90" />
              <h2 className="text-4xl font-bold">Guide de voyage</h2>
              <p className="text-xl opacity-90">
                Préparez votre voyage en Russie avec nos conseils pratiques, 
                phrases essentielles et informations culturelles
              </p>
              <Button variant="accent" size="lg">
                Accéder au guide
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Culture;
