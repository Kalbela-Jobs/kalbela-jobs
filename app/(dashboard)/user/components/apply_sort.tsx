"use client"
import { useUserData } from "@/utils/encript_decript"

import useApiRequest from "@/app/hooks/useApiRequest"
import Link from "next/link"
import { CalendarIcon, CircleIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Job = {
      _id: string
      job_post: {
            company_info: {
                  name: string
                  logo: string
            }
            job_type: string
            job_title: string
            job_location: string
            salary: string
            posted_date: string
      }
      created_at: any
      status: "Applied" | "In Review" | "Interview" | "Offer" | "Rejected" | "Shortlisted"
}
type ApiResponse = {
      data: Job[]
      total: number
}

const ApplySort = () => {
      const [user] = useUserData()

      const { data, loading, error } = useApiRequest<ApiResponse>(
            `user/get-applied-jobs?user_id=${user?._id}`,
            "GET"
      )

      const jobs = data?.data || []

      console.log('my job : ', jobs);

      const getStatusColor = (status: Job["status"]) => {
            switch (status) {
                  case "Applied":
                        return "bg-blue-100 text-blue-800"
                  case "Shortlisted":
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

      return (
            <div className="md:col-span-2">
                  <div className="overflow-hidden rounded-xl  border border-gray-200 ">
                        <div className="px-4 py-5 sm:p-6">
                              <div className="sm:flex sm:items-start sm:justify-between">
                                    <div>
                                          <p className="text-base font-bold">Applied Jobs</p>
                                    </div>
                                    <div className="mt-4 sm:mt-0">
                                          <Link
                                                href="/user/applied-jobs"
                                                title=""
                                                className="hover: inline-flex items-center text-xs font-semibold uppercase tracking-widest text-gray-500"
                                          >
                                                See all applied jobs
                                                <svg
                                                      className="ml-2 h-4 w-4"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                      strokeWidth={2}
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9 5l7 7-7 7"
                                                      />
                                                </svg>
                                          </Link>
                                    </div>
                              </div>
                        </div>

                        {/* Table for larger screens */}
                        <div className="hidden md:block w-full overflow-x-auto">
                              <table className="min-w-full bg-white border border-gray-200 table-auto">
                                    <thead>
                                          <tr className="bg-gray-100 text-gray-600 uppercase text-xs md:text-sm leading-normal">
                                                <th className="py-3 px-4 md:px-6 text-left whitespace-nowrap">Company</th>
                                                <th className="py-3 px-4 md:px-6 text-left whitespace-nowrap">Position</th>
                                                <th className="py-3 px-4 md:px-6 text-left whitespace-nowrap">Job Type</th>
                                                <th className="py-3 px-4 md:px-6 text-left whitespace-nowrap">Date</th>
                                                <th className="py-3 px-4 md:px-6 text-left whitespace-nowrap">Apply Status</th>
                                          </tr>
                                    </thead>
                                    <tbody className="text-gray-800 text-xs md:text-sm font-light">
                                          {data?.data?.slice(0, 5)?.map((job, index) => (
                                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                                      <td className="py-3 px-4 md:px-6 text-left">{job.job_post.company_info.name}</td>
                                                      <td className="py-3 px-4 md:px-6 text-left">{job.job_post.job_title}</td>
                                                      <td className="py-3 px-4 md:px-6 text-left">{job?.job_post?.job_type}</td>
                                                      <td className="py-3 px-4 md:px-6 text-left">
                                                            {new Date(job.created_at).toLocaleDateString("en-US", {
                                                                  year: "numeric",
                                                                  month: "long",
                                                                  day: "numeric",
                                                            })}
                                                      </td>
                                                      <td className="py-3 px-4 md:px-6 text-left">
                                                            <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>

                        {/* List for mobile screens */}
                        <div className="block md:hidden w-ful mb-3">
                              <ul className="divide-y divide-gray-200">
                                    {data?.data?.slice(0, 5)?.map((job, index) => (
                                          <li key={index} className="p-4">
                                                <div className="flex items-center justify-between">
                                                      <div>
                                                            <p className="text-sm font-medium text-gray-900">{job.job_post.company_info.name}</p>
                                                            <p className="text-sm text-gray-500">{job.job_post.job_title}</p>
                                                            <p className="text-sm text-gray-500">{job?.job_post?.job_type}</p>
                                                            <p className="text-sm text-gray-500">
                                                                  {new Date(job.created_at).toLocaleDateString("en-US", {
                                                                        year: "numeric",
                                                                        month: "long",
                                                                        day: "numeric",
                                                                  })}
                                                            </p>
                                                            <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                                                      </div>
                                                </div>
                                          </li>
                                    ))}
                              </ul>
                        </div>
                  </div>
            </div>
      );
}

export default ApplySort;