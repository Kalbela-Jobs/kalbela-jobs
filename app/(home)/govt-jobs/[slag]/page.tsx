"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, BookmarkPlus, Calendar, CheckCircle, Download, Eye, Globe, Share2, X, } from "lucide-react"
import { format } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import useApiRequest from "@/app/hooks/useApiRequest"
import { Badge } from "@/components/ui/badge"
import ShareButton from "@/components/ShareButton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { ImageCarousel } from "./components/Carousel"
import GovmentJobCategory from "./components/GovmentJobCategory"
import GovJobHeadLine from "./components/GovJobHeadLine"
import GovJobList from "./components/GovJobList"
import Image from "next/image"
import GovJobHeader from "./components/GovJobHeader"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Page = ({ params }: { params: { slag: string } }) => {
      const { data: singleJobData, loading: singleJobLoading } = useApiRequest<Record<string, any>>(
            `jobs/get-single-govt-job?job_id=${params.slag}`,
            "GET"
      );

      const { data: all_org_jobs, loading: all_org_jobs_loading, error: all_org_jobs_error } = useApiRequest<any>("jobs/get-all-org-jobs", "GET")

      const [relatedJobs, setRelatedJobs] = React.useState<any>(null);
      const [relatedJobsLoading, setRelatedJobsLoading] = React.useState(false);
      const [applyModalOpen, setApplyModalOpen] = React.useState(false);

      React.useEffect(() => {
            const fetchRelatedJobs = async () => {
                  if (singleJobData?.data?.organization?.id) {
                        setRelatedJobsLoading(true);
                        try {
                              const response = await fetch(
                                    `${process.env.NEXT_APP_BASE_URL}/api/v1/jobs/get-govt-suggestions-by-org?org_id=${singleJobData.data.organization.id}`
                              );
                              const data = await response.json();
                              setRelatedJobs(data);
                        } catch (error) {
                              console.error("Error fetching related jobs:", error);
                        } finally {
                              setRelatedJobsLoading(false);
                        }
                  }
            };

            fetchRelatedJobs();
      }, [singleJobData?.data?.organization?.id, params.slag]);

      const [pdfModalOpen, setPdfModalOpen] = useState(false)
      const handleShare = async () => {
            if (singleJobData?.data && navigator.share) {
                  try {
                        await navigator.share({
                              title: singleJobData?.data?.title,
                              text: `${singleJobData?.data?.title} - ${singleJobData?.data?.organization?.name}`,
                              url: window.location.href,
                        })
                  } catch (error) {
                        console.error("Error sharing:", error)
                  }
            } else {
                  // Fallback for browsers that don't support the Web Share API
                  navigator.clipboard.writeText(window.location.href)
                  alert("Link copied to clipboard!")
            }
      }


      const get_org_all_jobs = (jobs: any) => {
            return jobs.reduce((acc: number, job: any) => acc + job.vacancy, 0)
      }

      const router = useRouter()
      const handleJobSelect = (orgId: string, jobId: string) => {
            router.push(`/govt-jobs/${jobId}`)
      }

      const addItem: any[] = [
            {
                  id: 1,
                  addBanner: 'https://img.freepik.com/free-psd/new-smartphone-social-media-story-design-template_47987-25437.jpg?t=st=1741585275~exp=1741588875~hmac=3f193daabc3f7a6d28fb3f566036b5cee0382a1531157b69ed6bdba0ae8b5d1f&w=740'
            },
            {
                  id: 2,
                  addBanner: "https://img.freepik.com/free-vector/hand-drawn-electronics-store-facebook-template_23-2151138109.jpg?t=st=1741585315~exp=1741588915~hmac=ba44f066a6eb427204b27c141b4e3cf6bdbea43669c69fd6a8c8fa005689bb70&w=1380"
            }
      ]

      const handleDownload = () => {
            window.open(singleJobData?.data?.pdf_url, "_blank")
      }

      return (
            <section className="">
                  <MaxWidthWrapper>
                        <GovmentJobCategory />
                        <GovJobHeadLine data={singleJobData?.data} />
                  </MaxWidthWrapper>
                  <MaxWidthWrapper>
                        <div className="mt-3">
                              <div className=" grid md:grid-cols-4 gap-2">
                                    {/* aside */}
                                    <div className="">
                                          <GovJobList
                                                all_org_jobs_loading={all_org_jobs_loading}
                                                all_org_jobs={all_org_jobs}
                                                get_org_all_jobs={get_org_all_jobs}
                                                handleJobSelect={handleJobSelect} />
                                    </div>
                                    {/* content */}
                                    <div className={`md:col-span-3 ${addItem.length > 0 ? 'grid' : ''} md:grid-cols-4 gap-2  `}>
                                          <div className="md:col-span-3 ">
                                                {singleJobData?.data && <GovJobHeader data={singleJobData?.data} />}
                                                {console.log(singleJobData?.data)}
                                                <div className="grid md:grid-cols-5 my-2 gap-3 w-full ">
                                                      <Link href={singleJobData?.data.hyperlink || "#"} className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 py-3 text-white bg-[#001968]">
                                                            <ArrowUpRight className="h-4 w-4" />
                                                            <span>Apply</span>
                                                      </Link>

                                                      <Button onClick={handleShare} variant="outline" className="w-full flex items-center justify-center gap-2">
                                                            <Share2 className="h-4 w-4" />
                                                            <span>Refer Job</span>
                                                      </Button>

                                                      <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                                                            <BookmarkPlus className="h-4 w-4" />
                                                            <span>Save</span>
                                                      </Button>

                                                      <Button onClick={() => setPdfModalOpen(true)} variant="secondary" className="w-full flex items-center justify-center gap-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-down-to-line h-4 w-4"><path d="M12 17V3" /><path d="m6 11 6 6 6-6" /><path d="M19 21H5" /></svg>
                                                            <span>Download Pdf</span>
                                                      </Button>
                                                      <Button variant="secondary" className="w-full flex items-center justify-center gap-2 text-gray-700">
                                                            <Eye className="h-4 w-4" />
                                                            <span>{singleJobData?.data?.views || 0}</span>
                                                      </Button>
                                                </div>
                                                <div className=" mb-4">

                                                      <Image
                                                            src={singleJobData?.data?.image_url}
                                                            alt=""
                                                            width={400}
                                                            height={500}
                                                            className="w-full mt-4 h-full "
                                                      />



                                                </div>
                                          </div>
                                          {addItem.length > 0 && <div className="space-y-4 ">
                                                {addItem?.map((item) => (
                                                      <Image
                                                            key={item.id}
                                                            src={item.addBanner}
                                                            alt="adds"
                                                            width={400}
                                                            height={500}
                                                      />
                                                ))}
                                          </div>}


                                    </div>
                              </div>
                        </div>
                  </MaxWidthWrapper>


                  <Dialog open={pdfModalOpen} onOpenChange={setPdfModalOpen}>
                        <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0 gap-0">
                              <div className="flex flex-col h-full w-full">
                                    {/* Header */}
                                    <div className="flex items-center justify-between p-4 border-b">
                                          <h2 className="text-lg font-semibold truncate max-w-[60%]">Pdf view and download</h2>
                                          <div className="flex items-center mr-8  gap-2">
                                                <Button onClick={handleDownload} className="flex items-center gap-2" variant="outline">
                                                      <Download className="h-4 w-4" />
                                                      <span className="hidden sm:inline">Download</span>
                                                </Button>

                                          </div>
                                    </div>

                                    {/* PDF Content */}
                                    <div className="relative flex-1">

                                          <iframe
                                                src={`${singleJobData?.data?.pdf_url}#toolbar=0`}
                                                className="w-full h-full"
                                                title={`${singleJobData?.data?.title} PDF`}
                                          />
                                    </div>
                              </div>
                        </DialogContent>
                  </Dialog>



            </section>
      )
}

export default Page