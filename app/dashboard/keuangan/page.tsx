import { FinancialKPICards } from "@/components/keuangan/financial-kpi-cards"
import { RevenueBreakdown } from "@/components/keuangan/revenue-breakdown"
import { RevenueDistribution } from "@/components/keuangan/revenue-distribution"
import { DifferenceBreakdown } from "@/components/keuangan/difference-breakdown"
import { RevenueReceipts } from "@/components/keuangan/revenue-receipts"
import { getDashboardData } from "@/lib/api/dataFetcher"
import { redirect } from "next/navigation"
import { format } from "date-fns"
import { id } from "date-fns/locale"


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

  const data = await getDashboardData(hospitalId, startDate, endDate, params.preset)
  const formattedStartDate = format(new Date(startDate), "dd MMM yyyy", { locale: id })
  const formattedEndDate = format(new Date(endDate), "dd MMM yyyy", { locale: id })

  return (
    <>
      <h2 className="text-sm text-muted-foreground">
          Berdasarkan periode: {formattedStartDate} - {formattedEndDate}
      </h2>

      <FinancialKPICards data={data.kpi} />

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
