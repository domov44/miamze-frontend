import { fetchUsersByUsername } from "@/app/services/recipe";
import { Metadata } from "next";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { calculateTotalTime } from "@/app/utils/calculateTotalTime";
import { calculatePostedAgo } from "@/app/utils/calculatePostedAgo";
import RecipeCard from "@/components/recipe-card";

interface RecipePageProps {
    params: {
        username: string;
        slug: string;
    };
}

interface Step {
    id: number;
    description: string;
    duration: number;
}

interface Recipe {
    id: number;
    category: {
        label: string;
    };
    label: string;
    image: string;
    slug: string;
    steps: Step[];
    createdAt: string;
}

interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    username: string;
    recipes: Recipe[];
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
    const user = await fetchUsersByUsername(params.username);
    return {
        title: `Profil Miamze de ${user.username}`,
        openGraph: {
            title: `Profil Miamze de ${user.username}`,
        },
    };
}

const ProfilePage = async ({ params }: RecipePageProps) => {
    const { username } = params;

    try {
        const user: User = await fetchUsersByUsername(username);

        return (
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username.charAt(0).toUpperCase()}`}
                            />
                            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-xl">{user.name} {user.surname}</CardTitle>
                            <CardDescription>@{user.username}</CardDescription>
                            <div className="mt-1 text-sm text-muted-foreground">{user.email}</div>
                        </div>
                    </CardHeader>
                </Card>

                <Separator />

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Recettes publiées</h2>
                    {user.recipes?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {user.recipes.map((recipe) => {
                                const { totalPreparationTime, totalCookingTime } = calculateTotalTime(recipe.steps || []);
                                return (
                                    <RecipeCard
                                        key={recipe.id}
                                        imageSrc={recipe.image}
                                        category={recipe.category.label}
                                        imageAlt={recipe.label}
                                        slug={recipe.slug}
                                        prepTime={`${totalPreparationTime} min`}
                                        cookTime={`${totalCookingTime} min`}
                                        avatarSrc={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username.charAt(0).toUpperCase()}`}
                                        avatarAlt={user.username}
                                        title={recipe.label}
                                        username={user.username}
                                        views="500K"
                                        postedAgo={calculatePostedAgo(recipe.createdAt)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">Aucune recette pour le moment.</p>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching recipe:", error);
        return <div className="text-red-500">Erreur de chargement du profil.</div>;
    }
};

export default ProfilePage;
