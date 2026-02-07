import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/app/lib/definitions'
import { cookies } from 'next/headers'
import { cache } from 'react'

 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60 // 7 days


/* Helper functions to manage sessions using JWT stored in HTTP-only cookies*/
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(encodedKey)
}
 
export async function decrypt(session: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}


/* Public API*/
export async function createSession(userId: number, username: string, role: string, token: string) {
  const sessionPayload: SessionPayload = { userId, username, role, token }
  const encryptedSession = await encrypt(sessionPayload)
  const cookieStore = await cookies()
 
  cookieStore.set('session', encryptedSession, {
    httpOnly: true,
    secure: true,
    maxAge: SESSION_DURATION_SECONDS,
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value
  if (!session) return null

  return await decrypt(session)
}

export async function refreshSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value
  if (!session) return null

  const payload = await decrypt(session)
  if (!payload) return null

  // Issue a NEW JWT
  const newToken = await encrypt({ 
    userId: payload.userId, 
    username: payload.username, 
    role: payload.role, 
    token: payload.token })

  cookieStore.set('session', newToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: SESSION_DURATION_SECONDS,
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export const verifySession = cache(async () => {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  
  if (!session) {
    return null
  }

  const payload = await decrypt(session)

  if (!payload?.userId) {
    return null
  }

  return { isAuth: true, ...payload }
})