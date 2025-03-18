import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, ChefHat, Flame } from 'lucide-react';

const RecipePage = () => {
  const recipe = {
    title: "Tarte aux pommes caramélisées",
    image: "https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/couscous.webp",
    prepTime: 30,
    cookTime: 45,
    totalTime: 75,
    servings: 8,
    ingredients: [
      "230g de farine",
      "125g de beurre froid",
      "1 pincée de sel",
      "3 cuillères à soupe d'eau froide",
      "6 pommes Golden",
      "100g de sucre",
      "1 sachet de sucre vanillé",
      "2 cuillères à soupe de cannelle",
      "50g de beurre"
    ],
    steps: [
      {
        name: "Préparation de la pâte",
        description: "Mélanger la farine et le sel dans un saladier. Ajouter le beurre coupé en dés et travailler du bout des doigts jusqu'à obtenir une texture sableuse. Ajouter l'eau froide et former une boule. Réserver au frais.",
        duration: 15,
        type: "preparation"
      },
      {
        name: "Préparation des pommes",
        description: "Éplucher et couper les pommes en quartiers fins. Les disposer dans un saladier et les saupoudrer de sucre et de cannelle. Mélanger délicatement.",
        duration: 15,
        type: "preparation"
      },
      {
        name: "Étaler la pâte",
        description: "Sortir la pâte du réfrigérateur et l'étaler sur un plan de travail fariné. Foncer un moule à tarte et piquer le fond avec une fourchette.",
        duration: 10,
        type: "preparation"
      },
      {
        name: "Cuisson du caramel",
        description: "Dans une casserole, faire fondre le beurre avec le sucre restant jusqu'à obtention d'un caramel doré.",
        duration: 10,
        type: "cooking"
      },
      {
        name: "Assemblage",
        description: "Disposer les pommes sur le fond de tarte et verser le caramel par-dessus.",
        duration: 5,
        type: "preparation"
      },
      {
        name: "Cuisson de la tarte",
        description: "Enfourner à 180°C pendant 35 minutes jusqu'à ce que la tarte soit dorée.",
        duration: 35,
        type: "cooking"
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.title}</h1>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-gray-500" />
            <span>Préparation: {recipe.prepTime} min</span>
          </div>
          <div className="flex items-center">
            <Flame className="mr-2 h-5 w-5 text-orange-500" />
            <span>Cuisson: {recipe.cookTime} min</span>
          </div>
          <div className="flex items-center">
            <ChefHat className="mr-2 h-5 w-5 text-blue-500" />
            <span>Total: {recipe.totalTime} min</span>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ingrédients</h2>
        <div className="flex flex-wrap gap-2">
          {recipe.ingredients.map((ingredient, index) => (
            <Badge key={index} variant="outline" className="px-3 py-2 text-sm bg-gray-50">
              {ingredient}
            </Badge>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        <div className="space-y-6">
          {recipe.steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{index + 1} {step.name}</CardTitle>
                  <Badge variant={step.type === "preparation" ? "secondary" : "destructive"}>
                    {step.type === "preparation" ? "Préparation" : "Cuisson"}
                  </Badge>
                </div>
                <CardDescription>{step.duration} minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CardFooter className="mt-8 text-sm text-gray-500 text-center">
        <p>Cette recette donne {recipe.servings} portions</p>
      </CardFooter>
    </div>
  );
};

export default RecipePage;