'use client';

import PrimaryBtn from '@/components/PrimaryBtn';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Clock, Search, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface SearchBoxProps {
    searchQuery: string;
    handleSkillChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearch: () => void;
    filteredSkills: string[];
    filteredSearchHistory: string[];
    data: any;
    location: string;
    setLocation: (value: string) => void;
    showSkillDropdown: boolean;
    setShowSkillDropdown: (value: boolean) => void;
    theme: string | undefined;
    setSearchQuery: (value: string) => void;
    removeFromHistory: (item: string, e: React.MouseEvent) => void;
    highlightMatch: (text: string, query: string) => string | React.JSX.Element[];
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}




const SearchBox: React.FC<SearchBoxProps> = ({
    searchQuery,
    handleSkillChange,
    handleSearch,
    filteredSkills,
    filteredSearchHistory,
    data,
    setLocation,
    showSkillDropdown,
    setShowSkillDropdown,
    theme,
    setSearchQuery,
    removeFromHistory,
    highlightMatch,
    isOpen = true,
    setIsOpen
}: any = {}) => {

    const handleSearchClick = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    return (
        <div>



            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        onClick={() => setIsOpen(false)}
                        className="fixed top-0 left-0 right-0 bottom-0 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className="md:mx-0 mx-2 relative bg-white w-full max-w-4xl p-6 overflow-hidden rounded-lg shadow-lg"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <Image
                                src={'/logo.png'}
                                alt="kalbela-logo"
                                width={100}
                                height={100}
                                className="m-auto pt-6 pb-8 md:w-[220px] w-[160px]"
                            />


                            <div className='border md:p-2 p-1 border-gray-300 rounded'>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSearch()
                                }}>
                                    <div onClick={() => setShowSkillDropdown(!showSkillDropdown)} className={`flex w-full items-center space-x-2 ${showSkillDropdown ? "" : "cursor-not-allowed"}`}>
                                        <div className=" flex w-full items-center gap-2">
                                            <Search className="size-6 text-gray-500 dark:text-slate-200" />
                                            <Input
                                                type="text"
                                                value={searchQuery}
                                                onChange={handleSkillChange}
                                                placeholder="Enter skills / designations / companies"
                                                className="!px-1 !placeholder:font-medium w-full border-none font-medium placeholder-gray-500 shadow-none outline-none focus-visible:ring-0 dark:placeholder-slate-200"
                                            />
                                        </div>
                                        {/* <PrimaryBtn onClick={handleSearch}>Search</PrimaryBtn> */}
                                        {/* <Button size={'sm'} onClick={}>Search</Button> */}
                                    </div>
                                </form>

                                {showSkillDropdown && (filteredSkills.length > 0 || filteredSearchHistory.length > 0) && (
                                    <ul
                                        className={cn(
                                            " max-h-72 w-full overflow-y-auto bg-white ",
                                            {
                                                "border-gray-700 ": theme === "dark",
                                                "": theme !== "dark",
                                            },
                                        )}
                                        style={{ scrollbarWidth: "thin" }}
                                    >
                                        {filteredSearchHistory.length > 0 && (
                                            <>
                                                {filteredSearchHistory.map((item: string) => (
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
                                                {filteredSkills.filter((skill: any) => !filteredSearchHistory.includes(skill)).length > 0 && <Separator className="my-2" />}
                                            </>
                                        )}
                                        {filteredSkills.filter((skill: any) => !filteredSearchHistory.includes(skill)).map((skill: any) => (
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
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBox;