"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line} from "recharts"
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
    label: "収益",
    color: "var(--chart-1)",
  },
  value: {
    label: "収益",
    color: "var(--chart-1)",
  },
}

const toJPYScale = (value: number) => {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  if (absValue >= 100000000) return `${sign}${(absValue / 100000000).toFixed(1)}億`;
  if (absValue >= 10000) return `${sign}${Math.round(absValue / 10000)}万`;
  return `${sign}${absValue.toLocaleString('ja-JP')}`;
};

export function RevenueBreakdown({ data }: RevenueBreakdownProps) {

  const tertinggiData = data?.tertinggi || []
  const terendahData = data?.terendah || []
  const trendData = data?.trend || []

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base md:text-lg font-semibold">健保収益内訳</CardTitle>
      </CardHeader>
      <CardContent className="h-full pb-0">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

          {/* Top Revenue Chart */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <h4 className="text-xs md:text-sm font-medium mb-3 md:mb-4 text-muted-foreground">
              収益上位科
            </h4>
            {tertinggiData.length > 0 ? (
              <ChartContainer config={chartConfig} className="w-full h-[280px]">
                <BarChart
                  data={tertinggiData}
                  layout="vertical"
                  margin={{ top: 0, right: 10, left: -10, bottom: 0}}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis
                    type="number"
                    tickFormatter={toJPYScale}
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
              <div className="flex items-center justify-center w-full h-[200px] bg-muted/20 rounded-md">
                <p className="text-sm text-muted-foreground">データなし</p>
              </div>
            )}
          </div>

          {/* Bottom Revenue Chart */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <h4 className="text-xs md:text-sm font-medium mb-3 md:mb-4 text-muted-foreground">
              収益下位科
            </h4>
            {terendahData.length > 0 ? (
              <ChartContainer config={chartConfig} className="w-full h-[280px]">
                <BarChart
                  data={terendahData}
                  layout="vertical"
                  margin={{ top: 0, right: 10, left: -10, bottom: 0}}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis
                    type="number"
                    tickFormatter={toJPYScale}
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
              <div className="flex items-center justify-center w-full h-[200px] bg-muted/20 rounded-md">
                <p className="text-sm text-muted-foreground">データなし</p>
              </div>
            )}
          </div>

          {/* Trend Chart */}
          <div className="flex-1 min-w-0 lg:flex-[2] flex flex-col">
            <div className="flex justify-between mb-3 md:mb-4">
              <h4 className="text-xs md:text-sm font-medium text-muted-foreground">トレンド</h4>
              <Select defaultValue="semua-unit">
                <SelectTrigger className="w-24 md:w-28 text-xs">
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
            </div>
            {trendData.length > 0 ? (
              <ChartContainer config={chartConfig} className="w-full h-[280px]">
                <LineChart
                  data={trendData}
                  margin={{ top: 0, right: 10, left: -10, bottom: 0}}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10 }}
                    tickMargin={5}
                  />
                  <YAxis
                    tickFormatter={toJPYScale}
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
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-value)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            ) : (
              <div className="flex items-center justify-center w-full h-[200px] bg-muted/20 rounded-md">
                <p className="text-sm text-muted-foreground">データなし</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
