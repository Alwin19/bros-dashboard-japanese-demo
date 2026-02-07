"use server"

import { redirect } from "next/navigation"
import { createSession, deleteSession } from "@/app/lib/sessions"

const API_BASE_URL = "https://mdapi-stg.baliroyalhospital.co.id/api"

export async function login(prevState: any, formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  // Validate inputs
  if (!username || !password) {
    return { error: "Username and password are required" }
  }

  try {
    // 1. Call the external login API
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Backend expects "username" key.
      body: JSON.stringify({ username, password }), 
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      return { error: data.message || "Invalid credentials" }
    }

    // Create session
    await createSession(
      data.user.id, 
      data.user.username, 
      data.user.role, 
      data.token
    )

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