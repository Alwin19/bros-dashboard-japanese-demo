import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const paymentMethods = [
  { method: "Cash", amount: "Rp 8.000.000.000" },
  { method: "Credit Card", amount: "Rp 6.200.000" },
  { method: "Debit Card", amount: "Rp 3.285.000" },
  { method: "Bank Transfer", amount: "Rp 2.785.000" },
  { method: "Piutang", amount: "Rp 1.345.000" },
  { method: "Deposit OJT", amount: "Rp 1.285.000" },
]

export function RevenueReceipts() {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Penerimaan JKN</CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <div className="overflow-auto max-h-[300px]">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left px-3 py-2 text-sm font-medium rounded-l">Metode</th>
                <th className="text-right px-3 py-2 text-sm font-medium rounded-r">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {paymentMethods.map((method, index) => (
                <tr key={index} className="hover:bg-muted border-b border-border/50">
                  <td className="px-3 py-2 text-sm text-foreground">{method.method}</td>
                  <td className="px-3 py-2 text-sm font-medium text-foreground text-right">{method.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
