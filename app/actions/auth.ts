"use server"

import { redirect } from "next/navigation"
import { createSession, deleteSession } from "@/app/lib/sessions"

export async function login(_formData: FormData) {
  await createSession(1, "demo", "管理者", "demo-token")
  redirect("/dashboard/keuangan")
}

export async function logout() {
  await deleteSession()
  redirect("/login")
}
