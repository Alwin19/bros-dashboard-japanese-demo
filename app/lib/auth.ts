import 'server-only'
// import { prisma } from '@/lib/prisma'
import { getSession } from "@/app/lib/sessions"

/* Get current logged-in user */
export async function getCurrentUser() {
  const session = await getSession()
  if (!session) return null

  return {
    id: session.userId,
    name: session.username, // Assuming username is mapped to name
    role: session.role,
    // email: session.email // If you decide to add email to the session payload later
  }
}
