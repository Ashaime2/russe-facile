import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Interface pour une flashcard personnalisée
 */
export interface MyFlashcard {
    id: string;
    word: string;
    translation: string;
    transliteration: string;
    themeId?: string;
    themeName?: string;
    addedAt: string;
}

const STORAGE_KEY = "russe-facile-my-flashcards";

/**
 * Hook pour gérer les flashcards personnelles de l'utilisateur
 * Permet d'ajouter/retirer des mots depuis n'importe où dans le site
 */
export const useMyFlashcards = () => {
    const [flashcards, setFlashcards] = useState<MyFlashcard[]>(() => {
        if (typeof window === "undefined") return [];
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.error("Erreur lors du chargement des flashcards:", e);
        }
        return [];
    });

    // Sauvegarder dans localStorage à chaque changement
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
                
                // Synchronisation asynchrone en arrière-plan avec Supabase
                supabase.auth.getSession().then(({ data }) => {
                    if (data.session?.user) {
                        supabase.from('profiles').upsert({
                            id: data.session.user.id,
                            flashcards_data: flashcards,
                        }).then();
                    }
                });
            } catch (e) {
                console.error("Erreur lors de la sauvegarde des flashcards:", e);
            }
        }
    }, [flashcards]);

    // Ajouter une flashcard
    const addFlashcard = useCallback((card: Omit<MyFlashcard, "id" | "addedAt">) => {
        setFlashcards((prev) => {
            // Éviter les doublons
            const exists = prev.some(
                (f) => f.word === card.word && f.translation === card.translation
            );
            if (exists) return prev;

            const newCard: MyFlashcard = {
                ...card,
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                addedAt: new Date().toISOString(),
            };
            return [...prev, newCard];
        });
    }, []);

    // Retirer une flashcard par ID
    const removeFlashcard = useCallback((cardId: string) => {
        setFlashcards((prev) => prev.filter((f) => f.id !== cardId));
    }, []);

    // Retirer une flashcard par mot
    const removeByWord = useCallback((word: string) => {
        setFlashcards((prev) => prev.filter((f) => f.word !== word));
    }, []);

    // Vérifier si un mot est dans les flashcards
    const isInFlashcards = useCallback((word: string) => {
        return flashcards.some((f) => f.word === word);
    }, [flashcards]);

    // Toggle une flashcard
    const toggleFlashcard = useCallback((card: Omit<MyFlashcard, "id" | "addedAt">) => {
        if (isInFlashcards(card.word)) {
            removeByWord(card.word);
        } else {
            addFlashcard(card);
        }
    }, [isInFlashcards, removeByWord, addFlashcard]);

    // Supprimer toutes les flashcards
    const clearAll = useCallback(() => {
        setFlashcards([]);
    }, []);

    // Obtenir les flashcards par thème
    const getByTheme = useCallback((themeId: string) => {
        return flashcards.filter((f) => f.themeId === themeId);
    }, [flashcards]);

    return {
        flashcards,
        addFlashcard,
        removeFlashcard,
        removeByWord,
        isInFlashcards,
        toggleFlashcard,
        clearAll,
        getByTheme,
        count: flashcards.length,
    };
};

export default useMyFlashcards;
