"use client";

import React from 'react';
import Link from 'next/link';

interface JobCardProps {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  avatarUrl: string;
  description: string;
}

const JobCard: React.FC<JobCardProps> = ({ id, title, company, location, salary, avatarUrl, description }) => {
  return (
    <Link href={`/jobs/${id}`} legacyBehavior>
      <a>
        <div className="bg-gradient-to-r from-gray-50 to-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-2xl transition-shadow duration-300 mx-auto" style={{ width: '90%' }}>
          <div className="flex items-center mb-4">
          <img src={`/assets/job${id}.png`} alt={title} className="w-16 h-16 rounded-full mr-4" />
            <div>
            <h2 className="text-2xl font-semibold text-blue-900 hover:text-blue-600 transition-colors duration-300">{title}</h2>
              <div className="mt-1">
                <p className="text-gray-800 font-medium">{company}</p>
                <p className="text-gray-600 italic">{location}</p>
                {/* <p className="text-green-700 font-bold">{salary}</p> */}
              </div>
            </div>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>
          <div className="flex space-x-2">
            <button className="bg-green-100 text-green-700 px-4 py-2 rounded-full border border-green-500 hover:bg-green-200 transition-colors duration-300">In Person</button>
            <button className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full border border-orange-400 hover:bg-orange-200 transition-colors duration-300">Education</button>
            <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full border border-blue-500 hover:bg-blue-200 transition-colors duration-300">IT</button>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default JobCard;
