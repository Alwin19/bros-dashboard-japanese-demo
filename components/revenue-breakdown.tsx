"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ChartDataItem {
  category?: string
  date?: string
  fullDate?: string
  value: number
  formattedValue: string
}

interface RevenueBreakdownProps {
  data?: {
    tertinggi?: ChartDataItem[]
    terendah?: ChartDataItem[]
    trend?: ChartDataItem[]
  }
}

const chartConfig = {
  pendapatan: {
    label: "Pendapatan",
    color: "var(--chart-1)",
  },
  value: {
    label: "Pendapatan",
    color: "var(--chart-1)",
  },
}

// Fallback formatter (always available in client)
const toIDRScale = (value: number) => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)} M`; // Miliar
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)} Jt`; // Juta
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)} Rb`; // Ribu
  }
  return value.toString();
};

export function RevenueBreakdown({ data }: RevenueBreakdownProps) {
  
  const tertinggiData = data?.tertinggi || []
  const terendahData = data?.terendah || []
  const trendData = data?.trend || []

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base md:text-lg font-semibold">Breakdown Pendapatan JKN</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

          {/* Tertinggi Chart */}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs md:text-sm font-medium mb-3 md:mb-4 text-muted-foreground">
              Pendapatan JKN Tertinggi
            </h4>
            {tertinggiData.length > 0 ? (
              <ChartContainer config={chartConfig} className="w-full h-[180px] md:h-[220px] max-w-[400px] justify-self-center">
                <BarChart
                  data={tertinggiData} 
                  layout="vertical" 
                  margin={{ top: 0, right: 10, left: -15, bottom: -15 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    tickFormatter={toIDRScale}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    dataKey="category" 
                    type="category" 
                    width={100}
                    tick={{ fontSize: 11 }}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent 
                      formatter={(value, name, props) => props.payload.formattedValue}
                    />} 
                  />
                  <Bar 
                    dataKey="value" 
                    fill="var(--color-pendapatan)" 
                    radius={[0, 4, 4, 0]} 
                    barSize={25}
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="w-full h-[180px] md:h-[220px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-sm text-muted-foreground">Tidak ada data</p>
              </div>
            )}
          </div>

          {/* Terendah Chart */}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs md:text-sm font-medium mb-3 md:mb-4 text-muted-foreground">
              Pendapatan JKN Terendah
            </h4>
            {terendahData.length > 0 ? (
              <ChartContainer config={chartConfig} className="w-full h-[180px] md:h-[220px] max-w-[400px] justify-self-center">
                <BarChart 
                  data={terendahData} 
                  layout="vertical" 
                  margin={{ top: 0, right: 10, left: -15, bottom: -15 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    tickFormatter={toIDRScale}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    dataKey="category" 
                    type="category" 
                    width={100}
                    tick={{ fontSize: 11 }}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent 
                      formatter={(value, name, props) => props.payload.formattedValue}
                    />} 
                  />
                  <Bar 
                    dataKey="value" 
                    fill="var(--color-pendapatan)" 
                    radius={[0, 4, 4, 0]}
                    barSize={25}
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="w-full h-[180px] md:h-[220px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-sm text-muted-foreground">Tidak ada data</p>
              </div>
            )}
          </div>

          {/* Trend Chart */}
          <div className="flex-1 min-w-0 lg:flex-[2]">
            <div className="flex items- justify-between mb-3 md:mb-4">
              <h4 className="text-xs md:text-sm font-medium text-muted-foreground">Trend</h4>
              <Select defaultValue="semua-unit">
                <SelectTrigger className="w-28 md:w-32 h-8 md:h-10 text-xs md:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua-unit">Semua Unit</SelectItem>
                  <SelectItem value="rawat-inap">Rawat Inap</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {trendData.length > 0 ? (
              <ChartContainer config={chartConfig} className="w-full h-[180px] md:h-[220px]">
                <BarChart 
                  data={trendData}
                  margin={{ top: 0, right: 10, left:-10, bottom: -30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 8 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    tickFormatter={toIDRScale}
                    tick={{ fontSize: 10 }}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent 
                      formatter={(value, name, props) => props.payload.formattedValue}
                      labelFormatter={(label, payload) => {
                        if (payload && payload.length > 0) {
                          return payload[0].payload.fullDate
                        }
                        return label
                      }}
                    />} 
                  />
                  <Bar 
                    dataKey="value" 
                    fill="var(--color-value)" 
                    radius={[2, 2, 0, 0]} 
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="w-full h-[180px] md:h-[220px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-sm text-muted-foreground">Tidak ada data</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}