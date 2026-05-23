"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LabelList, PieChart, Pie } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ListFilter } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

interface DistributionItem {
  name: string
  value: number
  rawValue: number
  formattedValue: string
  fill: string
}

interface RevenueDistributionProps {
  data?: {
    distribution: DistributionItem[]
    chartConfig: any
  }
}

export function RevenueDistribution({ data }: RevenueDistributionProps) {
  const { state } = useSidebar()
  const isSidebarOpen = state === "expanded"
  const pieData = data?.distribution || []
  const chartConfig = data?.chartConfig || {}

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <CardTitle className="text-base sm:text-lg font-semibold">健保収益分布</CardTitle>
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
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center">
        {pieData.length > 0 ? (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[250px] sm:max-w-[300px]">
            <PieChart>
              <ChartTooltip 
                content={
                  <ChartTooltipContent 
                    hideLabel 
                    formatter={(value, name, props) => (
                      <>
                        <div className="font-medium">{props.payload.name}</div>
                        <div className="text-muted-foreground">
                          {props.payload.formattedValue} ({value}%)
                        </div>
                      </>
                    )}
                  />
                } 
              />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius="90%"
              >
                <LabelList
                  dataKey="value"
                  className="fill-background"
                  fill="white"
                  stroke="none"
                  fontSize={14}
                  formatter={(value: number) => `${value}%`}
                />
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        ) : (
              <div className="flex items-center justify-center w-full h-[200px] bg-muted/20 rounded-md">
                <p className="text-sm text-muted-foreground">データなし</p>
              </div>
        )}
      </CardContent>
    </Card>
  )
}