'use client';
import { useState } from 'react';
import { Card, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, name, surname, email, password }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l’inscription');
            }

            await response.json();
            router.push('/se-connecter');
            toast(`Parfait, maintenant veuillez-vous connecter`)
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
                    Créer un compte
                </CardTitle>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="username">Nom d&apos;utilisateur</Label>
                            <div className="relative flex items-center">
                                <User className="absolute left-3 text-gray-500" size={20} />
                                <Input
                                    id="username"
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
                            <Label htmlFor="name">Prénom</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Votre prénom"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="surname">Nom de famille</Label>
                            <Input
                                id="surname"
                                type="text"
                                placeholder="Votre nom de famille"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-3 text-gray-500" size={20} />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Votre email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    type='password'
                                    placeholder="Votre mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pl-10 pr-10"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                            <div className="relative flex items-center">
                                <Lock className="absolute left-3 text-gray-500" size={20} />
                                <Input
                                    id="confirmPassword"
                                    type='password'
                                    placeholder="Confirmez votre mot de passe"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="pl-10 pr-10"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <Button type="submit" className="w-full mt-4" disabled={loading}>
                            {loading ? 'Inscription...' : 'S’inscrire'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="text-center text-sm text-gray-500">
                    <Link href="/se-connecter" className="text-blue-600 hover:underline">
                        Déjà un compte ? Connectez-vous
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
