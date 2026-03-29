import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export default function Auth() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Page de redirection (soit celle demandée par l'user, soit le dashboard)
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  // Formulaire de connexion
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // Formulaire d'inscription
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const redirected = await signIn(values.email, values.password);
      if (!redirected) setIsLoading(false);
    } catch (error: any) {
      loginForm.setError("root", { message: error.message });
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    try {
      const redirected = await signUp(values.name, values.email, values.password);
      if (!redirected) setIsLoading(false);
    } catch (error: any) {
      registerForm.setError("root", { message: error.message });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Panneau gauche avec image (invisible sur mobile) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-winter items-center justify-center p-12 relative overflow-hidden">
        {/* On peut ajouter une image de fond ici si besoin */}
        <div className="relative z-10 max-w-lg text-center space-y-6">
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold text-2xl group-hover:scale-105 transition-transform shadow-glow">
                Д
              </div>
              <span className="text-3xl font-bold tracking-tight">Défi G1-G2</span>
            </Link>
          </div>
          <h1 className="text-4xl font-bold">Apprenez le russe à votre rythme</h1>
          <p className="text-xl text-muted-foreground">
            Rejoignez une communauté d'apprenants et accédez à des dizaines de cours interactifs, flashcards et quiz conçus pour une progression rapide.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-background/50 backdrop-blur-sm rounded-xl border border-border">
              <div className="font-bold text-2xl text-primary">3</div>
              <div className="text-sm text-muted-foreground">Niveaux (A1 à B1)</div>
            </div>
            <div className="p-4 bg-background/50 backdrop-blur-sm rounded-xl border border-border">
              <div className="font-bold text-2xl text-primary">90+</div>
              <div className="text-sm text-muted-foreground">Leçons interactives</div>
            </div>
          </div>
        </div>
      </div>

      {/* Panneau droit : Formulaires */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-8">
          
          <div className="flex justify-center lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-xl shadow-glow">
                Д
              </div>
              <span className="text-2xl font-bold tracking-tight">Défi G1-G2</span>
            </Link>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Bienvenue</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Connectez-vous ou créez un compte gratuit pour sauvegarder votre progression.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>

            {/* ONGLET CONNEXION */}
            <TabsContent value="login">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Content de vous revoir !</CardTitle>
                  <CardDescription>Entrez vos identifiants pour accéder à vos cours.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      {loginForm.formState.errors.root && (
                        <div className="p-3 bg-destructive/15 text-destructive text-sm rounded-md font-medium text-center animate-shake">
                          {loginForm.formState.errors.root.message}
                        </div>
                      )}
                      
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="vous@exemple.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Mot de passe</FormLabel>
                              <Link to="#" className="text-xs text-primary hover:underline">Oublié ?</Link>
                            </div>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        Se connecter
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ONGLET INSCRIPTION */}
            <TabsContent value="register">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Créer un compte</CardTitle>
                  <CardDescription>C'est 100% gratuit et ça le restera.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    {registerForm.formState.errors.root && (
                        <div className="p-3 bg-destructive/15 text-destructive text-sm rounded-md font-medium text-center animate-shake">
                          {registerForm.formState.errors.root.message}
                        </div>
                      )}
                      
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom ou Pseudo</FormLabel>
                            <FormControl>
                              <Input placeholder="Anna" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="vous@exemple.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmez le mot de passe</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full gap-2" variant="hero" disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        Créer mon compte
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  );
}
