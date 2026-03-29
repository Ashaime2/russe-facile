import { useState, useRef, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Check, ChevronRight, ChevronLeft } from "lucide-react";

interface Letter {
    cyrillic: string;
    name: string;
}

interface LetterTracingProps {
    letters: Letter[];
    onComplete?: () => void;
}

/**
 * Composant pour pratiquer le tracé des lettres cyrilliques
 * Utilise un canvas pour permettre à l'utilisateur de dessiner
 */
const LetterTracing = ({ letters, onComplete }: LetterTracingProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);

    const currentLetter = letters[currentIndex];

    // Initialiser le canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Définir la taille du canvas
        canvas.width = 300;
        canvas.height = 300;

        // Style de fond
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dessiner la lettre en transparence comme guide
        ctx.font = "200px serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(currentLetter.cyrillic, canvas.width / 2, canvas.height / 2);
    }, [currentLetter]);

    const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        setIsDrawing(true);
        setHasDrawn(true);

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = "touches" in e
            ? e.touches[0].clientX - rect.left
            : e.clientX - rect.left;
        const y = "touches" in e
            ? e.touches[0].clientY - rect.top
            : e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.strokeStyle = "#6366f1";
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
    }, []);

    const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = "touches" in e
            ? e.touches[0].clientX - rect.left
            : e.clientX - rect.left;
        const y = "touches" in e
            ? e.touches[0].clientY - rect.top
            : e.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
    }, [isDrawing]);

    const stopDrawing = useCallback(() => {
        setIsDrawing(false);
    }, []);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Redessiner le guide
        ctx.font = "200px serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(currentLetter.cyrillic, canvas.width / 2, canvas.height / 2);

        setHasDrawn(false);
    };

    const handleNext = () => {
        if (currentIndex < letters.length - 1) {
            setCurrentIndex((i) => i + 1);
            setHasDrawn(false);
        } else {
            onComplete?.();
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((i) => i - 1);
            setHasDrawn(false);
        }
    };

    return (
        <Card className="p-6 border-border">
            <div className="space-y-6">
                {/* Progress */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Lettre {currentIndex + 1} / {letters.length}</span>
                    <span className="text-2xl font-bold text-primary">{currentLetter.cyrillic}</span>
                    <span>{currentLetter.name}</span>
                </div>

                {/* Instructions */}
                <p className="text-center text-muted-foreground">
                    Tracez la lettre <strong className="text-primary text-xl">{currentLetter.cyrillic}</strong> en suivant le guide
                </p>

                {/* Canvas */}
                <div className="flex justify-center">
                    <canvas
                        ref={canvasRef}
                        className="border-2 border-border rounded-lg cursor-crosshair touch-none"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={clearCanvas} className="gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Effacer
                    </Button>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Précédent
                    </Button>

                    <Button
                        variant="hero"
                        onClick={handleNext}
                        disabled={!hasDrawn}
                        className="gap-2"
                    >
                        {currentIndex < letters.length - 1 ? (
                            <>
                                Suivant
                                <ChevronRight className="w-4 h-4" />
                            </>
                        ) : (
                            <>
                                <Check className="w-4 h-4" />
                                Terminer
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default LetterTracing;
