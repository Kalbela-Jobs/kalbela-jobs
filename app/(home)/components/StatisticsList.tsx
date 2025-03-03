import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Import autoplay styles

import { Navigation, Autoplay } from "swiper/modules"; // Import Autoplay module
import StatisticsChartCard from "./StatisticsChartCard";

const StatisticsList: React.FC = () => {
    return (
        <div className="flex justify-center ">
            <div className=" lg:max-w-[1200px] max-w-[320px]  m-auto">
                <Swiper
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
                </Swiper>
            </div>
        </div>
    );
};

export default StatisticsList;
