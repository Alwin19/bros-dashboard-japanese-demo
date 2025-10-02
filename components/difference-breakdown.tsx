"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const differenceData = [
  { category: "Rawat Inap", tertinggi: 40, terendah: 35 },
  { category: "Rawat Jalan", tertinggi: 25, terendah: 20 },
  { category: "IGD", tertinggi: 18, terendah: 15 },
  { category: "Poli Umum", tertinggi: 12, terendah: 10 },
  { category: "Poli Anak", tertinggi: 10, terendah: 8 },
]

const differenceTrendData = [
  { date: "5 Sep", value: 28 },
  { date: "10 Sep", value: -15 },
  { date: "15 Sep", value: 32 },
  { date: "20 Sep", value: 25 },
  { date: "25 Sep", value: 35 },
  { date: "30 Sep", value: 30 },
]

export function DifferenceBreakdown() {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Breakdown Selisih JKN</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6 h-full">
          <div className="flex-1 min-h-[200px]">
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">Selisih JKN Tertinggi</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={differenceData} layout="horizontal">
                <XAxis type="number" domain={[0, 45]} />
                <YAxis dataKey="category" type="category" width={80} fontSize={12} />
                <Bar dataKey="tertinggi" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 min-h-[200px]">
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">Selisih JKN Terendah</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={differenceData} layout="horizontal">
                <XAxis type="number" domain={[0, 45]} />
                <YAxis dataKey="category" type="category" width={80} fontSize={12} />
                <Bar dataKey="terendah" fill="hsl(var(--chart-4))" radius={[0, 4, 4, 0]} />
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
              <BarChart data={differenceTrendData}>
                <XAxis dataKey="date" fontSize={12} />
                <YAxis domain={[-20, 40]} fontSize={12} />
                <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
