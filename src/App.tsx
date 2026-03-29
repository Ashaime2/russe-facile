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

// Import du système d'authentification
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Auth from "./pages/Auth";

import InteractiveLesson from "./pages/InteractiveLesson";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Routes publiques (ouvertes pour la démo) */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/alphabet" element={<Alphabet />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/about" element={<About />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/my-flashcards" element={<MyFlashcards />} />
            <Route path="/lesson/1-1" element={<PremiersMots />} />
            <Route path="/lesson/:id" element={<InteractiveLesson />} />
            
            {/* Routes protégées (optionnel pour la démo) */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            
            {/* Page non trouvée */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;