"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BellRing, Filter } from "lucide-react"
import { useTheme } from "next-themes"
import { selectCustomStyles } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import JobCardSkeleton from "@/components/JobCardSkeleton"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import PrimaryBtn from "@/components/PrimaryBtn"
import useJobsSearch from "@/app/hooks/useJobSearch"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"
import FilterSelect from "./components/FilterSelect"
import JobcardLarge from "./components/JobCardLarge"
import NoVacancies from "./components/NoVacancies"
import {
      Pagination,
      PaginationContent,
      PaginationItem,
      PaginationLink,
      PaginationNext,
      PaginationPrevious,
} from "@/components/ui/Pagination"
import Breadcrumbs from "@/components/Breadcrumbs"
import { Navigation, Autoplay } from "swiper/modules"; // Import Autoplay module
import { Search } from "lucide-react"




const ITEMS_PER_PAGE = 10

const SearchDetails: React.FC = () => {
      const { theme } = useTheme()
      const customStyles = selectCustomStyles(theme || "light")

      const searchParams = useSearchParams()

      const searchQuery = searchParams.get("query")
      const locationParams = searchParams.get("location")
      const job_type_params = searchParams.get("job_type")
      const categoryParams = searchParams.get("category")
      const salaryParams = searchParams.get("salary")

      const [query, setQuery] = useState(searchQuery || "")
      const [location, setLocation] = useState(locationParams || "")
      const [job_type, setJobType] = useState(job_type_params || "")
      const [category, setCategory] = useState(categoryParams || "")
      const [salaryRange, setSalaryRange] = useState<string>(salaryParams || "");


      const [currentPage, setCurrentPage] = useState(1)
      const [sortOrder, setSortOrder] = useState("Relevance")


      const pathname = usePathname()
      const pathSegments = pathname.split("/").filter(Boolean)


      const { jobs, totalJobs, loading } = useJobsSearch({
            endpoint: "jobs",
            search: query,
            pageNumber: currentPage,
            location,
            job_type,
            category,
            salary_range: salaryRange,
            limit: ITEMS_PER_PAGE,
      })

      const totalPages = Math.ceil(totalJobs / ITEMS_PER_PAGE)
      // const totalPages = 100

      useEffect(() => {
            setCategory(searchParams.get("category") || "")
            setCurrentPage(1) // Reset to first page when search params change
      }, [searchParams])

      const handlePageChange = (page: number) => {
            setCurrentPage(page)
      }

      const handleSortChange = (selectedOption: { value: string; label: string } | null) => {
            if (selectedOption) {
                  setSortOrder(selectedOption.value)
                  const sortedJobs = [...jobs]
                  if (selectedOption.value === "Date") {
                        sortedJobs.reverse()
                  }

            }
      }

      const [pageGroup, setPageGroup] = useState(0);
      const itemsPerPage = 8;

      const totalGroups = Math.ceil(totalPages / itemsPerPage);
      const startPage = pageGroup * itemsPerPage + 1;
      const endPage = Math.min(startPage + itemsPerPage - 1, totalPages);

      const handleNextGroup = () => {
            if (pageGroup < totalGroups - 1) {
                  setPageGroup(pageGroup + 1);
            }
      };

      const handlePrevGroup = () => {
            if (pageGroup > 0) {
                  setPageGroup(pageGroup - 1);
            }
      };



      return (
            <section className=" pt-6">
                  <MaxWidthWrapper>
                        <Breadcrumbs />
                  </MaxWidthWrapper>

                  <MaxWidthWrapper className="pt-2 lg:hidden ">
                        <div className="flex items-center gap-2 flex-nowrap overflow-x-auto w-full">
                              <Sheet>
                                    <SheetTrigger asChild>
                                          <button className="flex w-[107px] items-center justify-between px-3 text-sm border rounded-full py-2 bg-white">
                                                <Filter className="size-4" /> Filter All
                                          </button>
                                    </SheetTrigger>
                                    <SheetContent className="h-[90vh] overflow-y-auto" side="bottom">
                                          <SheetHeader className="mb-4">
                                                <SheetTitle>All Filters</SheetTitle>
                                          </SheetHeader>
                                          <div className="bg-white dark:text-white text-gray-800 flex flex-col items-center justify-center gap-2 px-4 pb-4 pt-6 shadow  rounded-md mb-3">
                                                <h1 className=" font-semibold text-xl">Keyword Search</h1>

                                                <div className="flex w-full mt-2 items-center border border-[#a6a6a7] rounded">
                                                      <input onChange={(e) => setQuery(e.target.value)} placeholder="Search" type="text" name='search' className="bg-transparent w-full h-full focus:outline-none focus-within:outline-none p-2" />
                                                      <button className="bg-[#008BDC] cursor-default flex items-center justify-center w-16 h-11 text-white"><Search size={22} className=" text-white" /></button>
                                                </div>
                                          </div>
                                          <div className="w-full rounded border p-4 shadow-sm">
                                                <FilterSelect
                                                      customStyles={customStyles}
                                                      location={location}
                                                      setLocation={setLocation}
                                                      job_type={job_type}
                                                      setJobType={setJobType}
                                                      category={category}
                                                      setCategory={setCategory}
                                                      setSalaryRange={setSalaryRange}
                                                />
                                          </div>
                                    </SheetContent>
                              </Sheet>

                              {location &&
                                    <button className="flex items-center justify-between px-3 text-sm border rounded-full py-2 bg-white">
                                          Location
                                    </button>}

                              {salaryRange &&
                                    <button className="flex items-center justify-between px-3 text-sm border rounded-full py-2 bg-white">
                                          Salary
                                    </button>
                              }

                              {job_type &&
                                    <button className="flex items-center justify-between px-3 text-sm border rounded-full py-2 bg-white">
                                          Job Type
                                    </button>}

                              {category &&
                                    <button className="flex items-center justify-between px-3 text-sm border rounded-full py-2 bg-white">
                                          Category
                                    </button>}
                        </div>
                  </MaxWidthWrapper>

                  <MaxWidthWrapper>
                        {/* <div className="">
                              <h1 className="text-2xl font-bold text-center">{totalJobs} {jobs.length === 1 ? "Job" : "Jobs"}</h1>
                              <p className="text-center text-gray-600 mt-3">Latest Web Development Intern Jobs in Bangladesh</p>
                        </div> */}
                  </MaxWidthWrapper>

                  <MaxWidthWrapper className="flex flex-col gap-6 p-4 lg:flex-row sticky top-[56px]">
                        <aside className="hidden h-fit w-full  md:sticky md:top-20 lg:block lg:w-1/4 pt-5 ">

                              <div className="bg-white text-[#008BDC] flex items-center justify-center gap-2 px-4 pb-4 pt-6 shadow  rounded-md mb-4">
                                    <BellRing />
                                    <p className="">Save this search as alert</p>
                              </div>


                              <div className="bg-white dark:text-white text-gray-800 flex flex-col items-center justify-center gap-2 px-4 pb-4 pt-6 shadow  rounded-md mb-3">
                                    <h1 className=" font-semibold text-xl">Keyword Search</h1>

                                    <div className="flex w-full mt-2 items-center border border-[#a6a6a7] rounded">
                                          <input onChange={(e) => setQuery(e.target.value)} placeholder="Search" type="text" name='search' className="bg-transparent w-full h-full focus:outline-none focus-within:outline-none p-2" />
                                          <button className="bg-[#008BDC] cursor-default flex items-center justify-center w-16 h-11 text-white"><Search size={22} className=" text-white" /></button>
                                    </div>
                              </div>
                              <div className="bg-white px-4 pb-4 pt-6 shadow  rounded-md mb-2">

                                    <div className="mb-4 text-md text-center font-semibold flex items-center justify-center gap-1"><Filter color="#008BDC" strokeWidth={1.3} />Filters</div>
                                    <FilterSelect
                                          customStyles={customStyles}
                                          location={location}
                                          setLocation={setLocation}
                                          job_type={job_type}
                                          setJobType={setJobType}
                                          category={category}
                                          setCategory={setCategory}
                                          setSalaryRange={setSalaryRange}
                                    />
                              </div>



                        </aside>

                        <div className="flex-grow lg:w-3/4">
                              <br />
                              {loading ? (
                                    <div className="space-y-4">
                                          {[...Array(3)].map((_, index) => (
                                                <JobCardSkeleton key={index} />
                                          ))}
                                    </div>
                              ) : (
                                    <div className="space-y-4">
                                          {jobs?.length > 0 ? (
                                                jobs?.map((job, index) => <JobcardLarge job={job} key={index} />)
                                          ) : (
                                                <div className="flex min-h-[60vh] items-center justify-center">
                                                      <NoVacancies />
                                                </div>
                                          )}
                                    </div>
                              )}

                              {totalPages && totalPages > 1 && (
                                    <MinimalPagination
                                          totalPages={totalPages}
                                          currentPage={currentPage}
                                          handlePageChange={handlePageChange}
                                          handlePrevGroup={handlePrevGroup}
                                          handleNextGroup={handleNextGroup}
                                    />
                              )}



                        </div>
                  </MaxWidthWrapper>
            </section>
      )
}

