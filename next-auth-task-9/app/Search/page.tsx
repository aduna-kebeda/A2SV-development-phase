"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import JobCard from '../components/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchJobs } from '../store/jobSlice';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const loading = useSelector((state: RootState) => state.jobs.loading);
  const error = useSelector((state: RootState) => state.jobs.error);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const query = new URLSearchParams(new URL(url, window.location.origin).search).get('query');
      if (query) {
        setSearchTerm(query);
        dispatch(fetchJobs(query));
      }
    };

    // Listen for route changes
    router.events?.on('routeChangeComplete', handleRouteChange);

    // Fetch initial data
    const query = new URLSearchParams(window.location.search).get('query');
    if (query) {
      setSearchTerm(query);
      dispatch(fetchJobs(query));
    }

    return () => {
      // Clean up event listener on component unmount
      router.events?.off('routeChangeComplete', handleRouteChange);
    };
  }, [dispatch, router]);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className='mt-1 text-xl text-center text-blue-900'>Search Results for "{searchTerm}"</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
