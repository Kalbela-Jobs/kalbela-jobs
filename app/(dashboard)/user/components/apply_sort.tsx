"use client"
import { useUserData } from "@/utils/encript_decript"

import useApiRequest from "@/app/hooks/useApiRequest"
import Link from "next/link"
import { CalendarIcon, CircleIcon } from "lucide-react"

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
      status: "Applied" | "In Review" | "Interview" | "Offer" | "Rejected"
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
      return (

            <div className="overflow-hidden rounded-xl border border-gray-200 lg:col-span-4">
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
                  <div className="overflow-x-auto">
                        <table className="w-full border-collapse">

                              <tbody className="divide-y divide-gray-200">
                                    {data?.data?.slice(0, 5)?.map((job: Job, index: number) => (
                                          <Link key={index} className="hover:bg-gray-50" href={`/user/applied-jobs/${job?._id}`}>
                                                {/* <td className="px-4 py-4">
                                                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-900">
                                                            <CircleIcon className="mr-1 h-2 w-2 text-green-500" />
                                                            {job.status}
                                                      </span>
                                                </td> */}
                                                <td className="px-4 py-4">
                                                      <p className="text-sm font-semibold text-gray-900">{job.job_post.job_title}</p>
                                                      <p className="text-sm text-gray-700">{job.job_post.company_info.name}</p>
                                                </td>
                                                <td className="px-4 py-4">
                                                      <p className="text-sm whitespace-nowrap text-gray-700">{job?.job_post?.job_type}</p>
                                                </td>

                                                <td className="px-4 py-4">
                                                      <div className="flex items-center whitespace-nowrap text-sm text-gray-500">
                                                            <CalendarIcon className="mr-1.5 h-4 w-4" />
                                                            {new Date(job.created_at).toLocaleDateString("en-US", {
                                                                  year: "numeric",
                                                                  month: "long",
                                                                  day: "numeric",
                                                            })}
                                                      </div>
                                                </td>
                                          </Link>
                                    ))}
                              </tbody>
                        </table>
                  </div>
            </div>

      );
}

export default ApplySort;
