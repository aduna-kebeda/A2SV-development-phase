// app/components/Navbar.tsx

"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log(1112,session);

  return (
    <nav className="bg-white-0 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-blue-900 text-2xl font-bold">Job Listings</a>
        </Link>
        <div>
          {status === 'authenticated' ? (
            <div onClick={() => signOut()} className="text-blue-900 text-[20px] bg-orange-500 px-7 rounded-full cursor-pointer p-2">
            Logout
          </div>
          ) : (
            <Link href="/auth/signin" legacyBehavior>
              <a className="text-white text-[20px] bg-green-700 px-7 rounded-full cursor-pointer p-2">Login</a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
