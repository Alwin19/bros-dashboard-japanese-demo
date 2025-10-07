import { DashboardHeader } from "@/components/dashboard-header"
import { KPICards } from "@/components/kpi-cards"
import { RevenueBreakdown } from "@/components/revenue-breakdown"
import { RevenueDistribution } from "@/components/revenue-distribution"
import { DifferenceBreakdown } from "@/components/difference-breakdown"
import { RevenueReceipts } from "@/components/revenue-receipts"
import { getDashboardData } from "@/lib/api/dataFetcher"
import { format, startOfMonth, startOfYear } from "date-fns"


interface PageProps {
  searchParams: Promise<{
    startDate?: string
    endDate?: string
    hospitalId?: string
    preset?: string
  }>
}

export default async function DashboardPage({ searchParams }: PageProps) {
  // Get dates from URL params or use defaults (current month)
  const params = await searchParams
  
  const today = new Date()
  
  const startDate = params.startDate || format(startOfMonth(today), "yyyy-MM-dd")
  const endDate = params.endDate || format(today, "yyyy-MM-dd")
  const hospitalId = params.hospitalId || "1"

  console.log("📅 Fetching data for:", { 
    preset: params.preset || "bulan-ini",
    hospitalId, 
    startDate, 
    endDate 
  })

  const data = await getDashboardData(hospitalId, startDate, endDate)

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-1 flex flex-col w-full overflow-x-hidden">
        <DashboardHeader />
        
        <main className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto">
          <KPICards data={data.kpi} />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6">
            <div className="xl:col-span-3">
              <RevenueBreakdown data={data.revenueBreakdown} />
            </div>
            <div className="xl:col-span-1">
              <RevenueDistribution data={data.revenueDistribution} />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6">
            <div className="xl:col-span-3">
              <DifferenceBreakdown data={data.differenceBreakdown} />
            </div>
            <div className="xl:col-span-1">
              <RevenueReceipts data={data.receipts} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
