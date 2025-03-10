"use client"

import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import useApiRequest from "@/app/hooks/useApiRequest"
import Govt_jobs from "./Govt_jobs"

const FeaturedJobs: React.FC = () => {
      const { data, loading, error } = useApiRequest<any>(
            "jobs/get-featured-jobs",
            "GET"
      )

      console.log("data from featured jobs", data)

      return (
            <section>
                  <MaxWidthWrapper className="py-0 md:py-2 md:mt-[30px] mt-[25px]">
                       
                       <div className="grid grid-cols-1 lg:gap-4 sm:grid-cols-1 lg:grid-cols-4">
                        <div className=" col-span-3">
                        <h2 className="mb-4 flex items-center  font-bold text-[1.5rem]">
                              <span className="mr-2 text-red-500">🔥</span> Hot Jobs
                        </h2>
                       <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 ">
                       {loading
                                          ? Array.from({ length: 16 }).map((_, index) => (
                                                <div
                                                      key={index}
                                                      className="flex flex-col items-start rounded-sm border p-4 md:flex-row"
                                                >
                                                      <Skeleton className="mr-3 h-14 w-14 rounded-full" />
                                                      <div className="flex-grow">
                                                            <Skeleton className="mb-2 h-5 w-24" />
                                                            <Skeleton className="h-4 w-32" />
                                                      </div>
                                                </div>
                                          ))
                                          : data?.data?.map((job: any) => (
                                                <Link
                                                      href={`/jobs/${job.url}`}
                                                      key={job._id}
                                                      className="group flex justify-start flex-col md:flex-row w-full  items-center gap-2  overflow-hidden rounded-sm border p-2  hover:bg-[#001968] hover:bg-opacity-15"
                                                >
                                                      <div className="">
                                                            <div className="h-16 w-16">
                                                                  {job?.company_info?.logo ? (
                                                                        <img
                                                                              className="h-full w-20 rounded border-2 border-gray-300 bg-white object-contain p-2 shadow-md"
                                                                              src={job.company_info.logo}
                                                                              alt={job.company_info.name || "Company Logo"}
                                                                        />
                                                                  ) : (
                                                                        <div className="flex justify-center items-center h-full rounded border-2 border-gray-300 bg-white object-contain p-2 shadow-md">
                                                                              <span className="text-xl font-semibold text-gray-600">
                                                                                    {job?.company_info?.name?.charAt(0).toUpperCase() || "C"}
                                                                              </span>
                                                                        </div>
                                                                  )}
                                                            </div>
                                                      </div>

                                                      <div className="flex-grow  gap-1 text-center md:text-start">
                                                            <h3 className="font-semibold text-sm capitalize group-hover:text-blue-500">

                                                                  {job.job_title}
                                                            </h3>
                                                            <p className="text-xs"> {job.company_info?.name}</p>
                                                      </div>


                                                </Link>
                                          ))}
                        </div>
                        </div>
                        <div>
                        <h2 className="md:mb-4 mb-2 md:mt-0 mt-3 flex items-center  font-bold text-[1.5rem]">
                        <img
                                          src="https://image.kalbelajobs.com/api/v1/image/679674886283397bf670bc7d.png"
                                          alt="Government Jobs"
                                          className="mr-2 w-6 h-6 rounded-full"
                                    /> Government Jobs
                        </h2>
                        <Govt_jobs />
                        </div>
                       </div>
                        

                  </MaxWidthWrapper>
            </section >
      )
}

export default FeaturedJobs
