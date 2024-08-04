// app/components/JobCategories.tsx
"use client";

import React from 'react';
import Link from 'next/link';

interface JobCategoryProps {
  categories: string[];
}

const JobCategories: React.FC<JobCategoryProps> = ({ categories }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Job Categories</h1>
      <ul className="list-disc pl-5">
        {categories.map((category, index) => (
          <li key={index} className="mb-2">
            <Link href={`/categories/${category}`}>
              <a className="text-blue-500">{category}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobCategories;
