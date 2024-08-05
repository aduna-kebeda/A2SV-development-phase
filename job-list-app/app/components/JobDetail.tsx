import React from 'react';

interface Job {
  id: number; // Make sure id is included in the Job interface
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
  image?: string; // Optional if image URL is provided in the job object
}

interface JobDetailProps {
  job: Job;
}

const categoryColors = [
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-red-100',
  'bg-purple-100',
  'bg-pink-100',
  'bg-teal-100'
];

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
  return (
    <div className="container mx-auto px-6 py-10 bg-white rounded-lg shadow-2xl" style={{ maxWidth: '90%', paddingTop: '5rem' }}>
      <div className="flex flex-wrap mb-10">
        {/* Job Info Section */}
        <div className="w-full md:w-2/3 pr-6 mb-8 md:mb-0">
          <div className="flex items-start mb-8">
            <img
              src={`/assets/job${job.id}.png`} // Use job.id to dynamically access the image
              alt={job.title}
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
            />
            <div className="ml-6">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{job.title}</h1>
              <p className="text-xl text-blue-700 mb-2">{job.company}</p>
              <p className="text-gray-600 mb-1"><strong>Location:</strong> {job.about.location}</p>
              <p className="text-gray-500"><strong>Duration:</strong> {job.about.start_date} - {job.about.end_date}</p>
            </div>
          </div>
          <p className="text-gray-800 mb-8 text-lg leading-relaxed">{job.description}</p>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Responsibilities:</h2>
            <ul className="space-y-2 list-disc pl-6">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <img src="/assets/right-icon.png" alt='' className="w-5 h-5 mr-3" />
                  {responsibility}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Ideal Candidate:</h2>
            <p className="text-gray-700 mb-2"><strong>Age:</strong> {job.ideal_candidate.age}</p>
            <p className="text-gray-700 mb-2"><strong>Gender:</strong> {job.ideal_candidate.gender}</p>
            <ul className="list-disc pl-6 space-y-2">
              {job.ideal_candidate.traits.map((trait, index) => (
                <li key={index} className="text-gray-700">{trait}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">When & Where:</h2>
            <p className="text-gray-700">{job.when_where}</p>
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
                <p className="text-gray-700 font-semibold">{job.about.posted_on}</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <img src="/assets/deadline.png" alt='Deadline' className="w-6 h-6 mr-3" />
              <div>
                <p className="font-medium">Deadline</p>
                <p className="text-gray-700 font-semibold">{job.about.deadline}</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <img src="/assets/location.png" alt='Location' className="w-6 h-6 mr-3" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-700 font-semibold">{job.about.location}</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <img src="/assets/start-date.png" alt='Start Date' className="w-6 h-6 mr-3" />
              <div>
                <p className="font-medium">Start Date</p>
                <p className="text-gray-700 font-semibold">{job.about.start_date}</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <img src="/assets/end-date.png" alt='End Date' className="w-6 h-6 mr-3" />
              <div>
                <p className="font-medium">End Date</p>
                <p className="text-gray-700 font-semibold">{job.about.end_date}</p>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Categories:</h2>
            {job.about.categories.map((category, index) => (
              <div key={index} className={`p-4 rounded-lg mb-4 ${categoryColors[index % categoryColors.length]} hover:shadow-lg transition-shadow`}>
                <p className="text-gray-700">{category}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Required Skills:</h2>
            <p className="text-blue-950">{job.about.required_skills.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;