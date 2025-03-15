export const fetchCategories = async () => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/categories`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};
