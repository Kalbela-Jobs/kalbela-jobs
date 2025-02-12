// "use client"

// import * as React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Cookies from "js-cookie"
// import { Activity, Award, Briefcase, Building, Search, TrendingUp, Users } from "lucide-react"
// import { useTheme } from "next-themes"

// import { cn } from "@/lib/utils"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import MaxWidthWrapper from "@/components/MaxWidthWrapper"
// import PrimaryBtn from "@/components/PrimaryBtn"
// import { TypingRandomizedTextEffect } from "@/components/RandomizedTextEffect"
// import useApiRequest from "@/app/hooks/useApiRequest"
// import Job_type_tag from "./Job_type_tag"
// import { Separator } from "@/components/ui/separator"

// const locationSuggestions = ["dhaka", "chattogram", "khulna", "rajshahi", "sylhet", "barishal", "mymensingh", "rangpur"]

// const statistics = [
//       { title: "LIVE JOBS", value: "60+", icon: Activity },
//       { title: "VACANCIES", value: "200+", icon: Briefcase },
//       { title: "COMPANIES", value: "99+", icon: Building },
//       { title: "FRESHERS JOBS", value: "50+", icon: Users },
//       { title: "EXPERIENCED JOBS", value: "30+", icon: TrendingUp },
//       { title: "TOP INDUSTRIES", value: "20+", icon: Award },
// ]

// const HeroSection = () => {
//       const { theme } = useTheme()

//       const { data, loading, error } = useApiRequest<any>("config/locations", "GET")
//       const [searchHistory, setSearchHistory] = useState<string[]>([])
//       const [filteredSearchHistory, setFilteredSearchHistory] = useState<string[]>([]) // Added state variable
//       const router = useRouter()
//       const [searchQuery, setSearchQuery] = useState("")
//       const [location, setLocation] = useState("")
//       const [filteredSkills, setFilteredSkills] = useState<string[]>([])
//       const [showSkillDropdown, setShowSkillDropdown] = useState(false)


//       // Fetch skills from the API
//       const fetchSkills = async (query: string) => {
//             try {
//                   const response = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/v1/jobs/get-suggestions?search=${query}`) // Update this with your actual API URL
//                   const result = await response.json()
//                   if (!result.error && result.data) {
//                         const skills = result.data.map((item: { search: string }) => item.search)
//                         setFilteredSkills(skills)
//                   }
//             } catch (error) {
//                   console.error("Error fetching skills:", error)
//             }
//       }

//       const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//             const value = e.target.value
//             setSearchQuery(value)
//             if (value) {
//                   fetchSkills(value)
//                   setShowSkillDropdown(true)
//             } else {
//                   setFilteredSkills([])
//                   setShowSkillDropdown(false)
//             }

//             // Filter search history based on the current query
//             const filteredHistory = searchHistory.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
//             setFilteredSearchHistory(filteredHistory)
//       }

//       const handleSearch = () => {
//             if (!searchQuery) return

//             const queryParams = new URLSearchParams({
//                   query: searchQuery,
//                   location: location || "",
//             }).toString()

//             // Retrieve previous searches from cookies
//             const previousSearches: string[] = Cookies.get("search_history")
//                   ? JSON.parse(Cookies.get("search_history") as string)
//                   : []

//             // Add new search to the front of the array (Last-In, First-Out)
//             if (!previousSearches.includes(searchQuery)) {
//                   previousSearches.unshift(searchQuery)
//             }
//             const updatedSearches = previousSearches.slice(0, 5)

//             // Update cookies with the new search history
//             Cookies.set("search_history", JSON.stringify(updatedSearches), { expires: 7 })

//             router.push(`/search-details?${queryParams}`)
//       }

//       React.useEffect(() => {
//             const history = Cookies.get("search_history")
//             if (history) {
//                   const parsedHistory = JSON.parse(history)
//                   setSearchHistory(parsedHistory)
//                   setFilteredSearchHistory(parsedHistory)
//             }
//       }, [])

