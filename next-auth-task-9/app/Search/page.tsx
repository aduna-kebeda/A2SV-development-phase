"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import JobCard from '../components/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchJobs } from '../store/jobSlice';
import { AppDispatch } from '../store';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const loading = useSelector((state: RootState) => state.jobs.loading);
  const error = useSelector((state: RootState) => state.jobs.error);

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      setSearchTerm(query);
      dispatch(fetchJobs(query));
    }
  }, [dispatch, searchParams]);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="mt-1 text-xl text-center text-blue-900">
        Search Results for {searchTerm}
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} token={''} bookmarked={false} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
