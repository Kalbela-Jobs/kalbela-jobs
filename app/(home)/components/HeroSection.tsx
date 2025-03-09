
"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Activity, Award, Briefcase, Building, Clock, Search, TrendingUp, Users, X } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import PrimaryBtn from "@/components/PrimaryBtn"
import { TypingRandomizedTextEffect } from "@/components/RandomizedTextEffect"
import useApiRequest from "@/app/hooks/useApiRequest"
import Job_type_tag from "./Job_type_tag"

import Link from "next/link"
import SearchModal from "./Search"
import Image from "next/image"
import SearchBox from "./SearchBox"
import StatisticsList from "./StatisticsList"
import { Button } from "@/components/ui/button"

const locationSuggestions = ["dhaka", "chattogram", "khulna", "rajshahi", "sylhet", "barishal", "mymensingh", "rangpur"]

const statistics = [
      { title: "LIVE JOBS", value: "60+", icon: Activity, link: "/search-details" },
      { title: "VACANCIES", value: "200+", icon: Briefcase, link: "/search-details" },
      { title: "COMPANIES", value: "99+", icon: Building, link: "/" },
      { title: "FRESHERS JOBS", value: "50+", icon: Users, link: "/search-details?job_type=Internship" },
      { title: "GOVT JOBS", value: "30+", icon: TrendingUp, link: "/govt-jobs" },
      { title: "TOP INDUSTRIES", value: "20+", icon: Award, link: "/" },
]

