import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import Select, { SingleValue, StylesConfig } from "react-select"

import useApiRequest from "@/app/hooks/useApiRequest"
import FilterProfileField from "./FilterProfileField"
import { Checkbox } from "@/components/ui/checkbox"
import SelaryRange from "./SelaryRange"
import { set } from 'date-fns';
import { useRouter } from "next/navigation"

interface FilterSelectProps {
      customStyles: StylesConfig<any, false>
      location: string
      setLocation: Dispatch<SetStateAction<string>>
      job_type: string
      setJobType: Dispatch<SetStateAction<string>>
      category: string
      setCategory: Dispatch<SetStateAction<string>>
      setSalaryRange: Dispatch<SetStateAction<string>>
}

const FilterSelect: FC<FilterSelectProps> = ({
      customStyles,
      location,
      setLocation,
      job_type,
      setJobType,
      category,
      setCategory,
      setSalaryRange
}) => {
      const { data: jobTypes } = useApiRequest<any>("job-type", "GET")
      const { data: categories } = useApiRequest<any>("category", "GET")
      const [more, setMore] = useState<boolean>(false);
      const [initialJobType, setInitialJobTye] = useState<any>([]);

      useEffect(() => {
            if (jobTypes) {
                  setInitialJobTye(jobTypes);
            } else {
                  setInitialJobTye([])
            }
      }, [jobTypes])



      const handleFilterChange =
            (key: "location" | "job_type" | "category") =>
                  (option: SingleValue<{ value: string; label: string; image?: string }>) => {
                        if (key === "location") {
                              setLocation(option?.value || "")
                        } else if (key === "job_type") {
                              setJobType(option?.value || "")
                        } else if (key === "category") {
                              setCategory(option?.value || "")
                        }
                  }

      const CustomOption = (props: any) => {
            const { data, innerRef, innerProps, isSelected, isFocused } = props
            return (
                  <div
                        ref={innerRef}
                        {...innerProps}
                        className={`flex items-center space-x-2 p-2 ${isSelected ? "bg-blue-500 text-white" : isFocused ? "bg-gray-300" : ""
                              }`}
                  >
                        {data.image && (
                              <img
                                    src={data.image}
                                    alt={data.label}
                                    className="h-6 w-6 rounded-full"
                              />
                        )}
                        <span className="max-w-full truncate">{data.label}</span>
                  </div>
            )
      }

      const CustomSingleValue = (props: any) => {
            const { data } = props
            return (
                  <div className="flex items-center space-x-2">
                        {data.image && (
                              <img
                                    src={data.image}
                                    alt={data.label}
                                    className="h-5 w-5 rounded-full"
                              />
                        )}
                        <span className="max-w-40 truncate text-sm">{data.label}</span>
                  </div>
            )
      }



      console.log('Debug : ', job_type, '||', jobTypes);

      return (
            <div>
                  <div className="mb-5">
                        <FilterProfileField />
                  </div>

                  {/* Location Filter */}
                  <div className="mb-5 -mt-2 space-y-1">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Location</label>
                        <Select
                              value={{
                                    label: location === "" ? "All Locations" : location,
                                    value: location,
                                    image: "/icons/location.jpg",
                              }}
                              onChange={handleFilterChange("location")}
                              options={[
                                    { value: "", label: "All Locations", image: "/icons/location.jpg" },
                                    { value: "dhaka", label: "Dhaka", image: "/icons/location.jpg" },
                                    {
                                          value: "chittagong",
                                          label: "Chittagong",
                                          image: "/icons/location.jpg",
                                    },
                                    {
                                          value: "rajshahi",
                                          label: "Rajshahi",
                                          image: "/icons/location.jpg",
                                    },
                                    { value: "khulna", label: "Khulna", image: "/icons/location.jpg" },
                                    {
                                          value: "barisal",
                                          label: "Barisal",
                                          image: "/icons/location.jpg",
                                    },
                                    { value: "sylhet", label: "Sylhet", image: "/icons/location.jpg" },
                                    {
                                          value: "rangpur",
                                          label: "Rangpur",
                                          image: "/icons/location.jpg",
                                    },
                                    {
                                          value: "mymensingh",
                                          label: "Mymensingh",
                                          image: "/icons/location.jpg",
                                    },
                              ]}
                              className="w-full capitalize"
                              styles={customStyles}
                              components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                              isSearchable
                        />
                  </div>

                  {/* <div className="mb-5 flex items-center space-x-2">
                        <Checkbox onChange={() => setJobType('Remote')} id="work" />
                        <label
                              htmlFor="work"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                              Work from home
                        </label>
                  </div> */}

                  {/* <div className="mb-5 flex items-center space-x-2">
                        <Checkbox id="part-time" />
                        <label
                              htmlFor="part-time"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                              Part-time
                        </label>
                  </div> */}

                  <div className="mb-5">
                        <SelaryRange setSalaryRange={setSalaryRange} />
                  </div>
                  <br />

                  {more && <div className="-mt-5">
                        <div className="mb-5 space-y-1">
                              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Job Type</label>
                              <Select
                                    value={
                                          job_type.length
                                                ? initialJobType?.data
                                                      ?.map((item: any) => ({
                                                            value: item.slag,
                                                            label: item.name,
                                                            image: item.image || "",
                                                      }))
                                                      .find((item: any) => item.value === job_type) || 'null'
                                                : { value: "", label: "All", image: "/icons/all_job_type.jpg" }
                                    }
                                    onChange={handleFilterChange("job_type")}
                                    options={[
                                          { value: "", label: "All", image: "/icons/all_job_type.jpg" },
                                          ...(initialJobType?.data?.map((item: any) => ({
                                                value: item.slag,
                                                label: item.name,
                                                image: item.image || "",
                                          })) || []),
                                    ]}
                                    className="w-full capitalize"
                                    styles={customStyles}
                                    components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                    isSearchable
                              />
                        </div>

                        {/* Categories */}
                        <div className="mb-5 space-y-1">
                              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Categories</label>
                              <Select
                                    value={
                                          category
                                                ? categories?.data
                                                      ?.map((item: any) => ({
                                                            value: item.slag,
                                                            label: item.name,
                                                            image: item.image || "",
                                                      }))
                                                      .find((item: any) => item.value === category) || null
                                                : { value: "", label: "All", image: "/icons/category.png" }
                                    }
                                    onChange={handleFilterChange("category")}
                                    options={[
                                          { value: "", label: "All", image: "/icons/category.png" },
                                          ...(categories?.data?.map((item: any) => ({
                                                value: item.slag,
                                                label: item.name,
                                                image: item.image || "",
                                          })) || []),
                                    ]}
                                    className="w-full capitalize"
                                    styles={customStyles}
                                    components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                    isSearchable
                              />
                        </div>
                  </div>}

                  <p onClick={() => setMore(!more)} className="text-[#008BDC] cursor-pointer">{
                        more ? "Hide filters" : "View more filters"
                  } </p>


                  <br />
                  <div className="flex justify-end">
                        <button className="ml-auto text-[#008BDC] text-end">Clear All</button>
                  </div>

            </div>
      )
}

export default FilterSelect
