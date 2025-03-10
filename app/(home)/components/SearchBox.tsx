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
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import useApiRequest from '@/app/hooks/useApiRequest';
import Job_type_tag from './Job_type_tag';

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



      useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                  if (event.key === 'Escape') {
                        setIsOpen(false);
                        setSearchQuery("")
                  }
            };

            if (isOpen) {
                  window.addEventListener('keydown', handleKeyDown);
            }

            return () => {
                  window.removeEventListener('keydown', handleKeyDown);
            };
      }, [isOpen]);


      const { data: job_type, loading, error } = useApiRequest<any>("job-type", "GET")



      const router = useRouter()

      const handleRedirect = (type: string) => {
            const queryParams = new URLSearchParams({
                  job_type: type,
            }).toString()
            router.push(`/search-details?${queryParams}`)
      }

      const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element

      // Focus the input element when the dialog is open
      useEffect(() => {
            if (isOpen && inputRef.current) {
                  inputRef.current.focus();
            }
      }, [isOpen]);

      const handleClose = () => {
            setIsOpen(false);
            setSearchQuery("");
      }

      const handleSearchClick = () => {
            router.push(`/search-details?${searchQuery}`)
            handleClose()
      };
      // console.log('logo........', job_type);

      return (
            <div>
                  <AnimatePresence>
                        {isOpen && (
                              <motion.div
                                    onClick={handleClose}
                                    className="fixed top-0 left-0 right-0 bottom-0 inset-0 flex items-start pt-[7%] justify-center backdrop-blur-sm z-50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}

                                    style={{
                                          backgroundImage: 'linear-gradient(181.07deg, rgb(207, 225, 255) -5.43%, rgb(255 255 255 / 84%) 24rem)'
                                    }}
                              >
                                    <button
                                          onClick={handleClose}
                                          className='absolute !p-3 !text-black !bg-transparent top-4 right-4 z-[1000]'>
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={36}
                                                height={36}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={1}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-x"
                                          >
                                                <path d="M18 6 6 18" />
                                                <path d="m6 6 12 12" />
                                          </svg>

                                    </button>
                                    <motion.div
                                          onClick={(e) => e.stopPropagation()}
                                          className="md:mx-0  mx-2 relative  w-full max-w-4xl p-6 overflow-hidden rounded-lg "
                                          initial={{ scale: 0.8, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          exit={{ scale: 0.8, opacity: 0 }}
                                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                          <Link onClick={handleClose} href="/">
                                                <Image
                                                      src={'/icons/logo.svg'}
                                                      alt="kalbela-logo"
                                                      width={100}
                                                      height={100}
                                                      className="m-auto pt-6 pb-8 md:w-[320px] w-[160px]"
                                                />
                                          </Link>


                                          <div className={`${showSkillDropdown ? 'rounded-xl h-auto ' : 'rounded-full  md:h-[60px] h-[47px]'} border md:p-2.5 p-1 shadow-lg shadow-gray-100 items-center border-gray-300 bg-[#ffffff] `}>
                                                <div className="flex mt-[2px] justify-between items-center gap-2">
                                                      <form className='flex items-center' onSubmit={(e) => {
                                                            e.preventDefault();
                                                            handleSearch()
                                                      }}>
                                                            <div onClick={() => setShowSkillDropdown(!showSkillDropdown)} className={`flex w-full items-center space-x-2 ${showSkillDropdown ? "" : "cursor-not-allowed"}`}>
                                                                  <div className=" flex w-full items-center gap-2">
                                                                        <Search className="size-6 ml-3 text-gray-500 dark:text-slate-200" />
                                                                        <Input
                                                                              ref={inputRef}
                                                                              type="text"
                                                                              value={searchQuery}
                                                                              onChange={handleSkillChange}
                                                                              placeholder="Search By Keyword"
                                                                              className="!px-1 !placeholder:font-medium w-full border-none font-medium placeholder-gray-500 shadow-none outline-none focus-visible:ring-0 dark:placeholder-slate-200"
                                                                        />
                                                                  </div>
                                                                  {/* <PrimaryBtn onClick={handleSearch}>Search</PrimaryBtn> */}
                                                                  {/* <Button size={'sm'} onClick={}>Search</Button> */}
                                                            </div>
                                                      </form>
                                                      <div className="flex gap-2 items-center">
                                                            <Image
                                                                  src={'./icons/mic.svg'}
                                                                  width={20}
                                                                  height={20}
                                                                  alt="mic"
                                                                  className="cursor-pointer "
                                                            />


                                                            <Button onClick={handleSearchClick} size={"sm"} className='mr-3 bg-gray-600 !px-3  text-white bg-primary !rounded-full !py-1'>
                                                                  Search
                                                            </Button>
                                                      </div>
                                                </div>

                                                {showSkillDropdown && (filteredSkills.length > 0 || filteredSearchHistory.length > 0) && (
                                                      <ul
                                                            className={cn(
                                                                  " max-h-72 w-full overflow-y-auto  ",
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
                                                                                          router.push(`/search-details?${item}`)
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
                                                                              router.push(`/search-details?${skill}`)
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
                                          <div className="mt-5">
                                                <Job_type_tag />
                                          </div>
                                    </motion.div>
                              </motion.div>
                        )}

                  </AnimatePresence>
            </div>
      );
};

export default SearchBox;