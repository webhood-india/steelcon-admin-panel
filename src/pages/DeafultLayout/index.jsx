import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./appSidebar";
export default function DeafultLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-white w-full container px-6">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
