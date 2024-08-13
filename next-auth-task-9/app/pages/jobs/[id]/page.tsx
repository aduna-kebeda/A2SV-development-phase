"use client"; // Add this to indicate it's a Client Component

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { RootState } from '../../../store'; // Ensure the correct path to your store
import { fetchJobDetail } from '../../../store/jobSlice';

const JobDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { jobDetail, loading, error } = useSelector((state: RootState) => state.jobs);
  console.log('myid' ,id);
  useEffect(() => {
    if (id) {
      dispatch(fetchJobDetail(id));
    }
  }, [id, dispatch]);

  if (loading) return <div className="text-center py-4 text-lg">Loading...</div>;
  if (error) return <div className="text-center py-4 text-lg text-red-500">Error: {error}</div>;

  if (!jobDetail) return <div className="text-center py-4 text-lg">Job not found.</div>;

  const { idealCandidate, about, logoUrl, title, orgName, description, responsibilities, whenAndWhere, categories, requiredSkills, startDate, endDate, deadline, location } = jobDetail;
  const { posted_on } = about || {};

  return (
    <div className="mt-10 container mx-auto px-6 py-10 bg-white rounded-lg shadow-2xl" style={{ maxWidth: '90%' }}>
      <div className="flex flex-wrap mb-10">
        {/* Job Info Section */}
        <div className="w-full md:w-2/3 pr-6 mb-8 md:mb-0">
          <div className="flex items-start mb-8">
            <img
              src={logoUrl || '/default-image.png'} // Default image if not provided
              alt={title}
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
            />
            <div className="ml-6">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{title}</h1>
              <p className="text-xl text-blue-700 mb-2">{orgName}</p>
              <p className="text-gray-600 mb-1"><strong>Location:</strong> {whenAndWhere}</p>
            </div>
          </div>
          <p className="text-gray-800 mb-8 text-lg leading-relaxed">{description}</p>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Responsibilities:</h2>
            <ul className="space-y-2 list-disc pl-6">
              {responsibilities.split('\n').map((res, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <img src="/assets/right-icon.png" alt='' className="w-5 h-5 mr-3" />
                  {res}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Ideal Candidate:</h2>
            <p>{idealCandidate}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">When & Where:</h2>
            <p className="text-gray-700">{whenAndWhere}</p>
          </div>
        </div>
        {/* About and Additional Info Section */}
        <div className="w-full md:w-1/3 pl-6">
          <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">About:</h2>
            <div className="flex items-center mb-4">
              <img src="/assets/posted.png" alt='Posted' className="w-6 h-6 mr-3" />
              <div>
                <p className="font-medium">Posted On</p>
                <p className="text-gray-700 font-semibold">{posted_on && new Date(posted_on).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <img src="/assets/deadline.png" alt='Deadline' className="w-6 h-6 mr-3" />
              <div>
                <p className="font-medium">Deadline</p>
                <p className="text-gray-700 font-semibold">{deadline && new Date(deadline).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <img src="/assets/location.png" alt='Location' className="w-6 h-6 mr-3" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-700 font-semibold">{location.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <img src="/assets/start-date.png" alt='Start Date' className="w-6 h-6 mr-3" />
              <div>
                <p className="font-medium">Start Date</p>
                <p className="text-gray-700 font-semibold">{startDate && new Date(startDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <img src="/assets/end-date.png" alt='End Date' className="w-6 h-6 mr-3" />
              <div>
                <p className="font-medium">End Date</p>
                <p className="text-gray-700 font-semibold">{endDate && new Date(endDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Categories:</h2>
            <div className="space-y-4">
              {categories && categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full border border-blue-500 hover:bg-blue-200 transition-colors duration-300"
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Required Skills:</h2>
            <p className="text-blue-950">{requiredSkills && requiredSkills.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;