//       return (
//             <div className="z-40">
//                   <MaxWidthWrapper className="flex flex-col items-center space-y-4 py-6 md:py-2 md:pb-4 lg:pb-4">
//                         <div className="rounded-md py-4">
//                               <h1
//                                     className="mt-4 bg-clip-text text-center text-3xl font-bold leading-tight sm:text-4xl md:text-4xl lg:mt-10 lg:text-5xl"
//                                     style={{
//                                           backgroundImage: "linear-gradient(to right, #001968, #0a4d92)",
//                                           WebkitBackgroundClip: "text",
//                                     }}
//                               >
//                                     <TypingRandomizedTextEffect text="Find Your Dream Jobs" />
//                               </h1>

//                               <p className="!mb-2 mt-4 max-w-4xl text-balance text-center text-lg font-medium md:text-sm">
//                                     Your Career Starts Here with Kalbela Jobs! Discover the latest job opportunities in Bangladesh.
//                               </p>
//                         </div>

//                         <div className="z-40 flex w-full max-w-3xl items-center space-x-2 rounded-sm border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-slate-200 md:px-6 relative">
//                               <div className=" flex w-full items-center space-x-2">
//                                     <Search className="size-6 text-gray-500 dark:text-slate-200" />
//                                     <Input
//                                           type="text"
//                                           value={searchQuery}
//                                           onChange={handleSkillChange}
//                                           placeholder="Enter skills / designations / companies"
//                                           className="!placeholder:font-medium w-full border-none font-medium placeholder-gray-500 shadow-none outline-none focus-visible:ring-0 dark:placeholder-slate-200"
//                                     />
//                                     {showSkillDropdown &&
//                                           (filteredSkills.length > 0 || filteredSearchHistory.length > 0) && ( // Updated condition
//                                                 <ul
//                                                       className={cn(
//                                                             "absolute top-16 -left-2 z-10 mt-1 max-h-72 w-full overflow-y-auto rounded-sm border shadow-md",
//                                                             {
//                                                                   "border-gray-700 bg-gray-800": theme === "dark",
//                                                                   "bg-white": theme !== "dark",
//                                                             },
//                                                       )}
//                                                       style={{ scrollbarWidth: "thin" }}
//                                                 >
//                                                       {filteredSearchHistory.length > 0 && ( // Updated to use filteredSearchHistory
//                                                             <>

//                                                                   <p className="px-2 py-1 text-sm font-semibold text-gray-500 dark:text-gray-400">
//                                                                         Recent Searches
//                                                                   </p>
//                                                                   {filteredSearchHistory.map(
//                                                                         (
//                                                                               item, // Updated to use filteredSearchHistory
//                                                                         ) => (
//                                                                               <li
//                                                                                     key={item}
//                                                                                     onClick={() => {
//                                                                                           setSearchQuery(item)
//                                                                                           setShowSkillDropdown(false)
//                                                                                     }}
//                                                                                     className="m-1 cursor-pointer p-1.5 capitalize hover:bg-gray-100 dark:rounded-lg dark:hover:bg-gray-700 dark:hover:text-gray-800"
//                                                                               >
//                                                                                     {item}
//                                                                               </li>
//                                                                         ),
//                                                                   )}
//                                                             </>
//                                                       )}
//                                                       {filteredSkills.filter((skill) => !filteredSearchHistory.includes(skill)).length > 0 && <div>
//                                                             <Separator className="my-2" />
//                                                             <p className="px-2 py-1 text-sm font-semibold text-gray-500 dark:text-gray-400">
//                                                                   Relevant Searches
//                                                             </p>
//                                                             {filteredSkills.filter((skill) => !filteredSearchHistory.includes(skill)).map((skill) => (
//                                                                   <li
//                                                                         key={skill}
//                                                                         onClick={() => {
//                                                                               setSearchQuery(skill)
//                                                                               setShowSkillDropdown(false)
//                                                                         }}
//                                                                         className="m-1 cursor-pointer p-1.5 capitalize hover:bg-gray-100 dark:rounded-lg dark:hover:bg-gray-700 dark:hover:text-gray-800"
//                                                                   >
//                                                                         {skill}
//                                                                   </li>
//                                                             ))}</div>}

