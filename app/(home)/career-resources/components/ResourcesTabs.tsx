"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useApiRequest from "@/app/hooks/useApiRequest"

import Resource from "./Resource"

const ResourcesTabs = () => {
      const {
            data: careerResources,
            loading,
            error,
      } = useApiRequest<any>("resource/category", "GET")



      const queryParams = useSearchParams()
      const router = useRouter()

      const resourceSlugFromQuery =
            queryParams.get("resource") ||
            careerResources?.data[0]?.slug ||
            "resume-tips"
      const [selectedTab, setSelectedTab] = useState(resourceSlugFromQuery)

      useEffect(() => {
            setSelectedTab(resourceSlugFromQuery)
      }, [resourceSlugFromQuery])

      const handleTabChange = (slug: string) => {
            setSelectedTab(slug)
            router.push(`?resource=${slug}`)
      }

      if (loading && !careerResources?.data?.length) {
            return (
                  <div>
                        <Skeleton className="mb-4 h-6 w-32" />
                        <Skeleton className="mb-2 h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                  </div>
            )
      }

      if (error) {
            return <div>Error loading resources.</div>
      }

      return (
            <Tabs
                  value={selectedTab}
                  onValueChange={handleTabChange}

            >
                  <TabsList className="overflow-x-scroll flex justify-start scrollbar-hide w-full text-ellipsis whitespace-nowrap">
                        {careerResources?.data?.map((resource: any) => (
                              <TabsTrigger
                                    className=" font-semibold"
                                    key={resource._id}
                                    value={resource.slug}
                              >

                                    {resource.name}
                              </TabsTrigger>
                        ))}
                  </TabsList>
                  {careerResources?.data?.map((resource: any) => (
                        <TabsContent key={resource._id} value={resource.slug}>
                              <Resource
                                    resourceSlugFromQuery={resourceSlugFromQuery}
                                    resource={resource}
                              />
                        </TabsContent>
                  ))}
            </Tabs>
      )
}

export default ResourcesTabs
