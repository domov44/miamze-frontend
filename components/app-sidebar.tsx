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
import React from "react";
import { useRecipe } from "@/app/contexts/recipeContext";

const items = [
  { title: "Découvrir", url: "/", icon: Home },
  { title: "Paramètres", url: "#", icon: Settings },
];

export function AppSidebar() {
  const { isAuthenticated, user } = useAuth();
  const { recipes, loading } = useRecipe();

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
            <SidebarGroupLabel>Vos recettes</SidebarGroupLabel>
            <SidebarGroupAction title="Ajouter une recette">
              <Link href={"/ajouter-une-recette"}>
                <Plus /> <span className="sr-only">Ajouter une recette</span>
              </Link>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {recipes.length > 0 ? (
                  recipes.map((recipe) => (
                    <SidebarMenuItem key={recipe.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/${user.username}/${recipe.slug}`} className="flex items-center gap-2">
                          <img src={recipe.image} alt={recipe.label} width={24} height={24} className="w-5 h-5 rounded-md object-cover" />
                          <span>{recipe.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                ) : loading ? (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <div className="flex items-center gap-1">
                          <Skeleton className="h-5 w-5 rounded-md" />
                          <Skeleton className="h-2 w-20" />
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <div className="flex items-center gap-1">
                          <Skeleton className="h-5 w-5 rounded-md" />
                          <Skeleton className="h-2 w-20" />
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <div className="flex items-center gap-1">
                          <Skeleton className="h-5 w-5 rounded-md" />
                          <Skeleton className="h-2 w-20" />
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                ) : (
                  <>
                    <p className="px-3 py-2 text-sm text-gray-500">Aucune recette disponible</p>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href={"/ajouter-une-recette"} className="flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          <span>Créer ma première recette</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={"/mes-recettes"}>
                      <span>Voir toutes mes recettes</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
            <SidebarGroupLabel>
              <Skeleton className="h-2 w-16" />
            </SidebarGroupLabel>
            <SidebarGroupAction title="Ajouter une recette">
              <Skeleton className="h-5 w-5 rounded-md" />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-5 w-5 rounded-md" />
                      <Skeleton className="h-2 w-20" />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-5 w-5 rounded-md" />
                      <Skeleton className="h-2 w-20" />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-5 w-5 rounded-md" />
                      <Skeleton className="h-2 w-20" />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <Skeleton className="h-4 w-36" />
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
                    <span>Mon profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ) : isAuthenticated === false && user === null ? null : (
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