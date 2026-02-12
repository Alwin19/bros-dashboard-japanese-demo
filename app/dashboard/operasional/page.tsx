import { redirect } from "next/navigation"
import { getOperationalData } from "@/lib/api/operasional/getOperationalData"
import { OperationalKPICard } from "@/components/operasional/operational-kpi-cards"
import { ALOSTrendChart } from "@/components/operasional/alos-trend-chart"
import { VisitTrendChart } from "@/components/operasional/visit-trend-chart"
import { PayerDistributionChart } from "@/components/operasional/payer-distribution-chart"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { id } from "date-fns/locale"

interface PageProps {
  searchParams: Promise<{
    preset?: string
    startDate?: string
    endDate?: string
    hospitalId?: string
  }>
}

export default async function OperasionalPage({ searchParams }: PageProps) {
  const params = await searchParams

  // Redirect to default filter if no preset is set
  if (!params.preset) {
    redirect(
      `/dashboard/operasional?preset=custom&startDate=2025-01-01&endDate=2025-01-31`
    )
  }

  /* Default values (January 2025) */
  const startDate = params.startDate || "2025-01-01"
  const endDate = params.endDate || "2025-01-31"
  const hospitalId = params.hospitalId || "1"

  // Fetch data
  const data = await getOperationalData(hospitalId, startDate, endDate, params.preset)

  const formattedStartDate = format(new Date(startDate), "dd MMM yyyy", { locale: id })
  const formattedEndDate = format(new Date(endDate), "dd MMM yyyy", { locale: id })

  return (
    <div className="space-y-8">
      
      {/* Top Section: Realtime Data */}
      <div className="space-y-4">
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Column 1: Stacked KPIs */}
            <div className="flex flex-col gap-6">
                <div className="flex-1">
                    <OperationalKPICard data={data.kpi[1]} withFilter={true} />
                </div>
                <div className="flex-1">
                    <OperationalKPICard data={data.kpi[2]} withFilter={true} />
                </div>
            </div>

            {/* Column 2 & 3: Visit Trend Chart */}
            <div className="xl:col-span-2 min-h-[300px]">
                <VisitTrendChart data={data.visitTrend} />
            </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Section: Period Data */}
      <div className="space-y-4">
        <h2 className="text-sm text-muted-foreground">
          Berdasarkan periode: {formattedStartDate} - {formattedEndDate}
        </h2>

        {/* ALOS KPI Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
             <div className="xl:col-span-1">
                 <OperationalKPICard data={data.kpi[0]} withFilter={false} />
             </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ALOSTrendChart data={data.alosTrend} />
            <PayerDistributionChart data={data.payerDistribution} />
        </div>
      </div>
    </div>
  )
}