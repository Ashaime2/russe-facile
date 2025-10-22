import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, PlayCircle } from "lucide-react";

const Alphabet = () => {
  const [activeLetterIndex, setActiveLetterIndex] = useState<number | null>(null);

  const alphabet = [
    { cyrillic: "А", latin: "A", pronunciation: "a", example: "Анна (Anna)", sound: "/a/" },
    { cyrillic: "Б", latin: "B", pronunciation: "bé", example: "Банк (Bank)", sound: "/b/" },
    { cyrillic: "В", latin: "V", pronunciation: "vé", example: "Вода (Voda - eau)", sound: "/v/" },
    { cyrillic: "Г", latin: "G", pronunciation: "gué", example: "Город (Gorod - ville)", sound: "/g/" },
    { cyrillic: "Д", latin: "D", pronunciation: "dé", example: "Дом (Dom - maison)", sound: "/d/" },
    { cyrillic: "Е", latin: "YE", pronunciation: "yé", example: "Если (Yesli - si)", sound: "/je/" },
    { cyrillic: "Ё", latin: "YO", pronunciation: "yo", example: "Ёлка (Yolka - sapin)", sound: "/jo/" },
    { cyrillic: "Ж", latin: "ZH", pronunciation: "jé", example: "Жена (Zhena - femme)", sound: "/ʒ/" },
    { cyrillic: "З", latin: "Z", pronunciation: "zé", example: "Зима (Zima - hiver)", sound: "/z/" },
    { cyrillic: "И", latin: "I", pronunciation: "i", example: "Игра (Igra - jeu)", sound: "/i/" },
    { cyrillic: "Й", latin: "Y", pronunciation: "i court", example: "Май (May - mai)", sound: "/j/" },
    { cyrillic: "К", latin: "K", pronunciation: "ka", example: "Кот (Kot - chat)", sound: "/k/" },
    { cyrillic: "Л", latin: "L", pronunciation: "èl", example: "Лето (Leto - été)", sound: "/l/" },
    { cyrillic: "М", latin: "M", pronunciation: "èm", example: "Мама (Mama)", sound: "/m/" },
    { cyrillic: "Н", latin: "N", pronunciation: "èn", example: "Нет (Net - non)", sound: "/n/" },
    { cyrillic: "О", latin: "O", pronunciation: "o", example: "Окно (Okno - fenêtre)", sound: "/o/" },
    { cyrillic: "П", latin: "P", pronunciation: "pé", example: "Папа (Papa)", sound: "/p/" },
    { cyrillic: "Р", latin: "R", pronunciation: "èr", example: "Рука (Ruka - main)", sound: "/r/" },
    { cyrillic: "С", latin: "S", pronunciation: "ès", example: "Слово (Slovo - mot)", sound: "/s/" },
    { cyrillic: "Т", latin: "T", pronunciation: "té", example: "Там (Tam - là-bas)", sound: "/t/" },
    { cyrillic: "У", latin: "U", pronunciation: "ou", example: "Утро (Utro - matin)", sound: "/u/" },
    { cyrillic: "Ф", latin: "F", pronunciation: "èf", example: "Фото (Foto)", sound: "/f/" },
    { cyrillic: "Х", latin: "KH", pronunciation: "kha", example: "Хорошо (Khorosho - bien)", sound: "/x/" },
    { cyrillic: "Ц", latin: "TS", pronunciation: "tsé", example: "Цветок (Tsvetok - fleur)", sound: "/ts/" },
    { cyrillic: "Ч", latin: "CH", pronunciation: "tché", example: "Час (Chas - heure)", sound: "/tʃ/" },
    { cyrillic: "Ш", latin: "SH", pronunciation: "cha", example: "Школа (Shkola - école)", sound: "/ʃ/" },
    { cyrillic: "Щ", latin: "SHCH", pronunciation: "chtch", example: "Щи (Shchi - soupe)", sound: "/ɕː/" },
    { cyrillic: "Ъ", latin: "″", pronunciation: "signe dur", example: "Подъезд (entrée)", sound: "-" },
    { cyrillic: "Ы", latin: "Y", pronunciation: "i dur", example: "Мы (My - nous)", sound: "/ɨ/" },
    { cyrillic: "Ь", latin: "′", pronunciation: "signe mou", example: "Соль (Sol - sel)", sound: "-" },
    { cyrillic: "Э", latin: "E", pronunciation: "é", example: "Это (Eto - c'est)", sound: "/ɛ/" },
    { cyrillic: "Ю", latin: "YU", pronunciation: "you", example: "Юг (Yug - sud)", sound: "/ju/" },
    { cyrillic: "Я", latin: "YA", pronunciation: "ya", example: "Я (Ya - je)", sound: "/ja/" },
  ];

  const playSound = (letter: string) => {
    // This would play actual audio in a real implementation
    console.log(`Playing sound for: ${letter}`);
  };

  return (
    <div className="min-h-screen bg-gradient-winter">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h1 className="text-5xl font-bold">L'alphabet cyrillique</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Maîtrisez les 33 lettres de l'alphabet russe avec leur prononciation et des exemples
            </p>
            <Button variant="hero" className="gap-2">
              <PlayCircle className="w-5 h-5" />
              Écouter tout l'alphabet
            </Button>
          </div>

          {/* Alphabet Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
            {alphabet.map((letter, index) => (
              <Card
                key={index}
                onClick={() => setActiveLetterIndex(index)}
                className={`p-6 text-center cursor-pointer transition-all duration-300 border-border ${
                  activeLetterIndex === index
                    ? 'shadow-glow border-primary bg-primary/5'
                    : 'hover:shadow-soft hover:scale-105'
                }`}
              >
                <div className="text-4xl font-bold text-primary mb-2">{letter.cyrillic}</div>
                <div className="text-sm text-muted-foreground">{letter.latin}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    playSound(letter.cyrillic);
                  }}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>

          {/* Letter Detail */}
          {activeLetterIndex !== null && (
            <Card className="p-8 border-border animate-slide-up bg-gradient-hero text-primary-foreground">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="text-center md:text-left">
                    <div className="text-8xl font-bold mb-4">{alphabet[activeLetterIndex].cyrillic}</div>
                    <div className="text-3xl mb-2">{alphabet[activeLetterIndex].latin}</div>
                    <div className="text-xl opacity-90">Prononciation : {alphabet[activeLetterIndex].pronunciation}</div>
                  </div>
                  <Button variant="accent" size="lg" className="w-full md:w-auto gap-2">
                    <Volume2 className="w-5 h-5" />
                    Écouter la lettre
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Son phonétique</h3>
                    <p className="text-xl opacity-90">{alphabet[activeLetterIndex].sound}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Exemple</h3>
                    <p className="text-2xl opacity-90 mb-2">{alphabet[activeLetterIndex].example}</p>
                    <Button variant="outline" size="sm" className="gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/30">
                      <Volume2 className="w-4 h-4" />
                      Écouter l'exemple
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Tips Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-border">
              <h3 className="text-xl font-semibold mb-3 text-primary">💡 Conseil #1</h3>
              <p className="text-muted-foreground">
                Écoutez chaque lettre plusieurs fois et répétez à voix haute pour mémoriser la prononciation
              </p>
            </Card>
            <Card className="p-6 border-border">
              <h3 className="text-xl font-semibold mb-3 text-primary">💡 Conseil #2</h3>
              <p className="text-muted-foreground">
                Certaines lettres ressemblent au latin mais se prononcent différemment (В = V, Н = N, Р = R)
              </p>
            </Card>
            <Card className="p-6 border-border">
              <h3 className="text-xl font-semibold mb-3 text-primary">💡 Conseil #3</h3>
              <p className="text-muted-foreground">
                Pratiquez l'écriture en même temps que la prononciation pour une meilleure mémorisation
              </p>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Alphabet;
