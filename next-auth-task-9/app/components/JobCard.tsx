import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Job {
  id: string;
  title: string;
  description: string;
  orgName: string;
  logoUrl: string;
  whenAndWhere: string;
  opType: string;
  categories: string[];
}

interface JobCardProps {
  job: Job;
  token: string;
  bookmarked: boolean; // Assume this is passed as a prop
}

const JobCard: React.FC<JobCardProps> = ({ job, bookmarked, token }) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  async function handleToggle(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    event.preventDefault();

    if (!token) {
      console.error('User is not authenticated');
      return;
    }

    try {
      if (isBookmarked) {
        // Remove bookmark
        await axios.delete(`https://akil-backend.onrender.com/bookmarks/${job.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setIsBookmarked(false); // Update state after successful API call
        console.log('Bookmark removed');
      } else {
        // Add bookmark
        await axios.post(`https://akil-backend.onrender.com/bookmarks/${job.id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setIsBookmarked(true); // Update state after successful API call
        console.log('Bookmark added');
      }
    } catch (error) {
      console.error('Error with bookmark operation:', error);
    }
  }

  return (
    <Link href={`/pages/jobs/${job.id}`} legacyBehavior>
      <a className="block">
        <div className="relative bg-gradient-to-r from-gray-50 to-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-2xl transition-shadow duration-300 mx-auto" style={{ width: '90%' }}>
          <div className="flex items-start mb-4">
            <img src={job.logoUrl} alt={job.title} className="w-20 h-20 rounded-full mr-6" />
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold text-blue-900 hover:text-blue-600 transition-colors duration-300">
                {job.title}
              </h2>
              <h3 className="text-gray-800 font-medium">{job.orgName}</h3>
              <p className="text-gray-600 italic">{job.whenAndWhere}</p>
              <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>
              <div className="flex space-x-2 items-center">
                <button className="bg-green-100 text-green-700 px-4 py-2 rounded-full border border-green-500 hover:bg-green-200 transition-colors duration-300">
                  {job.opType === 'inPerson' ? 'In Person' : 'Virtual'}
                </button>
                {job.categories.map((category, index) => (
                  <button  key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full border border-blue-500 hover:bg-blue-200 transition-colors duration-300">
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <img
            ty
            src={isBookmarked ? "/assets/bookmark.png" : "/assets/unbookmarked.png"}
            onClick={handleToggle}
            alt="Bookmark"
            className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
            data-testid="bookmark-button"
          />
        </div>
      </a>
    </Link>
  );
};

export default JobCard;
