import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Lock, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { useEffect, useMemo } from "react";

/**
 * Page "Cours" restructurée avec des modules dédiés à chaque cas grammatical
 * et une progression persistante via localStorage.
 */
const Courses = () => {
  const { progress, getModuleProgress } = useProgress();

  // Structure des niveaux et modules
  const levels = useMemo(
    () => [
      {
        id: 1,
        level: "A1",
        title: "Fondations",
        description: "Initiez‑vous à la grammaire et au vocabulaire de base",
        modules: [
          {
            id: 1,
            moduleKey: "1-1",
            title: "Premiers pas",
            subtitle: "Salutations, présentations et vocabulaire essentiel",
            lessons: 5,
            duration: "45 min",
            locked: false,
          },
          {
            id: 2,
            moduleKey: "1-2",
            title: "Genres et cas nominatif",
            subtitle: "Masculin, féminin, neutre et le sujet de la phrase",
            lessons: 5,
            duration: "60 min",
            locked: false,
          },
          {
            id: 3,
            moduleKey: "1-3",
            title: "Pronoms et adjectifs",
            subtitle: "Pronoms possessifs et accord des adjectifs",
            lessons: 5,
            duration: "50 min",
            locked: false,
          },
          {
            id: 4,
            moduleKey: "1-4",
            title: "Introduction aux verbes",
            subtitle: "Conjugaison au présent (1ère et 2ème conjugaison)",
            lessons: 6,
            duration: "55 min",
            locked: false,
          },
          {
            id: 5,
            moduleKey: "1-5",
            title: "Nombres et pluriels",
            subtitle: "Compter de 1 à 100 et former le pluriel",
            lessons: 6,
            duration: "55 min",
            locked: false,
          },
        ],
      },
      {
        id: 2,
        level: "A2",
        title: "Les six cas russes",
        description: "Maîtrisez les déclinaisons, clé de la grammaire russe",
        modules: [
          {
            id: 1,
            moduleKey: "2-1",
            title: "Cas accusatif",
            subtitle: "Le complément d'objet direct (COD)",
            lessons: 6,
            duration: "60 min",
            locked: false,
          },
          {
            id: 2,
            moduleKey: "2-2",
            title: "Cas génitif",
            subtitle: "Possession, absence et quantités",
            lessons: 7,
            duration: "65 min",
            locked: false,
          },
          {
            id: 3,
            moduleKey: "2-3",
            title: "Cas datif",
            subtitle: "Le destinataire et les sentiments",
            lessons: 6,
            duration: "55 min",
            locked: false,
          },
          {
            id: 4,
            moduleKey: "2-4",
            title: "Cas instrumental",
            subtitle: "Le moyen et l'accompagnement",
            lessons: 6,
            duration: "55 min",
            locked: false,
          },
          {
            id: 5,
            moduleKey: "2-5",
            title: "Cas prépositionnel",
            subtitle: "Localisation et sujets de conversation",
            lessons: 6,
            duration: "55 min",
            locked: false,
          },
          {
            id: 6,
            moduleKey: "2-6",
            title: "Synthèse des cas",
            subtitle: "Révision et exercices combinés",
            lessons: 5,
            duration: "50 min",
            locked: false,
          },
        ],
      },
      {
        id: 3,
        level: "B1",
        title: "Approfondissement",
        description: "Perfectionnez votre russe avec des thèmes avancés",
        modules: [
          {
            id: 1,
            moduleKey: "3-1",
            title: "Verbes de mouvement",
            subtitle: "Aller, venir, partir avec préfixes",
            lessons: 8,
            duration: "70 min",
            locked: false,
          },
          {
            id: 2,
            moduleKey: "3-2",
            title: "Aspect verbal",
            subtitle: "Perfectif et imperfectif",
            lessons: 7,
            duration: "65 min",
            locked: false,
          },
          {
            id: 3,
            moduleKey: "3-3",
            title: "Temps verbaux",
            subtitle: "Passé, présent, futur et conditionnel",
            lessons: 6,
            duration: "60 min",
            locked: false,
          },
          {
            id: 4,
            moduleKey: "3-4",
            title: "Expression des émotions",
            subtitle: "Vocabulaire et structures pour exprimer ses sentiments",
            lessons: 6,
            duration: "55 min",
            locked: false,
          },
        ],
      },
    ],
    []
  );

  // Calculer la progression pour chaque niveau
  const getLevelProgress = (modules: typeof levels[0]["modules"]) => {
    let totalCompleted = 0;
    let totalLessons = 0;

    modules.forEach((module) => {
      const moduleProgress = getModuleProgress(module.moduleKey);
      totalLessons += module.lessons;
      if (moduleProgress) {
        totalCompleted += moduleProgress.lessonsProgress.filter((l) => l.completed).length;
      }
    });

    return totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;
  };

  // Obtenir le nombre de leçons complétées pour un module
  const getModuleCompletedCount = (moduleKey: string): number => {
    const moduleProgress = getModuleProgress(moduleKey);
    return moduleProgress
      ? moduleProgress.lessonsProgress.filter((l) => l.completed).length
      : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-winter">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* En‑tête */}
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h1 className="text-5xl font-bold">Parcours de formation</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Progressez étape par étape avec notre méthode structurée et interactive
            </p>
          </div>

          {/* Niveaux */}
          <div className="space-y-12">
            {levels.map((level, index) => {
              const levelProgress = getLevelProgress(level.modules);
              return (
                <Card
                  key={level.id}
                  className="p-8 border-border animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold">
                        Niveau {level.level}
                      </div>
                      <h2 className="text-3xl font-bold">{level.title}</h2>
                      <p className="text-muted-foreground">{level.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{levelProgress}%</div>
                      <div className="text-sm text-muted-foreground">Complété</div>
                    </div>
                  </div>
                  <Progress value={levelProgress} className="h-2 mb-8" />
                  <div className="grid gap-4">
                    {level.modules.map((module) => {
                      const completed = getModuleCompletedCount(module.moduleKey);
                      const isCompleted = completed === module.lessons;

                      return (
                        <Card
                          key={module.id}
                          className={`p-6 transition-all duration-300 ${module.locked
                              ? "opacity-60 cursor-not-allowed"
                              : "hover:shadow-glow cursor-pointer"
                            } border-border`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div
                                className={`w-12 h-12 rounded-lg flex items-center justify-center ${module.locked
                                    ? "bg-muted"
                                    : isCompleted
                                      ? "bg-gradient-accent"
                                      : "bg-gradient-primary"
                                  }`}
                              >
                                {module.locked ? (
                                  <Lock className="w-6 h-6 text-muted-foreground" />
                                ) : isCompleted ? (
                                  <CheckCircle className="w-6 h-6 text-accent-foreground" />
                                ) : (
                                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-1">{module.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {module.subtitle}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    {module.lessons} leçons
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {module.duration}
                                  </span>
                                  {completed > 0 && (
                                    <span className="text-primary font-medium">
                                      {completed}/{module.lessons} complétées
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            {!module.locked && (
                              <Link to={`/lesson/${module.moduleKey}`}>
                                <Button variant={isCompleted ? "accent" : "hero"}>
                                  {isCompleted
                                    ? "Réviser"
                                    : completed > 0
                                      ? "Continuer"
                                      : "Commencer"}
                                </Button>
                              </Link>
                            )}
                          </div>
                          {completed > 0 && !module.locked && (
                            <Progress
                              value={(completed / module.lessons) * 100}
                              className="h-1 mt-4"
                            />
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;