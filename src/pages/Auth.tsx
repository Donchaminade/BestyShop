import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Email invalide').max(255),
  password: z.string().min(6, 'Mot de passe minimum 6 caractères').max(100),
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    
    const result = authSchema.safeParse({ email, password });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Email ou mot de passe incorrect');
      } else {
        toast.error('Erreur de connexion');
      }
    } else {
      toast.success('Connexion réussie');
      navigate('/admin');
    }
  }

  // async function handleSignUp(e: React.FormEvent) {
  //   e.preventDefault();
    
  //   const result = authSchema.safeParse({ email, password });
  //   if (!result.success) {
  //     toast.error(result.error.errors[0].message);
  //     return;
  //   }

  //   setLoading(true);
  //   const { error } = await signUp(email, password);
  //   setLoading(false);

  //   if (error) {
  //     if (error.message.includes('already registered')) {
  //       toast.error('Cet email est déjà utilisé');
  //     } else {
  //       toast.error('Erreur lors de l\'inscription');
  //     }
  //   } else {
  //     toast.success('Compte créé! Vous pouvez maintenant vous connecter.');
  //   }
  // }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 gradient-glow opacity-30" />
      
      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à la boutique
        </Link>

        <Card className="border-border/50 gradient-card shadow-elevated">
          <CardHeader className="text-center">
            <img
              src="/logo.jpeg"
              alt="ZakSport"
              className="w-16 h-16 rounded-xl object-cover mx-auto mb-4 shadow-glow"
            />
            <CardTitle className="font-display text-3xl">
              Zak<span className="text-primary">Sport</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-1 mb-6">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                {/* <TabsTrigger value="register">Inscription</TabsTrigger> */}
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="admin@sportshop.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Se connecter
                  </Button>
                </form>
              </TabsContent>
              
              {/*
              <TabsContent value="register">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="admin@sportshop.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Mot de passe</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Minimum 6 caractères"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Créer un compte
                  </Button>
                </form>
              </TabsContent>
              */}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
