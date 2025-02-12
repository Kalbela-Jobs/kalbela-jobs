'use client'

import Marquee from "@/components/Marquee";
import ReviewCard from "./ReviewCard";
import useApiRequest from "@/app/hooks/useApiRequest";

const VerticalMarquee = () => {
      const { data, loading, error } = useApiRequest<any>("config/hero-logo", "GET");



      const chunkSize = Math.ceil((data?.data?.length || 10) / 10);

      const rows = Array.from({ length: 10 }, (_, i) => {
            const totalItems = data?.data?.length || 0;
            const baseSize = Math.floor(totalItems / 10);
            const remainder = totalItems % 10;
            const extraItem = i < remainder ? 1 : 0; // Distribute extra items evenly

            const startIndex = i * baseSize + Math.min(i, remainder);
            const endIndex = startIndex + baseSize + extraItem;

            return data?.data?.slice(startIndex, endIndex) || [];
      });
      const marqueeStyles = {
            transform: "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(-9deg) scale(1.5)"
      };

      return (
            <div className="relative z-0 flex h-96 flex-row items-center justify-center space-x-12 space-y-[0.5rem] overflow-hidden opacity-20 [perspective:300px]">
                  {rows.map((row, i) => (
                        <Marquee
                              key={i}
                              pauseOnHover
                              vertical
                              reverse={i % 2 !== 0}
                              className="[--duration:20s]"
                              style={marqueeStyles}
                        >
                              {row.map((review: any, index: number) => (
                                    <ReviewCard key={index} {...review} />
                              ))}
                        </Marquee>
                  ))}

                  {/* Gradient Overlays */}
                  <div className="pointer-events-none absolute inset-x-0 -top-2 h-1/3 bg-gradient-to-b from-[#e1ecff] dark:from-background"></div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div>
                  <div className="pointer-events-none absolute inset-y-0 -left-14 -top-2 w-1/4 bg-gradient-to-r from-gray-100 dark:from-background"></div>
                  <div className="pointer-events-none absolute inset-y-0 -right-0 w-1/4 bg-gradient-to-l from-gray-100 dark:from-background"></div>
            </div>
      );
};

export default VerticalMarquee;
