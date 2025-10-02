import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">BR</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">BROS</h1>
              <p className="text-sm text-muted-foreground">Dashboard Rumah Sakit</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <label className="text-xs text-muted-foreground mb-1">Rumah Sakit</label>
              <Select defaultValue="rs-utama">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rs-utama">RS Utama</SelectItem>
                  <SelectItem value="rs-cabang">RS Cabang</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-muted-foreground mb-1">Periode</label>
              <Select defaultValue="bulan-ini">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bulan-ini">Bulan Ini</SelectItem>
                  <SelectItem value="bulan-lalu">Bulan Lalu</SelectItem>
                  <SelectItem value="tahun-ini">Tahun Ini</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
