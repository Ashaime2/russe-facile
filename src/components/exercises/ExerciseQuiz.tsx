import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { playSuccessSound, playErrorSound } from "@/lib/sounds";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface ExerciseQuizProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

/**
 * Composant Quiz QCM réutilisable
 * Affiche des questions à choix multiples avec feedback visuel et sonore
 */
const ExerciseQuiz = ({ questions, onComplete }: ExerciseQuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    if (optionIndex === currentQuestion.correctIndex) {
      setScore((s) => s + 1);
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      onComplete?.(score + (selectedAnswer === currentQuestion.correctIndex ? 1 : 0), questions.length);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    return (
      <Card className="p-8 text-center border-border animate-slide-up">
        <div className="space-y-6">
          <div className="text-6xl font-bold text-primary">{percentage}%</div>
          <h2 className="text-2xl font-semibold">Quiz terminé !</h2>
          <p className="text-muted-foreground">
            Vous avez obtenu {finalScore} sur {questions.length} bonnes réponses.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={handleRestart}>
              Recommencer
            </Button>
          </div>
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

        {/* Question */}
        <h2 className="text-2xl font-semibold">{currentQuestion.question}</h2>

        {/* Options */}
        <div className="grid gap-3">
          {currentQuestion.options.map((option, index) => {
            let variant: "outline" | "default" | "destructive" = "outline";
            let icon = null;

            if (isAnswered) {
              if (index === currentQuestion.correctIndex) {
                variant = "default";
                icon = <CheckCircle className="w-5 h-5 text-green-500" />;
              } else if (index === selectedAnswer) {
                variant = "destructive";
                icon = <XCircle className="w-5 h-5" />;
              }
            }

            return (
              <Button
                key={index}
                variant={variant}
                className={`justify-start text-left h-auto py-4 px-6 ${isAnswered && index === currentQuestion.correctIndex
                    ? "bg-green-500/20 border-green-500 hover:bg-green-500/30"
                    : ""
                  } ${isAnswered && index === selectedAnswer && index !== currentQuestion.correctIndex
                    ? "bg-red-500/20 border-red-500"
                    : ""
                  }`}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
              >
                <span className="flex-1">{option}</span>
                {icon}
              </Button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && currentQuestion.explanation && (
          <div className="p-4 rounded-lg bg-muted/50 text-sm">
            <span className="font-semibold">Explication :</span> {currentQuestion.explanation}
          </div>
        )}

        {/* Next button */}
        {isAnswered && (
          <div className="flex justify-end">
            <Button variant="hero" onClick={handleNext} className="gap-2">
              {currentIndex < questions.length - 1 ? "Question suivante" : "Voir les résultats"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExerciseQuiz;
