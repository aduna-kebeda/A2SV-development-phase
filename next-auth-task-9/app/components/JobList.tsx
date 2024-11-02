// app/components/JobList.tsx
'use client'; // Add this line

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState ,AppDispatch} from '../store';
import { fetchJobs } from '../store/jobSlice';
import JobCard from './JobCard';
import { useSession } from 'next-auth/react';

const JobList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state: RootState) => state.jobs);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const { data,status: session } = useSession(); // Ensure session is fully loaded
  const token = data?.user?.accessToken;
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch('https://akil-backend.onrender.com/bookmarks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks');
        }

        const result = await response.json();
        const bookmarkIds = result.data.map((item: any) => item.eventID);
        setBookmarked(bookmarkIds);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };
    if (token) {
      fetchBookmarks();
    }
  }, [token]);

  useEffect(() => {
    const word = ''
    dispatch(fetchJobs(word));
  }, [dispatch]);
console.log(bookmarked,'token2')
  if (loading) return <div className="text-center py-4 text-lg">Loading...</div>;
  if (error) return <div className="text-center py-4 text-lg text-red-500">Error: {error}</div>;

  if (jobs.length === 0) return <div className="text-center py-4 text-lg">No jobs available.</div>;

  // console.log("Bookmarked Job IDs:", bookmarked);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        {jobs.map((job) => (
          console.log(bookmarked.includes(job.id),'token3'),
          <JobCard key={job.id} job={job} bookmarked={bookmarked.includes(job.id)}
          token={token} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
