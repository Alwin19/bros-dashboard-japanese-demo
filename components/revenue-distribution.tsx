"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LabelList, PieChart, Pie } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  const pieData = data?.distribution || []
  const chartConfig = data?.chartConfig || {}

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <CardTitle className="text-base sm:text-lg font-semibold">Distribusi Pendapatan JKN</CardTitle>
        <Select defaultValue="semua-unit">
          <SelectTrigger className="w-full sm:w-32 text-xs sm:text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua-unit">Semua Unit</SelectItem>
            <SelectItem value="rawat-inap">Rawat Inap</SelectItem>
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
              <div className="w-full h-[180px] md:h-[220px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-sm text-muted-foreground">Tidak ada data</p>
              </div>
        )}
      </CardContent>
    </Card>
  )
}