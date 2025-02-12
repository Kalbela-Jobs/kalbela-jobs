"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import ProfilePage from "./components/Personal_Info"

const queryClient = new QueryClient()

const CustomTabs = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfilePage />
    </QueryClientProvider>
  )
}

export default CustomTabs
