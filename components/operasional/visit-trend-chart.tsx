"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

interface VisitTrendChartProps {
  data: {
    day: string
    rawatJalan: number
    rawatInap: number
  }[]
}

const chartConfig = {
    rawatJalan: {
      label: "Rawat Jalan",
      color: "var(--chart-1)",
    },
    rawatInap: {
      label: "Rawat Inap",
      color: "var(--chart-2)",
    },
}

export function VisitTrendChart({ data }: VisitTrendChartProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Tren Kunjungan Rawat Jalan & Inap (7 Hari Terakhir)</CardTitle>
        <Select defaultValue="semua-unit">
            <SelectTrigger className="w-[110px] h-8 text-xs">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                 <SelectItem value="semua-unit">Semua Unit</SelectItem>
            </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={5}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: "#666" }}
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: "#666" }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
             <ChartLegend content={<ChartLegendContent />} />
            <Bar 
                dataKey="rawatJalan" 
                fill="var(--chart-1)" 
                radius={[4, 4, 0, 0]}
                barSize={20}
            />
            <Bar 
                dataKey="rawatInap" 
                fill="var(--chart-2)" 
                radius={[4, 4, 0, 0]}
                barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
