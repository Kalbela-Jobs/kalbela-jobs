import { Search } from "lucide-react";
import React, { useState } from "react";

interface GovJobHeadLineProps {
      data: any | null;
}

const GovJobHeadLine: React.FC<GovJobHeadLineProps> = ({ data }) => {
      const headLine = "Comming soon!";
      const [selectedOption, setSelectedOption] = useState<string | null>(null);

      const getTextContent = (html: string) => {
            const doc = new DOMParser().parseFromString(html, "text/html");
            return doc.body.textContent || "";
      };

      const handleEditClick = (option: string) => {
            setSelectedOption(option);
      };

      return (
            <div className="mt-2">
                  <div className="items-center border-green-600 grid md:grid-cols-4 gap-2">
                        {/* Sidebar */}
                        <div className="">
                              <div className="flex md:flex-nowrap flex-wrap gap-2 items-center justify-between">
                                    <button
                                          className={`bg-[#001968] text-white px-3 py-1 w-full text-sm rounded ${selectedOption === 'popular' ? 'bg-green-600' : ''}`}
                                          onClick={() => handleEditClick('popular')}
                                    >
                                          জনপ্রিয়
                                    </button>
                                    <button
                                          className={`bg-[#001968] text-white px-3 py-1 w-full text-sm rounded ${selectedOption === 'recent' ? 'bg-green-600' : ''}`}
                                          onClick={() => handleEditClick('recent')}
                                    >
                                          সাম্পতিক
                                    </button>
                                    <button
                                          className={`bg-[#001968] text-white px-3 py-1 w-full text-sm rounded ${selectedOption === 'previous' ? 'bg-green-600' : ''}`}
                                          onClick={() => handleEditClick('previous')}
                                    >
                                          পূর্ববর্তী
                                    </button>
                              </div>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-3 items-center grid md:grid-cols-4 gap-2">
                              <div className="md:col-span-3 flex items-center">
                                    <marquee className="text-lg font-semibold">
                                          {getTextContent(data?.description) || headLine}
                                    </marquee>
                              </div>
                              <div className="md:col-span-1">
                                    <div className="bg-gray-100 border-[#001968] text-[#001968] rounded flex items-center border pr-2">
                                          <input
                                                placeholder="Search"
                                                type="text"
                                                className="w-full focus:outline-none !bg-transparent px-2 py-1 h-9"
                                          />
                                          <Search strokeWidth={1} />
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default GovJobHeadLine;