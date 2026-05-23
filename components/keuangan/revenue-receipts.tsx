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
        <CardTitle className="text-base sm:text-lg font-semibold">健保受取</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center overflow-hidden">
        {receipts.length > 0 ? (
          <div className="w-full max-w-[360px] overflow-auto max-h-[280px] sm:max-h-[300px] text-xs sm:text-sm">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground font-semibold text-sm sm:text-base lg:text-[11px]">
                    方法
                  </TableHead>
                  <TableHead className="text-primary-foreground font-semibold text-right text-sm sm:text-base lg:text-[11px]">
                    金額
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
            <div className="flex items-center justify-center w-full h-[200px] bg-muted/20 rounded-md">
              <p className="text-sm text-muted-foreground">データなし</p>
            </div>
        )}
      </CardContent>
    </Card>
  )
}