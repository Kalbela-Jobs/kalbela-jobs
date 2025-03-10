import { Search } from "lucide-react";
import React from "react";

interface GovJobHeadLineProps {
    data: any | null;
}

const GovJobHeadLine: React.FC<GovJobHeadLineProps> = ({ data }) => {
    const headLine = "Comming soon!";


    console.log("line.................", data)
    return (
        <div className="mt-3">
           
           
            <div className="border items-center border-green-600 p-2 grid md:grid-cols-4 gap-2">
                {/* Sidebar */}
                <div className="">
                    <div className="flex gap-3 items-center justify-between">
                        <button className="bg-green-500 text-white px-3 py-1 w-full text-sm rounded">জনপ্রিয়</button>
                        <button className="bg-green-500 text-white px-3 py-1 w-full text-sm rounded">সাহিত্যিক</button>
                        <button className="bg-green-500 text-white px-3 py-1 w-full text-sm rounded">পূর্ববর্তী</button>
                    </div>
                </div>

                {/* Content */}
                <div className="md:col-span-3 items-center grid md:grid-cols-3 gap-2">
                    <div className="md:col-span-2 flex items-center">
                        <marquee className="text-lg font-semibold">
                            {data?.organization?.name || headLine}
                        </marquee>
                    </div>
                    <div className="">
                        <div className="bg-gray-100 border-green-600 text-green-600 rounded flex items-center border pr-2">
                            <input placeholder="Search" type="text" className="w-full focus:outline-none !bg-transparent px-2 py-1 h-9" />
                            <Search strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GovJobHeadLine;
