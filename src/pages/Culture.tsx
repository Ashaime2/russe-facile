import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Book,
  Coffee,
  Music,
  Landmark,
  ChevronRight,
  Quote,
  Volume2,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Page Culture moderne avec :
 * - Layout magazine avec images
 * - Carrousel de citations russes
 * - Sections interactives
 * - Design immersif
 */
const Culture = () => {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  const articles = [
    {
      icon: Coffee,
      category: "Cuisine",
      title: "Le thé russe et ses traditions",
      excerpt: "Découvrez l'importance du thé dans la culture russe, du samovar traditionnel aux accompagnements sucrés.",
      readTime: "5 min",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: Music,
      category: "Arts",
      title: "La musique classique russe",
      excerpt: "De Tchaïkovski à Rachmaninov, plongez dans l'univers de la grande musique classique russe.",
      readTime: "7 min",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Landmark,
      category: "Histoire",
      title: "Saint-Pétersbourg : la Venise du Nord",
      excerpt: "Explorez l'histoire fascinante de cette ville impériale, ses palais et ses canaux.",
      readTime: "10 min",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: Book,
      category: "Littérature",
      title: "Les grands auteurs russes",
      excerpt: "Dostoïevski, Tolstoï, Tchekhov : découvrez les maîtres de la littérature mondiale.",
      readTime: "8 min",
      gradient: "from-green-500 to-teal-600",
    },
  ];

  const quotes = [
    {
      russian: "В гостях хорошо, а дома лучше.",
      transliteration: "V gostyakh khorosho, a doma luchshe.",
      translation: "On est bien chez les autres, mais on est mieux chez soi.",
      meaning: "Équivalent de « Il n'y a pas de place comme la maison »",
    },
    {
      russian: "Утро вечера мудренее.",
      transliteration: "Utro vechera mudreneye.",
      translation: "Le matin est plus sage que le soir.",
      meaning: "Il vaut mieux attendre le lendemain pour prendre une décision",
    },
    {
      russian: "Повторение — мать учения.",
      transliteration: "Povtoreniye — mat' ucheniya.",
      translation: "La répétition est la mère de l'apprentissage.",
      meaning: "C'est en répétant qu'on apprend",
    },
  ];

  const expressions = [
    {
      russian: "Ни пуха ни пера!",
      pronunciation: "Ni pukha ni pera",
      meaning: "Littéralement : « Ni duvet ni plume ! »",
      usage: "Dit avant un examen ou une épreuve importante (comme « Merde ! »)",
      response: "К чёрту! (K chyortu! — « Au diable ! »)",
    },
    {
      russian: "Душа нараспашку",
      pronunciation: "Dusha naraspashku",
      meaning: "Littéralement : « Âme grande ouverte »",
      usage: "Décrit quelqu'un d'ouvert, sincère et chaleureux",
      response: null,
    },
    {
      russian: "Авось пронесёт",
      pronunciation: "Avos' pronésyot",
      meaning: "Littéralement : « Peut-être que ça passera »",
      usage: "Attitude typiquement russe face à l'incertitude",
      response: null,
    },
  ];

  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ru-RU";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Découvrir la Russie
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">
              Culture &{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Traditions
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plongez dans la richesse de la culture russe à travers son art, son histoire et ses expressions
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Citations carousel */}
          <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
              <div className="flex items-start gap-4 mb-6">
                <Quote className="w-10 h-10 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">Proverbe russe</h2>
                  <p className="text-muted-foreground">Sagesse populaire du jour</p>
                </div>
              </div>

              <div className="space-y-6">
                <div
                  className="text-3xl md:text-4xl font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => speak(quotes[activeQuoteIndex].russian)}
                >
                  « {quotes[activeQuoteIndex].russian} »
                  <Volume2 className="w-6 h-6 inline ml-3 opacity-50" />
                </div>
                <p className="text-lg text-muted-foreground italic">
                  {quotes[activeQuoteIndex].transliteration}
                </p>
                <p className="text-xl">{quotes[activeQuoteIndex].translation}</p>
                <p className="text-muted-foreground">
                  💡 {quotes[activeQuoteIndex].meaning}
                </p>
              </div>

              {/* Dots navigation */}
              <div className="flex justify-center gap-2 mt-8">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveQuoteIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${index === activeQuoteIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                  />
                ))}
              </div>
            </Card>
          </section>

          {/* Articles */}
          <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Articles culturels</h2>
              <Button variant="ghost" className="gap-2">
                Voir tout <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <Link key={index} to={`/article/${index}`}>
                  <Card className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 h-full">
                    {/* Gradient header */}
                    <div className={`h-24 bg-gradient-to-r ${article.gradient} p-6 flex items-center gap-4`}>
                      <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                        <article.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-white">
                        <div className="text-sm opacity-80">{article.category}</div>
                        <div className="font-semibold">{article.readTime} de lecture</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                      <div className="flex items-center text-primary font-medium">
                        Lire l'article
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Expressions idiomatiques */}
          <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Expressions idiomatiques</h2>
              <p className="text-muted-foreground">
                Apprenez ces expressions colorées pour parler comme un vrai Russe
              </p>
            </div>

            <div className="grid gap-4">
              {expressions.map((expr, index) => (
                <Card
                  key={index}
                  className="p-6 border-border hover:border-primary/50 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Expression russe */}
                    <div className="flex-shrink-0 md:w-64">
                      <div
                        className="text-2xl font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2"
                        onClick={() => speak(expr.russian)}
                      >
                        {expr.russian}
                        <Volume2 className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-sm text-muted-foreground italic mt-1">
                        {expr.pronunciation}
                      </div>
                    </div>

                    {/* Signification */}
                    <div className="flex-1 space-y-2">
                      <div>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Signification
                        </span>
                        <p className="font-medium">{expr.meaning}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Utilisation
                        </span>
                        <p className="text-muted-foreground">{expr.usage}</p>
                      </div>
                      {expr.response && (
                        <div className="mt-2 p-3 bg-muted/50 rounded-lg">
                          <span className="text-xs font-semibold text-primary">Réponse :</span>
                          <span className="ml-2">{expr.response}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Sources d'actualités russes */}
          <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">📰 Pratiquer avec les actualités</h2>
              <p className="text-muted-foreground">
                Améliorez votre russe en lisant les journaux russes (niveau intermédiaire+)
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Первый канал",
                  nameTranslation: "Première chaîne",
                  url: "https://www.1tv.ru/",
                  description: "Actualités générales, reportages",
                  level: "B1+",
                },
                {
                  name: "Культура",
                  nameTranslation: "Culture",
                  url: "https://www.culture.ru/",
                  description: "Art, littérature, histoire",
                  level: "B1",
                },
                {
                  name: "Наука и жизнь",
                  nameTranslation: "Science et vie",
                  url: "https://nkj.ru/",
                  description: "Sciences, vulgarisation",
                  level: "B2",
                },
                {
                  name: "Медуза",
                  nameTranslation: "Meduza",
                  url: "https://meduza.io/",
                  description: "Actualités, analyses",
                  level: "B2+",
                },
                {
                  name: "Ведомости",
                  nameTranslation: "Les Nouvelles",
                  url: "https://www.vedomosti.ru/",
                  description: "Économie, business",
                  level: "C1",
                },
              ].map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="p-4 border-border hover:border-primary/50 hover:shadow-lg transition-all group h-full">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-bold text-lg group-hover:text-primary transition-colors">
                          {source.name}
                        </div>
                        <div className="text-sm text-muted-foreground italic">
                          {source.nameTranslation}
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                        {source.level}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{source.description}</p>
                    <div className="mt-3 text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Visiter <ChevronRight className="w-4 h-4" />
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </section>

          {/* Guide de voyage CTA */}
          <section className="animate-fade-in" style={{ animationDelay: "0.5s" }}>

            <Card className="relative overflow-hidden p-8 md:p-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-0">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                  <span className="text-white/80 font-medium">Conseils de voyage</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center md:text-left">
                  Préparez votre voyage en Russie
                </h2>

                <div className="grid md:grid-cols-2 gap-4 text-white/90">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <h3 className="font-bold mb-2">🛂 Visa</h3>
                    <p className="text-sm">Un visa est requis pour la plupart des nationalités. Préparez votre demande à l'avance.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <h3 className="font-bold mb-2">🌡️ Climat</h3>
                    <p className="text-sm">Hivers très froids (-20°C). Été doux. Prévoyez des vêtements adaptés.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <h3 className="font-bold mb-2">💬 Phrases essentielles</h3>
                    <p className="text-sm">Здравствуйте (bonjour), Спасибо (merci), Пожалуйста (s'il vous plaît)</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <h3 className="font-bold mb-2">🚇 Transport</h3>
                    <p className="text-sm">Le métro de Moscou est magnifique et efficace. Achetez une carte Troika.</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Culture;
