import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface IdealCandidate {
  traits: string[];
}

interface About {
  description: string;
  requirements: string;
  responsibilities: string;
}

interface Job {
  id: string;
  title: string;
  description: string;
  orgName: string;
  logoUrl: string;
  whenAndWhere: string;
  idealCandidate: IdealCandidate;
  about: About;
  responsibilities: string;
  categories: string[];
  opType: string;
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  datePosted: string;
  status: string;
  applicantsCount: number;
  viewsCount: number;
  isBookmarked: boolean;
  isRolling: boolean;
  orgPrimaryPhone: string;
  orgEmail: string;
  average_rating: number;
  total_reviews: number;
}

interface JobsState {
  status: any;
  jobs: Job[];
  jobDetail: Job | null;
  searchResults: Job[]; // Add this line
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  jobDetail: null,
  searchResults: [], // Initialize search results
  loading: false,
  error: null,
  status: undefined
};


export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (query: string) => {

  const response = await fetch(`https://akil-backend.onrender.com/opportunities/search?query=${query}`);

  if (!response.ok) {

    throw new Error('Failed to fetch');

  }

  const data = await response.json();

  return data.data; // Adjust according to the actual API response structure
});
// Fetch job details by ID
export const fetchJobDetail = createAsyncThunk('jobs/fetchJobDetail', async (id: string) => {
  const response = await fetch(`https://akil-backend.onrender.com/opportunities/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  const data = await response.json();
  return data.data; // Adjust according to the actual API response structure
});

// Fetch jobs based on search query
export const searchJobs = createAsyncThunk('jobs/searchJobs', async (query: string) => {
  const response = await fetch(`https://akil-backend.onrender.com/opportunities/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to search');
  }
  const data = await response.json();
  return data.data; // Adjust according to the actual API response structure
});

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch';
      })
      // Fetch job details
      .addCase(fetchJobDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.jobDetail = action.payload;
      })
      .addCase(fetchJobDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch';
      })
      // Search jobs
      .addCase(searchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search';
      });
  },
});

export default jobSlice.reducer;
