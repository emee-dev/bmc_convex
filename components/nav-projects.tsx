"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

type NavProjectsProps = {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
  userId: string | null;
};

export function NavProjects({ projects, userId = null }: NavProjectsProps) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          // If the item requires a userId and it's missing, skip rendering
          if (item.url.includes("/editor") && !userId) return null;

          const href = item.url.includes("/editor")
            ? item.url.replace(":id", userId!)
            : item.url;

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a href={href}>
                  <item.icon />
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
