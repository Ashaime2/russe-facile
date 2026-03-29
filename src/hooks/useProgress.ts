import { useState, useEffect, useCallback } from "react";

/**
 * Types pour le stockage de la progression
 */
export interface LessonProgress {
    lessonIndex: number;
    completed: boolean;
    lastAccessed: string;
}

export interface ExerciseProgress {
    quizScore?: { score: number; total: number };
    flashcardsViewed?: number;
    matchingAttempts?: number;
    fillBlankScore?: { score: number; total: number };
}

export interface ModuleProgress {
    moduleId: string;
    lessonsProgress: LessonProgress[];
    exerciseProgress: ExerciseProgress;
    completedAt?: string;
    lastAccessed: string;
}

interface ProgressState {
    modules: Record<string, ModuleProgress>;
    totalLessonsCompleted: number;
    lastModuleAccessed?: string;
}

const STORAGE_KEY = "russe-facile-progress";

/**
 * Hook personnalisé pour gérer la persistance de la progression utilisateur
 * Utilise localStorage pour sauvegarder l'état entre les sessions
 */
export const useProgress = () => {
    const [progress, setProgress] = useState<ProgressState>(() => {
        if (typeof window === "undefined") {
            return { modules: {}, totalLessonsCompleted: 0 };
        }
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.error("Erreur lors du chargement de la progression:", e);
        }
        return { modules: {}, totalLessonsCompleted: 0 };
    });

    // Sauvegarder dans localStorage à chaque changement
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
            } catch (e) {
                console.error("Erreur lors de la sauvegarde de la progression:", e);
            }
        }
    }, [progress]);

    // Obtenir la progression d'un module
    const getModuleProgress = useCallback(
        (moduleId: string): ModuleProgress | null => {
            return progress.modules[moduleId] || null;
        },
        [progress.modules]
    );

    // Initialiser ou mettre à jour la progression d'un module
    const initModuleProgress = useCallback(
        (moduleId: string, totalLessons: number) => {
            setProgress((prev) => {
                if (prev.modules[moduleId]) {
                    // Mise à jour de lastAccessed seulement
                    return {
                        ...prev,
                        lastModuleAccessed: moduleId,
                        modules: {
                            ...prev.modules,
                            [moduleId]: {
                                ...prev.modules[moduleId],
                                lastAccessed: new Date().toISOString(),
                            },
                        },
                    };
                }
                // Créer une nouvelle entrée
                const lessonsProgress: LessonProgress[] = Array.from(
                    { length: totalLessons },
                    (_, i) => ({
                        lessonIndex: i,
                        completed: false,
                        lastAccessed: new Date().toISOString(),
                    })
                );
                return {
                    ...prev,
                    lastModuleAccessed: moduleId,
                    modules: {
                        ...prev.modules,
                        [moduleId]: {
                            moduleId,
                            lessonsProgress,
                            exerciseProgress: {},
                            lastAccessed: new Date().toISOString(),
                        },
                    },
                };
            });
        },
        []
    );

    // Marquer une leçon comme complétée
    const completeLesson = useCallback((moduleId: string, lessonIndex: number) => {
        setProgress((prev) => {
            const module = prev.modules[moduleId];
            if (!module) return prev;

            const newLessonsProgress = [...module.lessonsProgress];
            if (newLessonsProgress[lessonIndex]) {
                newLessonsProgress[lessonIndex] = {
                    ...newLessonsProgress[lessonIndex],
                    completed: true,
                    lastAccessed: new Date().toISOString(),
                };
            }

            const completedCount = newLessonsProgress.filter((l) => l.completed).length;
            const allCompleted = completedCount === newLessonsProgress.length;

            return {
                ...prev,
                totalLessonsCompleted: Object.values(prev.modules).reduce(
                    (sum, m) =>
                        sum +
                        (m.moduleId === moduleId
                            ? completedCount
                            : m.lessonsProgress.filter((l) => l.completed).length),
                    0
                ),
                modules: {
                    ...prev.modules,
                    [moduleId]: {
                        ...module,
                        lessonsProgress: newLessonsProgress,
                        completedAt: allCompleted ? new Date().toISOString() : undefined,
                        lastAccessed: new Date().toISOString(),
                    },
                },
            };
        });
    }, []);

    // Sauvegarder le score d'un quiz
    const saveQuizScore = useCallback(
        (moduleId: string, score: number, total: number) => {
            setProgress((prev) => {
                const module = prev.modules[moduleId];
                if (!module) return prev;

                return {
                    ...prev,
                    modules: {
                        ...prev.modules,
                        [moduleId]: {
                            ...module,
                            exerciseProgress: {
                                ...module.exerciseProgress,
                                quizScore: { score, total },
                            },
                            lastAccessed: new Date().toISOString(),
                        },
                    },
                };
            });
        },
        []
    );

    // Sauvegarder la progression des flashcards
    const saveFlashcardsProgress = useCallback(
        (moduleId: string, viewedCount: number) => {
            setProgress((prev) => {
                const module = prev.modules[moduleId];
                if (!module) return prev;

                return {
                    ...prev,
                    modules: {
                        ...prev.modules,
                        [moduleId]: {
                            ...module,
                            exerciseProgress: {
                                ...module.exerciseProgress,
                                flashcardsViewed: viewedCount,
                            },
                            lastAccessed: new Date().toISOString(),
                        },
                    },
                };
            });
        },
        []
    );

    // Sauvegarder le score du fill-in-the-blank
    const saveFillBlankScore = useCallback(
        (moduleId: string, score: number, total: number) => {
            setProgress((prev) => {
                const module = prev.modules[moduleId];
                if (!module) return prev;

                return {
                    ...prev,
                    modules: {
                        ...prev.modules,
                        [moduleId]: {
                            ...module,
                            exerciseProgress: {
                                ...module.exerciseProgress,
                                fillBlankScore: { score, total },
                            },
                            lastAccessed: new Date().toISOString(),
                        },
                    },
                };
            });
        },
        []
    );

    // Réinitialiser toute la progression
    const resetProgress = useCallback(() => {
        setProgress({ modules: {}, totalLessonsCompleted: 0 });
    }, []);

    // Calculer les statistiques globales
    const getStats = useCallback(() => {
        const modules = Object.values(progress.modules);
        const totalLessons = modules.reduce((sum, m) => sum + m.lessonsProgress.length, 0);
        const completedLessons = modules.reduce(
            (sum, m) => sum + m.lessonsProgress.filter((l) => l.completed).length,
            0
        );
        const completedModules = modules.filter((m) => m.completedAt).length;

        return {
            totalModules: modules.length,
            completedModules,
            totalLessons,
            completedLessons,
            progressPercentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
        };
    }, [progress.modules]);

    return {
        progress,
        getModuleProgress,
        initModuleProgress,
        completeLesson,
        saveQuizScore,
        saveFlashcardsProgress,
        saveFillBlankScore,
        resetProgress,
        getStats,
    };
};

export default useProgress;
