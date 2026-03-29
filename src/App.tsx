import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Alphabet from "./pages/Alphabet";
import Culture from "./pages/Culture";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Article from "./pages/Article";
import Vocabulary from "./pages/Vocabulary";
import MyFlashcards from "./pages/MyFlashcards";

// Import de la nouvelle page « PremiersMots »
import PremiersMots from "./pages/PremiersMots";

// Import de la page de leçons interactives
import InteractiveLesson from "./pages/InteractiveLesson";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/alphabet" element={<Alphabet />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/my-flashcards" element={<MyFlashcards />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/article/:id" element={<Article />} />
          {/* Page de cours interactif pour le module « Premiers pas » */}
          <Route path="/lesson/1-1" element={<PremiersMots />} />
          {/* Page de leçons interactives avec exercices (route dynamique) */}
          <Route path="/lesson/:id" element={<InteractiveLesson />} />
          {/* Ajouter toutes les routes personnalisées au dessus de la route catch‑all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;