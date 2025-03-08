"use client"

import { useRouter } from "next/navigation"

import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import useApiRequest from "@/app/hooks/useApiRequest"

const Job_type_tag = () => {
      // const [api, setApi] = useState<CarouselApi | null>(null)
      const { data, loading, error } = useApiRequest<any>("job-type", "GET")



      const router = useRouter()

      const handleRedirect = (type: string) => {
            const queryParams = new URLSearchParams({
                  job_type: type,
            }).toString()
            router.push(`/search-details?${queryParams}`)
      }

      return (
            <>
                  {data?.data?.length > 0 &&
                        <div className="mx-auto h-full w-full max-w-screen-xl 2xl:max-w-screen-2xl">
                              <div className="mx-auto max-w-3xl overflow-hidden" >
                                    <div className="flex w-full justify-between gap-2  overflow-x-auto scrollbar-hide ">
                                          {data?.data?.slice(0, 6)?.map((single_data: any) => (
                                                <button
                                                      onClick={() => handleRedirect(single_data.name)}
                                                      key={single_data?._id}
                                                      className="min-w-[100px] shrink-0 dark:border dark:border-[#d0d0d075] dark:text-white whitespace-nowrap rounded-full border border-[#00186822] px-4 py-1 text-sm font-medium text-[#001968] shadow-sm transition-all duration-200 ease-in-out hover:bg-[#001968] hover:text-white"
                                                >
                                                      {single_data?.name} ({single_data?.count})
                                                </button>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  }
            </>
      )
}

export default Job_type_tag
