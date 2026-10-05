// src/components/sidebar/navMain.jsx
import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items = [] }) {
  return (
    <SidebarGroup>
      <SidebarMenu className="mt-0 gap-0">
        {items.map((item) => {
          const hasValidUrl = !!item?.url && item.url !== "#";
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={!!item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                {/* SidebarMenuButton will render AS the NavLink when asChild is used */}
                <SidebarMenuButton
                  asChild
                  className="text-base font-semibold h-auto py-2 px-3"
                  tooltip={item.title}
                >
                  <NavLink
                    to={hasValidUrl ? item.url : "#"}
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-[12px] w-full ${
                        isActive
                          ? "bg-[#305679] text-white"
                          : "hover:bg-[#305679] hover:text-white"
                      } py-2 px-2 rounded-md transition-colors`
                    }
                    onClick={(e) => {
                      if (!hasValidUrl) {
                        // prevent navigation for placeholders
                        e.preventDefault();
                        // Optional: show a toast or console message
                        // console.info(`${item.title} route not defined yet`);
                      }
                    }}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-[20px] h-[20px] object-contain"
                      />
                    )}
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>

                {/* --- Optional: subitems / collapsible children (keep your commented block or enable) --- */}
                {/* {item.items?.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub className="px-0 border-0 mx-0">
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem className="w-full " key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <NavLink
                              to={subItem.url || "#"}
                              className={({ isActive }) =>
                                `block pl-10 py-2 rounded-md ${
                                  isActive
                                    ? "bg-[#305679] text-white"
                                    : "hover:bg-[#305679] hover:text-white"
                                }`
                              }
                              onClick={(e) => {
                                if (!subItem.url || subItem.url === "#") {
                                  e.preventDefault();
                                }
                              }}
                            >
                              {subItem.title}
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )} */}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
