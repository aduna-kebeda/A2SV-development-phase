"use client";
import React from 'react';
import JobCard from './components/JobCard';
import jobsData from './data/jobs.json';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto mt-24"> {/* Adjusted margin-top to 24 to account for the fixed navbar */}
      <h1 className="text-3xl font-bold mb-8 text-cyan-950 mx-auto text-center">Opportunities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
        {jobsData.job_postings.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            company={job.company}
            location={job.about.location}
            // salary="N/A" // Add salary if available in your job data
            avatarUrl={job.image}
            description={job.description} // Add description here
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;