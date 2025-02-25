"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Message from "./message/Message";


const page = () => {
      const queryClient = new QueryClient()
      return (
            <div>
                  <QueryClientProvider client={queryClient}>
                        <Message />
                  </QueryClientProvider>
            </div>
      );
};

export default page;
