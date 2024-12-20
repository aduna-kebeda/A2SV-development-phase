// src/pages/index.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../store/jobSlice'; // Update import path if necessary
import { RootState ,AppDispatch} from '../store';

  import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const jobStatus = useSelector((state: RootState) => state.jobs.status);

  useEffect(() => {
    if (jobStatus === 'idle') {
      const w = ''
      dispatch(fetchJobs(w));
    }
  }, [jobStatus, dispatch]);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {jobStatus === 'loading' && <p>Loading...</p>}
        {jobStatus === 'succeeded' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} token={''} bookmarked={false} />
            ))}
          </div>
        )}
        {jobStatus === 'failed' && <p>Error fetching jobs</p>}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
