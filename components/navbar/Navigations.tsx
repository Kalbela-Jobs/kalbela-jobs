import { useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import useApiRequest from "@/app/hooks/useApiRequest"

import PrimaryBtn from "../PrimaryBtn"
import SecondaryBtn from "../SecondaryBtn"
import { Button } from "../ui/button"

export function Navigations() {
      const router = useRouter()
      const [activeDropdown, setActiveDropdown] = useState<
            "categories" | "resources" | null
      >(null)
      const closeTimeoutRef = useRef<any>(null)

      const { data, loading, error } = useApiRequest<any>(
            "category/top-five",
            "GET"
      )

      const {
            data: careerResources,
            loading: loading2,
            error: error2,
      } = useApiRequest<any>("resource/category", "GET")

      const handleMouseEnter = (dropdown: "categories" | "resources") => {
            if (closeTimeoutRef.current) {
                  clearTimeout(closeTimeoutRef.current)
                  closeTimeoutRef.current = null
            }
            setActiveDropdown(dropdown)
      }

      const handleMouseLeave = () => {
            closeTimeoutRef.current = setTimeout(() => {
                  setActiveDropdown(null)
            }, 300)
      }

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
            <section className="hidden text-gray-900 dark:text-slate-200 lg:block">
                  <nav className="flex justify-center gap-4">

                        <div
                              className="relative inline-flex"
                              onMouseEnter={() => handleMouseEnter("categories")}
                              onMouseLeave={handleMouseLeave}
                        >
                              <SecondaryBtn className="flex items-center gap-2 px-4 py-2">
                                    Job Categories
                                    <ChevronDown
                                          className={`h-2.5 w-2.5 transform transition-transform ${activeDropdown === "categories" ? "rotate-180" : ""
                                                }`}
                                    />
                              </SecondaryBtn>

                              {activeDropdown === "categories" && (
                                    <div
                                          id="categories-dropdown"
                                          className="absolute top-full z-50 mt-2 w-[45rem] text-nowrap rounded-sm border bg-white/90 shadow-lg dark:bg-slate-700"
                                    >
                                          <ul
                                                className="grid max-h-[19rem] grid-cols-3 overflow-y-auto px-4 py-1"
                                                style={{ scrollbarWidth: "none" }}
                                          >
                                                {loading && (
                                                      <li className="p-4 text-gray-500">Loading categories...</li>
                                                )}
                                                {error && (
                                                      <li className="p-4 text-red-500">
                                                            Failed to load categories
                                                      </li>
                                                )}
                                                {data?.data?.map((section: any, index: number) => (
                                                      <div key={index}>
                                                            <h2 className="mb-2 px-2 py-2 text-sm font-bold">
                                                                  {section.megaCategory}
                                                            </h2>
                                                            <hr className="mb-2 border-gray-200" />
                                                            <ul className="mb-4 space-y-1">
                                                                  {section.categories.map((category: any) => (
                                                                        <li key={category._id}>
                                                                              <button
                                                                                    onClick={() => {
                                                                                          handleRedirectToSearchDetails(category?.slag)

                                                                                    }}
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
                                                      </div>
                                                ))}
                                          </ul>
                                    </div>
                              )}
                        </div>

                        {/* Career Resources Dropdown */}
                        <div
                              className="relative inline-flex"
                              onMouseEnter={() => handleMouseEnter("resources")}
                              onMouseLeave={handleMouseLeave}
                        >
                              <Link href="/career-resources">
                                    <SecondaryBtn className="flex items-center gap-2 px-4 py-2">
                                          Career Resources
                                          <ChevronDown
                                                className={`h-2.5 w-2.5 transform transition-transform ${activeDropdown === "resources" ? "rotate-180" : ""
                                                      }`}
                                          />
                                    </SecondaryBtn>
                              </Link>

                              {activeDropdown === "resources" && (
                                    <div
                                          id="resources-dropdown"
                                          className="absolute top-full mt-2 w-fit text-nowrap rounded-sm bg-white/90 shadow-lg transition-opacity duration-300 dark:bg-slate-700"
                                    >
                                          <ul
                                                className="max-h-[19.5rem] min-w-52 overflow-y-auto py-1"
                                                style={{ scrollbarWidth: "none" }}
                                          >
                                                {loading2 && (
                                                      <li className="p-4 text-gray-500">Loading resources...</li>
                                                )}
                                                {error2 && (
                                                      <li className="p-4 text-red-500">Failed to load resources</li>
                                                )}
                                                {careerResources?.data?.map((resource: any) => (
                                                      <li key={resource?._id}>
                                                            <Button
                                                                  onClick={() => {
                                                                        handleRedirectToCareerResources(resource?.slug)

                                                                  }}
                                                                  variant="link"
                                                                  className="block w-full px-4 text-left text-sm hover:bg-gray-100 hover:text-gray-800 hover:no-underline"
                                                            >
                                                                  {resource.name}
                                                            </Button>
                                                      </li>
                                                ))}
                                          </ul>
                                    </div>
                              )}
                        </div>


                  </nav>
            </section>
      )
}
