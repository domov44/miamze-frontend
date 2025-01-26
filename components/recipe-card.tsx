import { Card, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from './ui/button';

interface RecipeCardProps {
  imageSrc: string;
  imageAlt: string;
  prepTime: string;
  avatarSrc: string;
  avatarAlt: string;
  title: string;
  username: string;
  views: string;
  postedAgo: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  imageSrc,
  imageAlt,
  prepTime,
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
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md">
          {prepTime}
        </span>
      </div>
      <CardContent className="p-4 flex gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{avatarAlt}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <CardTitle className="text-lg font-semibold">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Par <span className="font-medium">{username}</span>
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-between items-center">
        <Button variant="outline" className="text-sm">
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
