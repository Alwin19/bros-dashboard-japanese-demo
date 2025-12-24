import { getCurrentUser } from "@/app/lib/auth"
import { DashboardHeader } from "./dashboard-header"

export async function DashboardHeaderWrapper() {
  const user = await getCurrentUser()

  if (!user) return null;

  return <DashboardHeader user={user} />
}
