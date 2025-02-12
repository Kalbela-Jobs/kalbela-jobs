"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUserData } from "@/utils/encript_decript"

import { cn } from "@/lib/utils"
import {
      Accordion,
      AccordionContent,
      AccordionItem,
      AccordionTrigger,
} from "@/components/ui/accordion"
import useApiRequest from "@/app/hooks/useApiRequest"

import PrimaryBtn from "../PrimaryBtn"
import SecondaryBtn from "../SecondaryBtn"
import { Button } from "../ui/button"

const MobileNav: React.FC<{ setIsMobileNavOpen: (open: boolean) => void }> = ({ setIsMobileNavOpen }) => {
      const [user] = useUserData()
      const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
      const [userLoading, setUserLoading] = useState(true)

      const router = useRouter()
      const { data, loading, error } = useApiRequest<any>(
            "category/top-five",
            "GET"
      )
      const {
            data: careerResources,
            loading: loading2,
            error: error2,
      } = useApiRequest<any>("resource/category", "GET")

      useEffect(() => {
            ; (async () => {
                  try {
                        setUserLoading(true)
                        setIsAuthenticated(!!user)
                  } catch (error) {
                        console.error("Error fetching user data:", error)
                        setIsAuthenticated(false)
                  } finally {
                        setUserLoading(false)
                  }
            })()
      }, [])

      const handleRedirectToSearchDetails = (category: string) => {
            const queryParams = new URLSearchParams({
                  category: category,
            }).toString()
            router.push(`/search-details?${queryParams}`)
      }

      const handleRedirectToCareerResources = (resource: string) => {
            const queryParams = new URLSearchParams({
                  resource: resource,
            }).toString()
            router.push(`/career-resources?${queryParams}`)
      }

      return (
            <div className="text-gray-900 dark:bg-gray-900 dark:text-slate-200">
                  <Accordion type="single" collapsible className="w-full">
                        {loading && (
                              <div className="p-4 text-gray-500">Loading categories...</div>
                        )}
                        {error && (
                              <div className="p-4 text-red-500">Failed to load categories</div>
                        )}
                        {data?.data?.map((section: any, index: number) => (
                              <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-sm font-bold hover:no-underline">
                                          {section.megaCategory}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                          <ul className="space-y-1">
                                                {section.categories.map((category: any) => (
                                                      <li key={category._id}>
                                                            <button
                                                                  onClick={() => {
                                                                        handleRedirectToSearchDetails(category?.slag)
                                                                        setIsMobileNavOpen(false)
                                                                  }
                                                                  }
                                                                  className={cn(
                                                                        "w-full rounded-md px-3 py-2 text-left text-sm",
                                                                        "hover:bg-gray-100 hover:text-gray-900",
                                                                        "transition-colors duration-200",
                                                                        "focus:outline-none focus:ring-2 focus:ring-gray-200"
                                                                  )}
                                                            >
                                                                  <span>{category.name}</span>
                                                                  {category.jobCount > 0 && (
                                                                        <span className="ml-1.5 text-xs text-gray-400">
                                                                              ({category.jobCount})
                                                                        </span>
                                                                  )}
                                                            </button>
                                                      </li>
                                                ))}
                                          </ul>
                                    </AccordionContent>
                              </AccordionItem>
                        ))}

                        <AccordionItem value="career-resources">
                              <AccordionTrigger className="text-sm font-bold hover:no-underline">
                                    Career Resources
                              </AccordionTrigger>
                              <AccordionContent>
                                    <ul className="space-y-1">
                                          {careerResources?.data?.map((resource: any) => (
                                                <li key={resource?._id}>
                                                      <Button
                                                            onClick={() => {
                                                                  handleRedirectToCareerResources(resource?.slug)
                                                                  setIsMobileNavOpen(false)
                                                            }}
                                                            variant="link"
                                                            className="block w-full px-4 text-left text-sm hover:bg-gray-100 hover:text-gray-800 hover:no-underline"
                                                      >
                                                            {resource.name}
                                                      </Button>
                                                </li>
                                          ))}
                                    </ul>
                              </AccordionContent>
                        </AccordionItem>
                  </Accordion>
            </div >
      )
}

export default MobileNav
