'use client'
import { useState } from 'react';
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar, Home, Inbox} from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de connexion ici
    console.log('Connexion avec:', { email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96 h-fit">
        <CardTitle className="text-center text-xl font-semibold">
          Connexion à votre compte
        </CardTitle>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email input avec icône */}
            <div className="flex items-center space-x-2">
              <Calendar className="text-gray-500" />
              <div className="w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
            </div>

            {/* Mot de passe avec icône et bouton pour afficher/cacher */}
            <div className="flex items-center space-x-2">
              <Calendar className="text-gray-500" />
              <div className="w-full relative">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <Home className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Inbox className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Bouton de connexion */}
            <Button type="submit" className="w-full mt-4">
              Se connecter
            </Button>
          </form>
        </CardContent>

        {/* Footer avec un lien pour réinitialiser le mot de passe */}
        <CardFooter className="text-center text-sm text-gray-500">
          <a href="#" className="text-blue-600 hover:underline">
            Mot de passe oublié ?
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
