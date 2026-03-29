import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

export interface FlashcardData {
    front: string;
    back: string;
    transliteration?: string;
    audio?: string;
}

interface ExerciseFlashcardProps {
    cards: FlashcardData[];
    onComplete?: () => void;
}

/**
 * Composant Flashcard avec animation de retournement
 * Affiche le mot russe d'un côté et la traduction de l'autre
 */
const ExerciseFlashcard = ({ cards, onComplete }: ExerciseFlashcardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [viewedCards, setViewedCards] = useState<Set<number>>(new Set([0]));

    const currentCard = cards[currentIndex];

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((i) => i - 1);
            setIsFlipped(false);
        }
    };

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setIsFlipped(false);
            setViewedCards((prev) => new Set([...prev, nextIndex]));
        } else if (viewedCards.size === cards.length) {
            onComplete?.();
        }
    };

    const speak = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "ru-RU";
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="space-y-6">
            {/* Progress */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                    Carte {currentIndex + 1} / {cards.length}
                </span>
                <span>{viewedCards.size} vues</span>
            </div>

            {/* Flashcard */}
            <div
                className="relative h-64 cursor-pointer perspective-1000"
                onClick={handleFlip}
                style={{ perspective: "1000px" }}
            >
                <div
                    className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""
                        }`}
                    style={{
                        transformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                >
                    {/* Front */}
                    <Card
                        className="absolute inset-0 p-8 flex flex-col items-center justify-center backface-hidden border-border bg-gradient-hero text-primary-foreground"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <div className="text-5xl font-bold mb-4">{currentCard.front}</div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-primary-foreground/70 hover:text-primary-foreground"
                            onClick={(e) => {
                                e.stopPropagation();
                                speak(currentCard.front);
                            }}
                        >
                            <Volume2 className="w-6 h-6" />
                        </Button>
                        <p className="text-sm text-primary-foreground/60 mt-4">
                            Cliquez pour retourner
                        </p>
                    </Card>

                    {/* Back */}
                    <Card
                        className="absolute inset-0 p-8 flex flex-col items-center justify-center backface-hidden border-border"
                        style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                        }}
                    >
                        <div className="text-3xl font-bold text-primary mb-2">
                            {currentCard.back}
                        </div>
                        {currentCard.transliteration && (
                            <div className="text-lg text-muted-foreground italic">
                                {currentCard.transliteration}
                            </div>
                        )}
                        <p className="text-sm text-muted-foreground mt-4">
                            Cliquez pour retourner
                        </p>
                    </Card>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="gap-2"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Précédente
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        setCurrentIndex(0);
                        setIsFlipped(false);
                        setViewedCards(new Set([0]));
                    }}
                >
                    <RotateCcw className="w-5 h-5" />
                </Button>

                <Button
                    variant="outline"
                    onClick={handleNext}
                    className="gap-2"
                >
                    {currentIndex < cards.length - 1 ? "Suivante" : "Terminer"}
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default ExerciseFlashcard;