export default SearchDetails





type PaginationProps = {
      totalPages: number;
      currentPage: number;
      handlePageChange: (page: number) => void;
      handlePrevGroup: () => void;
      handleNextGroup: () => void;
};

const MinimalPagination: React.FC<PaginationProps> = ({
      totalPages,
      currentPage,
      handlePageChange,
      handlePrevGroup,
      handleNextGroup,
}) => {
      const pageGroup = Math.floor(currentPage / 5);
      const startPage = pageGroup * 5 + 1;
      const endPage = Math.min(startPage + 4, totalPages);
      const totalGroups = Math.ceil(totalPages / 5);

      return (
            totalPages > 1 && (
                  <Pagination className="mt-8 flex justify-center">
                        <PaginationContent>
                              <div className="flex items-center gap-2">
                                    {pageGroup > 0 && (
                                          <PaginationItem>
                                                <PaginationPrevious href="#" onClick={handlePrevGroup}>
                                                      &lt;
                                                </PaginationPrevious>
                                          </PaginationItem>
                                    )}
                                    {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                                          <PaginationItem key={startPage + index}>
                                                <PaginationLink
                                                      className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === startPage + index
                                                            ? "bg-blue-500 text-white"
                                                            : "bg-gray-200 text-gray-700"
                                                            }`}
                                                      href="#"
                                                      onClick={() => handlePageChange(startPage + index)}
                                                >
                                                      {startPage + index}
                                                </PaginationLink>
                                          </PaginationItem>
                                    ))}
                                    {pageGroup < totalGroups - 1 && (
                                          <PaginationItem>
                                                <PaginationNext href="#" onClick={handleNextGroup}>
                                                      &gt;
                                                </PaginationNext>
                                          </PaginationItem>
                                    )}
                              </div>
                        </PaginationContent>
                  </Pagination>
            )
      );
};
