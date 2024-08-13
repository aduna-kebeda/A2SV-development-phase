  import axios from 'axios';
  import { render, fireEvent, waitFor, screen } from '@testing-library/react';
  import '@testing-library/jest-dom';
  import Joblist from '../app/components/JobCard';
  import React from 'react';

  // Mock axios
  jest.mock('axios');
  interface Job {
    id: string;
    title: string;
    description: string;
    orgName: string;
    logoUrl: string;
    whenAndWhere: string;
    opType: string;
    categories: string[];
  }
  describe('Joblist Component', () => {
    let job:Job = {
      id: '657063e2144042c215319530',
      title: 'Software Engineer',
      orgName: 'Acme Inc.',
      opType:"j",
      whenAndWhere:'Remote',
      description: 'Develop and maintain web applications.',
      logoUrl: '/job1.png',
      categories:['Software Engineering','Web Development'],
    };
    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjM2MzNlZDY5NWJjNTM1MjlkNjk2YSIsInJvbGUiOiJ1c2VyIiwicHJvZmlsZVN0YXR1cyI6ImluY29tcGxldGUiLCJleHAiOjE3MjM4MjIzMDB9.404TcczbUZufpFWdoqKEz1aiAeWD4blyGjOMHi33wTU'
    it('should render correctly with the job details', () => {
      render(<Joblist  job={job} token={token} bookmarked={true }/>);
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
      expect(screen.getByText('Acme Inc.')).toBeInTheDocument();
      expect(screen.getByText('Develop and maintain web applications.')).toBeInTheDocument();
    });

    it('should bookmark and unbookmark a job', async () => {
      const mockPost = jest.spyOn(axios, 'post').mockResolvedValue({ status: 200 });
      const mockDelete = jest.spyOn(axios, 'delete').mockResolvedValue({ status: 200 });

      const { rerender } = render(<Joblist  job={job} token={token} bookmarked={true }/>);

      const bookmarkButton = screen.getByTestId('bookmark-button');
      
      // Unbookmark the job (currently bookmarked)
      fireEvent.click(bookmarkButton);

      await waitFor(() => {
        expect(mockDelete).toHaveBeenCalledWith(
          `https://akil-backend.onrender.com/bookmarks/${job.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json', // Add this line to match the headers in the actual call
            },
          }
        );        
      });



      rerender(<Joblist  job={job} token={token} bookmarked={false }/>);

      // Bookmark the job again
      fireEvent.click(bookmarkButton);

      await waitFor(() => {
        expect(mockPost).toHaveBeenCalledWith(
          `https://akil-backend.onrender.com/bookmarks/${job.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      });
      
      mockPost.mockRestore();
      mockDelete.mockRestore();
    });
  });
