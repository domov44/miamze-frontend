export const createRecipe = async (token, recipeData) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const res = await fetch(`${apiUrl}/recipes`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeData),
        });

        if (!res.ok) {
            throw new Error(`Failed to create recipe. Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error creating recipe:", error);
        throw error;
    }
};

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

export const fetchRecipeBySlug= async (username, slug) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/recipes/${username}/${slug}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch the recipe. Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching the current recipe:", error);
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

export const fetchUsersByUsername= async (username) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/users/${username}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch the user ${username}. Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Error fetching the user:${username}`, error);
        throw error;
    }
};