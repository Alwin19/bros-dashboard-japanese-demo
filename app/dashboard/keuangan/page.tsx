import { KPICards } from "@/components/kpi-cards"
import { RevenueBreakdown } from "@/components/revenue-breakdown"
import { RevenueDistribution } from "@/components/revenue-distribution"
import { DifferenceBreakdown } from "@/components/difference-breakdown"
import { RevenueReceipts } from "@/components/revenue-receipts"
import { getDashboardData } from "@/lib/api/dataFetcher"
import { format, startOfMonth } from "date-fns"
import { redirect } from "next/navigation"


interface PageProps {
  searchParams: Promise<{
    preset: any
    startDate?: string
    endDate?: string
    hospitalId?: string
  }>
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams

   // Redirect to default filter if no preset is set
  if (!params.preset) {
    redirect(
      `/dashboard/keuangan?preset=custom&startDate=2025-01-01&endDate=2025-01-31`
    )
  }

  /* Default values (January 2025) */
  const startDate = params.startDate || "2025-01-01"
  const endDate = params.endDate || "2025-01-31"
  const hospitalId = params.hospitalId || "1"

  /* Default values (Bulan ini) */
  // const today = new Date()
  // const startDate =
  //   params.startDate || format(startOfMonth(today), "yyyy-MM-dd")
  // const endDate =
  //   params.endDate || format(today, "yyyy-MM-dd")
  // const hospitalId = params.hospitalId || "1"

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
