"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface JobPosting {
  id: number;
  title: string;
  description: string;
  responsibilities: string[];
  ideal_candidate: {
    age: string;
    gender: string;
    traits: string[];
  };
  when_where: string;
  about: {
    posted_on: string;
    deadline: string;
    location: string;
    start_date: string;
    end_date: string;
    categories: string[];
    required_skills: string[];
  };
  company: string;
  image: string;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [jobsByCategory, setJobsByCategory] = useState<Record<string, JobPosting[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/jobs.json'); // Path to your jobs.json file
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const jobPostings: JobPosting[] = data.job_postings;

        // Extract categories from job postings
        const allCategories = jobPostings.flatMap(job => job.about.categories);
        const uniqueCategories = Array.from(new Set(allCategories)); // Remove duplicates

        setCategories(uniqueCategories);

        // Organize jobs by category
        const jobsMap: Record<string, JobPosting[]> = {};
        jobPostings.forEach(job => {
          job.about.categories.forEach(category => {
            if (!jobsMap[category]) {
              jobsMap[category] = [];
            }
            jobsMap[category].push(job);
          });
        });
        setJobsByCategory(jobsMap);
      } catch (error) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="container mx-auto text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8 w-[90%]">
     <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Explore Job Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category} className="bg-white shadow-xl rounded-lg p-6 border border-gray-300 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">{category}</h2>
            <p className="text-gray-600 mb-6">Find exciting job opportunities in this category:</p>
            <ul className="space-y-3">
              {jobsByCategory[category]?.length ? (
                jobsByCategory[category].map((job) => (
                  <li key={job.id} className="flex items-center justify-between border-b border-gray-200 py-2">
                    <Link href={`/jobs/${job.id}`} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300">
                      {job.title}
                    </Link>
                    <span className="text-gray-500 text-sm">{job.company}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No jobs available in this category.</p>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
