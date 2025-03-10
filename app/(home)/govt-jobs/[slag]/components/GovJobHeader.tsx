import { Printer } from "lucide-react";
import { FileText } from "lucide-react";
import { Share, Share2 } from "lucide-react";
import GovJobShareActions from "./GovJobShareActions";

const GovJobHeader = ({data}: {data: any | null}) => {
    return (
        <div
        className="relative w-full h-[240px] flex flex-col items-center justify-center bg-cover bg-center"
        style={{
            backgroundImage: `linear-gradient(rgb(255 255 255 / 63%), rgb(255 255 255)), url('/banner1.jpg')`
        }}
    >
<GovJobShareActions />

       <div className="flex flex-col w-full justify-between">
       <h1 className=" text-xl font-bold text-center ">
           {data?.title}
        </h1>
        <p className="text-center text-sm text-gray-600 ">{data?.organization?.website}</p>

        <div className="flex items-center px-3 w-full text-sm justify-between mt-10 w-full">
            <div className="">
                <h2 className="font-semibold">আবেদন শুরুর তারিখ </h2>
                <p className="">01/02/2025</p>
            </div>
            <div className="">
                <h2 className="font-semibold">আবেদন শুরুর তারিখ </h2>
                <p className="">01/02/2025</p>
            </div>
        </div>
       </div>
    </div>
    
    
    );
};

export default GovJobHeader;