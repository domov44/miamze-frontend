import { Card, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from './ui/button';
import { ChefHat, CookingPot } from "lucide-react";

interface RecipeCardProps {
  imageSrc: string;
  imageAlt: string;
  slug: string;
  prepTime: string;
  cookTime: string;
  avatarSrc: string;
  avatarAlt: string;
  title: string;
  username: string;
  views: string;
  postedAgo: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  imageSrc,
  slug,
  imageAlt,
  prepTime,
  cookTime,
  avatarSrc,
  avatarAlt,
  title,
  username,
  views,
  postedAgo
}) => {
  return (
    <Card className="w-full overflow-hidden shadow-lg">
      <div className="relative">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-2 right-2 flex gap-2">
          <div className="flex items-center gap-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md">
            <ChefHat className="w-4 h-4" /> {prepTime}
          </div>
          <div className="flex items-center gap-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md">
            <CookingPot className="w-4 h-4" /> {cookTime}
          </div>
        </div>
      </div>
      <CardContent className="p-4 flex gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{avatarAlt}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold">
            {title}
          </h3>
          <CardDescription className="text-sm text-gray-500">
            Par <span className="font-medium">{username}</span>
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-between items-center">
        <Button variant="outline" className="text-sm" href={`/${username}/${slug}`}>
          Suivre la recette
        </Button>
        <span className="text-sm text-gray-500">
          {views} vues • il y a {postedAgo}
        </span>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
