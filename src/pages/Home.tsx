import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Languages,
  Globe,
  LayoutDashboard,
  ChevronRight,
  Volume2,
  Sparkles,
  Library,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-bg.jpg";
import { dailyThemes } from "@/data/dailyThemes";

/**
 * Page d'accueil enrichie avec mot du jour et statistiques
 */
const Home = () => {
  // Mot du jour : sélectionné selon le jour de l'année
  const wordOfTheDay = useMemo(() => {
    const allWords = dailyThemes.flatMap((t) =>
      t.vocabulary.map((v) => ({ ...v, theme: t.title, themeIcon: t.icon }))
    );
    const dayIndex = new Date().getDate() + new Date().getMonth() * 31;
    return allWords[dayIndex % allWords.length];
  }, []);

  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ru-RU";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Stats globales
  const totalWords = dailyThemes.reduce((acc, t) => acc + t.vocabulary.length, 0);

  const sections = [
    {
      icon: BookOpen,
      title: "Cours",
      description: "Parcours structuré du niveau A1 au B1 avec leçons et exercices interactifs",
      path: "/courses",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Languages,
      title: "Alphabet cyrillique",
      description: "Apprenez les 33 lettres russes avec exercices audio, visuels et tracé",
      path: "/alphabet",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Library,
      title: "Vocabulaire",
      description: `${dailyThemes.length} thèmes du quotidien avec ${totalWords} mots et flashcards`,
      path: "/vocabulary",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Globe,
      title: "Culture russe",
      description: "Découvrez l'histoire, les traditions et les expressions idiomatiques",
      path: "/culture",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: LayoutDashboard,
      title: "Mon Espace",
      description: "Suivez votre progression et consultez vos statistiques",
      path: "/dashboard",
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 pt-16">
            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-fade-in">
              Apprenez le russe{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
                pas à pas
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Une méthode progressive pour maîtriser le russe, de l'alphabet aux conversations du quotidien.
            </p>

            {/* Compteurs */}
            <div className="flex flex-wrap justify-center gap-8 pt-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Niveaux</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">90+</div>
                <div className="text-sm text-muted-foreground">Leçons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{totalWords}+</div>
                <div className="text-sm text-muted-foreground">Mots</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">33</div>
                <div className="text-sm text-muted-foreground">Lettres</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-muted-foreground">
              Choisissez une section
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section, index) => (
                <Link key={index} to={section.path}>
                  <Card
                    className="p-6 border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}
                      >
                        <section.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {section.title}
                          </h3>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mot du jour */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 md:p-8 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-fade-in">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Mot du jour</h2>
                  <p className="text-sm text-muted-foreground">
                    {wordOfTheDay.themeIcon} {wordOfTheDay.theme}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div
                    className="text-4xl font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-3"
                    onClick={() => speak(wordOfTheDay.word)}
                  >
                    {wordOfTheDay.word}
                    <Volume2 className="w-6 h-6 opacity-50" />
                  </div>
                  <div className="text-lg text-muted-foreground italic mt-1">
                    {wordOfTheDay.transliteration}
                  </div>
                  <div className="text-xl mt-1">{wordOfTheDay.translation}</div>
                </div>
                <Link to="/vocabulary">
                  <Button variant="outline" className="gap-2">
                    Explorer le vocabulaire
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;