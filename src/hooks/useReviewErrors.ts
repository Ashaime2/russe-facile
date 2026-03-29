import { useState, useEffect, useCallback } from "react";

/**
 * Interface pour stocker une erreur
 */
export interface ReviewError {
    id: string;
    type: "quiz" | "fillBlank" | "matching" | "listening";
    question: string;
    userAnswer: string;
    correctAnswer: string;
    timestamp: string;
    moduleId?: string;
}

const STORAGE_KEY = "russe-facile-review-errors";
const MAX_ERRORS = 50; // Limiter le nombre d'erreurs stockées

/**
 * Hook pour gérer les erreurs à réviser
 * Stocke les erreurs dans localStorage pour révision ultérieure
 */
export const useReviewErrors = () => {
    const [errors, setErrors] = useState<ReviewError[]>(() => {
        if (typeof window === "undefined") return [];
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.error("Erreur lors du chargement des erreurs:", e);
        }
        return [];
    });

    // Sauvegarder dans localStorage à chaque changement
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(errors));
            } catch (e) {
                console.error("Erreur lors de la sauvegarde des erreurs:", e);
            }
        }
    }, [errors]);

    // Ajouter une erreur
    const addError = useCallback((error: Omit<ReviewError, "id" | "timestamp">) => {
        setErrors((prev) => {
            const newError: ReviewError = {
                ...error,
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                timestamp: new Date().toISOString(),
            };

            // Éviter les doublons (même question, même mauvaise réponse)
            const isDuplicate = prev.some(
                (e) => e.question === error.question && e.userAnswer === error.userAnswer
            );
            if (isDuplicate) return prev;

            // Limiter le nombre d'erreurs
            const updated = [newError, ...prev].slice(0, MAX_ERRORS);
            return updated;
        });
    }, []);

    // Marquer une erreur comme révisée (la supprimer)
    const markAsReviewed = useCallback((errorId: string) => {
        setErrors((prev) => prev.filter((e) => e.id !== errorId));
    }, []);

    // Supprimer toutes les erreurs
    const clearAllErrors = useCallback(() => {
        setErrors([]);
    }, []);

    // Obtenir les erreurs par type
    const getErrorsByType = useCallback((type: ReviewError["type"]) => {
        return errors.filter((e) => e.type === type);
    }, [errors]);

    // Obtenir les erreurs récentes (dernières 24h)
    const getRecentErrors = useCallback(() => {
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        return errors.filter((e) => e.timestamp > oneDayAgo);
    }, [errors]);

    // Statistiques
    const getStats = useCallback(() => {
        const quizErrors = errors.filter((e) => e.type === "quiz").length;
        const fillBlankErrors = errors.filter((e) => e.type === "fillBlank").length;
        const matchingErrors = errors.filter((e) => e.type === "matching").length;
        const listeningErrors = errors.filter((e) => e.type === "listening").length;

        return {
            total: errors.length,
            byType: {
                quiz: quizErrors,
                fillBlank: fillBlankErrors,
                matching: matchingErrors,
                listening: listeningErrors,
            },
        };
    }, [errors]);

    return {
        errors,
        addError,
        markAsReviewed,
        clearAllErrors,
        getErrorsByType,
        getRecentErrors,
        getStats,
    };
};

export default useReviewErrors;
