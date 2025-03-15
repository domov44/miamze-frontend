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
