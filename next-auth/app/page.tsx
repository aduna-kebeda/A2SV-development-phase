// app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Signin from "./auth/signin/page";
import Signup from "./auth/signup/page";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import JobList from './components/JobList';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

// Load Google Font (Optional)
const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // console.log(1112,session);
  

  return (
    <Provider store={store}>
      <Head>
        <title>Home Page</title>
      </Head>
      {/* <Navbar /> */}
      <div className="container mx-auto px-4 py-8">
      {status === 'authenticated' ? (
          <>
            <h1 className="mt-0 text-3xl text-center font-bold mb-4">Welcome, {session.user?.name}!</h1>
            <JobList />
          </>
        ) : (
          <>
            <Signin />
          </>
        )}
      </div>
      <Footer />
    </Provider>
  );
};

export default Home;
