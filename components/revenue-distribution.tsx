"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const pieData = [
  { name: "Rawat Inap", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Rawat Jalan", value: 30, color: "hsl(var(--chart-2))" },
  { name: "IGD", value: 25, color: "hsl(var(--chart-3))" },
]

export function RevenueDistribution() {
  return (
    <Card className="h-[400px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Distribusi Pendapatan JKN</CardTitle>
        <Select defaultValue="semua-unit">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua-unit">Semua Unit</SelectItem>
            <SelectItem value="rawat-inap">Rawat Inap</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-full">
        <div className="w-full h-full flex items-center justify-center">
          <div className="aspect-square w-full max-w-[250px] max-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius="90%" dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
