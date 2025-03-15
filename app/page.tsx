'use client'
import RecipeCard from "@/components/recipe-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { useAuth } from "./contexts/authContext";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchRecipes } from "./services/recipe";
import { useEffect, useState } from "react";
import RecipeCardSkeleton from "@/components/skeleton/recipe-card";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { isAuthenticated, user } = useAuth();

  interface Recipe {
    id: number;
    label: string;
    slug: string;
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

  const calculatePostedAgo = (createdAt: string) => {
    const creationDate = new Date(createdAt);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - creationDate.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} sec`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} j`;
  };



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
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardDescription className="text-sm text-gray-500">
                  Bonjour <span className="font-medium">{user.name}</span>👋
                </CardDescription>
              </div>
              <CardTitle className="text-lg font-semibold">
                On cuisine quoi aujourd&apos;hui?
              </CardTitle>
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
                  <CardDescription className="text-sm text-gray-500">
                    Bonjour, <span className="font-medium">vous n&apos;êtes pas connecté</span>👋
                  </CardDescription>
                </div>
                <CardTitle className="text-lg font-semibold">
                  Rejoignez Miamze pour partager vos recettes
                </CardTitle>
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
                  const totalPreparationTime = recipe.steps?.filter(step => step.preparation).reduce((acc, step) => acc + step.duration, 0) || 0;
                  const totalCookingTime = recipe.steps?.filter(step => !step.preparation).reduce((acc, step) => acc + step.duration, 0) || 0;

                  return (
                    <RecipeCard
                      key={recipe.id}
                      imageSrc={recipe.image}
                      imageAlt={recipe.label}
                      slug={recipe.slug}
                      prepTime={`${totalPreparationTime} min`}
                      cookTime={`${totalCookingTime} min`}
                      avatarSrc="https://github.com/shadcn.png"
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
                <CardTitle className="text-lg font-semibold">
                  Tendances et Catégories
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Découvrez les dernières tendances culinaires et explorez des recettes populaires!
                </CardDescription>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button variant="outline" className="text-xs text-gray-600 border-gray-300">
                    #Tendances
                  </Button>
                  <Button variant="outline" className="text-xs text-gray-600 border-gray-300">
                    #RecettesVégétariennes
                  </Button>
                  <Button variant="outline" className="text-xs text-gray-600 border-gray-300">
                    #RecettesRapides
                  </Button>
                  <Button variant="outline" className="text-xs text-gray-600 border-gray-300">
                    #CuisineDuMonde
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full overflow-hidden shadow-lg">
            <CardContent className="p-4 flex gap-4">
              <div className="flex flex-col justify-center w-full">
                <CardTitle className="text-lg font-semibold">
                  Cuisto que vous pourriez aimer
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Explorez des profils qui pourraient vous inspirer!
                </CardDescription>
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-wrap gap-3 justify-center">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">Utilisateur1</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SB</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">Utilisateur2</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>DM</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">Utilisateur3</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

