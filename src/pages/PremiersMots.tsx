import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

/**
 * Page « Premiers mots »
 *
 * Cette page propose un véritable cours interactif pour apprendre
 * vos premiers mots en russe. Elle est organisée en plusieurs
 * catégories (salutations, présentations, pronoms, nombres et couleurs)
 * afin d'offrir un parcours progressif et cohérent avec l'identité
 * visuelle du site. Chaque catégorie s'ouvre sur une liste de mots
 * accompagnés de leur translittération et de leur traduction en
 * français. Un bouton de lecture est présent pour de futures
 * améliorations (par exemple ajouter de l'audio).
 */
const PremiersMots = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);

  // Définition des catégories et du vocabulaire associé
  const categories = [
    {
      title: "Salutations",
      description: "Les formules essentielles pour saluer et prendre congé",
      items: [
        { word: "Привет", transliteration: "Privet", translation: "Salut (informel)" },
        { word: "Здравствуйте", transliteration: "Zdravstvuite", translation: "Bonjour (formel)" },
        { word: "Доброе утро", transliteration: "Dobroe utro", translation: "Bonjour (matin)" },
        { word: "Добрый день", transliteration: "Dobryj den'", translation: "Bonjour (après‑midi)" },
        { word: "Добрый вечер", transliteration: "Dobryj vecher", translation: "Bonsoir" },
        { word: "Пока", transliteration: "Poka", translation: "Au revoir (informel)" },
        { word: "До свидания", transliteration: "Do svidanija", translation: "Au revoir" },
        { word: "До скорого", transliteration: "Do skorogo", translation: "À bientôt" },
      ],
    },
    {
      title: "Présentations",
      description: "Pour vous présenter et poser des questions simples",
      items: [
        { word: "Как тебя зовут?", transliteration: "Kak tebya zovut?", translation: "Comment t’appelles‑tu ?" },
        { word: "Меня зовут...", transliteration: "Menya zovut...", translation: "Je m’appelle..." },
        { word: "Я ...", transliteration: "Ya ...", translation: "Je suis ..." },
        { word: "Очень приятно", transliteration: "Ochen' priyatno", translation: "Enchanté(e)" },
        { word: "Как дела?", transliteration: "Kak dela?", translation: "Comment ça va ?" },
        { word: "Да", transliteration: "Da", translation: "Oui" },
        { word: "Нет", transliteration: "Net", translation: "Non" },
        { word: "Спасибо", transliteration: "Spasibo", translation: "Merci" },
        { word: "Пожалуйста", transliteration: "Pozhaluysta", translation: "S’il vous plaît / De rien" },
      ],
    },
    {
      title: "Pronoms personnels",
      description: "Les pronoms personnels de base",
      items: [
        { word: "я", transliteration: "ya", translation: "je" },
        { word: "ты", transliteration: "ty", translation: "tu (informel)" },
        { word: "вы", transliteration: "vy", translation: "vous (formel/pluriel)" },
        { word: "он", transliteration: "on", translation: "il" },
        { word: "она", transliteration: "ona", translation: "elle" },
        { word: "мы", transliteration: "my", translation: "nous" },
        { word: "они", transliteration: "oni", translation: "ils/elles" },
      ],
    },
    {
      title: "Nombres 1–10",
      description: "Comptez de un à dix",
      items: [
        { word: "один", transliteration: "odin", translation: "un" },
        { word: "два", transliteration: "dva", translation: "deux" },
        { word: "три", transliteration: "tri", translation: "trois" },
        { word: "четыре", transliteration: "chetyre", translation: "quatre" },
        { word: "пять", transliteration: "pyat'", translation: "cinq" },
        { word: "шесть", transliteration: "shest'", translation: "six" },
        { word: "семь", transliteration: "sem'", translation: "sept" },
        { word: "восемь", transliteration: "vosem'", translation: "huit" },
        { word: "девять", transliteration: "devyat'", translation: "neuf" },
        { word: "десять", transliteration: "desyat'", translation: "dix" },
      ],
    },
    {
      title: "Couleurs",
      description: "Les couleurs principales",
      items: [
        { word: "красный", transliteration: "krasnyy", translation: "rouge" },
        { word: "синий", transliteration: "siniy", translation: "bleu (foncé)" },
        { word: "зелёный", transliteration: "zelyonyy", translation: "vert" },
        { word: "жёлтый", transliteration: "zhyoltyy", translation: "jaune" },
        { word: "чёрный", transliteration: "chyornyy", translation: "noir" },
        { word: "белый", transliteration: "belyy", translation: "blanc" },
      ],
    },
  ];

  // Fonction pour lire un mot à haute voix à l'aide de l'API Web Speech.
  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // Définit la langue sur le russe pour une prononciation correcte
      utterance.lang = "ru-RU";
      window.speechSynthesis.speak(utterance);
    } else {
      console.log(`Audio prononciation : ${text}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-winter">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* En‑tête */}
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h1 className="text-5xl font-bold">Premiers mots</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez les mots et expressions indispensables pour débuter en russe : salutations, pronoms, nombres et plus encore.
            </p>
          </div>

          {activeCategoryIndex === null ? (
            <>
              {/* Grille des catégories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((cat, index) => (
                  <Card
                    key={index}
                    onClick={() => setActiveCategoryIndex(index)}
                    className="p-6 cursor-pointer transition-all duration-300 border-border hover:shadow-soft hover:scale-105"
                  >
                    <h3 className="text-2xl font-semibold mb-2 text-primary">{cat.title}</h3>
                    <p className="text-muted-foreground">{cat.description}</p>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Détails d’une catégorie */}
              <Card className="p-8 border-border animate-slide-up bg-gradient-hero text-primary-foreground">
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-4 gap-2"
                  onClick={() => setActiveCategoryIndex(null)}
                >
                  ← Retour
                </Button>
                <h2 className="text-3xl font-bold mb-6">{categories[activeCategoryIndex].title}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {categories[activeCategoryIndex].items.map((item, idx) => (
                    <Card key={idx} className="p-4 border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-primary">{item.word}</div>
                          <div className="text-sm italic text-muted-foreground">{item.transliteration}</div>
                          <div className="text-lg mt-1">{item.translation}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => speak(item.word)}
                        >
                          <Volume2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </>
          )}

          {/* Section Conseils */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-border">
              <h3 className="text-xl font-semibold mb-3 text-primary">💡 Conseil #1</h3>
              <p className="text-muted-foreground">
                Répétez chaque mot à voix haute et utilisez‑les dans des phrases simples pour mieux les retenir.
              </p>
            </Card>
            <Card className="p-6 border-border">
              <h3 className="text-xl font-semibold mb-3 text-primary">💡 Conseil #2</h3>
              <p className="text-muted-foreground">
                Créez des cartes mémoire (flashcards) pour pratiquer régulièrement le vocabulaire et la prononciation.
              </p>
            </Card>
            <Card className="p-6 border-border">
              <h3 className="text-xl font-semibold mb-3 text-primary">💡 Conseil #3</h3>
              <p className="text-muted-foreground">
                Associez chaque mot à une image ou une situation concrète pour favoriser la mémorisation.
              </p>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PremiersMots;