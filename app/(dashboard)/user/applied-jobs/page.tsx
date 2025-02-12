"use client"

import { useEffect, useState } from "react"
import { useUserData } from "@/utils/encript_decript"
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useApiRequest from "@/app/hooks/useApiRequest"

import { JobCard } from "./job-card"

type Job = {
  _id: string
  job_post: {
    job_title: string
    company_name: string
    job_location: string
    salary: string
    posted_date: string
    company_logo: string
  }
  created_at: any
  status: "Applied" | "In Review" | "Interview" | "Offer" | "Rejected"
}

type ApiResponse = {
  data: Job[]
  total: number
}

const ITEMS_PER_PAGE = 10

export default function AppliedJobs() {
  const [user] = useUserData()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"date" | "company">("date")
  const [currentPage, setCurrentPage] = useState(1)

  const { data, loading, error } = useApiRequest<ApiResponse>(
    `user/get-applied-jobs?user_id=${user?._id}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
    "GET"
  )

  const [jobs, setJobs] = useState<Job[]>([])
  const [totalJobs, setTotalJobs] = useState(0)

  useEffect(() => {
    if (data) {
      setJobs(data.data)
      setTotalJobs(data.total)
    }
  }, [data])

  const getStatusColor = (status: Job["status"]) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800"
      case "In Review":
        return "bg-yellow-100 text-yellow-800"
      case "Interview":
        return "bg-purple-100 text-purple-800"
      case "Offer":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredJobs = jobs.filter(
    (job) =>
      (searchTerm === "" ||
        job?.job_post?.job_title
          ?.toLowerCase()
          ?.includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || job?.status === statusFilter)
  )

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "date") {
      return (
        new Date(b?.job_post?.posted_date).getTime() -
        new Date(a?.job_post?.posted_date).getTime()
      )
    } else {
      return a?.job_post?.company_name?.localeCompare(b?.job_post?.company_name)
    }
  })

  const totalPages = Math.ceil(totalJobs / ITEMS_PER_PAGE)

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Applied Jobs</h1>
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                size={20}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Offer">Offer</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortBy}
              onValueChange={(value: "date" | "company") => setSortBy(value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="company">Sort by Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      {loading ? (
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <div className="flex h-[50vh] flex-col items-center justify-center">
          <XCircle className="mb-4 h-16 w-16 text-red-500" />
          <h2 className="mb-2 text-2xl font-bold">Something went wrong</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedJobs?.map((job: any) => (
            <JobCard
              key={job?._id}
              job_data={job}
              statusColor={getStatusColor(job.status)}
            />
          ))}
        </div>
      )}
      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} className="mr-2" />
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  )
}
