"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      const searchUrl = `/Search?query=${encodeURIComponent(searchTerm)}`;
      console.log('Navigating to:', searchUrl);
      router.push(searchUrl);
    }
  };
 
  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-blue-900 text-2xl font-bold">Job Listings</a>
        </Link>
        {status === 'authenticated' && (
          <>
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title..."
                className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-slate-500 text-white px-4 py-2 rounded-full hover:bg-slate-600 transition-colors duration-300"
              >
                Search
              </button>
            </form>
            <div className="justify-center text-blue-900 text-2xl font-bold">
              <Link href="/bookmark">
                Bookmarks
              </Link>
            </div>
          </>
        )}
        <div>
          {status === 'authenticated' ? (
            <div onClick={() => signOut()} className="text-blue-900 text-[20px] bg-orange-500 px-7 rounded-full cursor-pointer p-2">
              Logout
            </div>
          ) : (
            <div>
              <Link href="/auth/signin" legacyBehavior>
                <a className="text-white text-[20px] bg-green-700 px-7 rounded-full cursor-pointer p-2">Login</a>
              </Link>
              <Link href="/auth/signup" legacyBehavior className='m-2'>
                <a className="text-white text-[20px] bg-orange-400 hover:bg-orange-500 px-7 rounded-full cursor-pointer p-2">Signup</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;