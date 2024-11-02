// app/layout.tsx

'use client';  // This makes the component a Client Component

import { SessionProvider } from 'next-auth/react';
import './globals.css'; // Ensure your global styles are imported
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import AuthProvider from './authProvider/authProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}