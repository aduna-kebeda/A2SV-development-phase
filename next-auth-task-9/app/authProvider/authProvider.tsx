// app.authProvider.authProvider.tsx

'use client';  // This makes the component a Client Component   
import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
const AuthProvider = ({children}: {children: ReactNode}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default AuthProvider
