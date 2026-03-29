import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // On attend que la session soit vérifiée pour ne pas rediriger à tort
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        // Redirige vers la page d'authentification en retenant la page que l'utilisateur essayait d'atteindre
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // Si on est connecté, on affiche le contenu protégé
    return <>{children}</>;
};
