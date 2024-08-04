// app/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Company</h2>
            <ul>
              <li><Link href="/" legacyBehavior><a className="text-gray-400 hover:text-white">Home</a></Link></li>
              <li><Link href="/about" legacyBehavior><a className="text-gray-400 hover:text-white">About Us</a></Link></li>
              <li><Link href="/services" legacyBehavior><a className="text-gray-400 hover:text-white">Services</a></Link></li>
              <li><Link href="/contact" legacyBehavior><a className="text-gray-400 hover:text-white">Contact</a></Link></li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
            <ul className="flex space-x-4">
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Twitter</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Facebook</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter to get the latest updates and offers.</p>
            <form>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 rounded-l-md border border-gray-700 bg-gray-900 text-white"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4 mt-8">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;