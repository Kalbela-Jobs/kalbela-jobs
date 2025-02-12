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
                  <MaxWidthWrapper className="py-6 md:py-10">
                        <h2 className="mb-4 flex items-center text-xl font-bold md:text-3xl">
                              <span className="mr-2 text-red-500">🔥</span> Featured Jobs
                        </h2>
                        <div className="grid grid-cols-1 lg:gap-4 sm:grid-cols-1 lg:grid-cols-4">

                              <div className="grid gap-4 grid-cols-2 lg:grid-cols-3  col-span-3">
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
                                                                  <img
                                                                        className="h-full w-20 rounded border-2 border-gray-300 bg-white object-contain p-2 shadow-md"
                                                                        src={
                                                                              job?.company_info?.logo ||
                                                                              "https://via.placeholder.com/64"
                                                                        }
                                                                        alt={job?.company_info?.name || "Company Logo"}
                                                                  />
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

                              <div>
                                    <Govt_jobs />
                              </div>
                        </div>

                  </MaxWidthWrapper>
            </section >
      )
}

export default FeaturedJobs
