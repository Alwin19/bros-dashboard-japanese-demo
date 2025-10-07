"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DateFilter } from "./date-filter"

export function DashboardHeader() {
  return (
    <header className="bg-card border-b border-border px-3 md:px-6 py-3 md:py-4 sticky top-0 z-10">
      <div className="flex items-center gap-2 md:gap-4">

        <SidebarTrigger />

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="flex flex-col">
              <label className="text-[10px] md:text-xs text-muted-foreground mb-0.5 md:mb-1">Rumah Sakit</label>
              <Select defaultValue="rs-utama">
                <SelectTrigger className="w-24 md:w-32 h-8 md:h-10 text-xs md:text-sm">
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
      </div>
    </header>
  )
}
