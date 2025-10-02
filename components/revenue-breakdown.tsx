"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const revenueData = [
  { category: "Rawat Inap", tertinggi: 45, terendah: 35 },
  { category: "Rawat Jalan", tertinggi: 30, terendah: 25 },
  { category: "IGD", tertinggi: 20, terendah: 15 },
  { category: "Poli Umum", tertinggi: 15, terendah: 10 },
  { category: "Poli Anak", tertinggi: 12, terendah: 8 },
]

const trendData = [
  { date: "5 Sep", value: 25 },
  { date: "10 Sep", value: 30 },
  { date: "15 Sep", value: 35 },
  { date: "20 Sep", value: 32 },
  { date: "25 Sep", value: 38 },
  { date: "30 Sep", value: 35 },
]

export function RevenueBreakdown() {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Breakdown Pendapatan JKN</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6 h-full">
          <div className="flex-1 min-h-[200px]">
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">Pendapatan JKN Tertinggi</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} layout="horizontal">
                <XAxis type="number" domain={[0, 50]} />
                <YAxis dataKey="category" type="category" width={80} fontSize={12} />
                <Bar dataKey="tertinggi" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 min-h-[200px]">
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">Pendapatan JKN Terendah</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} layout="horizontal">
                <XAxis type="number" domain={[0, 50]} />
                <YAxis dataKey="category" type="category" width={80} fontSize={12} />
                <Bar dataKey="terendah" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-[2] min-h-[200px]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium mb-4 text-muted-foreground">Trend</h4>
              <Select defaultValue="semua-unit">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua-unit">Semua Unit</SelectItem>
                  <SelectItem value="rawat-inap">Rawat Inap</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <XAxis dataKey="date" fontSize={12} />
                <YAxis domain={[0, 40]} fontSize={12} />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
