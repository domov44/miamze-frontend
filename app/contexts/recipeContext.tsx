'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchUserRecipes, deleteRecipe } from '@/app/services/recipe';
import { getToken } from '@/app/utils/auth';
import { useAuth } from './authContext';

export interface Recipe {
    id: number;
    image: string;
    label: string;
    slug: string;
    category?: {
        label: string;
    };
    user: {
        username: string;
    };
}

interface RecipeContextType {
    recipes: Recipe[];
    loading: boolean;
    fetchRecipes: () => void;
    deleteRecipe: (id: number) => void;
    addRecipe: (newRecipe: Recipe) => void;
}

interface RecipeProviderProps {
    children: React.ReactNode;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);

    const fetchRecipes = async () => {
        setLoading(true);
        const token = getToken();

        if (!token || !isAuthenticated) {
            console.error("L'utilisateur doit être authentifié pour récupérer les recettes.");
            setLoading(false);
            return;
        }

        try {
            const data = await fetchUserRecipes(token);
            setRecipes(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des recettes:', error);
        } finally {
            setLoading(false);
        }
    };

    const addRecipe = (newRecipe: Recipe) => {
        setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    };

    const deleteRecipeHandler = async (id: number) => {
        const token = getToken();

        if (!token || !isAuthenticated) {
            console.error("L'utilisateur doit être authentifié pour supprimer une recette.");
            return;
        }

        try {
            const response = await deleteRecipe(token, id);
            if (response && response.success) {
                setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
            } else {
                console.error("Erreur lors de la suppression de la recette.");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de la recette:", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchRecipes();
        } else if (isAuthenticated === false) {
            setLoading(false);
        }
    }, [isAuthenticated]);

    return (
        <RecipeContext.Provider value={{ recipes, loading, fetchRecipes, deleteRecipe: deleteRecipeHandler, addRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipe = (): RecipeContextType => {
    const context = useContext(RecipeContext);
    if (!context) {
        throw new Error('useRecipe must be used within a RecipeProvider');
    }
    return context;
};