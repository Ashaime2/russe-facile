import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Heart, Target, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-winter">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h1 className="text-5xl font-bold">À propos de RussoAcadémie</h1>
            <p className="text-xl text-muted-foreground">
              Notre mission : rendre l'apprentissage du russe accessible, ludique et efficace
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 text-center border-border animate-slide-up">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Notre mission</h3>
              <p className="text-muted-foreground text-sm">
                Démocratiser l'apprentissage du russe avec une méthode moderne et progressive
              </p>
            </Card>

            <Card className="p-6 text-center border-border animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Notre passion</h3>
              <p className="text-muted-foreground text-sm">
                Partager l'amour de la langue et de la culture russes avec des apprenants motivés
              </p>
            </Card>

            <Card className="p-6 text-center border-border animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Notre communauté</h3>
              <p className="text-muted-foreground text-sm">
                Des milliers d'apprenants qui progressent ensemble chaque jour
              </p>
            </Card>
          </div>

          {/* Story Section */}
          <Card className="p-8 mb-16 border-border">
            <h2 className="text-3xl font-bold mb-6">Notre histoire</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                RussoAcadémie est né de la passion de plusieurs professeurs de russe francophones 
                qui souhaitaient créer une plateforme d'apprentissage moderne et accessible.
              </p>
              <p>
                Conscients des difficultés que rencontrent les francophones pour apprendre le russe 
                (alphabet cyrillique, cas grammaticaux, prononciation), nous avons développé une 
                méthode progressive qui accompagne l'apprenant à chaque étape.
              </p>
              <p>
                Notre approche combine rigueur pédagogique et plaisir d'apprendre, avec des exercices 
                interactifs, du contenu audio authentique et une immersion culturelle enrichissante.
              </p>
            </div>
          </Card>

          {/* Contact Form */}
          <Card className="p-8 border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Contactez-nous</h2>
                <p className="text-muted-foreground">Nous serions ravis d'avoir de vos nouvelles</p>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Prénom</label>
                  <Input placeholder="Votre prénom" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Nom</label>
                  <Input placeholder="Votre nom" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="votre@email.com" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sujet</label>
                <Input placeholder="Comment pouvons-nous vous aider ?" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea 
                  placeholder="Votre message..." 
                  className="min-h-[150px]"
                />
              </div>

              <Button variant="hero" size="lg" className="w-full">
                Envoyer le message
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
