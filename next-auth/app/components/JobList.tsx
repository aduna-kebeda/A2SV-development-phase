// app/components/JobList.tsx
'use client'; // Add this line

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchJobs } from '../store/jobSlice';
import JobCard from './JobCard';

const JobList: React.FC = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state: RootState) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (loading) return <div className="text-center py-4 text-lg">Loading...</div>;
  if (error) return <div className="text-center py-4 text-lg text-red-500">Error: {error}</div>;

  if (jobs.length === 0) return <div className="text-center py-4 text-lg">No jobs available.</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
