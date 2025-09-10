"use client"
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import {Toaster} from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
export const metadata = {
  title: 'Ismail Portfolio',
  description: 'Looking for a talent now just take break',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
     
        <body className={inter.className}>
             <Toaster/>
          {children}
          </body>
      </SessionProvider>
    </html>
  )
}
