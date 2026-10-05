import { BadgeCheck, Bell, ChevronsUpDown, LogOut, UserRound } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { clearAuth } from "@/redux/authSlice";

export function NavUser({ user }) {
  const { isMobile } = useSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initials = (user?.name || "U").split(" ").map((v) => v[0]).join("").slice(0, 2).toUpperCase();
  const logout = () => { dispatch(clearAuth()); navigate("/login", { replace: true }); };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="my-2 hover:!bg-transparent !text-white gap-2">
              <Avatar className="h-9 w-9 rounded"><AvatarImage src={user?.image} alt={user?.name} /><AvatarFallback>{initials}</AvatarFallback></Avatar>
              <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-[#78A2C9] font-normal">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
            <DropdownMenuLabel className="p-3">
              <div className="font-semibold">{user?.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{user?.typeOfUser}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/manage-profile")}><UserRound /> Profile</DropdownMenuItem>
            <DropdownMenuItem><Bell /> Notifications</DropdownMenuItem>
            <DropdownMenuItem><BadgeCheck /> Account</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600"><LogOut /> Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
