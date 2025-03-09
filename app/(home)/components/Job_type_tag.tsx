"use client"

import { useRouter } from "next/navigation"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Import autoplay styles
import useApiRequest from "@/app/hooks/useApiRequest"
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";

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
                  {/* {data?.data?.length > 0 &&
                        <div className="mx-auto h-full w-full max-w-screen-xl 2xl:max-w-screen-2xl overflow-hidden">
                              <div className="mx-auto max-w-3xl overflow-hidden" >
                                    <div className="flex md:w-full w-[300px] m-auto justify-between gap-2  overflow-x-auto scrollbar-hide ">
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
                  } */}

                  <div className=" lg:max-w-[720px] md:max-w-[720px] max-w-[320px] overflow-hidden m-auto">
                        {data?.data?.length > 0 &&
                          <Swiper
                          navigation={false}
                        //   autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay every 3s
                          modules={[Navigation, Autoplay]}
                          slidesPerView={2}
                          spaceBetween={10}
                          className="mySwiper"
                          breakpoints={{
                                320: { slidesPerView: 2, spaceBetween: 10 }, // Small screens: 10px spacing
                                768: { slidesPerView: 4, spaceBetween: 14 }, // Medium screens: 15px spacing
                                1024: { slidesPerView: 5, spaceBetween: 12 }, // Large screens: 20px spacing
                          }}
                    >
                          {data?.data?.slice(0, 6)?.map((single_data: any) => (
                                <SwiperSlide key={single_data?._id} className="!px-1">
                                      <button
                                            onClick={() => handleRedirect(single_data.name)}
                                            className="min-w-[130px] w-full shrink-0 backdrop-blur-sm dark:border dark:border-[#d0d0d075] dark:text-white whitespace-nowrap rounded-full border border-[#00186822] px-4 py-1 text-sm font-medium text-[#001968] shadow-sm transition-all duration-200 ease-in-out hover:bg-[#001968] hover:text-white"
                                      >
                                            {single_data?.name} ({single_data?.count})
                                      </button>
                                </SwiperSlide>
                          ))}
                    </Swiper>
                    
                        }
                  </div>
            </>
      )
}

export default Job_type_tag
