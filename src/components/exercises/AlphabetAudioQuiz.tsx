import { useState, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, CheckCircle, XCircle, RotateCcw, ArrowRight } from "lucide-react";
import { playSuccessSound, playErrorSound } from "@/lib/sounds";

interface AlphabetLetter {
    letter: string;
    sound: string;
    name: string;
}

interface AlphabetAudioQuizProps {
    letters: AlphabetLetter[];
    onComplete?: (score: number, total: number) => void;
}

/**
 * Quiz audio de l'alphabet cyrillique
 * L'utilisateur entend un son et doit identifier la lettre correspondante
 */
const AlphabetAudioQuiz = ({ letters, onComplete }: AlphabetAudioQuizProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [options, setOptions] = useState<AlphabetLetter[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [shuffledLetters, setShuffledLetters] = useState<AlphabetLetter[]>([]);

    // Mélanger les lettres au démarrage
    useEffect(() => {
        const shuffled = [...letters].sort(() => Math.random() - 0.5).slice(0, 10);
        setShuffledLetters(shuffled);
    }, [letters]);

    // Générer les options pour la question actuelle
    useEffect(() => {
        if (shuffledLetters.length === 0 || currentIndex >= shuffledLetters.length) return;

        const correctLetter = shuffledLetters[currentIndex];
        const otherLetters = letters
            .filter((l) => l.letter !== correctLetter.letter)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        const allOptions = [correctLetter, ...otherLetters].sort(() => Math.random() - 0.5);
        setOptions(allOptions);
    }, [currentIndex, shuffledLetters, letters]);

    const speak = useCallback((text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "ru-RU";
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    }, []);

    const playCurrentSound = useCallback(() => {
        if (shuffledLetters[currentIndex]) {
            speak(shuffledLetters[currentIndex].sound);
        }
    }, [currentIndex, shuffledLetters, speak]);

    // Jouer le son automatiquement au chargement de chaque question
    useEffect(() => {
        if (shuffledLetters.length > 0 && !isAnswered) {
            const timer = setTimeout(() => playCurrentSound(), 500);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, shuffledLetters, isAnswered, playCurrentSound]);

    const handleAnswer = (optionIndex: number) => {
        if (isAnswered) return;
        setSelectedAnswer(optionIndex);
        setIsAnswered(true);

        const correctLetter = shuffledLetters[currentIndex];
        if (options[optionIndex].letter === correctLetter.letter) {
            setScore((s) => s + 1);
            playSuccessSound();
        } else {
            playErrorSound();
        }
    };

    const handleNext = () => {
        if (currentIndex < shuffledLetters.length - 1) {
            setCurrentIndex((i) => i + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setShowResults(true);
            onComplete?.(score + (options[selectedAnswer!]?.letter === shuffledLetters[currentIndex]?.letter ? 1 : 0), shuffledLetters.length);
        }
    };

    const handleRestart = () => {
        const shuffled = [...letters].sort(() => Math.random() - 0.5).slice(0, 10);
        setShuffledLetters(shuffled);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setScore(0);
        setShowResults(false);
    };

    if (shuffledLetters.length === 0) {
        return <div className="text-center p-8">Chargement...</div>;
    }

    if (showResults) {
        const finalScore = score;
        const percentage = Math.round((finalScore / shuffledLetters.length) * 100);
        return (
            <Card className="p-8 text-center border-border animate-slide-up">
                <div className="space-y-6">
                    <div className="text-6xl font-bold text-primary">{percentage}%</div>
                    <h2 className="text-2xl font-semibold">Quiz terminé !</h2>
                    <p className="text-muted-foreground">
                        Vous avez reconnu {finalScore} lettres sur {shuffledLetters.length}.
                    </p>
                    <Button variant="outline" onClick={handleRestart} className="gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Recommencer
                    </Button>
                </div>
            </Card>
        );
    }

    const currentLetter = shuffledLetters[currentIndex];

    return (
        <Card className="p-8 border-border animate-slide-up">
            <div className="space-y-6">
                {/* Progress */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Question {currentIndex + 1} / {shuffledLetters.length}</span>
                    <span>Score : {score}</span>
                </div>

                {/* Question */}
                <div className="text-center space-y-4">
                    <h2 className="text-xl font-semibold">Quelle lettre correspond à ce son ?</h2>
                    <Button
                        variant="hero"
                        size="lg"
                        onClick={playCurrentSound}
                        className="gap-2"
                    >
                        <Volume2 className="w-5 h-5" />
                        Écouter le son
                    </Button>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-4">
                    {options.map((option, index) => {
                        const isCorrect = option.letter === currentLetter.letter;
                        const isSelected = selectedAnswer === index;
                        let bgClass = "border-border hover:border-primary/50";
                        let icon = null;

                        if (isAnswered) {
                            if (isCorrect) {
                                bgClass = "bg-green-500/20 border-green-500";
                                icon = <CheckCircle className="w-5 h-5 text-green-500" />;
                            } else if (isSelected) {
                                bgClass = "bg-red-500/20 border-red-500";
                                icon = <XCircle className="w-5 h-5 text-red-500" />;
                            }
                        } else if (isSelected) {
                            bgClass = "border-primary bg-primary/10";
                        }

                        return (
                            <Card
                                key={index}
                                onClick={() => handleAnswer(index)}
                                className={`p-6 text-center cursor-pointer transition-all border-2 ${bgClass}`}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-4xl font-bold">{option.letter}</span>
                                    <span className="text-sm text-muted-foreground">{option.name}</span>
                                    {icon}
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Next button */}
                {isAnswered && (
                    <div className="flex justify-end">
                        <Button variant="hero" onClick={handleNext} className="gap-2">
                            {currentIndex < shuffledLetters.length - 1 ? "Question suivante" : "Voir les résultats"}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default AlphabetAudioQuiz;
