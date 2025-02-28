import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "./globals.css";
import { AuthProvider } from "./contexts/authContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="fr">
        <body>
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="sticky top-0 left-0" />
            <main className="w-full flex justify-center">
              {children}
            </main>
          </SidebarProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
