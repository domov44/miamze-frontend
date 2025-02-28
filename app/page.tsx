import RecipeCard from "@/components/recipe-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log("API URL:", apiUrl);

  const res = await fetch(`${apiUrl}/`, {
    cache: "no-store",
  });

  const data = await res.json();

  console.log(data)
  return (
    <div className="grid grid-cols-[1.5fr_1fr] gap-8 p-2 pt-10 w-full max-w-5xl">
      <div className="flex flex-col gap-10">
        <Card className="w-full overflow-hidden shadow-lg">
          <div className="flex flex-col justify-center p-4 pb-2">
            <div className="flex gap-1 items-center">
              <Avatar className="w-5 h-5">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardDescription className="text-sm text-gray-500">
                Bonjour <span className="font-medium">Ronan</span>👋
              </CardDescription>
            </div>
            <CardTitle className="text-lg font-semibold">
              On cuisine quoi aujourd&apos;hui?
            </CardTitle>
          </div>
          <CardFooter className="flex gap-2 p-4 pt-2">
            <Button className="text-sm">
              Ajouter une recette
            </Button>
            <Button variant="outline" className="text-sm">
              Gérer mes recettes
            </Button>
          </CardFooter>
        </Card>
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
              <RecipeCard
                imageSrc="https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/tartes-pommes.jpg"
                imageAlt="Dessert"
                prepTime="20min"
                avatarSrc="https://github.com/shadcn.png"
                avatarAlt="CN"
                title="Délicieux Dessert"
                username="Utilisateur4"
                views="750K"
                postedAgo="5 heures"
              />
              <RecipeCard
                imageSrc="https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/couscous.webp"
                imageAlt="Recette"
                prepTime="15min"
                avatarSrc="https://github.com/shadcn.png"
                avatarAlt="CN"
                title="Recette Rapide"
                username="Utilisateur3"
                views="1M"
                postedAgo="1 jour"
              />
            </div>
          </TabsContent>
          <TabsContent value="pour-vous">
            <div className="grid grid-cols-1 gap-8 p-2">
              <RecipeCard
                imageSrc="https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/couscous.webp"
                imageAlt="Recette"
                prepTime="15min"
                avatarSrc="https://github.com/shadcn.png"
                avatarAlt="CN"
                title="Recette Rapide"
                username="Utilisateur3"
                views="1M"
                postedAgo="1 jour"
              />
              <RecipeCard
                imageSrc="https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/tartes-pommes.jpg"
                imageAlt="Dessert"
                prepTime="20min"
                avatarSrc="https://github.com/shadcn.png"
                avatarAlt="CN"
                title="Délicieux Dessert"
                username="Utilisateur4"
                views="750K"
                postedAgo="5 heures"
              />
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

