'use client'

import { useAuth } from '@/app/contexts/authContext';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/se-connecter');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return <p>Chargement...</p>;
    }

    return <>{children}</>;
}
