import { cn } from "@/lib/utils"
import { DollarSign, Users } from "lucide-react"

const sidebarItems = [
  {
    title: "Keuangan",
    icon: DollarSign,
    active: true,
  },
  {
    title: "Operational",
    icon: Users,
    active: false,
  },
]

export function DashboardSidebar() {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">BR</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">BROS</h1>
            <p className="text-sm text-sidebar-foreground/70">Dashboard Rumah Sakit</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.title}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors",
                item.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
