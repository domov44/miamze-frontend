import { fetchRecipeBySlug } from "@/app/services/recipe";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, ChefHat, Flame, CookingPot } from "lucide-react";
import { calculateTotalTime } from "@/app/utils/calculateTotalTime";
import { calculatePostedAgo } from "@/app/utils/calculatePostedAgo";

interface RecipePageProps {
    params: {
        username: string;
        slug: string;
    };
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
    return {
        title: `Recette: ${params.slug}`,
    };
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
                    <p className="text-gray-500 text-sm mt-2">Publiée il y&apos;a {postedAgo} par {recipe.user.name} {recipe.user.surname}</p>
                </div>

                <Separator className="my-6" />

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Ingrédients</h2>
                    <div className="flex flex-wrap gap-2">
                        {recipe.recipeIngredients.map((item: any, index: number) => (
                            <Badge key={index} variant="outline" className="px-3 py-2 text-sm bg-gray-50">
                                {item.quantity} {item.ingredient.name}
                            </Badge>
                        ))}
                    </div>
                </div>

                <Separator className="my-6" />

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-1 bg-black rounded-full" />
                        <div className="space-y-8">
                            {recipe.steps.map((step: any, index: number) => (
                                <div key={index} className="relative">
                                    <div className="absolute left-8 top-0 w-10 h-10 bg-black rounded-full border-4 border-white text-white transform -translate-x-1/2 z-10 flex items-center justify-center">
                                        {index + 1}
                                    </div>
                                    <Card className="ml-16 hover:shadow-md transition-shadow">
                                        <CardHeader>
                                            <div className="flex justify-between items-center">
                                                <CardTitle className="text-lg flex items-center">
                                                    {step.name}
                                                </CardTitle>
                                                <Badge variant={step.preparation ? "secondary" : "destructive"}>
                                                    {step.preparation ? "Préparation" : "Cuisson"}
                                                </Badge>
                                            </div>
                                            <CardDescription className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {step.duration} minutes
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{step.description}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching recipe:", error);
        return <div>Error loading recipe.</div>;
    }
};

export default RecipePage;
