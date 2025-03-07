'use client'

import { ChevronUp, Home, Plus, Settings } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CommandMenu } from "./command-menu";
import { useAuth } from "@/app/contexts/authContext";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";

const items = [
  { title: "Découvrir", url: "/", icon: Home },
  { title: "Paramètres", url: "#", icon: Settings },
];

const recipes = [
  {
    id: 1,
    name: "Pâtes Carbonara",
    image: "https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/tartes-pommes.jpg",
  },
  {
    id: 2,
    name: "Salade César",
    image: "https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/couscous.webp",
  },
  {
    id: 3,
    name: "Tarte aux pommes",
    image: "https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/tartes-pommes.jpg",
  },
]

export function AppSidebar() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <CommandMenu />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAuthenticated && user ? (
          <SidebarGroup>
            <SidebarGroupLabel>Vos ecettes</SidebarGroupLabel>
            <SidebarGroupAction title="Ajouter une recette">
              <Plus /> <span className="sr-only">Ajouter une recette</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {recipes.map((recipe) => (
                  <SidebarMenuItem key={recipe.id}>
                    <SidebarMenuButton asChild>
                      <Link href={`/recette/${recipe.id}`} className="flex items-center gap-2">
                        <img src={recipe.image} alt={recipe.name} width={24} height={24} className="w-5 h-5 rounded-md object-cover"></img>
                        <span>{recipe.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : isAuthenticated === false && user === null ? (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-500">Vous n&apos;êtes pas connecté</p>
                    <p className="text-lg font-semibold">Rejoignez-nous pour partager vos recettes !</p>
                    <Button className="text-sm" href="/se-connecter">
                      Se connecter
                    </Button>
                    <Button variant="outline" className="text-sm" href="/inscription">
                      Créer un compte gratuitement
                    </Button>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <SidebarGroup>
            <SidebarGroupLabel>Recettes</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Skeleton className="w-full h-8 rounded-md" />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Skeleton className="w-full h-8 rounded-md" />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Skeleton className="w-full h-8 rounded-md" />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {isAuthenticated && user ? (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={"https://github.com/shadcn.png"} />
                      <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>
                    {user.username}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ) : isAuthenticated === false && user === null ? (
            null
          ) : (
            <SidebarMenuItem>
              <div className="flex items-center gap-1">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="h-2 w-20" />
                <Skeleton className="ml-auto w-4 h-4" />
              </div>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
