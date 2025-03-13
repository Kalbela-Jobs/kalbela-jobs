import { D } from "framer-motion/dist/types.d-6pKw1mTI";
import { ArrowRight, Save } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

interface DisplayTabBoxProps {
      title?: string;
      range?: number;
      url?: string;
      color?: string;
}

const DisplayCardItem: React.FC<DisplayTabBoxProps> = ({
      title = 'N/A',
      range: percentage = 0,
      url = "#",
      color = "teal",
}) => {

      return (
            <Link
                  href={url}>
                  <div
                        style={{ backgroundColor: color }}
                        className={`px-4 py-3 relative h-[90px] md:mb-0 !mb-4 bg-indigo-500" text-white rounded-lg flex gap-3 items-center`}>
                        <div className="pr-2">
                              <h2 className="text-4xl font-semibold">
                                    {percentage}
                              </h2>
                        </div>
                        <div className="text-sm font-medium w-full text-white">
                              <h2 className="font-semibold text-xl">{title}</h2>
                              <div className="flex items-center gap-1 hover:text-primary duration-300">
                                    View <ArrowRight strokeWidth={1.5} className="w-4 h-4" />
                              </div>
                        </div>
                        {
                              title === 'Applied Jobs'
                                    ? <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width={64}
                                          height={64}
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="absolute right-3 -rotate-[40deg] bottom-3 m-auto opacity-[0.2]"
                                    >
                                          <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                                          <path d="m9 11 3 3L22 4" />
                                    </svg>
                                    :
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width={74}
                                          height={74}
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth={1}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="absolute -right-4 -rotate-[40deg] -bottom-3 m-auto opacity-[0.2]"
                                    >
                                          <path d="M12 12h.01" />
                                          <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                                          <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                                          <rect width={20} height={14} x={2} y={6} rx={2} />
                                    </svg>
                        }
                  </div>


            </Link>
      );
};

export default DisplayCardItem;
