import { fetchRecipeBySlug } from "@/app/services/recipe";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, ChefHat, CookingPot } from "lucide-react";
import { calculateTotalTime } from "@/app/utils/calculateTotalTime";
import { calculatePostedAgo } from "@/app/utils/calculatePostedAgo";
import Link from "next/link";
import { TimelineStep, VerticalTimeline } from "@/components/vertical-timeline";

interface RecipePageProps {
    params: {
        username: string;
        slug: string;
    };
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
    const recipe = await fetchRecipeBySlug(params.username, params.slug);
    console.log(recipe)
    return {
        title: `${recipe.label} par ${params.username}`,
        description: recipe.label,
        openGraph: {
            title: `${recipe.label} par ${params.username}`,
            description: recipe.description,
            images: [recipe.image],
        },
    };
}

interface Ingredient {
    quantity: string;
    ingredient: {
        name: string;
    };
}

interface Step {
    name: string;
    preparation: boolean;
    duration: number;
    description: string;
}

const RecipePage = async ({ params }: RecipePageProps) => {
    const { username, slug } = params;

    try {
        const recipe = await fetchRecipeBySlug(username, slug);

        const { totalPreparationTime, totalCookingTime } = calculateTotalTime(recipe.steps);
        const totalTime = totalPreparationTime + totalCookingTime;
        const postedAgo = calculatePostedAgo(recipe.createdAt);

        return (
            <div className="max-w-4xl w-full p-4">
                <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6">
                    <img src={recipe.image} alt={recipe.label} className="w-full h-full object-cover" />
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.label}</h1>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md">
                            <ChefHat className="w-4 h-4" /> <span>Préparation: {totalPreparationTime} min</span>
                        </div>
                        <div className="flex items-center gap-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md">
                            <CookingPot className="w-4 h-4" /> <span>Cuisson: {totalCookingTime} min</span>
                        </div>
                        <div className="flex items-center gap-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md">
                            <Clock className="w-4 h-4" /> <span>Total: {totalTime} min</span>
                        </div>
                    </div>
                    <p className="text-sm mt-2">
                        Publiée il y&apos;a {postedAgo} par{" "}
                        <Link
                            href={`/${recipe.user.username}`}
                            className="font-medium hover:underline text-primary"
                        >
                            {recipe.user.username}
                        </Link>
                    </p>
                </div>

                <Separator className="my-6" />

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">À propos de cette recette</h2>
                    <p className="text-sm mt-2">
                        {recipe.description
                            ? recipe.description
                            : `${recipe.user.username} n'a pas voulu nous partager l'histoire de sa recette.`}
                    </p>
                </div>

                <Separator className="my-6" />

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Ingrédients</h2>
                    <div className="flex flex-wrap gap-2">
                        {recipe.recipeIngredients.map((item: Ingredient, index: number) => (
                            <Badge key={index} variant="outline" className="px-3 py-2 text-sm bg-card">
                                {item.quantity} {item.ingredient.name}
                            </Badge>
                        ))}
                    </div>
                </div>

                <Separator className="my-6" />

                <Card>
                    <CardContent className="p-8">
                        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                        <VerticalTimeline
                            steps={recipe.steps.map((step: Step, index: number): TimelineStep => ({
                                title: step.name,
                                badge: {
                                    text: step.preparation ? "Préparation" : "Cuisson",
                                    icon: step.preparation ? <ChefHat className="w-4 h-4" /> : <CookingPot className="w-4 h-4" />,
                                    variant: step.preparation ? "secondary" : "destructive",
                                },
                                description: step.description,
                                date: {
                                    icon: <Clock className="w-3 h-3" />,
                                    label: `${step.duration} minutes`,
                                },
                                marker: (
                                    <div className="flex items-center gap-1">
                                        {index + 1}
                                    </div>
                                )
                            }))}
                        />
                    </CardContent>
                </Card>
            </div>
        );
    } catch (error) {
        console.error("Error fetching recipe:", error);
        return <div>Error loading recipe.</div>;
    }
};

export default RecipePage;