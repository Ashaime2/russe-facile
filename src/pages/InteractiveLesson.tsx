import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, PenTool, CheckCircle, Volume2 } from "lucide-react";
import { playSuccessSound } from "@/lib/sounds";
import {
    ExerciseQuiz,
    ExerciseFlashcard,
    ExerciseMatching,
    ExerciseFillBlank,
} from "@/components/exercises";
import { useProgress } from "@/hooks/useProgress";
import { a1Modules, type ModuleData } from "@/data/a1Modules";
import { a2Modules } from "@/data/a2Modules";
import { b1Modules } from "@/data/b1Modules";

// ============================================================================
// FUSION DES MODULES A1 + A2 + B1
// ============================================================================

const allModules: Record<string, ModuleData> = {
    ...a1Modules,
    ...a2Modules,
    ...b1Modules,
};

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

const InteractiveLesson = () => {
    const { id } = useParams<{ id: string }>();
    const data = id ? allModules[id] : undefined;
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [activeTab, setActiveTab] = useState("lesson");

    // Hook de persistance de la progression
    const { initModuleProgress, completeLesson, saveQuizScore, getModuleProgress } = useProgress();

    // Initialiser la progression du module au chargement
    useEffect(() => {
        if (id && data) {
            initModuleProgress(id, data.lessons.length);
            // Restaurer la position de la dernière leçon vue
            const moduleProgress = getModuleProgress(id);
            if (moduleProgress) {
                const lastViewedIndex = moduleProgress.lessonsProgress.findIndex(l => !l.completed);
                if (lastViewedIndex > 0) {
                    setCurrentLessonIndex(lastViewedIndex);
                }
            }
        }
    }, [id, data, initModuleProgress, getModuleProgress]);

    // Raccourcis clavier pour navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (activeTab !== "lesson") return;
        if (e.key === "ArrowLeft" && currentLessonIndex > 0) {
            setCurrentLessonIndex((i) => i - 1);
        } else if (e.key === "ArrowRight" && data && currentLessonIndex < data.lessons.length - 1) {
            if (id) completeLesson(id, currentLessonIndex);
            setCurrentLessonIndex((i) => i + 1);
        }
    }, [activeTab, currentLessonIndex, data, id, completeLesson]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Marquer la leçon actuelle comme complétée quand on passe à la suivante
    const handleNextLesson = () => {
        if (id) {
            completeLesson(id, currentLessonIndex);
        }
        playSuccessSound();
        setCurrentLessonIndex((i) => i + 1);
    };

    // Callback pour le quiz
    const handleQuizComplete = (score: number, total: number) => {
        if (id) {
            saveQuizScore(id, score, total);
        }
    };

    // Fonction TTS
    const speak = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "ru-RU";
            window.speechSynthesis.speak(utterance);
        }
    };

    // Si le module n'existe pas, afficher une page "bientôt disponible"
    if (!data) {
        return (
            <div className="min-h-screen bg-gradient-winter">
                <Navigation />
                <div className="container mx-auto px-4 pt-24 pb-16">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h1 className="text-4xl font-bold">Contenu en préparation</h1>
                        <p className="text-xl text-muted-foreground">
                            Ce module sera bientôt disponible. Revenez dans quelques jours !
                        </p>
                        <Link to="/courses">
                            <Button variant="hero" className="mt-6">
                                Retour aux parcours
                            </Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const currentLesson = data.lessons[currentLessonIndex];
    const hasExercises = data.quiz || data.flashcards || data.matching || data.fillBlank;

    return (
        <div className="min-h-screen bg-gradient-winter">
            <Navigation />

            <div className="container mx-auto px-4 pt-24 pb-16">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <Breadcrumb items={[
                        { label: "Cours", path: "/courses" },
                        { label: data.title }
                    ]} />

                    {/* Header */}
                    <div className="text-center mb-8 space-y-2 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold">
                            Module {id}
                        </div>
                        <h1 className="text-4xl font-bold">{data.title}</h1>
                        <p className="text-muted-foreground">{data.description}</p>
                        <p className="text-xs text-muted-foreground">💡 Utilisez ← → pour naviguer entre les leçons</p>
                    </div>

                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="lesson" className="gap-2">
                                <BookOpen className="w-4 h-4" />
                                Leçons
                            </TabsTrigger>
                            <TabsTrigger value="exercises" className="gap-2" disabled={!hasExercises}>
                                <PenTool className="w-4 h-4" />
                                Exercices
                            </TabsTrigger>
                        </TabsList>

                        {/* Contenu des leçons */}
                        <TabsContent value="lesson" className="space-y-6">
                            {/* Liste des leçons */}
                            <div className="flex gap-2 flex-wrap justify-center">
                                {data.lessons.map((_, index) => (
                                    <Button
                                        key={index}
                                        variant={currentLessonIndex === index ? "hero" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentLessonIndex(index)}
                                        className="gap-1"
                                    >
                                        {index + 1}
                                        {index < currentLessonIndex && (
                                            <CheckCircle className="w-3 h-3 text-green-500" />
                                        )}
                                    </Button>
                                ))}
                            </div>

                            {/* Contenu de la leçon */}
                            <Card className="p-8 border-border animate-slide-up">
                                <h2 className="text-2xl font-bold mb-6 text-primary">
                                    {currentLessonIndex + 1}. {currentLesson.title}
                                </h2>
                                <div className="space-y-4 text-lg leading-relaxed">
                                    {currentLesson.content.map((paragraph, idx) => (
                                        <p key={idx}>{paragraph}</p>
                                    ))}
                                </div>

                                {/* Vocabulaire de la leçon */}
                                {currentLesson.vocabulary && (
                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                            <Volume2 className="w-5 h-5 text-primary" />
                                            Vocabulaire
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {currentLesson.vocabulary.map((item, idx) => (
                                                <Card
                                                    key={idx}
                                                    className="p-4 border-border hover:shadow-soft transition-all cursor-pointer"
                                                    onClick={() => speak(item.word)}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="text-xl font-bold text-primary">
                                                                {item.word}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground italic">
                                                                {item.transliteration}
                                                            </div>
                                                            <div className="text-sm mt-1">{item.translation}</div>
                                                        </div>
                                                        <Volume2 className="w-5 h-5 text-muted-foreground" />
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Card>

                            {/* Navigation entre leçons */}
                            <div className="flex justify-between">
                                <Button
                                    variant="outline"
                                    disabled={currentLessonIndex === 0}
                                    onClick={() => setCurrentLessonIndex((i) => i - 1)}
                                >
                                    ← Précédent
                                </Button>
                                {currentLessonIndex < data.lessons.length - 1 ? (
                                    <Button
                                        variant="hero"
                                        onClick={handleNextLesson}
                                    >
                                        Suivant →
                                    </Button>
                                ) : hasExercises ? (
                                    <Button variant="hero" onClick={() => setActiveTab("exercises")}>
                                        Passer aux exercices →
                                    </Button>
                                ) : (
                                    <Link to="/courses">
                                        <Button variant="hero">Terminer →</Button>
                                    </Link>
                                )}
                            </div>
                        </TabsContent>

                        {/* Contenu des exercices */}
                        <TabsContent value="exercises" className="space-y-8">
                            {/* Quiz */}
                            {data.quiz && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold flex items-center gap-2">
                                        <CheckCircle className="w-6 h-6 text-primary" />
                                        Quiz - Testez vos connaissances
                                    </h2>
                                    <ExerciseQuiz
                                        questions={data.quiz}
                                        onComplete={handleQuizComplete}
                                    />
                                </div>
                            )}

                            {/* Flashcards */}
                            {data.flashcards && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold">📚 Flashcards - Révisez le vocabulaire</h2>
                                    <Card className="p-6 border-border">
                                        <ExerciseFlashcard cards={data.flashcards} />
                                    </Card>
                                </div>
                            )}

                            {/* Matching */}
                            {data.matching && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold">🔗 Association - Reliez les paires</h2>
                                    <Card className="p-6 border-border">
                                        <ExerciseMatching pairs={data.matching} />
                                    </Card>
                                </div>
                            )}

                            {/* Fill in the blank */}
                            {data.fillBlank && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold">✏️ Complétez les phrases</h2>
                                    <ExerciseFillBlank questions={data.fillBlank} />
                                </div>
                            )}

                            {/* Retour aux cours */}
                            <div className="flex justify-center pt-8">
                                <Link to="/courses">
                                    <Button variant="hero" size="lg">
                                        Retour aux parcours
                                    </Button>
                                </Link>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default InteractiveLesson;
