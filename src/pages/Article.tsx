import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Volume2, ChevronRight } from "lucide-react";

/**
 * Pages d'articles culturels complets
 */

// Données des articles
const articlesData: Record<string, {
  title: string;
  category: string;
  readTime: string;
  content: { type: "paragraph" | "heading" | "list" | "quote"; text: string | string[] }[];
  vocabulary?: { russian: string; translation: string }[];
}> = {
  "0": {
    title: "Le thé russe et ses traditions",
    category: "Cuisine",
    readTime: "5 min",
    content: [
      { type: "paragraph", text: "Le thé occupe une place centrale dans la culture russe depuis plus de trois siècles. Introduit au XVIIe siècle, il est rapidement devenu la boisson nationale, dépassant même la vodka en termes de consommation quotidienne." },
      { type: "heading", text: "Le samovar : cœur de la tradition" },
      { type: "paragraph", text: "Le samovar (самовар), littéralement « celui qui bout lui-même », est l'emblème du thé russe. Cette bouilloire traditionnelle en métal, souvent richement décorée, trône au centre de la table et maintient l'eau chaude pendant des heures grâce à son système de chauffage au charbon." },
      { type: "paragraph", text: "Le thé concentré (заварка) est préparé dans une petite théière posée sur le samovar. Chaque convive dilue ce concentré avec l'eau chaude du samovar selon ses préférences, créant ainsi un thé personnalisé." },
      { type: "heading", text: "L'art de servir le thé" },
      { type: "paragraph", text: "En Russie, le thé se boit traditionnellement dans des verres (стакан) placés dans des porte-verres en métal appelés подстаканник. Cette tradition remonte aux voyages en train où les verres risquaient de se renverser." },
      { type: "list", text: ["Le thé est souvent accompagné de confiture (варенье) à déguster à la petite cuillère", "Les pâtisseries traditionnelles comme les пряники (pain d'épices) ou les сушки (petits biscuits ronds)", "Le miel et le citron sont des accompagnements populaires"] },
      { type: "heading", text: "Expressions autour du thé" },
      { type: "quote", text: "« Где чай, там и рай » — Là où il y a du thé, il y a le paradis" },
      { type: "paragraph", text: "Le thé russe est plus qu'une simple boisson : c'est un moment de partage, de conversation et de chaleur humaine. L'expression « пить чай » (boire le thé) désigne souvent un moment convivial entre amis ou en famille, bien au-delà de la simple consommation de la boisson." },
    ],
    vocabulary: [
      { russian: "чай", translation: "thé" },
      { russian: "самовар", translation: "samovar" },
      { russian: "заварка", translation: "thé concentré" },
      { russian: "варенье", translation: "confiture" },
      { russian: "сахар", translation: "sucre" },
      { russian: "кипяток", translation: "eau bouillante" },
    ],
  },
  "1": {
    title: "La musique classique russe",
    category: "Arts",
    readTime: "7 min",
    content: [
      { type: "paragraph", text: "La Russie a donné au monde certains des plus grands compositeurs de l'histoire de la musique classique. Du romantisme de Tchaïkovski aux innovations de Stravinsky, la musique russe se distingue par son intensité émotionnelle et sa richesse mélodique." },
      { type: "heading", text: "Piotr Ilitch Tchaïkovski (1840-1893)" },
      { type: "paragraph", text: "Tchaïkovski reste le compositeur russe le plus célèbre dans le monde entier. Ses ballets — Le Lac des cygnes, La Belle au bois dormant et Casse-Noisette — sont joués dans tous les théâtres du monde. Son ouverture de 1812 et son Concerto pour piano n°1 sont devenus des œuvres emblématiques." },
      { type: "quote", text: "« La musique est un art qui vient directement du cœur et qui s'adresse au cœur » — Tchaïkovski" },
      { type: "heading", text: "Sergueï Rachmaninov (1873-1943)" },
      { type: "paragraph", text: "Virtuose du piano et compositeur romantique tardif, Rachmaninov est connu pour ses concertos pour piano d'une beauté mélancolique. Son Concerto n°2 est considéré comme l'un des plus beaux jamais écrits. Ses grandes mains lui permettaient de jouer des intervalles impossibles pour la plupart des pianistes." },
      { type: "heading", text: "Igor Stravinsky (1882-1971)" },
      { type: "paragraph", text: "Révolutionnaire de la musique moderne, Stravinsky a bouleversé les conventions avec ses ballets russes. Le Sacre du printemps, créé en 1913, a provoqué un scandale à sa première représentation à Paris par son rythme sauvage et sa dissonance, mais est aujourd'hui considéré comme un chef-d'œuvre fondateur de la musique du XXe siècle." },
      { type: "heading", text: "L'héritage musical russe" },
      { type: "list", text: ["Modeste Moussorgski — Les Tableaux d'une exposition", "Nikolaï Rimski-Korsakov — Schéhérazade", "Sergueï Prokofiev — Pierre et le Loup, Roméo et Juliette", "Dmitri Chostakovitch — Symphonies puissantes composées sous le régime soviétique"] },
    ],
    vocabulary: [
      { russian: "музыка", translation: "musique" },
      { russian: "композитор", translation: "compositeur" },
      { russian: "балет", translation: "ballet" },
      { russian: "симфония", translation: "symphonie" },
      { russian: "пианино", translation: "piano" },
      { russian: "оркестр", translation: "orchestre" },
    ],
  },
  "2": {
    title: "Saint-Pétersbourg : la Venise du Nord",
    category: "Histoire",
    readTime: "10 min",
    content: [
      { type: "paragraph", text: "Fondée en 1703 par le tsar Pierre le Grand, Saint-Pétersbourg (Санкт-Петербург) est l'une des villes les plus magnifiques d'Europe. Construite sur les marécages de la Neva, elle fut conçue pour devenir la « fenêtre de la Russie sur l'Europe »." },
      { type: "heading", text: "La vision de Pierre le Grand" },
      { type: "paragraph", text: "Pierre le Grand voulait moderniser la Russie et l'ouvrir sur l'Occident. Il a fait appel aux meilleurs architectes européens pour construire une capitale grandiose. Des milliers d'ouvriers ont péri lors de la construction de cette ville sur un terrain hostile." },
      { type: "heading", text: "Le Musée de l'Ermitage" },
      { type: "paragraph", text: "L'Ermitage (Эрмитаж) est l'un des plus grands musées du monde. Installé dans le Palais d'Hiver, ancienne résidence des tsars, il abrite plus de 3 millions d'œuvres d'art, dont des chefs-d'œuvre de Rembrandt, Léonard de Vinci et des impressionnistes français." },
      { type: "quote", text: "« Saint-Pétersbourg est la plus abstraite et la plus intentionnelle des villes » — Dostoïevski" },
      { type: "heading", text: "Les Nuits Blanches" },
      { type: "paragraph", text: "De fin mai à début juillet, Saint-Pétersbourg vit ses célèbres Nuits Blanches (Белые ночи). Le soleil ne se couche presque pas, créant une atmosphère magique. La ville organise de nombreux festivals culturels durant cette période." },
      { type: "heading", text: "Lieux emblématiques" },
      { type: "list", text: ["La forteresse Pierre-et-Paul — berceau de la ville", "La cathédrale Saint-Isaac — dôme doré visible de toute la ville", "Le Palais de Peterhof — le « Versailles russe » avec ses fontaines", "La perspective Nevski — artère principale de 4,5 km", "Le théâtre Mariinsky — temple du ballet classique russe"] },
    ],
    vocabulary: [
      { russian: "город", translation: "ville" },
      { russian: "дворец", translation: "palais" },
      { russian: "музей", translation: "musée" },
      { russian: "река", translation: "fleuve" },
      { russian: "мост", translation: "pont" },
      { russian: "собор", translation: "cathédrale" },
    ],
  },
  "3": {
    title: "Les grands auteurs russes",
    category: "Littérature",
    readTime: "8 min",
    content: [
      { type: "paragraph", text: "La littérature russe est considérée comme l'une des plus riches et des plus profondes au monde. Du XIXe siècle à nos jours, les écrivains russes ont exploré l'âme humaine avec une intensité inégalée." },
      { type: "heading", text: "Fiodor Dostoïevski (1821-1881)" },
      { type: "paragraph", text: "Dostoïevski est le maître de l'exploration psychologique. Crime et Châtiment, Les Frères Karamazov et L'Idiot plongent dans les profondeurs de la conscience humaine. Ses personnages tourmentés luttent avec les questions fondamentales de la morale, de la foi et de la liberté." },
      { type: "quote", text: "« L'homme est un mystère. Il faut le déchiffrer, et si tu y passes toute ta vie, ne dis pas que tu as perdu ton temps » — Dostoïevski" },
      { type: "heading", text: "Léon Tolstoï (1828-1910)" },
      { type: "paragraph", text: "Tolstoï est l'auteur de deux des plus grands romans jamais écrits : Guerre et Paix et Anna Karénine. Son œuvre combine une fresque historique monumentale avec une analyse fine des sentiments humains." },
      { type: "heading", text: "Anton Tchekhov (1860-1904)" },
      { type: "paragraph", text: "Médecin de formation, Tchekhov a révolutionné le théâtre et la nouvelle. La Cerisaie, Les Trois Sœurs et La Mouette sont des pièces où l'action cède la place aux non-dits et aux silences." },
      { type: "heading", text: "Alexandre Pouchkine (1799-1837)" },
      { type: "paragraph", text: "Pouchkine est considéré comme le fondateur de la littérature russe moderne. Son roman en vers Eugène Onéguine est un chef-d'œuvre d'ironie et de lyrisme." },
      { type: "heading", text: "Auteurs du XXe siècle" },
      { type: "list", text: ["Mikhaïl Boulgakov — Le Maître et Marguerite", "Boris Pasternak — Docteur Jivago, Prix Nobel 1958", "Anna Akhmatova — poétesse majeure", "Alexandre Soljenitsyne — L'Archipel du Goulag"] },
    ],
    vocabulary: [
      { russian: "книга", translation: "livre" },
      { russian: "писатель", translation: "écrivain" },
      { russian: "роман", translation: "roman" },
      { russian: "поэт", translation: "poète" },
      { russian: "рассказ", translation: "nouvelle" },
      { russian: "читать", translation: "lire" },
    ],
  },
};

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const article = id ? articlesData[id] : null;

  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ru-RU";
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
          <Link to="/culture">
            <Button variant="outline">Retour à la culture</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Navigation */}
          <Link to="/culture" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la culture
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                {article.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime} de lecture
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{article.title}</h1>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {article.content.map((block, index) => {
              switch (block.type) {
                case "heading":
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">
                      {block.text as string}
                    </h2>
                  );
                case "paragraph":
                  return (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {block.text as string}
                    </p>
                  );
                case "list":
                  return (
                    <ul key={index} className="list-disc pl-6 space-y-2">
                      {(block.text as string[]).map((item, i) => (
                        <li key={i} className="text-muted-foreground">{item}</li>
                      ))}
                    </ul>
                  );
                case "quote":
                  return (
                    <blockquote key={index} className="border-l-4 border-primary pl-6 py-2 my-6 italic text-xl text-foreground bg-muted/30 rounded-r-lg pr-4">
                      {block.text as string}
                    </blockquote>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* Vocabulary */}
          {article.vocabulary && (
            <Card className="p-6 mt-12 border-border">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-primary" />
                Vocabulaire de l'article
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {article.vocabulary.map((word, index) => (
                  <div
                    key={index}
                    onClick={() => speak(word.russian)}
                    className="p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
                  >
                    <div className="font-bold text-primary">{word.russian}</div>
                    <div className="text-sm text-muted-foreground">{word.translation}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Navigation articles */}
          <div className="mt-12 flex justify-between">
            {id && parseInt(id) > 0 && (
              <Link to={`/article/${parseInt(id) - 1}`}>
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Précédent
                </Button>
              </Link>
            )}
            {id && parseInt(id) < 3 && (
              <Link to={`/article/${parseInt(id) + 1}`} className="ml-auto">
                <Button variant="outline" className="gap-2">
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Article;
