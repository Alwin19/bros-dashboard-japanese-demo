"use server"

import { redirect } from "next/navigation"
import { createSession, deleteSession } from "@/app/lib/sessions"
import { prisma } from "@/lib/prisma"

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validate inputs
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    // Find user
    const user = await prisma.user.findUnique({ 
      where: { email } 
    })

    // Check credentials (plain text for now - use bcrypt later!)
    if (!user || user.password !== password) {
      return { error: "Invalid credentials" }
    }

    // Create session
    await createSession(user.id)

  } catch (error) {
    // Log the actual error to see what's happening
    console.error("Login error:", error)
    return { error: "Something went wrong. Please try again." }
  }

  // Redirect after successful login
  redirect("/dashboard/keuangan")
}

export async function logout() {
  await deleteSession()
  redirect("/login")
}