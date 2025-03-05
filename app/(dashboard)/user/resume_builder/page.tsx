"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ResumeBuilder from './home';

// Instantiate the QueryClient
const queryClient = new QueryClient();

const Page = () => {
      return (
            <div>
                  <QueryClientProvider client={queryClient}>
                        <ResumeBuilder />
                  </QueryClientProvider>
            </div>
      );
};

export default Page;
