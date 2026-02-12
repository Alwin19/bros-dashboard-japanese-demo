"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Cell, LabelList } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface PayerDistributionChartProps {
  data: {
    distribution: {
      name: string
      value: number
      rawValue: number
      formattedValue: string
      fill: string
    }[]
    chartConfig: any
  }
}

export function PayerDistributionChart({ data }: PayerDistributionChartProps) {
  const pieData = data?.distribution || []
  const chartConfig = data?.chartConfig || {}

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Jenis Penanggung Biaya Pasien</CardTitle>
      </CardHeader>
      <CardContent>
         {pieData.length > 0 ? (
          <ChartContainer config={chartConfig} className="w-full min-h-[300px]">
            <BarChart
              layout="vertical"
              data={pieData}
              margin={{
                top: 0,
                right: 50,
                bottom: 0,
                left: 0, 
              }}
              barSize={32}
            >
                <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={140}
                    className="text-xs font-small" 
                />
                <XAxis type="number" hide />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Bar
                    dataKey="rawValue"
                    layout="vertical"
                    radius={4}
                >
                    <LabelList
                        dataKey="formattedValue"
                        position="right"
                        className="fill-foreground font-small text-xs"
                    />
                    {pieData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Bar>
            </BarChart>
          </ChartContainer>
         ) : (
            <div className="flex items-center justify-center w-full h-[200px] bg-muted/20 rounded-md">
                <p className="text-sm text-muted-foreground">Tidak ada data</p>
            </div>
         )}
      </CardContent>
    </Card>
  )
}
