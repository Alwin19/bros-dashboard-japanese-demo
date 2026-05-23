"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, ListFilter } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export interface OperationalKPICardData {
  title: string
  value: string
  subtitle: string
  change?: string
  isPositive?: boolean
}

interface OperationalKPICardsProps {
  data?: OperationalKPICardData[]
}

export function OperationalKPICard({ 
  data, 
  withFilter = false 
}: { 
  data: OperationalKPICardData, 
  withFilter?: boolean 
}) {
  const { state } = useSidebar()
  const isSidebarOpen = state === "expanded"
  if (!data) return null;

  return (
    <Card className="rounded-xl border bg-card text-card-foreground shadow h-full">
      <CardContent className="p-6">
         <div className="flex justify-between items-center mb-2">
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 max-w-[70%]">
              {data.title}
            </p>
            {withFilter ? (
               <Select defaultValue="semua-unit">
               <SelectTrigger className={cn(
                  "w-24 md:w-28 text-xs",
                  isSidebarOpen && "xl:w-10 xl:p-0 xl:justify-center [&>svg:last-child]:xl:hidden"
                )}>
                  <span className={cn("truncate", isSidebarOpen && "xl:hidden")}>
                    <SelectValue />
                  </span>
                  <ListFilter className={cn("hidden h-4 w-4", isSidebarOpen && "xl:block")} />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="semua-unit">全診療科</SelectItem>
                 <SelectItem value="naika">内科</SelectItem>
                 <SelectItem value="geka">外科</SelectItem>
                 <SelectItem value="seikei">整形外科</SelectItem>
                 <SelectItem value="junkan">循環器内科</SelectItem>
                 <SelectItem value="sanka">産婦人科</SelectItem>
               </SelectContent>
             </Select>
            ) : (
             
             data.change && (
              <div className="flex flex-col items-end space-y-1">
                <div className={`flex items-center space-x-1 ${data.isPositive ? "text-green-600" : "text-red-600"}`}>
                  {data.isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="text-xs font-medium">
                    {data.change}
                  </span>
                </div>
              </div>
             )
            )}
         </div>

        <div className="text-3xl font-semibold text-foreground">{data.value}</div>

      </CardContent>
    </Card>
  )
}

export function OperationalKPICards({ data }: OperationalKPICardsProps) {
  const kpiData = data || []
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <OperationalKPICard key={index} data={kpi} withFilter={index > 0} />
      ))}
    </div>
  )
}
