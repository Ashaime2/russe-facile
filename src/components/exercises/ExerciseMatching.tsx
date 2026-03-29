import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, RotateCcw } from "lucide-react";
import { playSuccessSound, playErrorSound } from "@/lib/sounds";

export interface MatchingPair {
    left: string;
    right: string;
}

interface ExerciseMatchingProps {
    pairs: MatchingPair[];
    onComplete?: (attempts: number) => void;
}

/**
 * Composant d'exercice d'association avec feedback sonore
 */
const ExerciseMatching = ({ pairs, onComplete }: ExerciseMatchingProps) => {
    const [shuffledRight, setShuffledRight] = useState<string[]>([]);
    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
    const [selectedRight, setSelectedRight] = useState<number | null>(null);
    const [matches, setMatches] = useState<Map<number, number>>(new Map());
    const [wrongPair, setWrongPair] = useState<{ left: number; right: number } | null>(null);
    const [attempts, setAttempts] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Mélanger les réponses au démarrage
    useEffect(() => {
        const shuffled = [...pairs.map((p) => p.right)].sort(() => Math.random() - 0.5);
        setShuffledRight(shuffled);
    }, [pairs]);

    // Vérifier si l'exercice est terminé
    useEffect(() => {
        if (matches.size === pairs.length) {
            setIsComplete(true);
            onComplete?.(attempts);
        }
    }, [matches, pairs.length, attempts, onComplete]);

    const handleLeftClick = (index: number) => {
        if (matches.has(index)) return;
        setSelectedLeft(index);
        setWrongPair(null);

        if (selectedRight !== null) {
            checkMatch(index, selectedRight);
        }
    };

    const handleRightClick = (index: number) => {
        if ([...matches.values()].includes(index)) return;
        setSelectedRight(index);
        setWrongPair(null);

        if (selectedLeft !== null) {
            checkMatch(selectedLeft, index);
        }
    };

    const checkMatch = (leftIndex: number, rightIndex: number) => {
        setAttempts((a) => a + 1);
        const correctRight = pairs[leftIndex].right;
        const selectedRightValue = shuffledRight[rightIndex];

        if (correctRight === selectedRightValue) {
            // Match correct
            setMatches((prev) => new Map([...prev, [leftIndex, rightIndex]]));
            setSelectedLeft(null);
            setSelectedRight(null);
            playSuccessSound();
        } else {
            // Mauvaise réponse
            setWrongPair({ left: leftIndex, right: rightIndex });
            playErrorSound();
            setTimeout(() => {
                setWrongPair(null);
                setSelectedLeft(null);
                setSelectedRight(null);
            }, 800);
        }
    };

    const handleReset = () => {
        const shuffled = [...pairs.map((p) => p.right)].sort(() => Math.random() - 0.5);
        setShuffledRight(shuffled);
        setSelectedLeft(null);
        setSelectedRight(null);
        setMatches(new Map());
        setWrongPair(null);
        setAttempts(0);
        setIsComplete(false);
    };

    if (isComplete) {
        const accuracy = Math.round((pairs.length / attempts) * 100);
        return (
            <Card className="p-8 text-center border-border animate-slide-up">
                <div className="space-y-6">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <h2 className="text-2xl font-semibold">Bravo !</h2>
                    <p className="text-muted-foreground">
                        Vous avez associé toutes les paires en {attempts} essais.
                        <br />
                        Précision : {accuracy}%
                    </p>
                    <Button variant="outline" onClick={handleReset} className="gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Recommencer
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Instructions */}
            <div className="text-center text-muted-foreground">
                <p>Associez les mots russes avec leur traduction française</p>
                <p className="text-sm">
                    Paires trouvées : {matches.size} / {pairs.length} | Essais : {attempts}
                </p>
            </div>

            {/* Matching columns */}
            <div className="grid grid-cols-2 gap-8">
                {/* Left column (Russian) */}
                <div className="space-y-3">
                    {pairs.map((pair, index) => {
                        const isMatched = matches.has(index);
                        const isSelected = selectedLeft === index;
                        const isWrong = wrongPair?.left === index;

                        return (
                            <Card
                                key={`left-${index}`}
                                onClick={() => handleLeftClick(index)}
                                className={`p-4 text-center cursor-pointer transition-all duration-300 border-2 ${isMatched
                                    ? "bg-green-500/20 border-green-500 cursor-default"
                                    : isWrong
                                        ? "bg-red-500/20 border-red-500 animate-shake"
                                        : isSelected
                                            ? "border-primary bg-primary/10"
                                            : "border-border hover:border-primary/50"
                                    }`}
                            >
                                <span className="text-xl font-semibold">{pair.left}</span>
                            </Card>
                        );
                    })}
                </div>

                {/* Right column (French) */}
                <div className="space-y-3">
                    {shuffledRight.map((text, index) => {
                        const isMatched = [...matches.values()].includes(index);
                        const isSelected = selectedRight === index;
                        const isWrong = wrongPair?.right === index;

                        return (
                            <Card
                                key={`right-${index}`}
                                onClick={() => handleRightClick(index)}
                                className={`p-4 text-center cursor-pointer transition-all duration-300 border-2 ${isMatched
                                    ? "bg-green-500/20 border-green-500 cursor-default"
                                    : isWrong
                                        ? "bg-red-500/20 border-red-500 animate-shake"
                                        : isSelected
                                            ? "border-primary bg-primary/10"
                                            : "border-border hover:border-primary/50"
                                    }`}
                            >
                                <span className="text-lg">{text}</span>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Reset button */}
            <div className="flex justify-center">
                <Button variant="ghost" onClick={handleReset} className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Réinitialiser
                </Button>
            </div>
        </div>
    );
};

export default ExerciseMatching;
