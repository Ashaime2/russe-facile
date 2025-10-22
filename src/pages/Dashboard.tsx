import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Calendar, Flame, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = {
    streak: 7,
    totalLessons: 45,
    completedLessons: 12,
    points: 1250,
    level: "A1",
  };

  const recentActivity = [
    { title: "L'alphabet cyrillique", date: "Aujourd'hui", progress: 100 },
    { title: "Premiers mots", date: "Hier", progress: 60 },
    { title: "Se présenter", date: "Il y a 3 jours", progress: 30 },
  ];

  const achievements = [
    { icon: Flame, title: "Série de 7 jours", description: "Continue comme ça !", unlocked: true },
    { icon: Star, title: "Première leçon", description: "Complétée", unlocked: true },
    { icon: Award, title: "Expert alphabet", description: "À débloquer", unlocked: false },
    { icon: TrendingUp, title: "Niveau A2", description: "À débloquer", unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-winter">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Mon Espace</h1>
            <p className="text-xl text-muted-foreground">
              Suivez vos progrès et continuez votre apprentissage
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="p-6 bg-gradient-hero text-primary-foreground border-0">
                  <div className="flex items-center justify-between mb-4">
                    <Flame className="w-8 h-8" />
                    <span className="text-4xl font-bold">{stats.streak}</span>
                  </div>
                  <div className="text-sm opacity-90">Jours consécutifs</div>
                </Card>

                <Card className="p-6 bg-gradient-primary text-primary-foreground border-0">
                  <div className="flex items-center justify-between mb-4">
                    <Star className="w-8 h-8" />
                    <span className="text-4xl font-bold">{stats.points}</span>
                  </div>
                  <div className="text-sm opacity-90">Points XP</div>
                </Card>

                <Card className="p-6 border-border">
                  <div className="flex items-center justify-between mb-4">
                    <BookOpen className="w-8 h-8 text-primary" />
                    <span className="text-4xl font-bold text-primary">
                      {stats.completedLessons}/{stats.totalLessons}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">Leçons complétées</div>
                  <Progress 
                    value={(stats.completedLessons / stats.totalLessons) * 100} 
                    className="mt-3 h-2"
                  />
                </Card>

                <Card className="p-6 border-border">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <span className="text-4xl font-bold text-primary">{stats.level}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Niveau actuel</div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    33 leçons jusqu'au niveau A2
                  </div>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="p-6 border-border">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  Activité récente
                </h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">{activity.date}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right min-w-[80px]">
                          <div className="text-lg font-bold text-primary">{activity.progress}%</div>
                        </div>
                        <Link to="/courses">
                          <Button variant="outline" size="sm">
                            Continuer
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Link to="/courses">
                  <Card className="p-6 hover:shadow-glow transition-all cursor-pointer group border-border">
                    <BookOpen className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-2">Reprendre un cours</h3>
                    <p className="text-sm text-muted-foreground">
                      Continuez là où vous vous êtes arrêté
                    </p>
                  </Card>
                </Link>

                <Link to="/alphabet">
                  <Card className="p-6 hover:shadow-glow transition-all cursor-pointer group border-border">
                    <Award className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-2">Réviser l'alphabet</h3>
                    <p className="text-sm text-muted-foreground">
                      Pratiquez les lettres cyrilliques
                    </p>
                  </Card>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Achievements */}
              <Card className="p-6 border-border">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Succès
                </h2>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg flex items-start gap-3 ${
                        achievement.unlocked 
                          ? 'bg-gradient-accent text-accent-foreground' 
                          : 'bg-muted/50 opacity-60'
                      }`}
                    >
                      <achievement.icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">{achievement.title}</div>
                        <div className={`text-xs ${achievement.unlocked ? 'opacity-90' : 'text-muted-foreground'}`}>
                          {achievement.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Daily Goal */}
              <Card className="p-6 border-border">
                <h2 className="text-xl font-bold mb-4">Objectif du jour</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">XP quotidien</span>
                      <span className="font-semibold">150 / 200</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Plus que 50 XP pour atteindre votre objectif quotidien ! 🎯
                  </p>
                  <Link to="/courses">
                    <Button variant="hero" className="w-full">
                      Gagner plus d'XP
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
