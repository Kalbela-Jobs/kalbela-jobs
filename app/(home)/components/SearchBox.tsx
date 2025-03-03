'use client';

import PrimaryBtn from '@/components/PrimaryBtn';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
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
    highlightMatch
}: any = {}) => {

    const [showDialog, setShowDialog] = useState(false);

    const handleSearchClick = () => {
        // Open dialog when search button is clicked
        setShowDialog(true);
    };



    return (
        <div>
            <div className="z-40 md:p-4 border rounded shadow-lg w-full bg-white relative mb-6">


                <div
                    onClick={handleSearchClick}
                    className="flex justify-between lg:text-xl text-xs items-center gap-2 font-sans">

                    <div className="md:border-r-2  border-gray-300 p-2  flex items-center md:gap-2  gap-1"> <Search /> Enter skills / designations / companies</div>

                    <div className=" p-2 md:flex hidden items-center gap-1">Select Location <ChevronDown strokeWidth={0.8} /> </div>

                    <Button className='m-2'>Search</Button>
                </div>
            </div>


            {showDialog && (<Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="!w-[900px]  mx-auto">

                    <Image
                        src={'/logo.png'}
                        alt="kalbela-logo"
                        width={100}
                        height={100}
                        className="m-auto pt-6 pb-8 w-[220px]"
                    />


                    <div className='border p-2 border-gray-300 rounded'>
                        <div onClick={() => setShowSkillDropdown(!showSkillDropdown)} className={`flex w-full items-center space-x-2 ${showSkillDropdown ? "" : "cursor-not-allowed"}`}>
                            <div className=" flex w-full items-center space-x-2">
                                <Search className="size-6 text-gray-500 dark:text-slate-200" />
                                <Input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSkillChange}
                                    placeholder="Enter skills / designations / companies"
                                    className="!placeholder:font-medium w-full border-none font-medium placeholder-gray-500 shadow-none outline-none focus-visible:ring-0 dark:placeholder-slate-200"
                                />
                            </div>

                            <div className="hidden items-center md:flex">
                                <Separator orientation="vertical" className="mx-2 h-10 !w-[0.5px] !bg-gray-300" />

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
                </DialogContent>
            </Dialog>)}
        </div>
    );
};

export default SearchBox;