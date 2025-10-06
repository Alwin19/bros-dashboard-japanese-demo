import { DashboardHeader } from "@/components/dashboard-header"
import { KPICards } from "@/components/kpi-cards"
import { RevenueBreakdown } from "@/components/revenue-breakdown"
import { RevenueDistribution } from "@/components/revenue-distribution"
import { DifferenceBreakdown } from "@/components/difference-breakdown"
import { RevenueReceipts } from "@/components/revenue-receipts"
import { getDashboardData } from "@/lib/api/dataFetcher"

export default async function DashboardPage() {

  const data = await getDashboardData("1", "2025-01-01", "2025-01-31");

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
                <RevenueDistribution data={data.revenueDistribution}/>
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
