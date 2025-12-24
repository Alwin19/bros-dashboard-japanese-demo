"use client"

import { DollarSign, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

const sidebarItems = [
  {
    title: "Keuangan",
    icon: DollarSign,
    active: true,
  },
  {
    title: "Operational",
    icon: Users,
    active: false,
  },
]

export function DashboardSidebar() {
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className="h-20">
        <div className="flex items-center space-x-2 px-2 h-full">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">BR</span>
          </div>
          <div>
            <h1 className="text-xs font-semibold">BROS</h1>
            <p className="text-md font-semibold">Dashboard Eksekutif</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={item.active}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