//                                                 </ul>
//                                           )}
//                               </div>

//                               <div className="hidden items-center md:flex">
//                                     <Separator orientation="vertical" className="mx-2 h-10 w-0.5 bg-slate-400" />

//                                     <Select onValueChange={(value: any) => setLocation(value)}>
//                                           <SelectTrigger className="w-40 border-none font-medium text-gray-600 shadow-none outline-none focus:ring-0 dark:bg-gray-800 dark:text-slate-200">
//                                                 <SelectValue placeholder="Select location" />
//                                           </SelectTrigger>
//                                           <SelectContent className="max-h-72 bg-white text-gray-900 dark:bg-gray-800 dark:text-slate-200">
//                                                 <SelectGroup>
//                                                       {data?.data?.map((location: any) => (
//                                                             <SelectItem key={location.name} value={location.name} className="capitalize">
//                                                                   {location.name}
//                                                             </SelectItem>
//                                                       ))}
//                                                 </SelectGroup>
//                                           </SelectContent>
//                                     </Select>
//                               </div>

//                               <PrimaryBtn onClick={handleSearch}>Search</PrimaryBtn>
//                         </div>
//                         <Job_type_tag />
//                         <div className="mx-auto px-4 py-0 lg:py-8">
//                               <div className="grid grid-cols-2 gap-x-20 gap-y-4 sm:grid-cols-6 lg:gap-x-4">
//                                     {statistics.map((stat) => (
//                                           <div key={stat.title} className="flex items-center">
//                                                 <div className="mr-3 rounded-full bg-[#001968] p-2 lg:p-3">
//                                                       <stat.icon className="h-4 w-4 text-white" />
//                                                 </div>
//                                                 <div>
//                                                       <p className="text-xs font-bold text-gray-900 dark:text-slate-200">{stat.title}</p>
//                                                       <p className="text-sm font-bold text-gray-600 dark:text-slate-300">{stat.value}</p>
//                                                 </div>
//                                           </div>
//                                     ))}
//                               </div>
//                         </div>
//                   </MaxWidthWrapper>
//             </div>
//       )
// }

