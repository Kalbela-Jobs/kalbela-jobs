"use client"

import { Suspense } from "react"
import { useParams } from "next/navigation"
import useApiRequest from "@/app/hooks/useApiRequest"
import CompanyJobs from "./components/CompanyJobs"
import CompanyProfile from "./components/CompanyProfile"
import { Skeleton } from "@/components/ui/skeleton"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const Companies = () => {
      const { slug } = useParams()
      const { data, loading, error } = useApiRequest<any>(`jobs/organization-jobs?slug=${slug}`, "GET")

      return (
            <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background dark:from-primary-950 dark:to-background">
                  <div
                        className="h-72 bg-cover bg-center relative"
                        style={{
                              backgroundImage: `url(${data?.data?.company_info?.cover_image || "https://www.shutterstock.com/image-vector/abstract-background-dark-blue-modern-600nw-1721084605.jpg"})`,
                        }}
                  >
                        <div className="absolute inset-0 bg-black/50" />
                  </div>
                  <MaxWidthWrapper className="relative -mt-24">
                        <div className="flex flex-col lg:flex-row lg:gap-8">
                              <div className="lg:w-1/3">
                                    <div className="lg:sticky lg:top-20">
                                          <CompanyProfile company_info={data?.data?.company_info} />
                                    </div>
                              </div>
                              <div className="lg:w-2/3">
                                    <Suspense fallback={<CompanyJobsSkeleton />}>
                                          <CompanyJobs jobs={data?.data?.jobs} loading={loading} />
                                    </Suspense>
                              </div>
                        </div>
                  </MaxWidthWrapper>
            </div>
      )
}

const CompanyJobsSkeleton = () => (
      <div className="mt-8 space-y-8">
            <Skeleton className="h-12 w-64" />
            <div className="space-y-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="h-48 w-full" />
                  ))}
            </div>
      </div>
)

export default Companies
