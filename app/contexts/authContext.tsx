'use client'

import { createContext, ReactNode, useContext, useEffect, useState, useCallback } from 'react';
import { getToken, setToken, removeToken } from '../utils/auth';
interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    username: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean | null;
    login: (token: string) => void;
    logout: () => void;
    fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const fetchUser = useCallback(async (): Promise<void> => {
        const token = getToken();
        if (token) {
            const response = await fetch(`${apiUrl}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data: User = await response.json();
                setUser(data);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        }
    }, [apiUrl]);

    useEffect(() => {
        const checkAuth = async () => {
            const token = getToken();
            if (token) {
                await fetchUser();
            } else {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, [fetchUser]);

    const login = (token: string) => {
        setToken(token);
        fetchUser();
    };

    const logout = () => {
        removeToken();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
