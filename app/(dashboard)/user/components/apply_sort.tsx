"use client"
import { useUserData } from "@/utils/encript_decript"

import useApiRequest from "@/app/hooks/useApiRequest"
import Link from "next/link"
import { CalendarIcon, CircleIcon } from "lucide-react"

type Job = {
      _id: string
      job_post: {
            company_info: {
                  name: string
                  logo: string
            }
            job_type: string
            job_title: string
            job_location: string
            salary: string
            posted_date: string
      }
      created_at: any
      status: "Applied" | "In Review" | "Interview" | "Offer" | "Rejected"
}
type ApiResponse = {
      data: Job[]
      total: number
}

const ApplySort = () => {
      const [user] = useUserData()

      const { data, loading, error } = useApiRequest<ApiResponse>(
            `user/get-applied-jobs?user_id=${user?._id}`,
            "GET"
      )

      const jobs = data?.data || []

      console.log('my job : ', jobs);

      const users = [
            { name: 'John Doe', age: 28, email: 'john@example.com', address: '123 Main St' },
            { name: 'Jane Smith', age: 32, email: 'jane@example.com', address: '456 Oak St' },
            { name: 'Mike Johnson', age: 45, email: 'mike@example.com', address: '789 Pine St' },
      ];

      return (

            <div className="col-span-2">
                  <div className="overflow-hidden rounded-xl  border border-gray-200 ">
                        <div className="px-4 py-5 sm:p-6">
                              <div className="sm:flex sm:items-start sm:justify-between">
                                    <div>
                                          <p className="text-base font-bold">Applied Jobs</p>
                                    </div>
                                    <div className="mt-4 sm:mt-0">
                                          <Link
                                                href="/user/applied-jobs"
                                                title=""
                                                className="hover: inline-flex items-center text-xs font-semibold uppercase tracking-widest text-gray-500"
                                          >
                                                See all applied jobs
                                                <svg
                                                      className="ml-2 h-4 w-4"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                      strokeWidth={2}
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9 5l7 7-7 7"
                                                      />
                                                </svg>
                                          </Link>
                                    </div>
                              </div>
                        </div>


                        <div className="overflow-x-auto">
                              <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                          <tr className="w-full bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                                <th className="py-3 px-6 text-left">Company</th>
                                                <th className="py-3 px-6 text-left">Position</th>
                                                <th className="py-3 px-6 text-left">Job type</th>
                                                <th className="py-3 px-6 text-left">Date</th>
                                          </tr>
                                    </thead>
                                    <tbody className="!text-gray-800 text-sm font-light">
                                          {data?.data?.slice(0, 5)?.map((job, index) => (
                                                <tr key={index} className="border-b border-gray-200 !text-gray-800 hover:bg-gray-100">
                                                      <td className="py-3 font-[400] px-6 text-left whitespace-nowrap">
                                                            {job.job_post.company_info.name}
                                                      </td>
                                                      <td className="py-3 font-[400] px-6 text-left">
                                                            {job.job_post.job_title}
                                                      </td>
                                                      <td className="py-3 font-[400] px-6 text-left">
                                                            {job?.job_post?.job_type}
                                                      </td>
                                                      <td className="py-3 font-[400] px-6 text-left">
                                                            {new Date(job.created_at).toLocaleDateString("en-US", {
                                                                  year: "numeric",
                                                                  month: "long",
                                                                  day: "numeric",
                                                            })}
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>

      );
}

export default ApplySort;
