"use client"
import { SessionProvider } from "next-auth/react";


const SessionRapper = ({ children }) => {
     return (
          <SessionProvider>{children}</SessionProvider>

     )
}

export default SessionRapper