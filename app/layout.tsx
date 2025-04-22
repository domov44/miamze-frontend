import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "./styles/globals.css";
import "./fonts/fonts.css";
import { AuthProvider } from "./contexts/authContext";
import { Toaster } from "@/components/ui/sonner";
import ConfirmGlobal from "../hooks/confirm/ConfirmGlobal";
import { RecipeProvider } from "./contexts/recipeContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RecipeProvider>
        <html lang="fr">
          <body>
            <ConfirmGlobal />
            <SidebarProvider>
              <AppSidebar />
              <SidebarTrigger className="sticky top-0 left-0" />
              <main className="w-full flex justify-center">
                <Toaster />
                {children}
              </main>
            </SidebarProvider>
          </body>
        </html>
      </RecipeProvider>
    </AuthProvider>
  )
}
