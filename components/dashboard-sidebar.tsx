"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
    url: "/dashboard/keuangan",
    icon: DollarSign,
  },
  {
    title: "Operasional", // Fixed spelling to match folder name if intended
    url: "/dashboard/operasional",
    icon: Users,
  },
]

export function DashboardSidebar() {
  // 2. Get current path to determine active state
  const pathname = usePathname()

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
              {sidebarItems.map((item) => {
                // 3. Check if current path matches item url
                const isActive = pathname.startsWith(item.url)
                
                return (
                  <SidebarMenuItem key={item.title}>
                    {/* 4. Use asChild + Link for navigation */}
                    <SidebarMenuButton isActive={isActive} asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
