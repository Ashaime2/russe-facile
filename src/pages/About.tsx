import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Heart, Target, Users } from "lucide-react";

/**
 * Page "À propos" simplifiée - projet étudiant
 */
const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h1 className="text-5xl font-bold">À propos de Défi G1‑G2</h1>
            <p className="text-xl text-muted-foreground">
              Un projet étudiant pour apprendre le russe
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 text-center border-border animate-slide-up">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">L'objectif</h3>
              <p className="text-muted-foreground text-sm">
                Proposer une méthode progressive et ludique pour débuter en russe
              </p>
            </Card>

            <Card className="p-6 text-center border-border animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">La passion</h3>
              <p className="text-muted-foreground text-sm">
                Partager l'amour de la langue et de la culture russes
              </p>
            </Card>

            <Card className="p-6 text-center border-border animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Le public</h3>
              <p className="text-muted-foreground text-sm">
                Destiné aux débutants francophones curieux
              </p>
            </Card>
          </div>

          {/* Story Section */}
          <Card className="p-8 border-border">
            <h2 className="text-3xl font-bold mb-6">L'histoire du projet</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Défi G1‑G2</strong> est un projet étudiant créé par Hugo Delplanque,
                étudiant à l'École Centrale de Lille.
              </p>
              <p>
                Passionné par les langues et désireux de progresser en russe, j'ai décidé de construire
                cette plateforme comme un défi personnel et pédagogique.
              </p>
              <p>
                Ce site vise à partager des ressources et à rendre l'apprentissage du russe
                plus accessible pour d'autres apprenants débutants. Il est développé sur mon temps libre
                et reste un projet en constante évolution.
              </p>
              <p className="pt-4 border-t border-border">
                <em>
                  💡 N'hésitez pas à explorer les différentes sections : cours structurés,
                  alphabet cyrillique interactif, et découverte de la culture russe.
                </em>
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;