import { redirect } from 'next/navigation'
import { getSession } from '@/app/lib/sessions'

export default async function RootPage() {
  const session = await getSession()
  
  if (session) {
    redirect('/dashboard/keuangan')
  } else {
    redirect('/login')
  }
}