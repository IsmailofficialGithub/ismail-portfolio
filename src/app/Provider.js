"use client"

import { SessionProvider } from "next-auth/react"
export const metadata = {
  title: 'Ismail Portfolio',
  description: 'Looking for a talent now just take break',
}

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
