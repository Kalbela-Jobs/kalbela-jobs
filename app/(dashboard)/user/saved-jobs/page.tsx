"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useUserData } from "@/utils/encript_decript"
import {
  Bookmark,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
  Search,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useApiRequest from "@/app/hooks/useApiRequest"

type Job = {
  _id: string
  job_post: {
    job_title: string
    status: boolean
    url: string
    company_info: {
      name: string
    }
    location: {
      remote: boolean
      division: string
    }
  }
  created_at: string
}

const ITEMS_PER_PAGE = 9

export default function AppliedJobs() {
  const [user] = useUserData()
  const { data, loading, error } = useApiRequest<{ data: Job[] }>(
    user ? `user/get-saved-jobs?user_id=${user._id}` : "",
    "GET"
  )

  const [jobs, setJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (data?.data) {
      setJobs(data.data)
    }
  }, [data])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job?.job_post?.job_title
      ?.toLowerCase()
      ?.includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && job?.job_post?.status) ||
      (statusFilter === "inactive" && !job?.job_post?.status)
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const getStatusColor = (status: boolean) => {
    return status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <XCircle className="mb-4 h-16 w-16 text-red-500" />
        <h2 className="mb-2 text-2xl font-bold">Error</h2>
        <p className="text-gray-600">
          An error occurred while fetching your saved jobs.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">Saved Jobs</h1>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {paginatedJobs.length === 0 ? (
        <div className="text-center text-gray-600">
          No jobs found matching your criteria.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedJobs.map((job) => (
            <Card key={job._id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span className="text-xl font-semibold">
                    {job.job_post.job_title}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(job.job_post.status)}>
                      {job.job_post.status ? "Active" : "Inactive"}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-auto p-0">
                      <Bookmark className="h-5 w-5 text-blue-500" />
                      <span className="sr-only">Bookmark</span>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Building2 size={16} className="mr-2 text-gray-500" />
                    <span>{job?.job_post?.company_info?.name}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    <span>
                      {job?.job_post?.location?.remote
                        ? "Remote"
                        : job?.job_post?.location?.division || "Dhaka"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <span>
                      Saved on {new Date(job?.created_at).toDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/jobs/${job.job_post.url}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight size={16} className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
