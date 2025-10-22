import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Lock, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Courses = () => {
  const levels = [
    {
      id: 1,
      level: "A1",
      title: "Débutant absolu",
      description: "Découvrez les bases du russe : alphabet, prononciation et premiers mots",
      progress: 0,
      modules: [
        { id: 1, title: "L'alphabet cyrillique", lessons: 5, duration: "30 min", completed: 0, locked: false },
        { id: 2, title: "Premiers mots", lessons: 8, duration: "45 min", completed: 0, locked: false },
        { id: 3, title: "Se présenter", lessons: 6, duration: "35 min", completed: 0, locked: true },
        { id: 4, title: "Les chiffres", lessons: 4, duration: "25 min", completed: 0, locked: true },
      ]
    },
    {
      id: 2,
      level: "A2",
      title: "Débutant",
      description: "Construisez vos bases : grammaire simple et conversations quotidiennes",
      progress: 0,
      modules: [
        { id: 1, title: "Les cas grammaticaux", lessons: 10, duration: "60 min", completed: 0, locked: true },
        { id: 2, title: "Vocabulaire quotidien", lessons: 12, duration: "55 min", completed: 0, locked: true },
        { id: 3, title: "Au restaurant", lessons: 7, duration: "40 min", completed: 0, locked: true },
      ]
    },
    {
      id: 3,
      level: "B1",
      title: "Intermédiaire",
      description: "Développez votre aisance à l'oral et à l'écrit",
      progress: 0,
      modules: [
        { id: 1, title: "Verbes de mouvement", lessons: 8, duration: "50 min", completed: 0, locked: true },
        { id: 2, title: "Expression des émotions", lessons: 9, duration: "45 min", completed: 0, locked: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-winter">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h1 className="text-5xl font-bold">Parcours de formation</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Progressez étape par étape avec notre méthode structurée et interactive
            </p>
          </div>

          {/* Levels */}
          <div className="space-y-12">
            {levels.map((level, index) => (
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
                    <div className="text-3xl font-bold text-primary">{level.progress}%</div>
                    <div className="text-sm text-muted-foreground">Complété</div>
                  </div>
                </div>

                <Progress value={level.progress} className="h-2 mb-8" />

                <div className="grid gap-4">
                  {level.modules.map((module) => (
                    <Card 
                      key={module.id}
                      className={`p-6 transition-all duration-300 ${
                        module.locked 
                          ? 'opacity-60 cursor-not-allowed' 
                          : 'hover:shadow-glow cursor-pointer'
                      } border-border`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            module.locked 
                              ? 'bg-muted' 
                              : module.completed === module.lessons
                                ? 'bg-gradient-accent'
                                : 'bg-gradient-primary'
                          }`}>
                            {module.locked ? (
                              <Lock className="w-6 h-6 text-muted-foreground" />
                            ) : module.completed === module.lessons ? (
                              <CheckCircle className="w-6 h-6 text-accent-foreground" />
                            ) : (
                              <BookOpen className="w-6 h-6 text-primary-foreground" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-1">{module.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                {module.lessons} leçons
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {module.duration}
                              </span>
                              {module.completed > 0 && (
                                <span className="text-primary font-medium">
                                  {module.completed}/{module.lessons} complétées
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {!module.locked && (
                          <Link to={`/lesson/${level.id}-${module.id}`}>
                            <Button variant={module.completed === module.lessons ? "accent" : "hero"}>
                              {module.completed === module.lessons ? "Réviser" : module.completed > 0 ? "Continuer" : "Commencer"}
                            </Button>
                          </Link>
                        )}
                      </div>

                      {module.completed > 0 && !module.locked && (
                        <Progress 
                          value={(module.completed / module.lessons) * 100} 
                          className="h-1 mt-4"
                        />
                      )}
                    </Card>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Courses;
