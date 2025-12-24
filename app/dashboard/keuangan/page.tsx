import { DashboardHeader } from "@/components/dashboard-header"
import { KPICards } from "@/components/kpi-cards"
import { RevenueBreakdown } from "@/components/revenue-breakdown"
import { RevenueDistribution } from "@/components/revenue-distribution"
import { DifferenceBreakdown } from "@/components/difference-breakdown"
import { RevenueReceipts } from "@/components/revenue-receipts"
import { getDashboardData } from "@/lib/api/dataFetcher"
import { format, startOfMonth } from "date-fns"

interface PageProps {
  searchParams: Promise<{
    startDate?: string
    endDate?: string
    hospitalId?: string
  }>
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams

  const today = new Date()
  const startDate =
    params.startDate || format(startOfMonth(today), "yyyy-MM-dd")
  const endDate =
    params.endDate || format(today, "yyyy-MM-dd")
  const hospitalId = params.hospitalId || "1"

  const data = await getDashboardData(hospitalId, startDate, endDate)

  return (
    <>
      <KPICards data={data.kpi} />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <RevenueBreakdown data={data.revenueBreakdown} />
        </div>
        <RevenueDistribution data={data.revenueDistribution} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <DifferenceBreakdown data={data.differenceBreakdown} />
        </div>
        <RevenueReceipts data={data.receipts} />
      </div>
    </>
  )
}
