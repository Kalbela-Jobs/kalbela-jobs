"use client"

import React from "react"
import Link from "next/link"
import { Calendar, Eye, Globe, Star, User, Users } from "lucide-react"
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

const Page = ({ params }: { params: { slag: string } }) => {
      const { data: singleJobData, loading: singleJobLoading } = useApiRequest<Record<string, any>>(
            `jobs/get-single-govt-job?job_id=${params.slag}`,
            "GET"
      );

      const { data: all_org_jobs, loading: all_org_jobs_loading, error: all_org_jobs_error } = useApiRequest<any>("jobs/get-all-org-jobs", "GET")

      const [relatedJobs, setRelatedJobs] = React.useState<any>(null);
      const [relatedJobsLoading, setRelatedJobsLoading] = React.useState(false);

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




      const get_org_all_jobs = (jobs: any) => {
            return jobs.reduce((acc: number, job: any) => acc + job.vacancy, 0)
      }

      const router = useRouter()
      const handleJobSelect = (orgId: string, jobId: string) => {
            router.push(`/govt-jobs/${jobId}`)
      }



      return (
            <section className="">
                  <MaxWidthWrapper className="grid gap-6 py-6 md:grid-cols-[350px,1fr] md:py-10">

                        <div className="space-y-4 h-screen md:sticky md:top-20 overflow-y-auto">
                              {all_org_jobs_loading
                                    ? Array.from({ length: 4 }).map((_, index) => (
                                          <Card key={index} className="p-4">
                                                <div className="flex gap-4">
                                                      <Skeleton className="h-16 w-16 rounded-full" />
                                                      <div className="flex-1 space-y-2">
                                                            <Skeleton className="h-4 w-3/4" />
                                                            <Skeleton className="h-4 w-1/2" />
                                                            <Skeleton className="h-4 w-1/4" />
                                                      </div>
                                                </div>
                                          </Card>
                                    ))
                                    :
                                    all_org_jobs?.data?.map((org: any) => (
                                          <div
                                                key={org._id}
                                                className="flex flex-col justify-between rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md"
                                          >
                                                <div className="flex items-start gap-4">
                                                      <Avatar className="h-16 w-16 rounded-lg border bg-gray-100 p-2 transition-transform group-hover:scale-110">
                                                            <AvatarImage src={org.logo} alt={org.name} className="object-contain" />
                                                            <AvatarFallback>{org.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                      </Avatar>
                                                      <div className="flex-1">
                                                            <h3 className="font-semibold capitalize leading-tight line-clamp-2">{org.name}</h3>
                                                            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                                                                  <span className="flex items-center">
                                                                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                                        {org.job_count} Openings
                                                                  </span>
                                                                  <span className="flex items-center">
                                                                        <User className="mr-1 h-4 w-4 text-blue-500" />
                                                                        {get_org_all_jobs(org.jobs)} Vacancies
                                                                  </span>
                                                            </div>
                                                      </div>
                                                </div>
                                                <Select onValueChange={(value) => handleJobSelect(org._id, value)}>
                                                      <SelectTrigger className="mt-4 w-full">
                                                            <SelectValue placeholder="View Jobs" />
                                                      </SelectTrigger>
                                                      <SelectContent>
                                                            {org.jobs.map((job: any) => (
                                                                  <SelectItem key={job._id} value={job._id}>
                                                                        {job.title}
                                                                  </SelectItem>
                                                            ))}
                                                      </SelectContent>
                                                </Select>
                                          </div>
                                    ))}
                        </div>

                        {/* Right Content - Job Details */}
                        <div className="space-y-6">
                              {singleJobLoading ? (
                                    <Card className="p-6">
                                          <div className="flex gap-6">
                                                <Skeleton className="h-24 w-24 rounded-xl" />
                                                <div className="flex-1 space-y-4">
                                                      <Skeleton className="h-8 w-3/4" />
                                                      <Skeleton className="h-4 w-1/2" />
                                                      <Skeleton className="h-4 w-1/4" />
                                                </div>
                                          </div>
                                    </Card>
                              ) : (
                                    singleJobData?.data && (
                                          <div >
                                                {/* <div>
                                                      <ImageCarousel
                                                            images={[
                                                                  "https://i.ibb.co.com/R4VMkhCG/image.png",
                                                                  "https://nilg.gov.bd/sites/default/files/files/nilg.portal.gov.bd/top_banner/582a54bf_ccea_4247_99ed_0ba278ddf46e/2024-08-11-08-23-c1e2b6583951ae03beb38f57795c9e03.jpg",
                                                            ]}
                                                            orgName={singleJobData.data.organization.name}
                                                            orgLogo={singleJobData.data.organization.logo}
                                                      />
                                                </div> */}

                                                <Card className="overflow-hidden">
                                                      <div className="border-b p-6">
                                                            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

                                                                  <div className="flex gap-6">
                                                                        <Avatar className="h-24 w-24 rounded-xl">
                                                                              <AvatarImage
                                                                                    className="object-cover rounded-xl"
                                                                                    src={singleJobData.data.organization.logo}
                                                                                    alt={singleJobData.data.organization.name}
                                                                              />
                                                                              <AvatarFallback>
                                                                                    {singleJobData.data.organization.name[0]}
                                                                              </AvatarFallback>
                                                                        </Avatar>
                                                                        <div>
                                                                              <h1 className="text-2xl font-bold">
                                                                                    {singleJobData.data.organization.name}

                                                                              </h1>
                                                                              <div className="">
                                                                                    <div className="text-sm text-muted-foreground">
                                                                                          Website: <a href={singleJobData.data.organization.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                                                                {singleJobData.data.organization.website}
                                                                                          </a>
                                                                                    </div>
                                                                              </div>
                                                                              <p className="text-lg text-muted-foreground">
                                                                                    {singleJobData.data.title}
                                                                              </p>
                                                                              <div className="mt-2 flex items-center gap-2">
                                                                                    <Badge variant="outline" className="bg-green-500">
                                                                                          Status: {singleJobData.data.status ? "Live" : "Closed"}
                                                                                    </Badge>
                                                                                    <p className="text-sm text-muted-foreground">
                                                                                          ADV NO: {singleJobData.data.advertisementNo}
                                                                                    </p>
                                                                              </div>

                                                                        </div>
                                                                  </div>
                                                                  <div className="flex flex-col gap-2">
                                                                        <ShareButton
                                                                              url={String(`${window.location.origin}${window.location.pathname}`)}
                                                                              title={String(`${singleJobData?.data?.title || 'Job'} on ${singleJobData?.data?.organization?.name || 'Company'}`)}
                                                                        />


                                                                        <a href={singleJobData.data.hyperlink} target="_blank" rel="noopener noreferrer">
                                                                              <Button className="bg-primary hover:bg-primary-dark">
                                                                                    Apply Online
                                                                              </Button>
                                                                        </a>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                      <div className="grid gap-6 p-6 md:grid-cols-3">
                                                            <Card className="p-4">
                                                                  <div className="flex items-center gap-2">
                                                                        <Calendar className="h-5 w-5 text-muted-foreground" />
                                                                        <div>
                                                                              <p className="text-sm font-medium">Start Date</p>
                                                                              <p className="text-sm text-muted-foreground">
                                                                                    {format(new Date(singleJobData.data.applicationStartDate), "dd MMM yyyy hh:mm a")}
                                                                              </p>
                                                                        </div>
                                                                  </div>
                                                            </Card>
                                                            <Card className="p-4">
                                                                  <div className="flex items-center gap-2">
                                                                        <Calendar className="h-5 w-5 text-muted-foreground" />
                                                                        <div>
                                                                              <p className="text-sm font-medium">Deadline</p>
                                                                              <p className="text-sm text-muted-foreground">
                                                                                    {format(new Date(singleJobData.data.applicationDeadline), "dd MMM yyyy hh:mm a")}
                                                                              </p>
                                                                        </div>
                                                                  </div>
                                                            </Card>
                                                            <Card className="p-4">
                                                                  <div className="flex items-center gap-2">
                                                                        <Eye className="h-5 w-5 text-muted-foreground" />
                                                                        <div>
                                                                              <p className="text-sm font-medium">Viewed By</p>
                                                                              <p className="text-sm text-muted-foreground">{singleJobData.data.views ?? 1}</p>
                                                                        </div>
                                                                  </div>
                                                            </Card>
                                                      </div>
                                                      <div className="px-6 pb-6">

                                                            <div
                                                                  dangerouslySetInnerHTML={{ __html: singleJobData?.data?.description }}
                                                                  className="jodit-editor text-muted-foreground whitespace-break-spaces w-auto dark:prose-invert"
                                                            />
                                                            <div className="aspect-[16/9] w-full rounded-lg bg-zinc-700 flex  items-center justify-center">
                                                                  {singleJobData.data.uploadDocument ? (
                                                                        singleJobData.data.uploadDocument.endsWith(".pdf") ? (
                                                                              <iframe src={singleJobData.data.uploadDocument} className="w-full  rounded h-full" />
                                                                        ) : (
                                                                              <img
                                                                                    src={singleJobData.data.uploadDocument}
                                                                                    alt="Advertisement Document"
                                                                                    className="w-full h-full object-cover"
                                                                              />
                                                                        )
                                                                  ) : (
                                                                        <p className="text-center text-white">No document available</p>
                                                                  )}
                                                            </div>
                                                      </div>
                                                </Card>

                                                <div className="grid grid-cols-3 gap-2 mt-4">
                                                      {relatedJobsLoading
                                                            ? Array.from({ length: 4 }).map((_, index) => (
                                                                  <Card key={index} className="p-4">
                                                                        <div className="flex gap-4">
                                                                              <Skeleton className="h-16 w-16 rounded-full" />
                                                                              <div className="flex-1 space-y-2">
                                                                                    <Skeleton className="h-4 w-3/4" />
                                                                                    <Skeleton className="h-4 w-1/2" />
                                                                                    <Skeleton className="h-4 w-1/4" />
                                                                              </div>
                                                                        </div>
                                                                  </Card>
                                                            ))
                                                            : relatedJobs?.data?.map((job: any) => (
                                                                  <Link href={`/govt-jobs/${job._id}`} key={job._id}>
                                                                        <Card
                                                                              className={`transition-all hover:shadow-md mb-2 ${job._id === params.slag ? "border-2 bg-blue-100" : ""}`}
                                                                        >
                                                                              <div className="space-y-4 p-4">
                                                                                    <div className="flex items-center gap-4">
                                                                                          <Avatar className="size-10">
                                                                                                <AvatarImage src={job?.organization?.logo} alt={job?.organization?.name} className="object-scale-down h-full bg-white w-full" />
                                                                                                <AvatarFallback>{job?.organization?.name?.[0]}</AvatarFallback>
                                                                                          </Avatar>
                                                                                          <div className="flex-1">
                                                                                                <h3 className="font-semibold">{job.title}</h3>

                                                                                          </div>
                                                                                    </div>
                                                                              </div>
                                                                        </Card>
                                                                  </Link>
                                                            ))}
                                                </div>
                                          </div>
                                    )
                              )}
                        </div>
                  </MaxWidthWrapper>
            </section>
      )
}

export default Page
