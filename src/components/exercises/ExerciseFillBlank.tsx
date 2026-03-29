import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, ArrowRight, Volume2, Keyboard } from "lucide-react";
import CyrillicKeyboard from "@/components/CyrillicKeyboard";
import { playSuccessSound, playErrorSound } from "@/lib/sounds";

export interface FillBlankQuestion {
    sentence: string; // Phrase avec ___ pour le trou
    answer: string;
    hint?: string;
    audio?: string;
}

interface ExerciseFillBlankProps {
    questions: FillBlankQuestion[];
    onComplete?: (score: number, total: number) => void;
}

/**
 * Composant d'exercice à trous avec clavier cyrillique et feedback sonore
 */
const ExerciseFillBlank = ({ questions, onComplete }: ExerciseFillBlankProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const currentQuestion = questions[currentIndex];

    const normalizeString = (str: string) => {
        return str.toLowerCase().trim().replace(/ё/g, "е");
    };

    const checkAnswer = () => {
        const correct = normalizeString(userAnswer) === normalizeString(currentQuestion.answer);
        setIsCorrect(correct);
        setIsChecked(true);
        setShowKeyboard(false);
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
        setShowKeyboard(false);
    };

    const speak = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            // Extraire uniquement la partie russe (tout ce qui précède la parenthèse)
            const russianText = text.replace("___", currentQuestion.answer).split("(")[0].trim();
            const utterance = new SpeechSynthesisUtterance(russianText);
            utterance.lang = "ru-RU";
            window.speechSynthesis.speak(utterance);
        }
    };

    // Gestion du clavier cyrillique
    const handleKeyboardInput = (char: string) => {
        setUserAnswer((prev) => prev + char);
        inputRef.current?.focus();
    };

    const handleKeyboardBackspace = () => {
        setUserAnswer((prev) => prev.slice(0, -1));
        inputRef.current?.focus();
    };

    // Rendre la phrase avec le trou mis en évidence
    const renderSentence = () => {
        const parts = currentQuestion.sentence.split("___");
        return (
            <div className="text-2xl font-medium text-center leading-relaxed">
                {parts[0]}
                <span
                    className={`inline-block min-w-[100px] border-b-2 mx-2 ${isChecked
                        ? isCorrect
                            ? "border-green-500 text-green-500"
                            : "border-red-500 text-red-500"
                        : "border-primary"
                        }`}
                >
                    {isChecked ? currentQuestion.answer : userAnswer || "..."}
                </span>
                {parts[1]}
            </div>
        );
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
                        Vous avez obtenu {finalScore} sur {questions.length} bonnes réponses.
                    </p>
                    <Button variant="outline" onClick={handleRestart}>
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

                {/* Sentence with blank */}
                <div className="py-8">{renderSentence()}</div>

                {/* Audio button */}
                {isChecked && (
                    <div className="flex justify-center">
                        <Button
                            variant="ghost"
                            onClick={() => speak(currentQuestion.sentence)}
                            className="gap-2"
                        >
                            <Volume2 className="w-5 h-5" />
                            Écouter la phrase
                        </Button>
                    </div>
                )}

                {/* Hint */}
                {currentQuestion.hint && !isChecked && (
                    <p className="text-sm text-muted-foreground text-center italic">
                        Indice : {currentQuestion.hint}
                    </p>
                )}

                {/* Input and check */}
                {!isChecked ? (
                    <div className="space-y-4">
                        <div className="flex gap-4 justify-center items-center">
                            <div className="relative">
                                <Input
                                    ref={inputRef}
                                    data-keyboard-input
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    onFocus={() => setShowKeyboard(true)}
                                    placeholder="Tapez votre réponse..."
                                    className="max-w-xs text-center text-lg pr-10"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && userAnswer.trim()) {
                                            checkAnswer();
                                        }
                                    }}
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowKeyboard(!showKeyboard)}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                                    title="Afficher/Masquer le clavier cyrillique"
                                >
                                    <Keyboard className={`w-4 h-4 ${showKeyboard ? "text-primary" : "text-muted-foreground"}`} />
                                </Button>
                            </div>
                            <Button
                                variant="hero"
                                onClick={checkAnswer}
                                disabled={!userAnswer.trim()}
                            >
                                Vérifier
                            </Button>
                        </div>

                        {/* Clavier cyrillique */}
                        <div className="flex justify-center">
                            <CyrillicKeyboard
                                isVisible={showKeyboard}
                                onInput={handleKeyboardInput}
                                onBackspace={handleKeyboardBackspace}
                                onClose={() => setShowKeyboard(false)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Feedback */}
                        <div
                            className={`flex items-center justify-center gap-3 p-4 rounded-lg ${isCorrect ? "bg-green-500/20" : "bg-red-500/20"
                                }`}
                        >
                            {isCorrect ? (
                                <>
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                    <span className="text-green-600 font-semibold">Correct !</span>
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-6 h-6 text-red-500" />
                                    <span className="text-red-600 font-semibold">
                                        La bonne réponse était : {currentQuestion.answer}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Next button */}
                        <div className="flex justify-end">
                            <Button variant="hero" onClick={handleNext} className="gap-2">
                                {currentIndex < questions.length - 1 ? "Question suivante" : "Voir les résultats"}
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default ExerciseFillBlank;
