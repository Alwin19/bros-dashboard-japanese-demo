"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import KPICards from "@/components/kpi-cards"
import { RevenueBreakdown } from "@/components/revenue-breakdown"
import { RevenueDistribution } from "@/components/revenue-distribution"
import { DifferenceBreakdown } from "@/components/difference-breakdown"
import { RevenueReceipts } from "@/components/revenue-receipts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex flex-col">
                  <label className="text-xs text-muted-foreground mb-1">Rumah Sakit</label>
                  <Select defaultValue="rs-utama">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rs-utama">RS Utama</SelectItem>
                      <SelectItem value="rs-cabang">RS Cabang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs text-muted-foreground mb-1">Periode</label>
                  <Select defaultValue="bulan-ini">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bulan-ini">Bulan Ini</SelectItem>
                      <SelectItem value="bulan-lalu">Bulan Lalu</SelectItem>
                      <SelectItem value="tahun-ini">Tahun Ini</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="max-w-5xl">
            <KPICards />
          </div>
          <div className="flex gap-6">
            <div className="flex-[3]">
              <RevenueBreakdown />
            </div>
            <div className="flex-[1]">
              <RevenueDistribution />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-[3]">
              <DifferenceBreakdown />
            </div>
            <div className="flex-[1]">
              <RevenueReceipts />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
