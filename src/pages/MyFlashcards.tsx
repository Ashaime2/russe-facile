import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Volume2,
    Trash2,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
    Shuffle,
    BookmarkX,
    Sparkles
} from "lucide-react";
import { useMyFlashcards } from "@/hooks/useMyFlashcards";
import { playSuccessSound } from "@/lib/sounds";

/**
 * Page Mes Flashcards - Révision personnalisée
 */
const MyFlashcards = () => {
    const { flashcards, removeFlashcard, clearAll } = useMyFlashcards();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [shuffledCards, setShuffledCards] = useState<typeof flashcards>([]);
    const [isShuffled, setIsShuffled] = useState(false);

    // Cartes à afficher (shuffled ou originales)
    const cards = isShuffled ? shuffledCards : flashcards;
    const currentCard = cards[currentIndex];

    // Fonction TTS
    const speak = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "ru-RU";
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Mélanger les cartes
    const shuffleCards = () => {
        const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
        setShuffledCards(shuffled);
        setIsShuffled(true);
        setCurrentIndex(0);
        setIsFlipped(false);
    };

    // Réinitialiser l'ordre
    const resetOrder = () => {
        setIsShuffled(false);
        setCurrentIndex(0);
        setIsFlipped(false);
    };

    // Navigation
    const goNext = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex((i) => i + 1);
            setIsFlipped(false);
        } else {
            playSuccessSound();
        }
    };

    const goPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((i) => i - 1);
            setIsFlipped(false);
        }
    };

    // Supprimer la carte actuelle
    const removeCurrentCard = () => {
        if (currentCard) {
            removeFlashcard(currentCard.id);
            if (currentIndex >= cards.length - 1 && currentIndex > 0) {
                setCurrentIndex((i) => i - 1);
            }
            setIsFlipped(false);
        }
    };

    // Vue vide
    if (flashcards.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-winter">
                <Navigation />
                <div className="container mx-auto px-4 pt-24 pb-16">
                    <div className="max-w-2xl mx-auto text-center space-y-8">
                        <div className="text-8xl">📚</div>
                        <h1 className="text-4xl font-bold">Mes Flashcards</h1>
                        <p className="text-xl text-muted-foreground">
                            Vous n'avez pas encore de flashcards sauvegardées.
                        </p>
                        <p className="text-muted-foreground">
                            Ajoutez des mots depuis la page{" "}
                            <Link to="/vocabulary" className="text-primary hover:underline">
                                Vocabulaire
                            </Link>{" "}
                            en cliquant sur le bouton ⭐ à côté de chaque mot.
                        </p>
                        <Link to="/vocabulary">
                            <Button variant="hero" size="lg" className="gap-2">
                                <Sparkles className="w-5 h-5" />
                                Explorer le vocabulaire
                            </Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-winter">
            <Navigation />
            <div className="container mx-auto px-4 pt-24 pb-16">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 space-y-4 animate-fade-in">
                        <h1 className="text-4xl font-bold">Mes Flashcards</h1>
                        <p className="text-muted-foreground">
                            {cards.length} carte{cards.length > 1 ? "s" : ""} à réviser
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center gap-4 mb-8">
                        <Button
                            variant="outline"
                            onClick={shuffleCards}
                            className="gap-2"
                            disabled={cards.length < 2}
                        >
                            <Shuffle className="w-4 h-4" />
                            Mélanger
                        </Button>
                        {isShuffled && (
                            <Button variant="outline" onClick={resetOrder} className="gap-2">
                                <RotateCcw className="w-4 h-4" />
                                Ordre original
                            </Button>
                        )}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="gap-2 text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Tout effacer
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Supprimer toutes les flashcards ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Cette action est irréversible. Êtes-vous sûr de vouloir effacer l'intégralité de vos flashcards sauvegardées ?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        onClick={() => {
                                            clearAll();
                                            resetOrder();
                                        }}
                                    >
                                        Oui, tout effacer
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                    {/* Progress */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                            <span>Progression</span>
                            <span>{currentIndex + 1} / {cards.length}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Flashcard */}
                    {currentCard && (
                        <div className="mb-8">
                            <div
                                className="flip-card-container cursor-pointer"
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                <Card className="p-12 border-border hover:shadow-glow transition-shadow">
                                    <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                                        {/* Front */}
                                        <div className="flip-card-front text-center space-y-4">
                                            <div className="text-5xl font-bold text-primary">
                                                {currentCard.word}
                                            </div>
                                            <div className="text-lg text-muted-foreground italic">
                                                {currentCard.transliteration}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    speak(currentCard.word);
                                                }}
                                                className="gap-2"
                                            >
                                                <Volume2 className="w-4 h-4" />
                                                Écouter
                                            </Button>
                                            <p className="text-sm text-muted-foreground mt-4">
                                                Cliquez pour voir la traduction
                                            </p>
                                        </div>
                                        {/* Back */}
                                        <div className="flip-card-back text-center space-y-4">
                                            <div className="text-4xl font-bold">
                                                {currentCard.translation}
                                            </div>
                                            {currentCard.themeName && (
                                                <div className="text-sm text-muted-foreground">
                                                    Thème : {currentCard.themeName}
                                                </div>
                                            )}
                                            <p className="text-sm text-muted-foreground mt-4">
                                                Cliquez pour retourner
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Actions sur la carte */}
                            <div className="flex justify-center mt-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={removeCurrentCard}
                                    className="gap-2 text-destructive hover:text-destructive"
                                >
                                    <BookmarkX className="w-4 h-4" />
                                    Retirer de mes flashcards
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={goPrevious}
                            disabled={currentIndex === 0}
                            className="gap-2"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Précédent
                        </Button>

                        <Button
                            variant="hero"
                            onClick={goNext}
                            disabled={currentIndex >= cards.length - 1}
                            className="gap-2"
                        >
                            Suivant
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Fin de session */}
                    {currentIndex === cards.length - 1 && (
                        <div className="mt-8 text-center">
                            <Card className="p-6 border-primary/50 bg-primary/5">
                                <p className="text-lg font-medium mb-4">
                                    🎉 Vous avez terminé toutes vos flashcards !
                                </p>
                                <div className="flex justify-center gap-4">
                                    <Button variant="outline" onClick={() => {
                                        setCurrentIndex(0);
                                        setIsFlipped(false);
                                    }}>
                                        Recommencer
                                    </Button>
                                    <Button variant="outline" onClick={shuffleCards}>
                                        Mélanger et recommencer
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyFlashcards;
