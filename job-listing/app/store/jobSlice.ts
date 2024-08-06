import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface IdealCandidate {
  // Update this to match the JSON structure or remove if not used
  // Example:
  traits: string[];
}

interface About {
  // Update this to match the JSON structure or remove if not used
  // Example:
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
  jobs: Job[];
  jobDetail: Job | null;
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  jobDetail: null,
  loading: false,
  error: null,
};

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await fetch('https://akil-backend.onrender.com/opportunities/search');
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  const data = await response.json();
  return data.data; // Adjust according to the actual API response structure
});

export const fetchJobDetail = createAsyncThunk('jobs/fetchJobDetail', async (id: string) => {
  const response = await fetch(`https://akil-backend.onrender.com/opportunities/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch');
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
      });
  },
});

export default jobSlice.reducer;
