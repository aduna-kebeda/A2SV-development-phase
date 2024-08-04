import { notFound } from 'next/navigation';
import jobsData from '../../data/jobs.json';
import JobDetail from '../../components/JobDetail';

export async function generateStaticParams() {
  return jobsData.job_postings.map((job) => ({
    id: job.id.toString(),
  }));
}

export default function JobPage({ params }) {
  const jobId = parseInt(params.id, 10);
  const job = jobsData.job_postings.find((job) => job.id === jobId);

  if (!job) {
    notFound();
  }

  return <JobDetail job={job} />;
}
