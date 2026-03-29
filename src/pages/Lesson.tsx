import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Données des leçons par module. La clé correspond à "niveau-module".
const lessonsByModule: {
  [key: string]: { title: string; lessons: { title: string; content: string }[] };
} = {
  "1-1": {
    title: "L'alphabet cyrillique",
    lessons: [
      {
        title: "Présentation des voyelles",
        content:
          "Dans cette leçon, vous découvrirez les voyelles russes А, Е, И, О, У et comment les prononcer. Chaque lettre possède un son unique qui peut différer du français. Prenez le temps d'écouter et de répéter.",
      },
      {
        title: "Présentation des consonnes",
        content:
          "Cette leçon présente les consonnes de base comme Б, В, Г, Д, Ж, З, К, Л, М, Н, П, Р, С, Т, Ф et Х. La prononciation de certaines consonnes peut être douce ou dure selon le contexte.",
      },
      {
        title: "Lettres spéciales",
        content:
          "Certaines lettres ont des prononciations particulières comme Й, Ш, Щ et Ы. Nous explorerons leurs sons et les différences subtiles qui les distinguent du français.",
      },
      {
        title: "Signe dur et signe mou",
        content:
          "Le Ъ (signe dur) et le Ь (signe mou) ne se prononcent pas mais modifient la prononciation des lettres précédentes. Ils jouent un rôle important dans la phonétique russe.",
      },
      {
        title: "Pratique de lecture",
        content:
          "Entraînez-vous à lire des mots simples comme « мама », « папа » et « дом » en utilisant les lettres apprises. Répétez à haute voix pour améliorer votre aisance.",
      },
    ],
  },
  "1-2": {
    title: "Premiers mots",
    lessons: [
      {
        title: "Salutations",
        content:
          "Apprenez les salutations courantes : Здравствуйте (bonjour), Привет (salut) et Пока (au revoir). Utilisez-les dans des situations simples.",
      },
      {
        title: "Les nombres de 1 à 10",
        content:
          "Comptez de 1 à 10 en russe : один, два, три, четыре, пять, шесть, семь, восемь, девять, десять. Écrivez et répétez chaque nombre.",
      },
      {
        title: "Famille et amis",
        content:
          "Parlez de votre famille : мама (maman), папа (papa), брат (frère), сестра (sœur). Ajoutez quelques amis : друг (ami), подруга (amie).",
      },
      {
        title: "Questions simples",
        content:
          "Posez des questions simples comme « Как дела? » (Comment ça va ?) et « Где туалет? » (Où sont les toilettes ?). Apprenez à répondre brièvement.",
      },
    ],
  },
};

const Lesson = () => {
  const { id } = useParams<{ id: string }>();
  const data = id ? lessonsByModule[id] : undefined;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Si aucun contenu n'est défini pour ce module, afficher un message.
  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-winter">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <h1 className="text-4xl font-bold mb-4">Contenu à venir</h1>
          <p>Le contenu de cette leçon n'est pas encore disponible.</p>
          <Link to="/courses">
            <Button variant="hero" className="mt-6">
              Retour aux parcours
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const lesson = data.lessons[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-winter">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center">{data.title}</h1>
          <Card className="p-8 border-border">
            <h2 className="text-2xl font-semibold mb-4">{lesson.title}</h2>
            <p className="text-lg mb-6">{lesson.content}</p>
            <div className="flex justify-between">
              <Button
                variant="outline"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
              >
                ← Leçon précédente
              </Button>
              <Button
                variant="outline"
                disabled={currentIndex === data.lessons.length - 1}
                onClick={() =>
                  setCurrentIndex((i) =>
                    Math.min(i + 1, data.lessons.length - 1)
                  )
                }
              >
                Leçon suivante →
              </Button>
            </div>
          </Card>
          <Link to="/courses">
            <Button variant="hero" className="mt-4">
              Retour aux parcours
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Lesson;
