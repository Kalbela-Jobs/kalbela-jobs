'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import useApiRequest from '@/app/hooks/useApiRequest';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import SearchBox from '@/app/(home)/components/SearchBox';

const BottomSearch: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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


    // modal open
    const openModal = () => {
        setIsModalOpen(true);
        setIsOpen(!isOpen)
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div>
            {/* Search button */}
            <button
                onClick={openModal}
                className="group bg-gray-200 hover:bg-gray-300 dark:text-black rounded-full mt-3 ml-2.5 inline-flex h-10 w-10 flex-col items-center justify-center rounded-ful"
            >
                <Search size={24} />
            </button>



            {/* Render Modal using React Portal */}
            {isModalOpen &&
                ReactDOM.createPortal(
                    <div>
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
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default BottomSearch;
