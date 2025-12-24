"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DateFilter } from "./date-filter"
import { UserCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu" // Adjust import path if needed
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { logout } from "@/app/actions/auth"


type User = {
  id: string
  name: string | null
  email: string
  role: string
}


type DashboardHeaderProps = {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {

  const getUserInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    return email.slice(0, 2).toUpperCase()
  }

  const handleLogout = async () => {
    try {
      await logout()
      // Redirect is handled by the logout Server Action
    } catch (error) {
      console.error('Logout failed:', error)
      // Optionally show error toast/message to user
    }
  }



  return (
    <header className="bg-background border-b border-border px-3 md:px-6 py-3 md:py-4 sticky top-0 z-10">
      <div className="flex items-center gap-2 md:gap-4">

        <SidebarTrigger />

        <div className="flex items-center gap-2 flex-1">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="flex flex-col">
              <label className="text-[10px] md:text-xs text-muted-foreground mb-0.5 md:mb-1">Rumah Sakit</label>
              <Select defaultValue="rs-utama">
                <SelectTrigger className="w-30 md:w-40 h-8 md:h-10 text-xs md:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rs-utama">RS Utama</SelectItem>
                  <SelectItem value="rs-cabang">RSIA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] md:text-xs text-muted-foreground mb-0.5 md:mb-1">Periode</label>
              <DateFilter />
            </div>
          </div>
        </div>

        {/* Profile/Account Circle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="ml-auto rounded-full hover:bg-muted p-1.5 transition-colors"
              aria-label="Account"
            >
              <UserCircle className="w-8 h-8 text-primary" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-56 rounded-lg">
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="rounded-lg">
                    {getUserInitials(user.name, user.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.name || user.email.split('@')[0]}
                    </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}