import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import SessionRapper from './helper/providerRapper'
export const metadata = {
  title: 'Ismail Portfolio',
  description: 'Looking for a talent now just take break',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionRapper>
        <body className={inter.className}>{children}</body>
      </SessionRapper>
    </html>
  )
}
