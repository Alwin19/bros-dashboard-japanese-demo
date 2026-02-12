import "server-only"
import { verifySession } from "@/app/lib/sessions" // You might need to export this or logic to get session
import { redirect } from "next/navigation"

const API_BASE_URL = "https://mdapi-stg.baliroyalhospital.co.id/api"

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  // 1. Get the session to retrieve the token
  const session = await verifySession()
  
  if (!session || !session.token) {
    redirect("/login")
  }

  // 2. Append the token to headers
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${session.token}`,
    ...options.headers,
  }

  // 3. Make the request
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  // Handle unauthorized (token expired)
  if (response.status === 401) {
    redirect("/login")
  }

  return response.json()
}


// to catch redirect errors from Next.js
export function isRedirectError(error: any) {
  return error?.digest?.startsWith('NEXT_REDIRECT') || 
         (typeof error === 'object' && error?.message === 'NEXT_REDIRECT');
}