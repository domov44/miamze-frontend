import { Card, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const RecipeCardSkeleton = () => {
  return (
    <Card className="w-full overflow-hidden shadow-lg animate-pulse">
      <div className="relative">
        <Skeleton className="w-full h-64" />
        <div className="absolute bottom-2 right-2 flex gap-2">
          <Skeleton className="w-12 h-5 rounded-md" />
          <Skeleton className="w-12 h-5 rounded-md" />
        </div>
      </div>
      <CardContent className="p-4 flex gap-4">
        <Avatar className="w-12 h-12">
          <Skeleton className="w-full h-full rounded-full" />
        </Avatar>
        <div className="flex flex-col justify-center w-full">
          <CardTitle>
            <Skeleton className="w-3/4 h-5" />
          </CardTitle>
          <CardDescription className="mt-2">
            <Skeleton className="w-1/2 h-4" />
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-between items-center">
        <Skeleton className="w-32 h-8 rounded-md" />
        <Skeleton className="w-20 h-4 rounded-md" />
      </CardFooter>
    </Card>
  );
};

export default RecipeCardSkeleton;