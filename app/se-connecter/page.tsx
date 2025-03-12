'use client';
import { useState } from 'react';
import { Card, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../contexts/authContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('username ou mot de passe incorrect');
      }

      const data = await response.json();
      await login(data.access_token);
      router.push('/');
      toast.success(`Connexion établie, bienvenue sur Miamze`)

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Card className="max-w-xl w-full shadow-lg p-6">
        <CardTitle className="text-center text-xl font-semibold mb-4">
          Connexion à votre compte
        </CardTitle>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="pseudo">Nom d&apos;utilisateur</Label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 text-gray-500" size={20} />
                <Input
                  id="pseudo"
                  type="text"
                  placeholder="Votre nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 text-gray-500" size={20} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          <Link href="/inscription" className="text-blue-600 hover:underline">
            Pas encore de compte ? Inscrivez-vous gratuitement.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
