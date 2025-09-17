import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import ClientProviders from "./Provider";
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <ClientProviders>
            <Toaster />
            {children}
                    <Analytics />
          </ClientProviders>
        </body>
    </html>
  );
}