// export default HeroSection


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
            <div className="z-40">
                  <MaxWidthWrapper className="flex flex-col items-center space-y-4 py-6 md:py-2 md:pb-4 lg:pb-4">
                        <div className="rounded-md py-4">
                              <h1
                                    className="mt-4 bg-clip-text animate-marquee text-center text-3xl font-bold leading-tight sm:text-4xl md:text-4xl lg:mt-10 lg:text-5xl"
                                    style={{
                                          backgroundImage: "linear-gradient(to right, #001968, #0a4d92)",
                                          WebkitBackgroundClip: "text",
                                    }}
                              >
                                    Find Your Dream Jobs
                                    {/* <TypingRandomizedTextEffect text="Find Your Dream Jobs" /> */}
                              </h1>

                              <p className="!mb-2 mt-4 max-w-4xl text-balance text-center text-lg font-medium md:text-sm">
                                    Your Career Starts Here with Kalbela Jobs! Discover the latest job opportunities in Bangladesh.
                              </p>
                        </div>

                        <div className="z-40 flex w-full max-w-3xl items-center space-x-2 rounded-sm border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-slate-200 md:px-6 relative">
                              <div className=" flex w-full items-center space-x-2">
                                    <Search className="size-6 text-gray-500 dark:text-slate-200" />
                                    <Input
                                          type="text"
                                          value={searchQuery}
                                          onChange={handleSkillChange}
                                          placeholder="Enter skills / designations / companies"
                                          className="!placeholder:font-medium w-full border-none font-medium placeholder-gray-500 shadow-none outline-none focus-visible:ring-0 dark:placeholder-slate-200"
                                    />
                                    {showSkillDropdown && (filteredSkills.length > 0 || filteredSearchHistory.length > 0) && (
                                          <ul
                                                className={cn(
                                                      "absolute top-16 -left-2 z-10 mt-1 max-h-72 w-full overflow-y-auto rounded-sm border shadow-md",
                                                      {
                                                            "border-gray-700 bg-gray-800": theme === "dark",
                                                            "bg-white": theme !== "dark",
                                                      },
                                                )}
                                                style={{ scrollbarWidth: "thin" }}
                                          >
                                                {filteredSearchHistory.length > 0 && (
                                                      <>
                                                            {filteredSearchHistory.map((item) => (
                                                                  <li
                                                                        key={`history-${item}`}
                                                                        onClick={() => {
                                                                              setSearchQuery(item)
                                                                              setShowSkillDropdown(false)
                                                                        }}
                                                                        className="group m-1 flex items-start justify-between cursor-pointer p-1.5 capitalize rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                  >
                                                                        <div className="flex items-center gap-2">
                                                                              <Clock className="h-4 w-4 text-[#001968]" />
                                                                              <div>
                                                                                    <span className="text-[#001968]">{highlightMatch(item, searchQuery)}</span>
                                                                              </div>
                                                                        </div>
                                                                        <button
                                                                              onClick={(e) => removeFromHistory(item, e)}
                                                                              className="hidden group-hover:block p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                                                                        >
                                                                              <X className="h-4 w-4 text-gray-400" />
                                                                        </button>
                                                                  </li>
                                                            ))}
                                                            {filteredSkills.filter((skill) => !filteredSearchHistory.includes(skill)).length > 0 && <Separator className="my-2" />}
                                                      </>
                                                )}
                                                {filteredSkills.filter((skill) => !filteredSearchHistory.includes(skill)).map((skill) => (
                                                      <li
                                                            key={`skill-${skill}`}
                                                            onClick={() => {
                                                                  setSearchQuery(skill)
                                                                  setShowSkillDropdown(false)
                                                            }}
                                                            className="m-1 flex items-center rounded gap-2 cursor-pointer p-1.5 capitalize hover:bg-gray-100 dark:hover:bg-gray-700"
                                                      >
                                                            <Search className="h-4 w-4 text-gray-400" />
                                                            <div>
                                                                  <span>{highlightMatch(skill, searchQuery)}</span>
                                                            </div>
                                                      </li>
                                                ))}
                                          </ul>
                                    )}
                              </div>

                              <div className="hidden items-center md:flex">
                                    <Separator orientation="vertical" className="mx-2 h-10 w-0.5 bg-slate-400" />

                                    <Select onValueChange={(value: any) => setLocation(value)}>
                                          <SelectTrigger className="w-40 border-none font-medium text-gray-600 shadow-none outline-none focus:ring-0 dark:bg-gray-800 dark:text-slate-200">
                                                <SelectValue placeholder="Select location" />
                                          </SelectTrigger>
                                          <SelectContent className="max-h-72 bg-white text-gray-900 dark:bg-gray-800 dark:text-slate-200">
                                                <SelectGroup>
                                                      {data?.data?.map((location: any) => (
                                                            <SelectItem key={location.name} value={location.name} className="capitalize">
                                                                  {location.name}
                                                            </SelectItem>
                                                      ))}
                                                </SelectGroup>
                                          </SelectContent>
                                    </Select>
                              </div>

                              <PrimaryBtn onClick={handleSearch}>Search</PrimaryBtn>
                        </div>
                        <Job_type_tag />
                        <div className="mx-auto px-4 py-0 lg:py-8">
                              <div className="grid grid-cols-2 gap-x-20 gap-y-4 sm:grid-cols-6 lg:gap-x-4">
                                    {statistics.map((stat) => (
                                          <Link href={stat.link} key={stat.title} className="flex items-center">
                                                <div className="mr-3 rounded-full bg-[#001968] p-2 lg:p-3">
                                                      <stat.icon className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                      <p className="text-xs font-bold text-gray-900 dark:text-slate-200">{stat.title}</p>
                                                      <p className="text-sm font-bold text-gray-600 dark:text-slate-300">{stat.value}</p>
                                                </div>
                                          </Link>
                                    ))}
                              </div>
                        </div>
                  </MaxWidthWrapper>
            </div>
      )
}

export default HeroSection
