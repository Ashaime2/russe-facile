import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Volume2,
    ChevronRight,
    ChevronLeft,
    Search,
    Star,
    BookOpen,
    RotateCcw,
    Shuffle
} from "lucide-react";
import { dailyThemes, type DailyTheme } from "@/data/dailyThemes";
import { useMyFlashcards } from "@/hooks/useMyFlashcards";
import { playSuccessSound, playClickSound } from "@/lib/sounds";

/**
 * Page Vocabulaire - Thèmes du quotidien avec flashcards
 */
const Vocabulary = () => {
    const [selectedTheme, setSelectedTheme] = useState<DailyTheme | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("vocabulary");

    // Flashcard mode states
    const [flashcardIndex, setFlashcardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [shuffledVocab, setShuffledVocab] = useState<typeof selectedTheme.vocabulary>([]);
    const [isShuffled, setIsShuffled] = useState(false);

    // Hook pour les flashcards personnelles
    const { isInFlashcards, toggleFlashcard, count: flashcardCount } = useMyFlashcards();

    // Fonction TTS
    const speak = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "ru-RU";
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Filtrer les thèmes par recherche
    const filteredThemes = dailyThemes.filter(
        (theme) =>
            theme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            theme.titleRu.toLowerCase().includes(searchQuery.toLowerCase()) ||
            theme.vocabulary.some(
                (v) =>
                    v.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    v.translation.toLowerCase().includes(searchQuery.toLowerCase())
            )
    );

    // Vocabulaire pour flashcards (shuffled ou original)
    const getVocabForFlashcards = () => {
        if (!selectedTheme) return [];
        return isShuffled ? shuffledVocab : selectedTheme.vocabulary;
    };

    const vocabCards = getVocabForFlashcards();
    const currentFlashcard = vocabCards[flashcardIndex];

    // Mélanger les flashcards
    const shuffleFlashcards = () => {
        if (!selectedTheme) return;
        const shuffled = [...selectedTheme.vocabulary].sort(() => Math.random() - 0.5);
        setShuffledVocab(shuffled);
        setIsShuffled(true);
        setFlashcardIndex(0);
        setIsFlipped(false);
    };

    // Réinitialiser
    const resetFlashcards = () => {
        setIsShuffled(false);
        setFlashcardIndex(0);
        setIsFlipped(false);
    };

    // Navigation flashcards
    const nextFlashcard = () => {
        if (flashcardIndex < vocabCards.length - 1) {
            setFlashcardIndex((i) => i + 1);
            setIsFlipped(false);
        } else {
            playSuccessSound();
        }
    };

    const prevFlashcard = () => {
        if (flashcardIndex > 0) {
            setFlashcardIndex((i) => i - 1);
            setIsFlipped(false);
        }
    };

    // Retour à la liste des thèmes
    const goBack = () => {
        setSelectedTheme(null);
        setActiveTab("vocabulary");
        setFlashcardIndex(0);
        setIsFlipped(false);
        setIsShuffled(false);
    };

    // Vue détaillée d'un thème
    if (selectedTheme) {
        return (
            <div className="min-h-screen bg-gradient-winter">
                <Navigation />
                <div className="container mx-auto px-4 pt-24 pb-16">
                    <div className="max-w-4xl mx-auto">
                        {/* Header avec retour */}
                        <Button
                            variant="ghost"
                            onClick={goBack}
                            className="mb-6 gap-2"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Retour aux thèmes
                        </Button>

                        <div className="text-center mb-8 animate-fade-in">
                            <span className="text-6xl mb-4 block">{selectedTheme.icon}</span>
                            <h1 className="text-4xl font-bold">{selectedTheme.title}</h1>
                            <p className="text-xl text-primary font-medium">
                                {selectedTheme.titleRu}
                            </p>
                            <p className="text-muted-foreground mt-2">
                                {selectedTheme.vocabulary.length} mots • {selectedTheme.phrases.length} phrases
                            </p>
                        </div>

                        {/* Onglets */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                                <TabsTrigger value="vocabulary" className="gap-2">
                                    📚 Vocabulaire
                                </TabsTrigger>
                                <TabsTrigger value="flashcards" className="gap-2">
                                    🎴 Flashcards
                                </TabsTrigger>
                                <TabsTrigger value="phrases" className="gap-2">
                                    💬 Phrases
                                </TabsTrigger>
                            </TabsList>

                            {/* Onglet Vocabulaire */}
                            <TabsContent value="vocabulary" className="mt-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {selectedTheme.vocabulary.map((item, index) => {
                                        const isStarred = isInFlashcards(item.word);
                                        return (
                                            <Card
                                                key={index}
                                                className="p-4 border-border hover:shadow-soft transition-all group"
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <div
                                                        className="flex-1 cursor-pointer"
                                                        onClick={() => speak(item.word)}
                                                    >
                                                        <div className="text-xl font-bold text-primary">
                                                            {item.word}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground italic">
                                                            {item.transliteration}
                                                        </div>
                                                        <div className="text-sm mt-1">{item.translation}</div>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => speak(item.word)}
                                                            className="opacity-50 group-hover:opacity-100"
                                                        >
                                                            <Volume2 className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => {
                                                                playClickSound();
                                                                toggleFlashcard({
                                                                    word: item.word,
                                                                    translation: item.translation,
                                                                    transliteration: item.transliteration,
                                                                    themeId: selectedTheme.id,
                                                                    themeName: selectedTheme.title,
                                                                });
                                                            }}
                                                            className={isStarred ? "text-yellow-500" : "opacity-50 group-hover:opacity-100"}
                                                        >
                                                            <Star className={`w-4 h-4 ${isStarred ? "fill-current" : ""}`} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </TabsContent>

                            {/* Onglet Flashcards */}
                            <TabsContent value="flashcards" className="mt-6">
                                <div className="max-w-lg mx-auto">
                                    {/* Actions */}
                                    <div className="flex justify-center gap-4 mb-6">
                                        <Button variant="outline" onClick={shuffleFlashcards} className="gap-2">
                                            <Shuffle className="w-4 h-4" />
                                            Mélanger
                                        </Button>
                                        <Button variant="outline" onClick={resetFlashcards} className="gap-2">
                                            <RotateCcw className="w-4 h-4" />
                                            Réinitialiser
                                        </Button>
                                    </div>

                                    {/* Progress */}
                                    <div className="mb-6">
                                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                            <span>Carte {flashcardIndex + 1} / {vocabCards.length}</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-300"
                                                style={{ width: `${((flashcardIndex + 1) / vocabCards.length) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Flashcard */}
                                    {currentFlashcard && (
                                        <Card
                                            onClick={() => setIsFlipped(!isFlipped)}
                                            className="p-12 border-border cursor-pointer hover:shadow-glow transition-all min-h-[250px] flex flex-col items-center justify-center mb-6"
                                        >
                                            <div className="text-center space-y-4">
                                                {!isFlipped ? (
                                                    <>
                                                        <div className="text-4xl font-bold text-primary">
                                                            {currentFlashcard.word}
                                                        </div>
                                                        <div className="text-lg text-muted-foreground italic">
                                                            {currentFlashcard.transliteration}
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                speak(currentFlashcard.word);
                                                            }}
                                                            className="gap-2"
                                                        >
                                                            <Volume2 className="w-4 h-4" />
                                                            Écouter
                                                        </Button>
                                                        <p className="text-xs text-muted-foreground">
                                                            Cliquez pour voir la traduction
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="text-3xl font-bold">
                                                            {currentFlashcard.translation}
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                playClickSound();
                                                                toggleFlashcard({
                                                                    word: currentFlashcard.word,
                                                                    translation: currentFlashcard.translation,
                                                                    transliteration: currentFlashcard.transliteration,
                                                                    themeId: selectedTheme.id,
                                                                    themeName: selectedTheme.title,
                                                                });
                                                            }}
                                                            className={`gap-2 ${isInFlashcards(currentFlashcard.word) ? "text-yellow-500" : ""}`}
                                                        >
                                                            <Star className={`w-4 h-4 ${isInFlashcards(currentFlashcard.word) ? "fill-current" : ""}`} />
                                                            {isInFlashcards(currentFlashcard.word) ? "Dans mes flashcards" : "Ajouter à mes flashcards"}
                                                        </Button>
                                                        <p className="text-xs text-muted-foreground">
                                                            Cliquez pour retourner
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        </Card>
                                    )}

                                    {/* Navigation */}
                                    <div className="flex justify-between">
                                        <Button
                                            variant="outline"
                                            onClick={prevFlashcard}
                                            disabled={flashcardIndex === 0}
                                            className="gap-2"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Précédent
                                        </Button>

                                        <Button
                                            variant="hero"
                                            onClick={nextFlashcard}
                                            disabled={flashcardIndex >= vocabCards.length - 1}
                                            className="gap-2"
                                        >
                                            Suivant
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* Fin */}
                                    {flashcardIndex === vocabCards.length - 1 && (
                                        <div className="mt-6 text-center">
                                            <Card className="p-4 border-primary/50 bg-primary/5">
                                                <p className="font-medium">🎉 Bravo ! Thème terminé !</p>
                                                <Button
                                                    variant="link"
                                                    onClick={shuffleFlashcards}
                                                    className="mt-2"
                                                >
                                                    Recommencer en mélangeant
                                                </Button>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            {/* Onglet Phrases */}
                            <TabsContent value="phrases" className="mt-6">
                                {selectedTheme.phrases.length > 0 ? (
                                    <div className="space-y-4">
                                        {selectedTheme.phrases.map((item, index) => (
                                            <Card
                                                key={index}
                                                className="p-4 border-border hover:shadow-soft transition-all cursor-pointer group"
                                                onClick={() => speak(item.phrase)}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="text-lg font-medium text-primary">
                                                            {item.phrase}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground italic">
                                                            {item.transliteration}
                                                        </div>
                                                        <div className="text-sm mt-1">{item.translation}</div>
                                                    </div>
                                                    <Volume2 className="w-5 h-5 text-muted-foreground opacity-50 group-hover:opacity-100 flex-shrink-0" />
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <p>Pas de phrases pour ce thème.</p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>

                        {/* Lien vers mes flashcards */}
                        {flashcardCount > 0 && (
                            <div className="mt-8 text-center">
                                <Link to="/my-flashcards">
                                    <Button variant="outline" className="gap-2">
                                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                        Voir mes {flashcardCount} flashcards sauvegardées
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Vue liste des thèmes
    return (
        <div className="min-h-screen bg-gradient-winter">
            <Navigation />
            <div className="container mx-auto px-4 pt-24 pb-16">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 space-y-4 animate-fade-in">
                        <h1 className="text-5xl font-bold">Vocabulaire</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Apprenez le vocabulaire russe par thèmes du quotidien
                        </p>
                        {flashcardCount > 0 && (
                            <Link to="/my-flashcards">
                                <Button variant="outline" className="gap-2">
                                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                    Mes {flashcardCount} flashcards
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Barre de recherche */}
                    <div className="max-w-md mx-auto mb-12">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Rechercher un mot ou un thème..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Grille des thèmes */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredThemes.map((theme) => (
                            <Card
                                key={theme.id}
                                onClick={() => {
                                    setSelectedTheme(theme);
                                    setFlashcardIndex(0);
                                    setIsFlipped(false);
                                    setIsShuffled(false);
                                }}
                                className="p-6 border-border hover:shadow-glow hover:border-primary/50 transition-all cursor-pointer group"
                            >
                                <div className="text-center">
                                    <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">
                                        {theme.icon}
                                    </span>
                                    <h3 className="text-xl font-bold mb-1">{theme.title}</h3>
                                    <p className="text-primary font-medium mb-2">
                                        {theme.titleRu}
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {theme.description}
                                    </p>
                                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                                        <span>📚 {theme.vocabulary.length} mots</span>
                                        {theme.phrases.length > 0 && (
                                            <span>💬 {theme.phrases.length} phrases</span>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {filteredThemes.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>Aucun thème trouvé pour "{searchQuery}"</p>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="mt-16 text-center">
                        <Card className="inline-block p-6 border-border">
                            <div className="flex items-center gap-8">
                                <div>
                                    <div className="text-3xl font-bold text-primary">
                                        {dailyThemes.length}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Thèmes</div>
                                </div>
                                <div className="h-12 w-px bg-border" />
                                <div>
                                    <div className="text-3xl font-bold text-primary">
                                        {dailyThemes.reduce((acc, t) => acc + t.vocabulary.length, 0)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Mots</div>
                                </div>
                                <div className="h-12 w-px bg-border" />
                                <div>
                                    <div className="text-3xl font-bold text-primary">
                                        {dailyThemes.reduce((acc, t) => acc + t.phrases.length, 0)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Phrases</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Vocabulary;
