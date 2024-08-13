// app/home.page.tsx
"use client";

import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Footer from '../components/Footer';
import JobList from '../components/JobList';
import { useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';

// Load Google Font (Optional)
const inter = Inter({ subsets: ['latin'] });

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  
  console.log(session);

  return (
    <></>
    // <Provider store={store}>
    //   {status === 'authenticated' && session?.user ? (
    //     <h1>Welcome, {session.user.name}!</h1>
    //   ) : (
    //     <h1>Welcome!</h1>
    //   )}
    //   <JobList />
    //   <Footer />
    // </Provider>
  );
};

export default RootLayout;
