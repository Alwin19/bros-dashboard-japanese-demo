import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ReceiptItem {
  method: string
  amount: number
  formattedAmount: string
}

interface RevenueReceiptsProps {
  data?: ReceiptItem[]
}

export function RevenueReceipts({ data }: RevenueReceiptsProps) {
  const receipts = data || []

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-semibold">Penerimaan JKN</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        {receipts.length > 0 ? (
          <div className="overflow-auto max-h-[280px] sm:max-h-[300px] text-xs sm:text-sm">
            <Table className="w-full min-w-[150px]">
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground font-semibold text-sm sm:text-base lg:text-[11px]">
                    Metode
                  </TableHead>
                  <TableHead className="text-primary-foreground font-semibold text-right text-sm sm:text-base lg:text-[11px]">
                    Jumlah
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receipts.map((receipt, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-normal text-xs sm:text-sm lg:text-[11px] xl:text-medium">
                      {receipt.method}
                    </TableCell>
                    <TableCell className="font-medium text-right text-xs sm:text-sm lg:text-[11px] xl:text-medium">
                      {receipt.formattedAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
            <div className="flex items-center justify-center w-full h-full min-h-[180px] md:min-h-[220px] bg-muted/20 rounded-md">
              <p className="text-sm text-muted-foreground">Tidak ada data</p>
            </div>
        )}
      </CardContent>
    </Card>
  )
}