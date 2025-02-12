"use client"

import { useEffect, useState } from "react"
import axios, { CancelTokenSource } from "axios"

interface UseJobsSearchProps<T> {
  endpoint: string
  search?: string
  pageNumber: number
  location?: string
  job_type?: string
  category?: string
  salary_range?: string
  limit?: number
}

interface UseJobsSearchReturn<T> {
  loading: boolean
  error: boolean
  jobs: T[]
  totalJobs: number
  hasMore: boolean
  triggerRevalidate: () => void
}

export default function useJobsSearch<T>({
  endpoint,
  search = "",
  pageNumber = 1,
  location = "",
  job_type = "",
  category = "",
  salary_range = "",
  limit = 10
}: UseJobsSearchProps<T>): UseJobsSearchReturn<T> {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [jobs, setJobs] = useState<T[]>([])
  const [totalJobs, setTotalJobs] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [revalidate, setRevalidate] = useState(false)

  const triggerRevalidate = () => setRevalidate((prev) => !prev)

  // Reset jobs when filters change
  useEffect(() => {
    setJobs([])
  }, [pageNumber]) // Only reset jobs when pageNumber changes

  useEffect(() => {
    setLoading(true)
    setError(false)

    let cancel: CancelTokenSource

    // Build query parameters according to API documentation
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    if (category) params.append('category', category)
    if (location) params.append('location', location)
    if (job_type) params.append('job_type', job_type)
    if (salary_range) params.append('salary_range', salary_range)
    params.append('page', pageNumber.toString())
    params.append('limit', limit.toString())

    const fetchData = async () => {
      try {
        cancel = axios.CancelToken.source()
        const res = await axios.get(
          `${process.env.NEXT_APP_BASE_URL}/api/v1/${endpoint}?${params.toString()}`,
          {
            headers: { "Content-Type": "application/json" },
            cancelToken: cancel.token,
          }
        )

        const fetchedData: T[] = res.data.data.jobs
        const totalCount = res.data.data.pagination?.totalCount

        // Replace existing jobs instead of appending for proper pagination
        setJobs(fetchedData)
        setTotalJobs(totalCount || 0)
        setHasMore(fetchedData.length === limit)
        setLoading(false)
      } catch (e) {
        if (axios.isCancel(e)) return
        setError(true)
        setLoading(false)
      }
    }

    fetchData()
    return () => cancel?.cancel()
  }, [
    endpoint,
    search,
    pageNumber,
    location,
    job_type,
    category,
    salary_range,
    limit,
    revalidate
  ])

  return { loading, error, jobs, totalJobs, hasMore, triggerRevalidate }
}
