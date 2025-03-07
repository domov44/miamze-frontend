'use client'

import { Calendar, ChevronUp, Home, Inbox, Plus, Search, Settings } from "lucide-react";
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
  { title: "Inbox", url: "/se-connecter", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <CommandMenu />
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
            <SidebarGroupLabel>Recettes</SidebarGroupLabel>
            <SidebarGroupAction title="Add Recipe">
              <Plus /> <span className="sr-only">Add Recipe</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/ajouter-recette">
                      <span>Ajouter une recette</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/mes-recettes">
                      <span>Mes recettes</span>
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
