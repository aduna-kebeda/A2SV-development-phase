"use client";
import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-green-900 p-4 text-white fixed top-0 left-0 w-full">
      <div className="container mx-auto flex justify-around items-center">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold">Job Listings</a>
        </Link>
        <div>
          <Link href="/categories" legacyBehavior>
            <a className="mr-4">Categories</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;