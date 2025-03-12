"use client"

import { useUserData } from "@/utils/encript_decript"

import useApiRequest from "@/app/hooks/useApiRequest"
import ApplySort from "./components/apply_sort"
import UserActivity from "./components/user_activity"
import DisplayTab from "./components/DisplayTab"
import { useSearchParams } from "next/navigation"
import DisplayCardBox from "./components/DisplayCardBox"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import DashboardInfo from "./components/DashboardInfo"

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

      const queryClient = new QueryClient();
      return (
            <div>
                  <div className="">
                        {/* <div className="mx-auto">
                                    <div className="md:flex md:items-center">
                                          <p className="text-base font-bold">Hey {user?.fullName} -</p>
                                          <p className="mt-1 text-base font-medium text-gray-500 md:ml-2 md:mt-0">
                                                here's what's happening with your store today
                                          </p>
                                    </div>
                              </div> */}
                        <QueryClientProvider client={queryClient}>
                              <div className="mx-auto mt-2">
                                    <div className="space-y-5 sm:space-y-6">
                                          <DisplayTab />
                                          <DisplayCardBox />
                                    </div>

                                    <br />
                                    {/* <div className="">
                                          <DashboardInfo />
                                    </div> */}

                                    <div className="mx-auto md:mb-0 mb-[90px] mt-8 w-full ">
                                          <div className="space-y-5 w-full  sm:space-y-6">
                                                <div className=" grid grid-cols-1  gap-5 sm:gap-6 lg:grid-cols-3 w-full">
                                                      <ApplySort />
                                                      <UserActivity />
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </QueryClientProvider>
                  </div>
            </div >
      )
}

export default page
