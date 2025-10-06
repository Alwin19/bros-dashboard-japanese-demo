import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface KPICardData {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  subtitle: string
}

interface KPICardsProps {
  data: KPICardData[]
}


export function KPICards({ data }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl">
      {data.map((kpi, index) => (
        <Card key={index}>
          <CardContent className="p-4 sm:p-6">

            <div className="flex items-center justify-between">

              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-lg sm:text-xl md:text-base lg:text-xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
              </div>

              <div className="flex flex-col items-end space-y-1">
                <div className="flex items-center space-x-1">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {kpi.change}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}