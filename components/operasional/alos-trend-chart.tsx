"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ALOSTrendChartProps {
  data: {
    period: string
    value: number
  }[]
}

const chartConfig = {
    alos: {
      label: "ALOS",
      color: "var(--color-alos)", 
    },
}

export function ALOSTrendChart({ data }: ALOSTrendChartProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">年間ALOS推移</CardTitle>
        <Select defaultValue="semua-unit">
            <SelectTrigger className="w-[110px] h-8 text-xs">
                <SelectValue />
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
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
                dataKey="period" 
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
            <Line 
                type="monotone"
                dataKey="value" 
                stroke="var(--primary)" 
                strokeWidth={2}
                dot={{ fill: "var(--primary)"}}
                activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
