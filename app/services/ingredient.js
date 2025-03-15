export const fetchIngredients = async () => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/ingredients`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch ingredients");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching ingredients:", error);
        throw error;
    }
};
