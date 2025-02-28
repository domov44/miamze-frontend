'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
    user: any;
    isAuthenticated: boolean | null;
    login: (token: string) => void;
    logout: () => void;
    fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get('access_token');
            if (token) {
                await fetchUser();
            } else {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    const fetchUser = async () => {
        const token = Cookies.get('access_token');
        if (token) {
            const response = await fetch(`${apiUrl}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        }
    };

    const login = (token: string) => {
        Cookies.set('access_token', token, { expires: 1 });
        fetchUser();
    };

    const logout = () => {
        Cookies.remove('access_token');
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
