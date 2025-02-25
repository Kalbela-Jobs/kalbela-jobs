"use client"
import { useUserData } from "@/utils/encript_decript"

import useApiRequest from "@/app/hooks/useApiRequest"
import Link from "next/link"

type Job = {
      _id: string
      job_post: {
            company_info: {
                  name: string
                  logo: string
            }
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
                  <div className="divide-y divide-gray-200">
                        {data?.data?.slice(0, 5)?.map((job: any) => (
                              <div className="grid grid-cols-3 gap-y-4 py-4 lg:grid-cols-6 lg:gap-0">
                                    <div className="col-span-2 px-4 sm:px-6 lg:col-span-1 lg:py-4">
                                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-900">
                                                <svg
                                                      className="-ml-1 mr-1.5 h-2.5 w-2.5 text-green-500"
                                                      fill="currentColor"
                                                      viewBox="0 0 8 8"
                                                >
                                                      <circle cx={4} cy={4} r={3} />
                                                </svg>
                                                {job.status}
                                          </span>
                                    </div>
                                    <div className="px-4 text-right sm:px-6 lg:order-last lg:py-4">
                                          <button
                                                type="button"
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 transition-all duration-200 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                                          >
                                                <svg
                                                      className="h-6 w-6"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                      strokeWidth={2}
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                      />
                                                </svg>
                                          </button>
                                    </div>
                                    <div className="px-4 sm:px-6 lg:col-span-2 lg:py-4">
                                          <p className="text-sm font-bold">
                                                {job?.job_post?.job_title}
                                          </p>
                                          <p className="mt-1 text-sm font-medium text-gray-500">
                                                {job?.job_post?.company_info?.name}
                                          </p>
                                    </div>
                                    <div className="px-4 sm:px-6 lg:py-4">
                                          <p className="text-sm font-bold">
                                                {job.job_post?.job_type}
                                          </p>
                                          <p className="mt-1 whitespace-nowrap text-sm font-medium text-gray-500">
                                                {new Date(job?.created_at).toLocaleDateString(
                                                      "en-US",
                                                      {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                      }
                                                )}
                                          </p>
                                    </div>
                                    <div className="px-4 sm:px-6 lg:py-4">
                                          <p className="mt-1 text-sm font-medium text-gray-500">
                                                {job?.job_post?.company_info?.name}
                                          </p>
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>

      );
}

export default ApplySort;
