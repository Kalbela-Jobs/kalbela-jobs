import { D } from "framer-motion/dist/types.d-6pKw1mTI";
import { ArrowRight } from "lucide-react";
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

const DisplayTabBox: React.FC<DisplayTabBoxProps> = ({
    title = 'N/A',
    range: percentage = 0,
    url = "#",
    color = "bg-indigo-500",
}) => {

    return (
        <Link
            href={url}
            style={{ backgroundColor: color }}
            className={`px-4 py-3 relative h-[90px] bg-indigo-500" text-white rounded-lg flex gap-3 items-center`}
        >
            <div className="w-20">
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: 'butt',
                        textSize: '22px',
                        pathTransitionDuration: 0.5,
                        pathColor: `#ffffff`,
                        textColor: '#fff',
                        trailColor: '#e2dada58',
                    })}
                />
            </div>
            <div className="text-sm font-medium w-full text-white">
                <h2 className="font-semibold text-xl">{title}</h2>
                <div className="flex items-center gap-1 hover:text-primary duration-300">
                    View <ArrowRight strokeWidth={1.5} className="w-4 h-4" />
                </div>
            </div>
        </Link>
    );
};

export default DisplayTabBox;
