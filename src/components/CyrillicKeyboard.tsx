import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Keyboard, X, ArrowUp, Delete } from "lucide-react";

interface CyrillicKeyboardProps {
    onInput: (char: string) => void;
    onBackspace: () => void;
    isVisible: boolean;
    onClose: () => void;
}

/**
 * Clavier virtuel cyrillique avec disposition ЙЦУКЕН (standard russe)
 * Apparaît au clic dans un champ de saisie et permet de taper en cyrillique
 */
const CyrillicKeyboard = ({
    onInput,
    onBackspace,
    isVisible,
    onClose,
}: CyrillicKeyboardProps) => {
    const [isShift, setIsShift] = useState(false);
    const keyboardRef = useRef<HTMLDivElement>(null);

    // Disposition ЙЦУКЕН - clavier russe standard
    const rows = [
        ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
        ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
        ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "ё"],
    ];

    // Gestion du clic en dehors du clavier
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                keyboardRef.current &&
                !keyboardRef.current.contains(event.target as Node)
            ) {
                // Ne pas fermer si on clique sur l'input associé
                const target = event.target as HTMLElement;
                if (!target.closest("[data-keyboard-input]")) {
                    onClose();
                }
            }
        };

        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const handleKeyPress = (key: string) => {
        const char = isShift ? key.toUpperCase() : key;
        onInput(char);
        if (isShift) setIsShift(false);
    };

    return (
        <div
            ref={keyboardRef}
            className="animate-in slide-in-from-bottom-4 fade-in duration-200"
        >
            <Card className="p-4 bg-card/95 backdrop-blur-xl border-2 border-primary/20 shadow-2xl">
                {/* En-tête du clavier */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <Keyboard className="w-4 h-4" />
                        Clavier cyrillique
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Rangées de touches */}
                <div className="space-y-2">
                    {rows.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="flex justify-center gap-1"
                            style={{ paddingLeft: `${rowIndex * 12}px` }}
                        >
                            {row.map((key) => (
                                <Button
                                    key={key}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleKeyPress(key)}
                                    className="w-9 h-10 p-0 font-bold text-lg hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95 transition-all duration-100 border-2"
                                >
                                    {isShift ? key.toUpperCase() : key}
                                </Button>
                            ))}
                        </div>
                    ))}

                    {/* Rangée du bas : Shift, Espace, Backspace */}
                    <div className="flex justify-center gap-2 pt-2">
                        <Button
                            variant={isShift ? "default" : "outline"}
                            size="sm"
                            onClick={() => setIsShift(!isShift)}
                            className={`w-20 h-10 gap-1 font-semibold transition-all ${isShift
                                    ? "bg-primary text-primary-foreground shadow-lg"
                                    : "hover:bg-muted"
                                }`}
                        >
                            <ArrowUp className="w-4 h-4" />
                            {isShift ? "АБВ" : "абв"}
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onInput(" ")}
                            className="flex-1 max-w-[200px] h-10 hover:bg-muted transition-all"
                        >
                            пробел
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onBackspace}
                            className="w-20 h-10 gap-1 hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all"
                        >
                            <Delete className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Indicateur de mode */}
                <div className="mt-3 pt-2 border-t border-border text-center text-xs text-muted-foreground">
                    Cliquez sur les touches pour saisir du texte en cyrillique
                </div>
            </Card>
        </div>
    );
};

export default CyrillicKeyboard;
