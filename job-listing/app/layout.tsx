// app/layout.tsx
"use client";

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Inter } from 'next/font/google';
import Head from 'next/head';

// Load Google Font (Optional)
const inter = Inter({ subsets: ['latin'] });

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <title>Job Listing App</title>
        <meta name="description" content="Find and manage job listings" />
      </Head>
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;