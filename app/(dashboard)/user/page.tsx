"use client"

import { useUserData } from "@/utils/encript_decript"

import useApiRequest from "@/app/hooks/useApiRequest"
import ApplySort from "./components/apply_sort"
import UserActivity from "./components/user_activity"

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

const page = () => {
      const [user] = useUserData()

      const { data, loading, error } = useApiRequest<ApiResponse>(
            `user/get-applied-jobs?user_id=${user?._id}`,
            "GET"
      )

      const jobs = data?.data || []

      return (
            <div className="flex flex-1 flex-col overflow-x-hidden">
                  <div className="py-6">
                        <div className="mx-auto">
                              <div className="md:flex md:items-center">
                                    <p className="text-base font-bold">Hey {user?.fullName} -</p>
                                    <p className="mt-1 text-base font-medium text-gray-500 md:ml-2 md:mt-0">
                                          here's what's happening with your store today
                                    </p>
                              </div>
                        </div>
                        <div className="mx-auto mt-8">
                              <div className="space-y-5 sm:space-y-6">
                                    <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-6">
                                          <ApplySort />
                                          <UserActivity/>
                                          {/* <div className="overflow-hidden rounded-xl border border-gray-200 lg:col-span-2">
                                                <div className="px-4 py-5 sm:p-6">
                                                      <div>
                                                            <p className="text-base font-bold">Recent Activity</p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500">
                                                                 Here have your all activity sortly
                                                            </p>
                                                      </div>

                                                      <div className="mt-8">
                                                            <a
                                                                  href="#"
                                                                  title=""
                                                                  className="hover: inline-flex items-center text-xs font-semibold uppercase tracking-widest text-gray-500"
                                                            >
                                                                  See all Customers
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
                                                            </a>
                                                      </div>
                                                </div>
                                          </div> */}
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default page
