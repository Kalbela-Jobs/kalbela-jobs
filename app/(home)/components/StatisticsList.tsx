import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Import autoplay styles

import { Navigation, Autoplay } from "swiper/modules"; // Import Autoplay module
import StatisticsChartCard from "./StatisticsChartCard";
import { Activity, Award, Briefcase, Building, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const StatisticsList: React.FC = () => {
    const statistics = [
        { title: "LIVE JOBS", value: "60+", icon: Activity, link: "/search-details" },
        { title: "VACANCIES", value: "200+", icon: Briefcase, link: "/search-details" },
        { title: "COMPANIES", value: "99+", icon: Building, link: "/" },
        { title: "FRESHERS JOBS", value: "50+", icon: Users, link: "/search-details?job_type=Internship" },
        { title: "GOVT JOBS", value: "30+", icon: TrendingUp, link: "/govt-jobs" },
        { title: "TOP INDUSTRIES", value: "20+", icon: Award, link: "/" },

        { title: "LIVE JOBS", value: "60+", icon: Activity, link: "/search-details" },
        { title: "VACANCIES", value: "200+", icon: Briefcase, link: "/search-details" },
        { title: "COMPANIES", value: "99+", icon: Building, link: "/" },
        { title: "FRESHERS JOBS", value: "50+", icon: Users, link: "/search-details?job_type=Internship" },
        { title: "GOVT JOBS", value: "30+", icon: TrendingUp, link: "/govt-jobs" },
        { title: "TOP INDUSTRIES", value: "20+", icon: Award, link: "/" },
    ]

    return (
        <div className="flex justify-center ">
            <div className=" lg:max-w-[720px] md:max-w-[720px] max-w-[320px] overflow-hidden m-auto ">
                {statistics &&
                    <Swiper
                        navigation={false}
                        autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay every 3s
                        modules={[Navigation, Autoplay]}
                        className="mySwiper"
                        breakpoints={{
                            320: { slidesPerView: 2, spaceBetween: 2 }, // Small devices (Mobile)
                            768: { slidesPerView: 4, spaceBetween: 2 }, // Medium devices (Tablet)
                            1024: { slidesPerView: 4, spaceBetween: 2 }, // Large devices (Desktop)
                        }}>

                        {statistics.map((stat) => (<SwiperSlide key={stat?.title} className="!px-2">
                            <Link href={stat.link} className="flex items-center">
                                <div className="mr-3 rounded-full bg-[#001968] z-[35] p-2 lg:p-3">
                                    <stat.icon className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900 dark:text-slate-200">{stat.title}</p>
                                    <p className="text-sm font-bold text-gray-600 dark:text-slate-300">{stat.value}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                        ))}
                    </Swiper>
                }

                {/* <Swiper
                    navigation={false}
                    // autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay every 3s
                    modules={[Navigation, Autoplay]}
                    className="mySwiper"
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 2 }, // Small devices (Mobile)
                        768: { slidesPerView: 1, spaceBetween: 2 }, // Medium devices (Tablet)
                        1024: { slidesPerView: 3, spaceBetween: 2 }, // Large devices (Desktop)
                    }}
                >
                    <SwiperSlide className="!px-2">
                        <StatisticsChartCard />
                    </SwiperSlide>
                    <SwiperSlide className="!px-2">
                        <StatisticsChartCard />
                    </SwiperSlide>
                    <SwiperSlide className="!px-2">
                        <StatisticsChartCard />
                    </SwiperSlide>
                    <SwiperSlide className="!px-2">
                        <StatisticsChartCard />
                    </SwiperSlide>
                    <SwiperSlide className="!px-2">
                        <StatisticsChartCard />
                    </SwiperSlide>
                </Swiper> */}
            </div>
        </div>
    );
};

export default StatisticsList;
