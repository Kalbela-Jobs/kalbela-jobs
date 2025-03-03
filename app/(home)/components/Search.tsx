"use client"

import { useState } from "react"
import { Search, Clock, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface SearchModalProps {
      searchQuery: string
      setSearchQuery: (value: string) => void
      filteredSkills: string[]
      filteredSearchHistory: string[]
      handleSkillChange: (e: React.ChangeEvent<HTMLInputElement>) => void
      removeFromHistory: (item: string, e: React.MouseEvent) => void
      handleSearch: () => void
      location: string
      setLocation: (value: string) => void
      data: any
      theme?: string
}


export default function SearchModal(props: SearchModalProps) {
      const [isModalOpen, setIsModalOpen] = useState(false)
      const {
            searchQuery,
            setSearchQuery,
            filteredSkills,
            filteredSearchHistory,
            handleSkillChange,
            removeFromHistory,
            handleSearch,
            location,
            setLocation,
            data,
            theme,
      } = props

      const highlightMatch = (text: string, query: string) => {
            if (!query) return text
            const regex = new RegExp(`(${query})`, "gi")
            return text.split(regex).map((part, i) =>
                  regex.test(part) ? (
                        <span key={i} className="font-semibold">
                              {part}
                        </span>
                  ) : (
                        part
                  ),
            )
      }

      return (
            <div className="fixed overflow-hidden flex items-center justify-center -top-10 inset-0 bg-black/40 backdrop-blur-sm z-[50000] ">
                  <div className="">
                        <Image
                              className='w-[200px] mb-8 m-auto'
                              src="https://kalbelajobs.com/logo.png" alt="Kalbela Jobs Logo"
                              width={200}
                              height={200}
                        />
                        {/* <br /> */}
                        <div
                              className={cn(
                                    "z-[500000] flex w-full max-w-3xl items-center space-x-2  border px-4 py-3 shadow-md md:px-6 relative transition-all duration-200",
                                    {
                                          "border-gray-200 bg-white text-gray-900": theme !== "dark",
                                          "border-gray-700 bg-gray-800 text-slate-200": theme === "dark",
                                          "shadow-lg scale-105 ": isModalOpen,
                                    },
                                    isModalOpen ? "rounded-t-2xl" : "rounded-xl"
                              )}
                        >

                              <div className="flex w-full  items-center space-x-2">
                                    <Search className="size-6 text-gray-500 dark:text-slate-200" />
                                    <Input
                                          type="text"
                                          value={searchQuery}
                                          onChange={handleSkillChange}
                                          onFocus={() => setIsModalOpen(true)}
                                          placeholder="Enter skills / designations / companies"
                                          className="!placeholder:font-medium w-full border-none font-medium placeholder-gray-500 shadow-none outline-none focus-visible:ring-0 dark:placeholder-slate-200"
                                    />
                                    {isModalOpen && (filteredSkills.length > 0 || filteredSearchHistory.length > 0) && (
                                          <ul
                                                className={cn(
                                                      "absolute top-[63px] -left-2  z-[500]  max-h-72 w-full overflow-y-auto rounded-b-2xl border shadow-md",
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
                                                                              setIsModalOpen(false)
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
                                                            {filteredSkills.filter((skill) => !filteredSearchHistory.includes(skill)).length > 0 && (
                                                                  <Separator className="my-2" />
                                                            )}
                                                      </>
                                                )}
                                                {filteredSkills
                                                      .filter((skill) => !filteredSearchHistory.includes(skill))
                                                      .map((skill) => (
                                                            <li
                                                                  key={`skill-${skill}`}
                                                                  onClick={() => {
                                                                        setSearchQuery(skill)
                                                                        setIsModalOpen(false)
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

                              <div className="hidden items-center z-[500000] md:flex relative">
                                    <Separator orientation="vertical" className=" h-10 w-0.5 bg-slate-400" />

                                    <Select open={true} onValueChange={(value: any) => setLocation(value)}>
                                          <SelectTrigger className="w-40 border-none  z-[5000000000] font-medium text-gray-600 shadow-none outline-none focus:ring-0 dark:bg-gray-800 dark:text-slate-200">
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

                              <button
                                    onClick={() => {
                                          handleSearch()
                                          setIsModalOpen(false)
                                    }}
                                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                              >
                                    Search
                              </button>
                        </div>

                  </div>
            </div>
      )
}
