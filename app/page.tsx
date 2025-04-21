'use client'
import RecipeCard from "@/components/recipe-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "./contexts/authContext";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchRecipes } from "./services/recipe";
import { useEffect, useState } from "react";
import RecipeCardSkeleton from "@/components/skeleton/recipe-card";
import { calculatePostedAgo } from "./utils/calculatePostedAgo";
import { calculateTotalTime } from "./utils/calculateTotalTime";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { isAuthenticated, user } = useAuth();

  interface Recipe {
    id: number;
    label: string;
    slug: string;
    category: {
      label: string;
    };
    image: string;
    createdAt: string;
    user?: {
      username: string;
    };
    steps: {
      name: string;
      description: string;
      duration: number;
      preparation: boolean;
    }[];
  }

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getRecipes();
  }, []);

  return (
    <div className="grid grid-cols-[1.5fr_1fr] gap-8 p-2 pt-10 w-full max-w-5xl">
      <div className="flex flex-col gap-10">
        {isAuthenticated && user ? (
          <Card className="w-full overflow-hidden shadow-lg">
            <div className="flex flex-col justify-center p-4 pb-2">
              <div className="flex gap-1 items-center">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={user?.avatarUrl} alt={user?.username} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-sm">
                  Bonjour <span className="font-medium">{user.name}</span>👋
                </p>
              </div>
              <h3 className="text-lg font-semibold">
                On cuisine quoi aujourd&apos;hui?
              </h3>
            </div>
            <CardFooter className="flex gap-2 p-4 pt-2">
              <Button className="text-sm" href="/ajouter-une-recette">
                Ajouter une recette
              </Button>
              <Button variant="outline" className="text-sm" href="/mes-recettes">
                Gérer mes recettes
              </Button>
            </CardFooter>
          </Card>
        ) :
          isAuthenticated === false && user === null ? (
            <Card className="w-full overflow-hidden shadow-lg">
              <div className="flex flex-col justify-center p-4 pb-2">
                <div className="flex gap-1 items-center">
                  <p className="text-sm">
                    Bonjour, <span className="font-medium">vous n&apos;êtes pas connecté</span>👋
                  </p>
                </div>
                <h3 className="text-lg font-semibold">
                  Rejoignez Miamze pour partager vos recettes
                </h3>
              </div>
              <CardFooter className="flex gap-2 p-4 pt-2">
                <Button className="text-sm" href="/se-connecter">
                  Se connecter
                </Button>
                <Button variant="outline" className="text-sm" href="/inscription">
                  Créer un compte gratuitement
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="w-full overflow-hidden shadow-lg">
              <div className="flex flex-col justify-center p-4 pb-2">
                <div className="flex gap-1 items-center">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-4 mt-2 w-32" />
                </div>
                <Skeleton className="h-4 mt-2 w-40" />
              </div>
              <CardFooter className="flex gap-2 p-4 pt-2">
                <Skeleton className="w-28 h-8" />
                <Skeleton className="w-28 h-8" />
              </CardFooter>
            </Card>
          )}
        <Tabs defaultValue="explorer" className="w-full">
          <TabsList className="flex justify-start gap-4 p-2">
            <TabsTrigger value="explorer" className="text-sm font-medium">
              Explorer
            </TabsTrigger>
            <TabsTrigger value="pour-vous" className="text-sm font-medium">
              Pour vous
            </TabsTrigger>
          </TabsList>
          <TabsContent value="explorer">
            <div className="grid grid-cols-1 gap-8 p-2">
              {recipes.length > 0 ? (
                recipes.map((recipe) => {
                  const { totalPreparationTime, totalCookingTime } = calculateTotalTime(recipe.steps);

                  return (
                    <RecipeCard
                      key={recipe.id}
                      imageSrc={recipe.image}
                      category={recipe.category.label}
                      imageAlt={recipe.label}
                      slug={recipe.slug}
                      prepTime={`${totalPreparationTime} min`}
                      cookTime={`${totalCookingTime} min`}
                      avatarSrc={`https://api.dicebear.com/7.x/initials/svg?seed=${recipe?.user?.username.charAt(0).toUpperCase()}`}
                      avatarAlt={recipe.user?.username || "Auteur"}
                      title={recipe.label}
                      username={recipe.user?.username || "Utilisateur inconnu"}
                      views="500K"
                      postedAgo={calculatePostedAgo(recipe.createdAt)}
                    />
                  );
                })
              ) : (
                <div className="grid grid-cols-1 gap-8 p-2">
                  {[...Array(3)].map((_, index) => (
                    <RecipeCardSkeleton key={index} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <div className="flex flex-col gap-8 sticky top-4">
          <Card className="w-full overflow-hidden shadow-lg">
            <CardContent className="p-4 flex gap-4">
              <div className="flex flex-col justify-center w-full">
                <h3 className="text-lg font-semibold">
                  Tendances et Catégories
                </h3>
                <p className="text-sm">
                  Découvrez les dernières tendances culinaires et explorez des recettes populaires!
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button variant="outline" className="text-xs border-gray-300">
                    #Tendances
                  </Button>
                  <Button variant="outline" className="text-xs border-gray-300">
                    #RecettesVégétariennes
                  </Button>
                  <Button variant="outline" className="text-xs border-gray-300">
                    #RecettesRapides
                  </Button>
                  <Button variant="outline" className="text-xs border-gray-300">
                    #CuisineDuMonde
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full overflow-hidden shadow-lg">
            <CardContent className="p-4 flex gap-4">
              <div className="flex flex-col justify-center w-full">
                <h3 className="text-lg font-semibold">
                  Cuisto que vous pourriez aimer
                </h3>
                <p className="text-sm">
                  Explorez des profils qui pourraient vous inspirer!
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-wrap gap-3 justify-center">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Utilisateur1</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SB</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Utilisateur2</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>DM</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Utilisateur3</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

