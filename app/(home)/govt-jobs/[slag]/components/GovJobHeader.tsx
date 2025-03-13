import { Aperture, Printer } from "lucide-react";
import { FileText } from "lucide-react";
import { Share, Share2 } from "lucide-react";
import Image from "next/image";
import GovJobShareActions from "./GovJobShareActions";

const GovJobHeader = ({ data }: { data: any | null }) => {
      console.log(data);
      return (
            <div
                  className="relative w-full h-[240px] flex flex-col items-center justify-center bg-center"
                  style={{
                        backgroundImage: `linear-gradient(rgb(255 255 255 / 30%), rgb(255 255 255)), url(${data?.organization?.banner})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover' // or 'contain' depending on your preference
                  }}
            >
                  <GovJobShareActions data={data} />

                  <div className="flex flex-col w-full justify-between">
                        <Image
                              src={data?.organization?.logo}
                              alt={data?.organization?.name}
                              width={100}
                              height={100}
                              className="w-12 h-12 rounded-full mx-auto mb-2"
                        />
                        <h1 className=" text-xl font-bold text-center ">
                              {data?.organization?.name}
                        </h1>
                        {/* <p className="text-center text-sm text-gray-600 font-bold cursor-pointer flex items-center justify-center gap-1 my-0.5">বিজ্ঞাপন নং: {data?.advertisementNo}</p> */}
                        <a href={data?.organization?.org_website || data?.organization?.website || data?.organization?.website} target="_blank" rel="noopener noreferrer" className="text-center text-sm text-gray-600 hover:text-blue-400 hover:underline cursor-pointer flex items-center justify-center gap-1 "><Aperture className='size-4' />{data?.organization?.org_website || data?.organization?.website || data?.organization?.website}</a>


                        <div className="flex items-center px-3 w-full text-sm justify-between mt-10 w-full">
                              <div className="">
                                    <h2 className="font-semibold">আবেদন শুরুর তারিখ </h2>
                                    <p className="">{new Date(data?.applicationStartDate).toLocaleDateString()}</p>
                              </div>
                              <div className="">
                                    <h2 className="font-semibold">আবেদন শেষ তারিখ </h2>
                                    <p className="">{new Date(data?.applicationDeadline).toLocaleDateString()}</p>
                              </div>
                        </div>
                  </div>
            </div>


      );
};

export default GovJobHeader;
