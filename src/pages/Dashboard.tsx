import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Languages,
  Globe,
  Trophy,
  Target,
  Clock,
  ChevronRight,
  Flame,
  Star,
  Award,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { useReviewErrors } from "@/hooks/useReviewErrors";

/**
 * Tableau de bord avec vraies données de progression
 */
const Dashboard = () => {
  const { progress, getStats } = useProgress();
  const { errors, markAsReviewed, clearAllErrors, getStats: getErrorStats } = useReviewErrors();
  const errorStats = getErrorStats();

  // Utiliser getStats() pour obtenir les statistiques correctement
  const stats = getStats();
  const { totalModules, completedModules, totalLessons, completedLessons, progressPercentage } = stats;

  // Calculer le score moyen des quiz
  const moduleKeys = Object.keys(progress.modules);
  const quizScores = moduleKeys
    .map((key) => progress.modules[key].exerciseProgress?.quizScore)
    .filter((score): score is { score: number; total: number } => score !== undefined);

  const avgQuizScore = quizScores.length > 0
    ? Math.round(quizScores.reduce((sum, s) => sum + (s.score / s.total) * 100, 0) / quizScores.length)
    : 0;

  // Obtenir les modules récents avec activité
  const recentModules = moduleKeys
    .map((key) => ({
      key,
      ...progress.modules[key],
    }))
    .filter((m) => m.lessonsProgress.some((l) => l.completed))
    .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
    .slice(0, 3);

  // Badges basés sur la progression
  const badges = [
    {
      icon: Flame,
      title: "Premier pas",
      description: "Complétez votre première leçon",
      earned: completedLessons >= 1,
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Star,
      title: "Étudiant assidu",
      description: "Complétez 5 leçons",
      earned: completedLessons >= 5,
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Target,
      title: "Expert A1",
      description: "Terminez le niveau A1",
      earned: completedModules >= 5,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Trophy,
      title: "Maître des cas",
      description: "Terminez les 6 cas russes",
      earned: completedModules >= 11,
      color: "from-purple-500 to-pink-500",
    },
  ];

  // Cercle de progression SVG
  const ProgressCircle = ({
    value,
    max,
    label,
    color = "stroke-primary",
  }: {
    value: number;
    max: number;
    label: string;
    color?: string;
  }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              className="stroke-muted fill-none"
              strokeWidth="8"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              className={`${color} fill-none transition-all duration-1000`}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{value}</span>
          </div>
        </div>
        <span className="mt-2 text-sm text-muted-foreground">{label}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* En-tête */}
          <div className="space-y-2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">
              Mon{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Espace
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Suivez votre progression et continuez votre apprentissage
            </p>
          </div>

          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Carte de progression */}
            <Card className="p-6 border-border col-span-1 md:col-span-2 animate-fade-in">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Progression globale
              </h2>
              <div className="flex flex-wrap justify-around gap-6">
                <ProgressCircle
                  value={completedLessons}
                  max={totalLessons || 1}
                  label="Leçons terminées"
                  color="stroke-primary"
                />
                <ProgressCircle
                  value={completedModules}
                  max={totalModules || 1}
                  label="Modules complétés"
                  color="stroke-green-500"
                />
                <ProgressCircle
                  value={avgQuizScore}
                  max={100}
                  label="Score quiz moyen"
                  color="stroke-amber-500"
                />
              </div>
            </Card>

            {/* Statistiques rapides */}
            <Card className="p-6 border-border animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Statistiques
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Quiz complétés</span>
                  <span className="font-bold text-lg">{quizScores.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-bold text-lg">{progressPercentage}%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Modules démarrés</span>
                  <span className="font-bold text-lg">{totalModules}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Badges */}
          <Card className="p-6 border-border animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Badges & Récompenses
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`relative p-4 rounded-xl border-2 text-center transition-all ${badge.earned
                      ? "border-primary/50 bg-primary/5"
                      : "border-border opacity-50 grayscale"
                    }`}
                >
                  <div
                    className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center mb-3 ${badge.earned ? "shadow-lg" : ""
                      }`}
                  >
                    <badge.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm">{badge.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                  {badge.earned && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white fill-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Activité récente */}
          <Card className="p-6 border-border animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Activité récente
            </h2>
            {recentModules.length > 0 ? (
              <div className="space-y-3">
                {recentModules.map((module) => {
                  const completedCount = module.lessonsProgress.filter((l) => l.completed).length;
                  const totalCount = module.lessonsProgress.length;
                  const percentage = Math.round((completedCount / totalCount) * 100);

                  return (
                    <Link key={module.key} to={`/lesson/${module.key}`}>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold group-hover:text-primary transition-colors">
                              Module {module.key}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {completedCount}/{totalCount} leçons • {percentage}%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Aucune activité pour le moment</p>
                <Link to="/courses">
                  <Button variant="outline" className="mt-4">
                    Commencer un cours
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Erreurs à réviser */}
          {errors.length > 0 && (
            <Card className="p-6 border-border animate-fade-in" style={{ animationDelay: "0.35s" }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Erreurs à réviser ({errorStats.total})
                </h2>
                <Button variant="ghost" size="sm" onClick={clearAllErrors} className="text-muted-foreground">
                  Tout effacer
                </Button>
              </div>
              <div className="space-y-3">
                {errors.slice(0, 5).map((error) => (
                  <div key={error.id} className="flex items-start justify-between p-4 rounded-xl bg-muted/30 gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{error.question}</div>
                      <div className="text-sm mt-1">
                        <span className="text-destructive line-through">{error.userAnswer}</span>
                        {" → "}
                        <span className="text-green-500 font-semibold">{error.correctAnswer}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {error.type === "quiz" ? "Quiz" : error.type === "fillBlank" ? "Texte à trous" : error.type === "matching" ? "Association" : "Écoute"}
                        {error.moduleId && ` • Module ${error.moduleId}`}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsReviewed(error.id)}
                      className="text-green-500 hover:text-green-600 flex-shrink-0"
                    >
                      ✓ Compris
                    </Button>
                  </div>
                ))}
                {errors.length > 5 && (
                  <p className="text-sm text-muted-foreground text-center pt-2">
                    ... et {errors.length - 5} autres erreurs à réviser
                  </p>
                )}
              </div>
            </Card>
          )}

          {/* Actions rapides */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/courses">
              <Card className="p-6 border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group h-full">
                <BookOpen className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Reprendre un cours</h3>
                <p className="text-sm text-muted-foreground">
                  Continuez là où vous vous êtes arrêté
                </p>
              </Card>
            </Link>
            <Link to="/alphabet">
              <Card className="p-6 border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group h-full">
                <Languages className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Réviser l'alphabet</h3>
                <p className="text-sm text-muted-foreground">
                  Pratiquez les lettres cyrilliques
                </p>
              </Card>
            </Link>
            <Link to="/culture">
              <Card className="p-6 border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group h-full">
                <Globe className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Explorer la culture</h3>
                <p className="text-sm text-muted-foreground">
                  Plongez dans la culture russe
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;