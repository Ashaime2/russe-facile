import { useState, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, RotateCcw, ArrowRight, Mic } from "lucide-react";
import { playSuccessSound, playErrorSound } from "@/lib/sounds";

interface ListeningQuestion {
    audio: string; // Texte russe à prononcer via TTS
    answer: string; // Réponse attendue (transcription)
    hint?: string;
}

interface ExerciseListeningProps {
    questions: ListeningQuestion[];
    onComplete?: (score: number, total: number) => void;
}

/**
 * Exercice d'écoute - L'utilisateur écoute un mot/phrase et doit l'écrire
 */
const ExerciseListening = ({ questions, onComplete }: ExerciseListeningProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);

    const currentQuestion = questions[currentIndex];

    const speak = useCallback((text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "ru-RU";
            utterance.rate = 0.7;
            window.speechSynthesis.speak(utterance);
        }
    }, []);

    const playAudio = () => {
        speak(currentQuestion.audio);
        setHasPlayed(true);
    };

    // Jouer automatiquement au chargement
    useEffect(() => {
        if (!isChecked) {
            const timer = setTimeout(playAudio, 500);
            return () => clearTimeout(timer);
        }
    }, [currentIndex]);

    const normalizeString = (str: string) => {
        return str.toLowerCase().trim().replace(/ё/g, "е");
    };

    const checkAnswer = () => {
        const correct = normalizeString(userAnswer) === normalizeString(currentQuestion.answer);
        setIsCorrect(correct);
        setIsChecked(true);
        if (correct) {
            setScore((s) => s + 1);
            playSuccessSound();
        } else {
            playErrorSound();
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((i) => i + 1);
            setUserAnswer("");
            setIsChecked(false);
            setIsCorrect(false);
            setHasPlayed(false);
        } else {
            setShowResults(true);
            onComplete?.(score + (isCorrect ? 1 : 0), questions.length);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setUserAnswer("");
        setIsChecked(false);
        setIsCorrect(false);
        setScore(0);
        setShowResults(false);
        setHasPlayed(false);
    };

    if (showResults) {
        const finalScore = score;
        const percentage = Math.round((finalScore / questions.length) * 100);
        return (
            <Card className="p-8 text-center border-border animate-slide-up">
                <div className="space-y-6">
                    <div className="text-6xl font-bold text-primary">{percentage}%</div>
                    <h2 className="text-2xl font-semibold">Exercice terminé !</h2>
                    <p className="text-muted-foreground">
                        Vous avez transcrit correctement {finalScore} sur {questions.length}.
                    </p>
                    <Button variant="outline" onClick={handleRestart} className="gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Recommencer
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-8 border-border animate-slide-up">
            <div className="space-y-6">
                {/* Progress */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Question {currentIndex + 1} / {questions.length}</span>
                    <span>Score : {score}</span>
                </div>

                {/* Instructions */}
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 text-primary">
                        <Mic className="w-5 h-5" />
                        <span className="font-medium">Dictée</span>
                    </div>
                    <h2 className="text-xl font-semibold">
                        Écoutez et écrivez ce que vous entendez
                    </h2>
                </div>

                {/* Audio button */}
                <div className="flex justify-center">
                    <Button
                        variant="hero"
                        size="lg"
                        onClick={playAudio}
                        className="gap-2"
                    >
                        <Volume2 className="w-5 h-5" />
                        {hasPlayed ? "Réécouter" : "Écouter"}
                    </Button>
                </div>

                {/* Hint */}
                {currentQuestion.hint && !isChecked && (
                    <p className="text-center text-sm text-muted-foreground italic">
                        💡 Indice : {currentQuestion.hint}
                    </p>
                )}

                {/* Input */}
                <div className="space-y-4">
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !isChecked && userAnswer.trim()) {
                                checkAnswer();
                            }
                        }}
                        placeholder="Écrivez en cyrillique..."
                        disabled={isChecked}
                        className={`w-full p-4 text-xl text-center rounded-lg border-2 transition-colors ${isChecked
                                ? isCorrect
                                    ? "border-green-500 bg-green-500/10"
                                    : "border-red-500 bg-red-500/10"
                                : "border-border focus:border-primary"
                            } bg-background`}
                    />

                    {/* Feedback */}
                    {isChecked && !isCorrect && (
                        <div className="text-center space-y-2">
                            <p className="text-red-500">
                                Réponse correcte : <strong className="text-xl">{currentQuestion.answer}</strong>
                            </p>
                        </div>
                    )}

                    {/* Check/Next button */}
                    <div className="flex justify-center">
                        {!isChecked ? (
                            <Button
                                variant="hero"
                                onClick={checkAnswer}
                                disabled={!userAnswer.trim()}
                                className="gap-2"
                            >
                                Vérifier
                            </Button>
                        ) : (
                            <Button variant="hero" onClick={handleNext} className="gap-2">
                                {currentIndex < questions.length - 1 ? "Suivant" : "Résultats"}
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ExerciseListening;
