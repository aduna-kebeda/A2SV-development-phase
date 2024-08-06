import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-white text-2xl font-bold">Job Listings</a>
        </Link>
        <div>
    
          </div>
      </div>
    </nav>
  );
};

export default Navbar;