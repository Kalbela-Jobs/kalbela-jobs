
"use client"
import Link from "next/link"
import { Banknote, Calendar, Heart, MapPin } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import fallback_image from "../../../../public/fallback_img.png"
import { useUserData } from "@/utils/encript_decript"
import { toast } from "react-toastify"
import useApiForPost from "@/app/hooks/useApiForPost"
import { googleLogin } from "@/app/hooks/firebse"
import { useRouter } from "next/navigation"
import { RotateCw } from "lucide-react"
import Image from "next/image"
import { formatTimeAgo } from "@/lib/formatedTimeAgo"

interface JobcardLargeProps {
      job: any
}

const JobcardLarge: React.FC<JobcardLargeProps> = ({ job }) => {

      const [user] = useUserData()
      const { apiRequest } = useApiForPost()

      const router = useRouter()

      const save_jobs = async (job_id: any) => {
            if (!user) {
                  toast.warning("You need to login to save jobs")
                  router.push("/login")
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


      return (
            <div
                  className="block bg-white rounded-lg border p-4 shadow focus:outline-none focus:ring focus:ring-offset-2"
                  key={job._id}
            >
                  <article>
                        <Link
                              href={`/jobs/${job.url}`}
                              className="relative border-b border-gray-400 pb-2"
                        >
                              <header>
                                    <div className="max-w-64 md:max-w-xl">
                                          <h2 className="text-lg font-bold text-gray-800">{job.job_title}</h2>
                                    </div>
                                    <div className="flex md:flex-row flex-col md:items-center gap-2 mt-1">
                                          <h3 className="my-0.5">{job.company_info?.name}</h3>
                                          <div className="border md:text-sm text-xs h-[28px] flex items-center justify-center border-[#4383D6] text-[#4383D6] md:w-auto w-[130px] px-3 md:py-0.2 rounded-full">
                                                Actively Hiring
                                          </div>
                                    </div>

                                    <ul className="mt-6 flex items-center space-x-4 text-sm">
                                          <li className="flex items-center gap-2 border-gray-500 pr-2 border-r">
                                                <MapPin strokeWidth={1} size={22} className="text-gray-500" />
                                                {job?.location?.location}
                                          </li>
                                          <li className="flex items-center gap-2 border-gray-500 pr-2 border-r">
                                                <Calendar strokeWidth={1} size={22} className="text-gray-500" />
                                                {job?.job_type}
                                          </li>
                                          <li className="flex items-center gap-2 border-gray-500 pr-2 ">
                                                <Banknote strokeWidth={1} size={22} className="text-gray-500" />
                                                {job.salary_negotiable || job.negotiable_note
                                                      ? "Negotiable"
                                                      : `${job.salary_range?.min}${job.salary_range?.max ? ` - ${job.salary_range.max}` : ""} ${job.salary_range?.currency || ""} / month`}
                                          </li>
                                    </ul>
                                    {/* <p className="mt-0.5 max-w-2xl truncate text-sm">
                                          {job.description}
                                    </p> */}
                              </header>
                              {/* <div className="mt-4 flex w-full gap-2 overflow-x-auto scrollbar-hide  lg:flex-wrap lg:overflow-x-visible">
                                    {job.skills?.map((skill: string, idx: number) => (
                                          <span
                                                key={idx}
                                                className=" rounded border  whitespace-nowrap  border-gray-400 px-2 py-1 text-xs"
                                          >
                                                {skill}
                                          </span>
                                    ))}
                              </div> */}
                              <p className="mt-2 text-xs">{job.postedDate}</p>
                              {<div className="absolute border  right-0 top-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden">
                                    <Image
                                          className="rounded-xl w-full h-full object-scale-down p-2 "
                                          src={job.company_info?.logo || fallback_image.src}
                                          width={400}
                                          height={400}
                                          alt={`${job.company_info?.name} logo`}
                                    />
                              </div>}
                        </Link>
                        <button className="flex gap-0 items-center bg-[#008bdc13] text-[#008BDC] px-2 cursor-default justify-between h-[30px] mt-3 rounded-full">
                              <div className="flex w-full gap-1 items-center justify-center"><RotateCw strokeWidth={1.4} size={18} /> <span>
                                    {formatTimeAgo(job.expiry_date)}
                              </span></div>
                              {/* <p className="text-sm">
                                    <strong>Deadline:</strong> {formatDate(job.expiry_date)}
                              </p>
                              <Button
                                    className="text-sm hover:no-underline"
                                    size="sm"
                                    variant="link"
                                    onClick={() => save_jobs(job._id)}
                              >
                                    <Heart className="me-1 size-4" /> Save for later
                              </Button> */}
                        </button>
                  </article>
            </div>
      )
}

export default JobcardLarge
