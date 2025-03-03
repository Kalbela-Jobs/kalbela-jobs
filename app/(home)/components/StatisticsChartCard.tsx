"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button"; // Adjust based on your UI library
import { AnimatePresence } from 'framer-motion';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });



const StatisticsChartCard: React.FC = () => {
    const [chartData, setChartData] = useState({
        series: [
            {
                name: "New Job Listings",
                data: [25, 40, 35, 50, 65, 80, 70, 95, 85, 100, 120, 140],
            },
            {
                name: "Applications Received",
                data: [60, 75, 90, 110, 130, 150, 170, 190, 210, 230, 250, 280],
            },
        ],
        options: {
            chart: {
                type: "area",
                height: 350,
                toolbar: { show: false },
                zoom: { enabled: false },
            },
            dataLabels: { enabled: false },
            stroke: { curve: "smooth", width: 2 },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            },
            yaxis: { title: { text: "Count" } },
            fill: { type: "solid", opacity: [0.2, 0.1] },
            colors: ["#1D4ED8", "#F59E0B"], // Blue for job listings, Orange for applications
            legend: { position: "bottom", itemMargin: { horizontal: 12, vertical: 10 } },
        },
    });

    return (
        <div className=" bg-white">
            <div className="">
                <div className=" mx-auto bg-white border border-gray-200 rounded-md px-2 shadow-lg">
                    <h2 className="text-sm font-semibold mt-3 ml-3">Job Information</h2>
                    <div className="m-2 p-0">
                        <Chart AnimatePresence={Chart} options={chartData.options} series={chartData.series} type="area" height={260} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsChartCard;