const HeroSection = () => {
      const { theme } = useTheme()

      const { data, loading, error } = useApiRequest<any>("config/locations", "GET")
      const [searchHistory, setSearchHistory] = useState<string[]>([])
      const [filteredSearchHistory, setFilteredSearchHistory] = useState<string[]>([]) // Added state variable
      const router = useRouter()
      const [searchQuery, setSearchQuery] = useState("")
      const [location, setLocation] = useState("")
      const [filteredSkills, setFilteredSkills] = useState<string[]>([])
      const [showSkillDropdown, setShowSkillDropdown] = useState(false)
      const [isOpen, setIsOpen] = useState<boolean>(false);

      // Fetch skills from the API
      const fetchSkills = async (query: string) => {
            try {
                  const response = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/v1/jobs/get-suggestions?search=${query}`) // Update this with your actual API URL
                  const result = await response.json()
                  if (!result.error && result.data) {
                        const skills = result.data.map((item: { search: string }) => item.search)
                        setFilteredSkills(skills)
                  }
            } catch (error) {
                  console.error("Error fetching skills:", error)
            }
      }

      const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setSearchQuery(value)
            if (value) {
                  fetchSkills(value)
                  setShowSkillDropdown(true)
            } else {
                  setFilteredSkills([])
                  setShowSkillDropdown(false)
            }

            // Filter search history based on the current query
            const filteredHistory = searchHistory.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
            setFilteredSearchHistory(filteredHistory)
      }

      const handleSearch = () => {
            if (!searchQuery) return

            const queryParams = new URLSearchParams({
                  query: searchQuery,
                  location: location || "",
            }).toString()

            // Retrieve previous searches from cookies
            const previousSearches: string[] = Cookies.get("search_history")
                  ? JSON.parse(Cookies.get("search_history") as string)
                  : []

            // Add new search to the front of the array (Last-In, First-Out)
            if (!previousSearches.includes(searchQuery)) {
                  previousSearches.unshift(searchQuery)
            }
            const updatedSearches = previousSearches.slice(0, 5)

            // Update cookies with the new search history
            Cookies.set("search_history", JSON.stringify(updatedSearches), { expires: 7 })

            router.push(`/search-details?${queryParams}`)
      }

      React.useEffect(() => {
            const history = Cookies.get("search_history")
            if (history) {
                  const parsedHistory = JSON.parse(history)
                  setSearchHistory(parsedHistory)
                  setFilteredSearchHistory(parsedHistory)
            }
      }, [])

      const highlightMatch = (text: string, query: string) => {
            if (!query) return text
            const parts = text.toLowerCase().split(query.toLowerCase())
            const result = []
            for (let i = 0; i < parts.length; i++) {
                  if (i !== 0) {
                        const startIndex = text.toLowerCase().indexOf(query.toLowerCase(), parts.slice(0, i).join(query).length)
                        result.push(
                              <span key={`highlight-${i}`} className="text-primary">
                                    {text.slice(startIndex, startIndex + query.length)}
                              </span>,
                        )
                  }
                  if (parts[i]) {
                        result.push(<span key={`text-${i}`}>{parts[i]}</span>)
                  }
            }
            return result
      }

      const removeFromHistory = (itemToRemove: string, e: React.MouseEvent) => {
            e.stopPropagation()
            const updatedHistory = searchHistory.filter((item) => item !== itemToRemove)
            setSearchHistory(updatedHistory)
            setFilteredSearchHistory(updatedHistory.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase())))
            Cookies.set("search_history", JSON.stringify(updatedHistory), { expires: 7 })
      }

      return (
            <div className="z-50">
                  <MaxWidthWrapper className="flex flex-col  items-center space-y-4 py-6 md:py-2 md:pb-4 lg:pb-4">
                        <div className="rounded-md pt-4 pb-2 ">
                              <h1
                                    className="mt-4 bg-clip-text animate-marquee text-center text-[27px] font-bold leading-tight  md:text-4xl lg:mt-10 lg:text-5xl"
                                    style={{
                                          backgroundImage: "linear-gradient(to right, #001968, #0a4d92)",
                                          WebkitBackgroundClip: "text",
                                    }}
                              >
                                    Find Your Dream Jobs
                                    {/* <TypingRandomizedTextEffect text="Find Your Dream Jobs" /> */}
                              </h1>

                              <p className="!mb-2 mt-4 md:block hidden  md:max-w-4xl text-balance text-center text-lg font-medium md:text-sm">
                                    Your Career Starts Here with Kalbela Jobs! Discover the latest job opportunities in Bangladesh.
                              </p>
                              <p className="!mb-2 mt-4 md:hidden  block  md:max-w-4xl  text-center text-sm font-medium md:text-sm">
                                    Your Career Starts Here with Kalbela  Jobs! <br />Discover the latest job opportunities in Bangladesh.
                              </p>
                        </div>

                        {/* display search */}
                        <div className="dark:bg-[#040913] bg-white relative md:w-[740px] w-full z-10 !opacity-100 px-2 lg:py-2 py-0 rounded-full border md:h-[60px] h-[50px] flex items-center shadow-xl dark:shadow-[#2d384f18] shadow-[#80808018] overflow-hidden">
                              <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex  justify-between w-full  lg:text-xl text-xs items-center md:gap-2 font-sans">

                                    <div className="flex md:ml-3 items-center gap-1">
                                          <Search />
                                          <div className="flex items-center justify-between  w-full">
                                                <div className=" border-gray-300 p-2 w-full text-gray-500 text-nowrap overflow-hidden text-sm flex items-center md:gap-2  gap-1"> Search By keyword</div>

                                          </div>
                                    </div>

                                    {/* <div className=" p-2 md:flex hidden items-center gap-1">Select Location <ChevronDown strokeWidth={0.8} /> </div> */}
                                    <div className="flex gap-2 items-center md:pr-4 pr-2">
                                          <Image
                                                src={'./icons/mic.svg'}
                                                width={20}
                                                height={20}
                                                alt="mic"
                                                className="cursor-pointer "
                                          />


                                          {/* <Button size={"sm"} className='mr-3 bg-gray-600 !px-3  text-white bg-primary !rounded-full !py-1'>
                                                Search
                                          </Button> */}
                                    </div>
                              </div>
                        </div>

                        <SearchBox
                              searchQuery={searchQuery}
                              handleSkillChange={handleSkillChange}
                              handleSearch={handleSearch}
                              filteredSkills={filteredSkills}
                              filteredSearchHistory={filteredSearchHistory}
                              data={data}
                              location={location}
                              setLocation={setLocation}
                              showSkillDropdown={showSkillDropdown}
                              setShowSkillDropdown={setShowSkillDropdown}
                              theme={theme}
                              setSearchQuery={setSearchQuery}
                              removeFromHistory={removeFromHistory}
                              highlightMatch={highlightMatch}
                              isOpen={isOpen}
                              setIsOpen={setIsOpen}

                        />


                        {/* <SearchModal searchQuery={searchQuery}
                              setSearchQuery={setSearchQuery}
                              filteredSkills={filteredSkills}
                              filteredSearchHistory={filteredSearchHistory}
                              handleSkillChange={handleSkillChange}
                              removeFromHistory={removeFromHistory}
                              handleSearch={handleSearch}
                              location={location}
                              setLocation={setLocation}
                              data={data}
                              theme={theme} /> */}

                        <div className="!mt-[3px]">
                              <Job_type_tag />
                        </div>
                        <div className="  overflow-hidden ">
                              <StatisticsList />
                        </div>
                  </MaxWidthWrapper>
            </div>
      )
}

export default HeroSection
