export const fetchRecipes = async () => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/recipes`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch recipes");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
};


export const fetchUserRecipes = async (token) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/users/me/recipes`, {
            cache: "no-store",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch recipes of the current user");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching recipes of the current user:", error);
        throw error;
    }
};

export const deleteRecipe = async (token, id) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/recipes/${id}`, {
            method: 'DELETE',
            cache: "no-store",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error("Failed to delete the recipe");
        }

        return { success: true };
    } catch (error) {
        console.error("Failed to delete the recipe:", error);
        throw error;
    }
};