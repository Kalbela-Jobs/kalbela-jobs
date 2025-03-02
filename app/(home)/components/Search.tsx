"use client"

import { useState } from "react"
import { Search, Clock, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
                  <div className="lg:w-[800px] md:w-[700px] flex flex-col justify-center items-center w-full bg-white m-auto md:p-6 p-2 rounded">
                        {isModalOpen &&
                              <div className='z-[500000]'>
                                    {theme !== 'dark' ? <img className='w-[200px]' src="https://kalbelajobs.com/logo.png" alt="Kalbela Jobs Logo" /> : <img className='w-[200px]' src="https://kalbelajobs.com/logo_dark.png" alt="Kalbela Jobs Logo" />}
                              </div>}
                        <br />

                  </div>
            </div>
      )
}
