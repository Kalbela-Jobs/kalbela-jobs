import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';
import ModernTemplate from "./templates/modern-template";
import ClassicTemplate from "./templates/classic-template";
import CreativeTemplate from "./templates/creative-template";
import { useUserData } from "@/utils/encript_decript";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";

export default function ResumeBuilder() {
      const [error, setError] = useState<string | null>(null);
      const [activeTemplate, setActiveTemplate] = useState("classic");
      const [activeTab, setActiveTab] = useState("edit");
      const [user] = useUserData();


      const { data: userData = {}, isLoading } = useQuery({
            queryKey: ["resume_builder", user?._id],
            queryFn: async () => {
                  if (!user?._id) return [];
                  const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/v1/user/user-profile?user_id=${user._id}`);
                  if (!res.ok) {
                        throw new Error("Failed to fetch user data");
                  }
                  const data = await res.json();
                  return data.data;
            },
            enabled: !!user?._id,
      });

      const handleUpdateUserData = (updatedData: any) => {
            // setUserData(updatedData) // Assuming this function is available to update user data
      };

      const contentRef = useRef<HTMLDivElement>(null);
      const reactToPrintFn = useReactToPrint({ contentRef });

      if (isLoading) {
            return (
                  <div className="flex h-screen items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2">Loading resume data...</span>
                  </div>
            );
      }

      if (error) {
            return (
                  <div className="flex h-screen items-center justify-center">
                        <Card className="w-full max-w-md">
                              <CardContent className="pt-6">
                                    <div className="text-center">
                                          <p className="text-red-500 mb-4">{error}</p>
                                          <Button onClick={() => window.location.reload()}>Try Again</Button>
                                    </div>
                              </CardContent>
                        </Card>
                  </div>
            );
      }




      return (
            <div className="container mx-auto py-8 px-4">
                  <h1 className="text-3xl font-bold mb-6 text-center">Resume Builder</h1>

                  <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
                        <div className="mb-4 sm:mb-0">
                              <h2 className="text-xl font-semibold">Choose a Template</h2>
                              <div className="flex space-x-2 mt-2">
                                    <button
                                          onClick={() => setActiveTemplate("classic")}
                                    >
                                          <div className={activeTemplate === "classic" ? "border border-blue-500 rounded-md" : ""}>
                                                <div className="w-40 h-52 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                                                      {/* Classic Template Skeleton */}
                                                      <div className="p-2">
                                                            <div className="w-3/4 h-4 bg-gray-800 rounded-sm mb-1"></div>
                                                            <div className="w-1/2 h-3 bg-gray-400 rounded-sm mb-3"></div>
                                                            <div className="w-full h-2 bg-gray-200 rounded-sm mb-4"></div>

                                                            <div className="w-1/2 h-3 bg-gray-800 rounded-sm mb-2"></div>
                                                            <div className="w-3/4 h-2 bg-gray-200 rounded-sm mb-1"></div>
                                                            <div className="w-full h-2 bg-gray-200 rounded-sm mb-3"></div>

                                                            <div className="w-1/2 h-3 bg-gray-800 rounded-sm mb-2"></div>
                                                            <div className="w-3/4 h-2 bg-gray-200 rounded-sm mb-1"></div>
                                                            <div className="w-full h-2 bg-gray-200 rounded-sm mb-3"></div>

                                                            <div className="w-1/2 h-3 bg-gray-800 rounded-sm mb-2"></div>
                                                            <div className="flex flex-wrap gap-1 mb-1">
                                                                  <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
                                                                  <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
                                                                  <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </button>
                                    <button

                                          onClick={() => setActiveTemplate("modern")}
                                    >
                                          <div className={activeTemplate === "modern" ? "border border-blue-500 rounded-md" : ""}>
                                                <div className="w-40 h-52 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                                                      {/* Modern Template Skeleton */}
                                                      <div className="h-10 bg-blue-600 w-full flex items-center px-2">
                                                            <div className="w-20 h-3 bg-white/80 rounded-full"></div>
                                                      </div>
                                                      <div className="flex h-[168px]">
                                                            <div className="w-1/3 bg-gray-50 p-2 border-r">
                                                                  <div className="w-full h-3 bg-gray-200 rounded-full mb-2"></div>
                                                                  <div className="w-3/4 h-3 bg-gray-200 rounded-full mb-4"></div>
                                                                  <div className="w-full h-2 bg-gray-200 rounded-full mb-1"></div>
                                                                  <div className="w-full h-2 bg-gray-200 rounded-full mb-1"></div>
                                                                  <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-3"></div>
                                                                  <div className="w-full h-3 bg-gray-200 rounded-full mb-2"></div>
                                                                  <div className="w-full h-2 bg-gray-200 rounded-full mb-1"></div>
                                                                  <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                                                            </div>
                                                            <div className="w-2/3 p-2">
                                                                  <div className="w-3/4 h-3 bg-gray-200 rounded-full mb-2"></div>
                                                                  <div className="w-full h-2 bg-gray-200 rounded-full mb-3"></div>
                                                                  <div className="w-full h-3 bg-gray-200 rounded-full mb-2"></div>
                                                                  <div className="flex items-center mb-2">
                                                                        <div className="w-2 h-2 rounded-full bg-blue-600 mr-1"></div>
                                                                        <div className="w-3/4 h-2 bg-gray-200 rounded-full"></div>
                                                                  </div>
                                                                  <div className="pl-3 border-l border-blue-200 mb-3">
                                                                        <div className="w-full h-2 bg-gray-200 rounded-full mb-1"></div>
                                                                        <div className="w-3/4 h-2 bg-gray-200 rounded-full"></div>
                                                                  </div>
                                                                  <div className="w-full h-3 bg-gray-200 rounded-full mb-2"></div>
                                                                  <div className="flex items-center">
                                                                        <div className="w-2 h-2 rounded-full bg-blue-600 mr-1"></div>
                                                                        <div className="w-3/4 h-2 bg-gray-200 rounded-full"></div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </button>

                                    <button
                                          onClick={() => setActiveTemplate("creative")}
                                          className="text-sm"
                                    >
                                          <div className={activeTemplate === "creative" ? "border border-blue-500 rounded-md" : ""}>
                                                <div className="w-40 h-52 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                                                      {/* Creative Template Skeleton */}
                                                      <div className="h-12 bg-gradient-to-r from-purple-600 to-pink-500 w-full flex items-center justify-between px-2">
                                                            <div className="w-16 h-3 bg-white/80 rounded-full"></div>
                                                            <div className="w-8 h-8 rounded-full bg-white border-2 border-white"></div>
                                                      </div>
                                                      <div className="p-2">
                                                            <div className="flex justify-center mb-2">
                                                                  <div className="w-20 h-4 bg-purple-100 rounded-full"></div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2 mb-2">
                                                                  <div className="relative pl-3">
                                                                        <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-blue-500"></div>
                                                                        <div className="w-full h-12 bg-white border border-blue-200 rounded-md p-1">
                                                                              <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-1"></div>
                                                                              <div className="w-1/2 h-2 bg-gray-200 rounded-full"></div>
                                                                        </div>
                                                                  </div>
                                                                  <div className="relative pl-3">
                                                                        <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-purple-500"></div>
                                                                        <div className="w-full h-12 bg-white border border-purple-200 rounded-md p-1">
                                                                              <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-1"></div>
                                                                              <div className="w-1/2 h-2 bg-gray-200 rounded-full"></div>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                            <div className="flex justify-center mb-2">
                                                                  <div className="w-16 h-4 bg-green-100 rounded-full"></div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                  <div className="w-full h-8 bg-white border border-green-100 rounded-md flex items-center justify-center">
                                                                        <div className="w-4 h-4 rounded-full bg-green-100"></div>
                                                                  </div>
                                                                  <div className="w-full h-8 bg-white border border-green-100 rounded-md flex items-center justify-center">
                                                                        <div className="w-4 h-4 rounded-full bg-green-100"></div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </button>
                              </div>
                        </div>

                        <div className="print:hidden">
                              <Button onClick={() => reactToPrintFn()} className="bg-green-600 hover:bg-green-700">
                                    Print / Export PDF
                              </Button>
                        </div>
                  </div>

                  <Tabs value={'preview'} onValueChange={setActiveTab} className="print:hidden">


                        <TabsContent value="preview" className="mt-0">
                              <div ref={contentRef} className="">
                                    {activeTemplate === "modern" && userData && <ModernTemplate userData={userData} />}
                                    {activeTemplate === "classic" && userData && <ClassicTemplate userData={userData} />}
                                    {activeTemplate === "creative" && userData && <CreativeTemplate userData={userData} />}
                              </div>
                        </TabsContent>
                  </Tabs>

                  {/* <div ref={printRef} className="hidden print:block">
                        {activeTemplate === "modern" && userData && <ModernTemplate userData={userData} />}
                        {activeTemplate === "classic" && userData && <ClassicTemplate userData={userData} />}
                        {activeTemplate === "creative" && userData && <CreativeTemplate userData={userData} />}
                  </div> */}
            </div>
      );
}
