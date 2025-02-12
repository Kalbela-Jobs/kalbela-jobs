
"use client"

import Head from "next/head"
import Image from "next/image"
import { useParams } from "next/navigation"
import { dummyJobs } from "@/public/assets/dummyData"
import { useUserData } from "@/utils/encript_decript"
import { Avatar } from "@radix-ui/react-avatar"
import { Banknote, Briefcase, Building2, Calendar, CalendarIcon, Facebook, FileWarning, Linkedin, MapPin, Share2, Twitter } from 'lucide-react'
import { toast } from "react-toastify"

import { formatDate } from "@/lib/utils"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import ApplyModal from "@/components/ApplyModal"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import SecondaryBtn from "@/components/SecondaryBtn"
import ShareButton from "@/components/ShareButton"
import useApiForPost from "@/app/hooks/useApiForPost"
import useApiRequest from "@/app/hooks/useApiRequest"

import JobDetailsSkeleton from "./components/JobDetailsSkeleton"
import React from 'react'; // Added import for React

const JobsDetails = () => {
      const { slug } = useParams()
      const [user] = useUserData()

      const { data, loading, error } = useApiRequest<any>(
            `jobs/get-by-url?url=${slug}`,
            "GET"
      )

      const { apiRequest } = useApiForPost()

      const save_jobs = async (job_id: any) => {
            if (!user) {
                  toast.warning("You need to login to save jobs")
                  return
            }
            const upload_data = {
                  user_id: user._id,
                  job_id,
            }
            if (!user._id) {
                  toast.info("You need to login to save jobs")
                  return
            }
            if (!job_id) {
                  toast.error("Something went wrong")
                  return
            }
            const { data, error } = await apiRequest<any>(
                  `api/v1/user/save-jobs`,
                  "POST",
                  upload_data
            )
            if (error) {
                  toast.error(error.message)
            } else {
                  toast.success(data.message)
            }
      }

      if (loading) {
            return <JobDetailsSkeleton />
      }

      if (error) {
            return <div>Error loading job details. Please try again later.</div>
      }

      const jobData = data?.data
      const jobUrl = `https://kalbelajobs.com/jobs/${slug}`

      const shareUrl = encodeURIComponent(window.location.href);
      const jobTitle = encodeURIComponent(jobData?.title || "Check out this job!");
      const jobDescription = encodeURIComponent(jobData?.description?.slice(0, 100) || "Exciting job opportunity!");
      const fullMessage = `${jobTitle} - ${jobDescription} ${shareUrl}`;


      const formatLocation = () => {
            if (jobData?.location?.remote) return "Remote";

            const { country, district, division, location } = jobData?.location || {};

            return [
                  country,
                  Array.isArray(district) ? district.join(", ") : district,
                  Array.isArray(division) ? division.join(", ") : division,
                  location
            ]
                  .filter(Boolean)
                  .join(", ");
      };


      return (
            <MaxWidthWrapper>
                  <Head>
                        <title>{jobData?.job_title || "Job Details"} | YourJobSite</title>
                        <meta
                              name="description"
                              content={`${jobData?.job_title} - ${jobData?.company_info?.name}. ${jobData?.job_description?.slice(0, 160)}...`}
                        />
                        <meta property="og:title" content={`${jobData?.job_title} | YourJobSite`} />
                        <meta property="og:description" content={`${jobData?.job_title} - ${jobData?.company_info?.name}. ${jobData?.job_description?.slice(0, 160)}...`} />
                        <meta property="og:image" content={jobData?.company_info?.logo || ``} />
                        <meta property="og:url" content={jobUrl} />
                        <meta property="og:type" content="website" />
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="icon" href={jobData?.company_info?.logo} />
                        <script type="application/ld+json">
                              {JSON.stringify({
                                    "@context": "https://schema.org/",
                                    "@type": "JobPosting",
                                    title: jobData?.job_title,
                                    description: jobData?.job_description,
                                    datePosted: jobData?.posted_date,
                                    validThrough: jobData?.expiry_date,
                                    employmentType: jobData?.job_type,
                                    hiringOrganization: {
                                          "@type": "Organization",
                                          name: jobData?.company_info?.name,
                                          logo: jobData?.company_info?.logo,
                                    },
                                    jobLocation: {
                                          "@type": "Place",
                                          address: {
                                                "@type": "PostalAddress",
                                                addressCountry: jobData?.location?.country,
                                          },
                                    },
                                    baseSalary: {
                                          "@type": "MonetaryAmount",
                                          currency: jobData?.salary_range?.currency,
                                          value: {
                                                "@type": "QuantitativeValue",
                                                minValue: jobData?.salary_range?.min,
                                                maxValue: jobData?.salary_range?.max,
                                                unitText: "YEAR",
                                          },
                                    },
                              })}
                        </script>
                  </Head>

                  {/* Hero Section */}
                  <div className="relative h-[300px] mt-4 rounded-xl w-full overflow-hidden bg-light-theme border shadow dark:bg-dark-theme   md:h-[400px]">
                        <div className="absolute left-0 top-0">
                              <img
                                    className="w-16 md:w-24 lg:w-32 xl:w-full"
                                    src="https://landingfoliocom.imgix.net/store/collection/saasui/images/newsletter/3/ring-pattern.svg"
                                    alt=""
                              />
                        </div>
                        {jobData?.attachment_url && <div className="absolute inset-0">
                              <Image
                                    src={jobData?.attachment_url || ""}
                                    alt={jobData?.job_title || "Job Banner"}
                                    fill
                                    className="object-cover opacity-20"
                                    priority
                              />
                        </div>}
                        <div className="relative h-full">
                              <div className="container mx-auto flex h-full flex-col justify-end px-4 pb-8 ">
                                    <div className="max-w-3xl">
                                          <h1 className="mb-2 text-4xl font-bold md:text-5xl lg:text-6xl text-transparent custom-outline dark:custom-outline-light">
                                                Hiring
                                          </h1>


                                          <h2 className="mb-4 text-3xl font-semibold /90 md:text-4xl">
                                                {jobData?.job_title}
                                          </h2>
                                          <div className="flex flex-wrap gap-2">
                                                <Badge className="capitalize">
                                                      {jobData?.job_type}
                                                </Badge>
                                                <Badge className="capitalize">
                                                      {jobData?.salary_negotiable || jobData?.negotiable_note
                                                            ? "Negotiable"
                                                            : `${jobData?.salary_range?.min}${jobData?.salary_range?.max ? ` - ${jobData?.salary_range.max}` : ""} ${jobData?.salary_range?.currency || ""}`}
                                                </Badge>
                                                <Badge className="capitalize">
                                                      Experience: {jobData?.experience_level}
                                                </Badge>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Content Section */}
                  <div className="mt-4">
                        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
                              {/* Left Column - Company Info */}
                              <Card className="h-fit p-6  lg:col-span-1 sticky lg:top-20  ">
                                    <div className="mb-6 flex items-center gap-4">
                                          <div className="flex-shrink-0">
                                                <Avatar className="h-12 w-12">
                                                      <AvatarImage
                                                            className="h-12 w-12  rounded border-2 border-gray-300  object-scale-down p-2 shadow-md"
                                                            src={jobData?.company_info?.logo || "/placeholder.svg"}
                                                            alt={jobData?.company_info?.name || "Company Logo"}
                                                      />
                                                      <AvatarFallback className="text-lg">
                                                            {jobData?.company_info?.name?.charAt(0)}
                                                      </AvatarFallback>
                                                </Avatar>
                                          </div>
                                          <div>
                                                <h3 className="font-semibold capitalize">{jobData?.company_info?.name} {jobData?.company_info?.industry && `(${jobData?.company_info?.industry})`}</h3>
                                                <p className="text-sm ">
                                                      {jobData?.job_title}
                                                </p>
                                          </div>
                                    </div>

                                    <div className="space-y-4">
                                          <div className="grid grid-cols-2 gap-2 text-sm">

                                                <div className="space-y-3">
                                                      <div className="flex items-center gap-2 text-sm">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-muted-foreground">Deadline:</span>
                                                            <span>{formatDate(jobData?.expiry_date || new Date())}</span>
                                                      </div>

                                                      <div className="flex whitespace-break-spaces items-start gap-2 text-sm">
                                                            <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                                                            <div>
                                                                  <span className="text-muted-foreground mr-2">Location:</span>
                                                                  <span>{formatLocation()}</span>
                                                            </div>
                                                      </div>
                                                </div>

                                          </div>

                                          <div className="flex items-center gap-4 pt-4">
                                                <div className="w-full">
                                                      <ApplyModal
                                                            slug={jobData?.url}
                                                            company={jobData?.company_info?.company_id}
                                                            user={user}
                                                      />
                                                </div>
                                                <SecondaryBtn
                                                      className="px-10 w-5/6  py-2"
                                                      onClick={() => save_jobs(jobData?._id)}
                                                >
                                                      Save
                                                </SecondaryBtn>
                                          </div>

                                          <div className="flex items-center justify-between border-t pt-4">
                                                <div className="flex gap-2">
                                                      {/* Share on Facebook */}
                                                      <Button
                                                            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank")}
                                                            variant="ghost"
                                                            size="icon"
                                                      >
                                                            <Facebook className="h-4 w-4" />
                                                      </Button>

                                                      {/* Share on Twitter */}
                                                      <Button
                                                            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${fullMessage}`, "_blank")}
                                                            variant="ghost"
                                                            size="icon"
                                                      >
                                                            <Twitter className="h-4 w-4" />
                                                      </Button>

                                                      {/* Share on LinkedIn */}
                                                      <Button
                                                            onClick={() =>
                                                                  window.open(
                                                                        `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${jobTitle}&summary=${jobDescription}`,
                                                                        "_blank"
                                                                  )
                                                            }
                                                            variant="ghost"
                                                            size="icon"
                                                      >
                                                            <Linkedin className="h-4 w-4" />
                                                      </Button>
                                                </div>
                                                <ShareButton
                                                      url={jobUrl}
                                                      title={`${jobData?.job_title} at ${jobData?.company_info?.name}`}
                                                />
                                          </div>
                                    </div>
                              </Card>

                              {/* Right Column - Job Details */}
                              <div className="lg:col-span-2 col-span-1">
                                    <div className="space-y-8">
                                          <section>
                                                <h3 className="mb-4 text-xl font-semibold">Company Description</h3>
                                                <div
                                                      dangerouslySetInnerHTML={{ __html: jobData?.company_info?.about }}
                                                      className="text-muted-foreground"
                                                />
                                          </section>

                                          <section>
                                                <h3 className="mb-4 text-xl font-semibold">Skills</h3>
                                                <div className="flex flex-wrap gap-2">
                                                      {jobData?.skills?.map((skill: string, index: number) => (

                                                            <div key={index} className="border px-2 text-xs py-0.5 rounded-md">
                                                                  {skill}
                                                            </div>
                                                      ))}
                                                </div>
                                          </section>

                                          <div className="w-full overflow-hidden">
                                                <JobSection title="About the job" content={jobData?.job_description} />
                                                <JobSection title="Responsibilities" content={jobData?.responsibilities} />
                                                <JobSection title="Benefits" content={jobData?.benefit} />
                                          </div>

                                          {jobData?.attachment_url && (
                                                <section>
                                                      <h3 className="mb-4 text-xl font-semibold">Attachment</h3>
                                                      <a
                                                            href={jobData?.attachment_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary flex items-center gap-2"
                                                      >
                                                            <FileWarning />     Download attachment
                                                      </a>
                                                </section>
                                          )}

                                          {jobData?.cvEmailSent && (
                                                <section>
                                                      <h3 className="mb-4 text-xl font-semibold">Apply Procedure</h3>
                                                      <p className="text-base text-primary">
                                                            Email Your CV to: {jobData?.cvEmailAddress}
                                                      </p>
                                                </section>
                                          )}
                                    </div>
                              </div>
                        </div>

                        {/* Similar Jobs Section */}
                        <div className="my-12">
                              <CardTitle className="mb-5 text-2xl font-bold">
                                    Similar Jobs
                              </CardTitle>
                              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {dummyJobs?.slice(2, 5).map((jobPost, index) => (
                                          <Card
                                                key={index}
                                                className="p-4 transition-shadow hover:shadow-md"
                                          >
                                                <CardContent className="p-0">
                                                      <h3 className="mb-2 text-lg font-semibold">
                                                            {jobPost?.title}
                                                      </h3>
                                                      <div className="mb-2 flex flex-wrap gap-2">
                                                            <Badge variant="outline" className="text-xs">
                                                                  {jobPost?.workMode}
                                                            </Badge>
                                                            <Badge variant="outline" className="text-xs">
                                                                  {jobPost?.jobType}
                                                            </Badge>
                                                      </div>
                                                      <p className="mb-2 text-sm text-muted-foreground">
                                                            Salary: {jobPost?.salary.slice(0, 9)} | Deadline:{" "}
                                                            {jobPost.deadline}
                                                      </p>
                                                      <p className="mb-4 text-sm">
                                                            {jobPost.description.slice(0, 100)}...
                                                      </p>

                                                      <SecondaryBtn
                                                            onClick={() => save_jobs(jobPost?.id)}
                                                            className="w-full"
                                                      >
                                                            Save Job
                                                      </SecondaryBtn>
                                                </CardContent>
                                          </Card>
                                    ))}
                              </div>
                        </div>
                  </div>
            </MaxWidthWrapper>
      )
}

const JobSection = ({
      title,
      content,
      children,
}: {
      title: string
      content?: string
      children?: React.ReactNode
}) => (
      <section>
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            {content ? (
                  <div
                        dangerouslySetInnerHTML={{ __html: content }}
                        className="jodit-editor text-muted-foreground whitespace-break-spaces w-auto dark:prose-invert"
                  />
            ) : (
                  children
            )}
      </section>
)

export default JobsDetails
